import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import ButtonCustom from "../Cadastro/ButtonCustom.tsx";

export interface Props {
  alt: string;
  src: ImageWidget;
}

export default function Login(props: Props) {
  return (
    <div class="w-full h-full min-h-screen flex justify-center items-center bg-[#1F70B8]">
      <div class="max-w-[400px] p-2 rounded-lg bordered border-white bg-[#ffffff6b]">
        <Image
          width={400}
          height={150}
          loading="eager"
          fetchPriority="high"
          src={props.src}
          alt={props.alt}
        />
        <form class="flex flex-col w-full h-full gap-2">
          <label class="text-white ">
            Usuario
          </label>
          <input
            type={"text"}
            class=" rounded-lg border border-white w-full px-3 py-2 bg-[#ffffff9c]"
          >
          </input>
          <label class="text-white ">
            Senha:
          </label>
          <input
            type={"text"}
            class=" rounded-lg border border-white w-full px-3 py-2 bg-[#ffffff9c]"
          >
          </input>
          <ButtonCustom label="Login" colorText="#00000" background="#66F5A7" />
        </form>
      </div>
    </div>
  );
}
