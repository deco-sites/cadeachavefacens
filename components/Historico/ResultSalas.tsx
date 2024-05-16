import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import { effect, useSignalEffect } from "@preact/signals";
import CardSala from "deco-sites/cadeachavefacens/components/Historico/CardSala.tsx";

export default function ResultSalas() {
  const { salas } = useUI();

  async function getHistorico() {
    const cookies = document.cookie;

    const res = await invoke.site.actions.Salas.getListAllSalas({
      token: cookies,
    });

    console.log("responseee", res);

    salas.value = res;

    return res;
  }

  useSignalEffect(() => {
    getHistorico();
  });

  return (
    <>
      {salas.value?.map((sala) => (
        <CardSala nome={sala.nome} aberta={sala.aberta} />
      ))}
    </>
  );
}
