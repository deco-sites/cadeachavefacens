import { useRef } from "preact/compat";
import { useSignal, useSignalEffect } from "@preact/signals";
import ButtonCustom from "deco-sites/cadeachavefacens/components/Cadastro/ButtonCustom.tsx";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";

export interface Props {
  title: string;
  input: string;
}

export interface Sala {
  nome: string;
  aberta: boolean;
  ativo: boolean;
  id: number;
}

export default function EditarSala(props: Props) {
  const teste = useSignal<string>("");
  const refInput = useRef<HTMLInputElement>(null);
  const validadeInput = useSignal<boolean>(false);
  const sala = useSignal<Sala | null>(null);

  async function getSala() {
    const path = globalThis.window.location.pathname;
    const pathSearch = "editar-sala/";
    const cookies = getCookie("token");

    console.log("page", path);

    if (path.includes(pathSearch)) {
      // Encontre a posição da string desejada
      const position = path.indexOf(pathSearch);

      // Verifique se a string foi encontrada
      if (position !== -1) {
        // Pegue o caractere depois da string
        const index = position + pathSearch.length;
        const id = path.substring(index);

        const res = await invoke.site.actions.Salas.getSalaId({
          token: cookies,
          id: parseInt(id),
        });

        console.log("sala", res, id);

        sala.value = res;
      }
    }
  }

  async function putSala() {
    const cookies = getCookie("token");

    if (refInput.current?.value) {
      const res = await invoke.site.actions.Salas.putSala({
        token: cookies,
        nome: refInput.current.value,
        id: sala.value?.id,
        aberto: sala.value?.aberta,
        ativo: sala.value?.ativo,
      });

      console.log("response Sala", res);

      validadeInput.value = false;
    } else {
      validadeInput.value = true;
    }
  }

  useSignalEffect(() => {
    getSala();
    console.log("carregou");
  });

  return (
    <div class="w-full h-full flex justify-center pt-8">
      <div class="rounded-2xl border shadow-xl p-2 gap-4 flex flex-col lg:min-w-[440px]">
        <h1 class="uppercase text-4xl text-center">{props.title}</h1>
        <span class="text-sm">
          {props.input}
        </span>
        <span class="hidden">{teste.value}</span>
        <div class="flex flex-row h-10 w-full rounded-lg bg-[#EAEAEA]">
          <input
            type={"text"}
            ref={refInput}
            value={sala.value?.nome}
            class="outline-none bg-[#EAEAEA] h-10 w-full rounded-l-lg px-2"
          >
          </input>
          {validadeInput.value && (
            <span class="text-xs text-red-600">
              Preencha o campo corretamente*
            </span>
          )}
        </div>
        <ButtonCustom
          label="Salvar"
          background="#FFA800"
          colorText="white"
          action={() => putSala()}
        />
      </div>
    </div>
  );
}
