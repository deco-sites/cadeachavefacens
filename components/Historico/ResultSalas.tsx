import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import { effect, useSignal, useSignalEffect } from "@preact/signals";
import CardSala from "deco-sites/cadeachavefacens/components/Historico/CardSala.tsx";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";

export default function ResultSalas() {
  const { salas, loading } = useUI();

  async function getHistorico() {
    const cookies = getCookie("token");

    const res = await invoke.site.actions.Salas.getListAllSalas({
      token: cookies,
    }).then((r) => {
      return r;
    }).finally(() => {
      loading.value = false;
    });

    salas.value = res;

    return res;
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
          </>
        )
        : (
          <>
            {salas.value !== null && salas.value?.length > 0
              ? salas.value?.map((sala) => (
                <CardSala
                  nome={sala.nome}
                  aberta={sala.aberta}
                  id={sala.id}
                  ativo={sala.ativo}
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
                    Nenhuma Sala encontrada!
                  </span>
                </div>
              )}
          </>
        )}
    </>
  );
}
