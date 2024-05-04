import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Button {
  label: string;
  href: string;
  /**
   * @format color
   */
  color: string;
}

export interface Props {
  logo: {
    alt: string;
    src: ImageWidget;
  };
  buttons: Button[];
}

export default function Header(props: Props) {
  return (
    <header class={"w-full h-20 flex flex-row justify-between bg-[#1F70B8]"}>
      <div class="w-auto h-full flex justify-center items-center">
        <Image
          width={300}
          height={60}
          fetchPriority="high"
          loading="eager"
          preload={true}
          src={props.logo.src}
          alt={props.logo.alt}
        />
      </div>
      <nav>
        <ul class="flex flex-row gap-3 justify-center items-center">
          {props.buttons.map((button) => (
            <li style={{ background: button.color }} class="px-3 py-2">
              <a href={button.href} class="text-blac uppercase">
                {button.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
