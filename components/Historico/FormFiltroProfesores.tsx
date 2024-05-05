import Icon from "../ui/Icon.tsx";
import CardProfessor from "./CardProfessor.tsx";
import CardSala from "./CardSala.tsx";

export default function FormFiltroProfessores() {
  return (
    <div class="flex w-full h-full justify-center items-center pt-6">
      <div class="grid grid-cols-2 gap-4 max-w-[1200px] w-full">
        <div class="flex flex-col gap-2 col-span-1">
          <h2 class="text-3xl font-semibold">Filtros de Profesores:</h2>
          <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg">
            <label class="font-semibold">
              Nome ou CPF:
            </label>
            <input
              type={"text"}
              class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
            >
            </input>
          </div>
          <div class="w-full flex flex-row gap-2 justify-center items-center">
            <button class="flex justify-center items-center px-3 py-3 text-white bg-[#69B1F2] rounded-lg w-2/4 text-xl gap-2">
              Aplicar Filtros <Icon id="Search" size={24} />
            </button>
            <button class="flex justify-center items-center px-3 py-3 text-white bg-[#FFA800] rounded-lg w-2/4 text-xl gap-2">
              Limpar
              <Icon id="Plus" size={24} class="rotate-45" />
            </button>
          </div>
          <button class="flex justify-center items-center px-3 py-3 text-white bg-[#66F5A7] rounded-lg w-full text-xl gap-2">
            Cadastrar Professores
            <Icon id="PlusOctagon" size={24} />
          </button>
          <button class="flex justify-center items-center px-3 py-3 text-white bg-[#185C37] rounded-lg w-full text-xl">
            Gerar Excel
          </button>
        </div>
        <div class="flex flex-col gap-2 col-span-2 col-start-2 ">
          <CardProfessor />
          <CardProfessor />
          <CardProfessor />
        </div>
      </div>
    </div>
  );
}
