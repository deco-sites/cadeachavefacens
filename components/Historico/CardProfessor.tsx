import FlagSala from "../../sections/Cadastro/Flag.tsx";
import ButtonActive from "deco-sites/cadeachavefacens/components/cards/Button/ModeActiveProfessor.tsx";
import Icon from "../ui/Icon.tsx";

interface Sala {
  id: number;
  nome: string;
  aberta: boolean;
  ativo: boolean;
}
interface Props {
  id: number;
  nomeProfessor: string;
  cpf: string;
  salas: Sala[] | null;
  ativo: boolean;
}

export default function CardProfesor(
  { id, nomeProfessor, cpf, salas, ativo }: Props,
) {
  return (
    <div class="rounded-lg shadow-lg w-full h-auto flex flex-col justify-start items-center p-3 gap-2">
      <div class="flex flex-row gap-2 w-full">
        <span class="text-xl font-semibold">Professor:</span>
        <span class="text-xl font-semibold">{nomeProfessor}</span>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <span class="text-lg font-semibold">CPF:</span>
        <span class="text-lg font-semibold">{cpf}</span>
      </div>
      {salas && (
        <div class="flex flex-row gap-2 w-full">
          {salas.map((salas) => <FlagSala label={salas.nome} icon={false} />)}
        </div>
      )}
      <div class="flex flex-row gap-2 w-full">
        <a
          href={`/editar-professor/${id}`}
          class=" font-semibold px-1 py-1 rounded-lg bg-[#66F5A7] text-white"
        >
          <Icon id="Edit" size={24} />
        </a>
        <ButtonActive
          professor={{
            nome: nomeProfessor,
            salas: salas || [],
            id: id,
            cpf: cpf,
            ativo: ativo,
          }}
        />
      </div>
    </div>
  );
}
