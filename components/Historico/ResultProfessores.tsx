import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import { effect, useSignalEffect } from "@preact/signals";
import CardProfesor from "deco-sites/cadeachavefacens/components/Historico/CardProfessor.tsx";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";

export default function xResultProfessores() {
  const { professores, loading } = useUI();

  async function getHistorico() {
    const cookies = getCookie("token");
    loading.value = true;

    const res = await invoke.site.actions.Professor["getListAllProfessores,"]({
      token: cookies,
    }).then((r) => {
      return r;
    }).finally(() => {
      loading.value = false;
    });

    professores.value = res;

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
        : professores.value !== null && professores.value.length > 0
        ? professores.value?.map((professor) => (
          <CardProfesor
            nomeProfessor={professor.nome}
            cpf={professor.cpf}
            salas={professor.salas}
            id={professor.id}
            ativo={professor.ativo}
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
              Nenhuma Professsor encontrada!
            </span>
          </div>
        )}
    </>
  );
}
