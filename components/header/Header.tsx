import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { SectionProps } from "deco/types.ts";
import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "std/http/cookie.ts";
export interface Props {
  logo: {
    alt: string;
    src: ImageWidget;
  };
}

export default function Header(props: SectionProps<ReturnType<typeof loader>>) {
  return (
    <header
      class={"w-full h-20 flex flex-row justify-between bg-[#1F70B8] px-14"}
    >
      <div class="w-auto h-full flex justify-center items-center">
        <Image
          width={150}
          height={60}
          fetchPriority="high"
          loading="eager"
          preload={true}
          src={props.logo.src}
          alt={props.logo.alt}
        />
      </div>
      <nav class="flex justify-center items-center h-full">
        <ul class="flex flex-row gap-3 justify-center items-center">
          <li style={{ background: "#EDC61C" }} class="px-3 py-2 rounded-lg">
            <a href={"/salas"} class="text-black uppercase font-semibold">
              Salas
            </a>
          </li>
          <li style={{ background: "#1CBBED" }} class="px-3 py-2 rounded-lg">
            <a href={"/professores"} class="text-black uppercase font-semibold">
              Professores
            </a>
          </li>
          <li style={{ background: "#FF0000" }} class="px-3 py-2 rounded-lg">
            <a href={"/login"} class="text-black uppercase font-semibold">
              Sair
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function loader(props: Props, req: Request) {
  const headers = new Headers();
  const cookie: Cookie = {
    name: "language",
    value: "en",
    path: "/",
    maxAge: 3600,
    secure: true,
    httpOnly: true,
    sameSite: "Lax",
  };

  setCookie(headers, cookie);

  const cookies = getCookies(req.headers);
  console.log("Cookies", cookies);

  return { ...props };
}
