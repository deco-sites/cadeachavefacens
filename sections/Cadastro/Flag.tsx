import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  label: string;
  icon?: boolean;
}

export default function FlagSala({ label, icon = true }: Props) {
  return (
    <div class="flex flex-row gap-2 bg-[#69B1F2] rounded-lg text-white font-semibold px-3 py-2">
      <span>{label}</span>
      {icon && <Icon id="Plus" size={24} class="rotate-45 -mr-2" />}
    </div>
  );
}
