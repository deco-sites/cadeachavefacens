import Icon from "../ui/Icon.tsx";

export default function CardSala() {
  return (
    <div class="rounded-lg shadow-lg w-full h-auto flex flex-col justify-start items-center p-3 gap-2">
      <div class="flex flex-row gap-2 w-full">
        <span class="text-xl font-semibold">Sala:</span>
        <span class="text-xl font-semibold">L24</span>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <span class="text-lg font-semibold">Status:</span>
        <button class="text-black font-semibold px-2 py-1 rounded-lg bg-[#66F5A7]">
          Aberto
        </button>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <button class=" font-semibold px-1 py-1 rounded-lg bg-[#66F5A7] text-white">
          <Icon id="Edit" size={24} />
        </button>
        <button class=" font-semibold px-1 py-1 rounded-lg bg-[#FF0000] text-white">
          <Icon id="Ban" size={24} />
        </button>
        <button class="text-black font-semibold px-2 py-1 rounded-lg bg-[#A8A8A8]">
          Fechar Remoto
        </button>
      </div>
    </div>
  );
}
