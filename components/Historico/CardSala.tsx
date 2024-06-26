import ButtonActive from "deco-sites/cadeachavefacens/islands/Button/ModeActive.tsx";
import Icon from "../ui/Icon.tsx";
import ButtonMQTT from "deco-sites/cadeachavefacens/islands/Button/ButtonMQTT.tsx";

export interface Sala {
  nome: string;
  id: number;
  aberta: boolean;
  ativo: boolean;
}

export default function CardSala({ nome, aberta, id, ativo }: Sala) {
  return (
    <div class="rounded-lg shadow-lg w-full h-auto flex flex-col justify-start items-center p-3 gap-2 border-gray-400 border">
      <div class="flex flex-row gap-2 w-full">
        <span class="text-xl font-semibold">Sala:</span>
        <span class="text-xl font-semibold">{nome}</span>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <span class="text-lg font-semibold">Status:</span>
        {aberta
          ? (
            <button class="text-black font-semibold px-2 py-1 rounded-lg bg-[#66F5A7] cursor-default">
              Aberto
            </button>
          )
          : (
            <button class="text-black font-semibold px-2 py-1 rounded-lg bg-[#FF0000] cursor-default">
              Fechado
            </button>
          )}
      </div>
      <div class="flex flex-row gap-2 w-full">
        <a
          href={`editar-sala/${id}`}
          class=" font-semibold px-1 py-1 rounded-lg bg-[#66F5A7] text-white"
        >
          <Icon id="Edit" size={24} />
        </a>
        <ButtonActive id={id} ativo={ativo} nome={nome} aberto={aberta} />
        <ButtonMQTT nome={nome} isOpen={aberta} />
      </div>
    </div>
  );
}
