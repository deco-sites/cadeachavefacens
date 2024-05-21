import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import CardHistorico from "deco-sites/cadeachavefacens/components/Historico/CardHistorico.tsx";
import { Historico } from "deco-sites/cadeachavefacens/loaders/Historic/ClassHistoric.ts";
import { effect, useSignalEffect } from "@preact/signals";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";

export default function ResultHistorico() {
  const { token, historico } = useUI();

  async function getHistorico() {
    const cookies = getCookie("token");

    const res = await invoke.site.loaders.Historic.ClassHistoric({
      token: cookies,
    });

    historico.value = res;

    return res;
  }

  useSignalEffect(() => {
    getHistorico();
  });

  return (
    <div>
      {historico.value?.map((item: Historico) => (
        <CardHistorico
          professor={item.professor}
          aberto={item.aberto}
          horario={item.horario}
          sala={item.sala}
        />
      ))}
    </div>
  );
}
