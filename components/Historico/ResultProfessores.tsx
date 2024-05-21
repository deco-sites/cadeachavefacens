import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import { effect, useSignalEffect } from "@preact/signals";
import CardProfesor from "deco-sites/cadeachavefacens/components/Historico/CardProfessor.tsx";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";

export default function xResultProfessores() {
  const { professores } = useUI();

  async function getHistorico() {
    const cookies = getCookie("token");

    const res = await invoke.site.actions.Professor["getListAllProfessores,"]({
      token: cookies,
    });

    console.log("responseee", res);

    professores.value = res;

    return res;
  }

  useSignalEffect(() => {
    getHistorico();
  });

  return (
    <div>
      {professores.value?.map((professor) => (
        <CardProfesor
          nomeProfessor={professor.nome}
          cpf={professor.cpf}
          salas={professor.salas}
          id={professor.id}
          ativo={professor.ativo}
        />
      ))}
    </div>
  );
}
