import { Historico } from "../../loaders/Historic/ClassHistoric.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import Icon from "../ui/Icon.tsx";
import CardHistorico from "./CardHistorico.tsx";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { SectionProps } from "deco/types.ts";
import ResultHistorico from "deco-sites/cadeachavefacens/islands/Historico/ResultHistorico.tsx";
import FormHistorico from "deco-sites/cadeachavefacens/islands/Historico/FormResult.tsx";

export default function FormFiltroHistorico() {
  return (
    <div class="flex w-full h-full justify-center items-center pt-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2 col-span-1">
          <h2 class="text-3xl font-semibold">Filtros de Historico:</h2>
          <FormHistorico />
        </div>
        <div class="flex flex-col gap-2 col-span-2 col-start-2 ">
          <ResultHistorico />
        </div>
      </div>
    </div>
  );
}
