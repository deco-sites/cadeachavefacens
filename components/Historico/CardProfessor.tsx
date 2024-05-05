import FlagSala from "../../sections/Cadastro/Flag.tsx";
import Icon from "../ui/Icon.tsx";

export default function CardProfesor() {
  return (
    <div class="rounded-lg shadow-lg w-full h-auto flex flex-col justify-start items-center p-3 gap-2">
      <div class="flex flex-row gap-2 w-full">
        <span class="text-xl font-semibold">Professor:</span>
        <span class="text-xl font-semibold">Gustavo</span>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <span class="text-lg font-semibold">CPF:</span>
        <span class="text-lg font-semibold">123.321.431-33</span>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <FlagSala label="L24" />
        <FlagSala label="L24" />
        <FlagSala label="L24" />
      </div>
      <div class="flex flex-row gap-2 w-full">
        <button class=" font-semibold px-1 py-1 rounded-lg bg-[#66F5A7] text-white">
          <Icon id="Edit" size={24} />
        </button>
        <button class=" font-semibold px-1 py-1 rounded-lg bg-[#FF0000] text-white">
          <Icon id="Ban" size={24} />
        </button>
      </div>
    </div>
  );
}
