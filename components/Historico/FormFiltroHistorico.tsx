import { Historico } from "../../loaders/Historic/ClassHistoric.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import Icon from "../ui/Icon.tsx";
import CardHistorico from "./CardHistorico.tsx";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { SectionProps } from "deco/types.ts";
import ResultHistorico from "deco-sites/cadeachavefacens/islands/Historico/ResultHistorico.tsx";

export default function FormFiltroHistorico() {
  return (
    <div class="flex w-full h-full justify-center items-center pt-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2 col-span-1">
          <h2 class="text-3xl font-semibold">Filtros de Historico:</h2>
          <div class="flex flex-row p-2 shadow-lg gap-2 rounded-lg">
            <div class="w-2/4">
              <label class="font-semibold">
                Horario Inicial
              </label>
              <input
                type={"text"}
                class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
              >
              </input>
            </div>
            <div class="w-2/4">
              <label class="font-semibold">
                Horario Final
              </label>
              <input
                type={"text"}
                class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
              >
              </input>
            </div>
          </div>
          <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg">
            <label class="font-semibold">
              Professor:
            </label>
            <input
              type={"text"}
              class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
            >
            </input>
          </div>
          <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg">
            <label class="font-semibold">
              Salas:
            </label>
            <input
              type={"text"}
              class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
            >
            </input>
          </div>
          <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg">
            <label class="font-semibold">
              Status:
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
          <button class="flex justify-center items-center px-3 py-3 text-white bg-[#185C37] rounded-lg w-full text-xl">
            Gerar Excel
          </button>
        </div>
        <div class="flex flex-col gap-2 col-span-2 col-start-2 ">
          <ResultHistorico />
        </div>
      </div>
    </div>
  );
}
