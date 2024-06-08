import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import CardHistorico from "deco-sites/cadeachavefacens/components/Historico/CardHistorico.tsx";
import { Historico } from "deco-sites/cadeachavefacens/loaders/Historic/ClassHistoric.ts";
import { effect, useSignal, useSignalEffect } from "@preact/signals";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import Loading from "deco-sites/cadeachavefacens/components/Modal/Loading.tsx";

const pagination = () => {
  const { historico, loading, filter } = useUI();

  const array = Array.from(
    { length: historico.value?.totalPage || 0 },
    (_, index) => index,
  );

  async function changePage(number: number) {
    loading.value = true;

    const cookies = getCookie("token");
    const res = await invoke.site.actions.Historico({
      token: cookies,
      page: number,
      professorId: filter.value?.professorId,
      salaId: filter.value?.salaId,
      abriu: filter.value?.abriu,
      dataInicial: filter.value?.dataInicial,
      dataFinal: filter.value?.dataFinal,
    }).then((r) => {
      return r;
    }).finally(() => {
      loading.value = false;
    });

    historico.value = res;
  }

  return (
    <div class="flex justify-center items-center gap-2">
      <button
        class="text-white font-semibold w-10 h-10 rounded-md flex justify-center items-center cursor-pointer bg-[#1f70b8] disabled:opacity-70 disabled:cursor-default mr-4"
        disabled={historico.value?.number == 0}
        onClick={() => {
          if (historico.value && historico.value?.number > 0) {
            changePage(historico.value.number - 1);
          }
        }}
      >
        <Icon size={24} id="arrowLeft" strokeWidth={3} class="text-white" />
      </button>
      {array.map((number) => (
        <>
          {number === 3 && historico.value!.number > 5
            ? <span>. . .</span>
            : number > 2 && number < array.length - 2
            ? null
            : number < array.length - 1 && number > 2 &&
                historico.value!.number < array.length - 1
            ? <span>. . .</span>
            : (
              <li
                onClick={() => changePage(number)}
                class={`bg-[#1f70b8] ${
                  number === historico.value?.number ? "opacity-80" : ""
                } text-white font-semibold w-10 h-10 rounded-md flex justify-center items-center cursor-pointer`}
              >
                <span>{number + 1}</span>
              </li>
            )}
        </>
      ))}
      <button
        class="text-white font-semibold w-10 h-10 rounded-md flex justify-center items-center cursor-pointer bg-[#1f70b8] disabled:opacity-70 disabled:cursor-default ml-4"
        disabled={historico.value?.number == (historico.value!.totalPage - 1)}
        onClick={() => {
          if (
            historico.value &&
            historico.value.number < historico.value.totalPage
          ) {
            changePage(historico.value.number + 1);
          }
        }}
      >
        <Icon size={24} id="arrowRight" strokeWidth={3} class="text-white" />
      </button>
    </div>
  );
};

export default function ResultHistorico() {
  const { token, historico, loading } = useUI();

  async function getHistorico() {
    const cookies = getCookie("token");

    const res = await invoke.site.loaders.Historic.ClassHistoric({
      token: cookies,
    }).then((r) => {
      return r;
    }).finally(() => {
      loading.value = false;
    });

    historico.value = res;
  }

  useSignalEffect(() => {
    getHistorico();
  });

  return (
    <>
      {loading.value
        ? (
          <>
            <div className="skeleton bg-gray-100 w-full h-36"></div>
            <div className="skeleton bg-gray-100 w-full h-36"></div>
            <div className="skeleton bg-gray-100 w-full h-36"></div>
            <div className="skeleton bg-gray-100 w-full h-36"></div>
            <div className="skeleton bg-gray-100 w-full h-36"></div>
          </>
        )
        : (
          <>
            {historico.value && historico.value.historico.length > 0
              ? historico.value.historico.map((item: Historico) => (
                <CardHistorico
                  professor={item.professor}
                  aberto={item.aberto}
                  horario={item.horario}
                  sala={item.sala}
                />
              ))
              : (
                <div class="flex justify-center items-center w-full h-full gap-4 flex-col">
                  <Icon
                    id="Confuzer"
                    size={80}
                    class=" text-gray-300 w-20 h-20"
                  />
                  <span class=" text-gray-300 text-2xl">
                    Nenhum Historico encontrado!
                  </span>
                </div>
              )}
            {historico.value?.totalPage && (
              <ul class="w-full flex gap-2 flex-row justify-center">
                {pagination()}
              </ul>
            )}
          </>
        )}
    </>
  );
}
