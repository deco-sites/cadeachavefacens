import Icon from "../ui/Icon.tsx";
import CardHistorico from "./CardHistorico.tsx";

export default function FormFiltroSala() {
  return (
    <div class="flex w-full h-full justify-center items-center pt-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2 col-span-1">
          <h2 class="text-3xl font-semibold">Filtro de Salas:</h2>
          <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg">
            <label class="font-semibold">
              Nome:
            </label>
            <input
              type={"text"}
              class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
            >
            </input>
          </div>
          <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg">
            <label class="font-semibold">
              Ação:
            </label>
            <div class="flex flex-row gap-2 py-3">
              <button class="text-black font-semibold px-3 py-2 rounded-lg bg-[#66F5A7]">
                Aberto
              </button>
              <button class="text-black font-semibold px-3 py-2 rounded-lg bg-[#FF0000]">
                Fechado
              </button>
            </div>
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
          <button class="flex justify-center items-center px-3 py-3 text-white bg-[#185C37] rounded-lg w-full text-xl gap-2">
            Cadastrar Sala
            <Icon id="Door" size={24} />
          </button>
          <button class="flex justify-center items-center px-3 py-3 text-white bg-[#185C37] rounded-lg w-full text-xl">
            Gerar Excel
          </button>
        </div>
        <div class="flex flex-col gap-2 col-span-2 col-start-2 ">
          <CardHistorico />
          <CardHistorico />
          <CardHistorico />
        </div>
      </div>
    </div>
  );
}
