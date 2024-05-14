import FlagSala from "../../sections/Cadastro/Flag.tsx";
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
}

export default function CardProfesor({ id, nomeProfessor, cpf, salas }: Props) {
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
        <button class=" font-semibold px-1 py-1 rounded-lg bg-[#FF0000] text-white">
          <Icon id="Ban" size={24} />
        </button>
      </div>
    </div>
  );
}
