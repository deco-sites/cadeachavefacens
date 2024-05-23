interface Props {
  sala: string;
  professor: string;
  horario: string;
  aberto: boolean;
}

export default function CardHistorico(
  { sala, professor, horario, aberto }: Props,
) {
  const data = new Date(horario);

  return (
    <div class="rounded-lg shadow-lg w-full h-auto flex flex-col justify-start items-center p-3 border-gray-400 border">
      <div class="flex flex-row gap-2 w-full">
        <span class="text-xl font-semibold">Sala:</span>
        <span class="text-xl font-semibold">{sala}</span>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <span class="text-xl font-semibold">Professor:</span>
        <span class="text-xl font-semibold">{professor}</span>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <span class=" text-base font-semibold">
          Horiario {aberto ? "Abertura:" : "Fechamento:"}
        </span>
        <span class="text-base  font-semibold">
          {data.toLocaleString("pt-BR")}
        </span>
      </div>
    </div>
  );
}
