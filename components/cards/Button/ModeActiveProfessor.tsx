import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useSignal } from "@preact/signals";
import { identity } from "deco/utils/object.ts";

export interface Props {
  professor: Professor;
}

interface Sala {
  id: number;
  nome: string;
  aberta: boolean;
  ativo: boolean;
}

interface Professor {
  nome: string;
  cpf: string;
  salas: Sala[] | null;
  ativo: boolean;
  id: number;
}

export default function ButtonActiveProfessor({ professor }: Props) {
  const { nome, cpf, salas, ativo, id } = professor;

  const professorSignal = useSignal<Professor>({
    nome: nome,
    cpf: cpf,
    salas: salas,
    ativo: ativo,
    id: id,
  });
  const active = useSignal(ativo);

  async function putProfessor(professorO: Professor) {
    const { nome, cpf, salas, ativo, id } = professorO;
    const cookies = getCookie("token");

    const arraySalas: number[] = [];

    if (salas != null && salas.length > 0) {
      salas.map((sala) => {
        arraySalas.push(sala.id);
      });
    }

    const res = await invoke.site.actions.Professor.putProfessor({
      token: cookies,
      professor: { nome: nome, cpf: cpf, salas: arraySalas, ativo: !ativo },
      id: id,
    });

    active.value = res?.ativo || false;
    professorSignal.value.ativo = res?.ativo || false;
  }

  return (
    <button
      class=" font-semibold px-1 py-1 rounded-lg text-white cursor-pointer"
      style={{ background: active.value ? "#FF0000" : "#7ffc36" }}
      onClick={() => putProfessor(professorSignal.value)}
    >
      {active.value
        ? <Icon id="Ban" size={24} />
        : <Icon id="Check" size={24} />}
    </button>
  );
}
