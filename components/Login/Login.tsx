import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import ButtonCustom from "../Cadastro/ButtonCustom.tsx";
import FormLogin from "../../islands/Login/Form.tsx";

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
        <FormLogin />
      </div>
    </div>
  );
}
