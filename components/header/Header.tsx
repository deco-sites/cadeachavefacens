import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { SectionProps } from "deco/types.ts";
import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "std/http/cookie.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import Redirect from "apps/website/handlers/redirect.ts";
import { redirect } from "deco/mod.ts";
export interface Props {
  logo: {
    alt: string;
    src: ImageWidget;
  };
}

export default function Header(props: SectionProps<ReturnType<typeof loader>>) {
  const { role } = useUI();

  return (
    <header
      class={"w-full h-20 flex flex-row justify-between bg-[#1F70B8] px-14"}
    >
      <a
        href="/historico"
        class="w-auto h-full flex justify-center items-center"
      >
        <Image
          width={150}
          height={60}
          fetchPriority="high"
          loading="eager"
          preload={true}
          src={props.logo.src}
          alt={props.logo.alt}
        />
      </a>
      <nav class="flex justify-center items-center h-full">
        <ul class="flex flex-row gap-3 justify-center items-center">
          {role.value === "admin" && (
            <li style={{ background: "#EDC61C" }} class="px-3 py-2 rounded-lg">
              <a
                href={"/historico-salas"}
                class="text-black uppercase font-semibold"
              >
                Salas
              </a>
            </li>
          )}
          {role.value === "admin" && (
            <li style={{ background: "#1CBBED" }} class="px-3 py-2 rounded-lg">
              <a
                href={"/historico-professores"}
                class="text-black uppercase font-semibold"
              >
                Professores
              </a>
            </li>
          )}
          <li style={{ background: "#FF0000" }} class="px-3 py-2 rounded-lg">
            <a href={"/"} class="text-black uppercase font-semibold">
              Sair
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function loader(props: Props, req: Request) {
  const { role } = useUI();

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

  const cookies: Record<string, string> = getCookies(req.headers);

  function filterCookies(
    nome: string,
    cookies: Record<string, string>,
  ): "admin" | "user" | "" {
    const role = cookies["role"];

    if (role === "admin" || role === "user" || role === "") {
      return role;
    } else {
      return ""; // ou lance um erro, dependendo do comportamento desejado
    }
  }
  const response = filterCookies("role", cookies);

  const url = new URL(req.url);
  if ((response === "user" || response === "") && url.pathname) {
    if (url.pathname !== "/historico" && url.pathname !== "") {
      const urlR = new URL(req.url);
      urlR.pathname = "/suporte"; // Atualize isso com o caminho de redirecionamento desejado
      redirect(urlR.toString());
    }
  }

  role.value = response;

  return { ...props };
}
