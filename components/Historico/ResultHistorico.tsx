import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import CardHistorico from "deco-sites/cadeachavefacens/components/Historico/CardHistorico.tsx";
import { Historico } from "deco-sites/cadeachavefacens/loaders/Historic/ClassHistoric.ts";
import { effect, useSignal, useSignalEffect } from "@preact/signals";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";

const pagination = () => {
  const { historico } = useUI();

  const array = Array.from(
    { length: historico.value?.totalPage || 0 },
    (_, index) => index,
  );

  async function changePage(number: number) {
    const cookies = getCookie("token");
    const { filter, historico } = useUI();
    console.log(filter.value);
    const res = await invoke.site.actions.Historico({
      token: cookies,
      page: number,
      professorId: filter.value?.professorId,
      salaId: filter.value?.salaId,
      abriu: filter.value?.abriu,
      dataInicial: filter.value?.dataInicial,
      dataFinal: filter.value?.dataFinal,
    });

    historico.value = res;
    console.log("page", historico.value?.number);
  }

  return (
    <>
      {array.map((item, index) => (
        <li
          onClick={() => changePage(index)}
          class={`bg-[#1f70b8] ${
            index === historico.value?.number ? "opacity-80" : ""
          } text-white font-semibold w-10 h-10 rounded-md flex justify-center items-center cursor-pointer`}
        >
          <span>{index + 1}</span>
        </li>
      ))}
    </>
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
