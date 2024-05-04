import type { ComponentChildren } from "preact";

export interface Button {
  label?: string;
  children?: ComponentChildren;
  colorText?: string;
  background?: string;
  action?: () => void;
}

export default function ButtonCustom(
  { label, children, colorText, action, background }: Button,
) {
  return (
    <button
      class=" h-10 w-full text-white flex justify-center items-center rounded-lg text-xl "
      style={{ background: background }}
    >
      {label}
    </button>
  );
}
