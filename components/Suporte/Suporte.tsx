import { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";

export interface Props {
  title: HTMLWidget;
  subTitle: HTMLWidget;
}

export default function Suporte({ title, subTitle }: Props) {
  return (
    <div class="w-full h-full min-h-screen flex flex-col justify-center items-center gap-5">
      <Icon id="NoAccess" size={128} class="text-[#1f70b8]" strokeWidth={1} />
      <span
        class="text-4xl font-semibold text-gray-400"
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </span>
      <span
        class="text-xl text-gray-300 "
        dangerouslySetInnerHTML={{ __html: subTitle }}
      >
      </span>
    </div>
  );
}
