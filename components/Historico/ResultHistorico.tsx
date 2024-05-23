import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import CardHistorico from "deco-sites/cadeachavefacens/components/Historico/CardHistorico.tsx";
import { Historico } from "deco-sites/cadeachavefacens/loaders/Historic/ClassHistoric.ts";
import { effect, useSignal, useSignalEffect } from "@preact/signals";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";

export default function ResultHistorico() {
  const { token, historico } = useUI();
  const loading = useSignal<boolean>(true);

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

  console.log("historico", historico.value);

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
            {historico.value && historico.value?.length > 0
              ? historico.value.map((item: Historico) => (
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
          </>
        )}
    </>
  );
}
