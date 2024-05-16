import Icon from "../ui/Icon.tsx";
import CardSala from "./CardSala.tsx";
import FormResultSalas from "deco-sites/cadeachavefacens/islands/Historico/FormResultSalas.tsx";
import ResultSalas from "deco-sites/cadeachavefacens/islands/Historico/ResultSalas.tsx";

export default function FormFiltroSala() {
  return (
    <div class="flex w-full h-full justify-center items-center pt-6">
      <div class="grid grid-cols-2 gap-4 max-w-[1200px] w-full">
        <FormResultSalas />
        <div class="flex flex-col gap-2 col-span-2 col-start-2 ">
          <ResultSalas />
        </div>
      </div>
    </div>
  );
}
