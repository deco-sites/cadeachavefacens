export interface Props {
  status: boolean;
  successLabel: string;
  errorLabel: string;
  show: boolean;
}

export default function FlagStatus(
  { status, successLabel, errorLabel, show }: Props,
) {
  return (
    <div
      class={`w-96 h-10 flex justify-start items-center absolute right-0 rounded-md px-3 text-white font-semibold duration-300 ease-in-out ${
        status ? "bg-[#00FF00]" : "bg-[#FF0000]"
      }  ${show ? "translate-x-0" : "translate-x-full"}`}
    >
      {status ? successLabel : errorLabel}
    </div>
  );
}
