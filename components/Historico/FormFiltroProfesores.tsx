import Icon from "../ui/Icon.tsx";
import CardProfessor from "./CardProfessor.tsx";
import CardSala from "./CardSala.tsx";
import FormResultProfessores from "deco-sites/cadeachavefacens/islands/Historico/FormResultProfessores.tsx";
import ResultProfessores from "deco-sites/cadeachavefacens/islands/Historico/ResultProfessores.tsx";

export default function FormFiltroProfessores() {
  return (
    <div class="flex w-full h-full justify-center items-center pt-6">
      <div class="grid grid-cols-2 gap-4 max-w-[1200px] w-full">
        <div class="flex flex-col gap-2 col-span-1">
          <h2 class="text-3xl font-semibold">Filtros de Profesores:</h2>
          <FormResultProfessores />
        </div>
        <div class="flex flex-col gap-2 col-span-2 col-start-2 max-h-[80vh] overflow-y-auto">
          <ResultProfessores />
        </div>
      </div>
    </div>
  );
}
