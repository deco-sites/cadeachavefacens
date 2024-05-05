export default function CardHistorico() {
  return (
    <div class="rounded-lg shadow-lg w-full h-auto flex flex-col justify-start items-center p-3">
      <div class="flex flex-row gap-2 w-full">
        <span class="text-xl font-semibold">Sala:</span>
        <span class="text-xl font-semibold">L24</span>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <span class="text-xl font-semibold">Professor:</span>
        <span class="text-xl font-semibold">Gustavo</span>
      </div>
      <div class="flex flex-row gap-2 w-full">
        <div class="w-2/4 flex flex-row gap-1">
          <span class=" text-base font-semibold">Abertura:</span>
          <span class="text-base  font-semibold">19:00 - 26/03/23</span>
        </div>
        <div class="w-2/4 flex flex-row gap-1">
          <span class=" text-base font-semibold">Fechamento:</span>
          <span class="text-base  font-semibold">19:00 - 26/03/23</span>
        </div>
      </div>
    </div>
  );
}
