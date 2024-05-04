import Icon from "../ui/Icon.tsx";

export interface Flag {
  label: string;
  id: string;
}

export default function Flag({ label, id }: Flag) {
  return (
    <div>
      <span>{label}</span>
      <Icon id="ChevronDown" size={24} />
    </div>
  );
}
