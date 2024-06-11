export interface Props {
  title: string;
  name: string;
  buttonYes: () => void;
  buttonNot: () => void;
}

export default function ModalConfirm(
  { title, name, buttonNot, buttonYes }: Props,
) {
  return (
    <div class="flex justify-center items-center w-full h-full min-h-screen z-30 absolute top-0 bottom-0 left-0 right-0 bg-[#0000009e]">
      <div class="rounded-lg p-2 bg-white flex flex-col gap-5 min-w-72 justify-center items-center text-center">
        <span class="text-black text-xl text-center">{title}</span>
        <span class={"text-black text-xl text-center font-semibold"}>
          {name}
        </span>
        <div class="flex flex-row gap-2 w-full">
          <button
            onClick={buttonYes}
            class={"h-10 w-2/4 flex justify-center items-center rounded-lg text-xl text-white bg-[#00FF00] font-semibold"}
          >
            SIM
          </button>
          <button
            onClick={buttonNot}
            class={"h-10 w-2/4 flex justify-center items-center rounded-lg text-xl text-white bg-[#FF0000] font-semibold"}
          >
            NÃO
          </button>
        </div>
      </div>
    </div>
  );
}
