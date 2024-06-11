import { useRef } from "preact/compat";
import { useSignal, useSignalEffect } from "@preact/signals";
import ButtonCustom from "deco-sites/cadeachavefacens/components/Cadastro/ButtonCustom.tsx";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import FlagStatus from "deco-sites/cadeachavefacens/components/Flags/FlagStatus.tsx";
import Loading from "deco-sites/cadeachavefacens/components/Modal/Loading.tsx";

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
  const toast = useSignal<boolean>(false);
  const status = useSignal<boolean>(false);

  const message = useSignal<string>("Falha. Tente novamente mais tarde");

  const loading = useSignal<"loading" | null>(null);

  async function getSala() {
    const path = globalThis.window.location.pathname;
    const pathSearch = "editar-sala/";
    const cookies = getCookie("token");

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

        sala.value = res;
      }
    }
  }

  async function putSala() {
    const cookies = getCookie("token");

    loading.value = "loading";

    if (refInput.current?.value) {
      const res = await invoke.site.actions.Salas.putSala({
        token: cookies,
        nome: refInput.current.value,
        id: sala.value?.id,
        aberto: sala.value?.aberta,
        ativo: sala.value?.ativo,
      }).then((r) => {
        console.log("return", r);
        return r;
      }).finally(() => {
        loading.value = null;
      });

      if (res && typeof res === "object") {
        sala.value = res;
        status.value = true;
        toast.value = true;
      } else {
        status.value = false;
        message.value = res || "Falha. Tente novamente mais tarde";
      }
      toast.value = true;

      setTimeout(() => {
        toast.value = false;
        if (status.value) {
          setTimeout(() => {
            window.location.pathname = "/historico-salas";
          }, 500);
        }
      }, 2000);

      validadeInput.value = false;
    } else {
      validadeInput.value = true;
    }
  }

  useSignalEffect(() => {
    getSala();
  });

  return (
    <>
      <div class="w-full h-full flex justify-center pt-8 overflow-x-hidden relative pb-6">
        <FlagStatus
          show={toast.value}
          status={status.value}
          successLabel="Sala Editada com Sucesso"
          errorLabel={message.value}
        />
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
      {loading.value === "loading" && <Loading />}
    </>
  );
}
