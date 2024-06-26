import FlagSala from "./Flag.tsx";
import { useRef } from "preact/compat";
import { signal, useSignal, useSignalEffect } from "@preact/signals";
import ButtonCustom from "deco-sites/cadeachavefacens/components/Cadastro/ButtonCustom.tsx";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import CookieConsent from "deco-sites/cadeachavefacens/components/ui/CookieConsent.tsx";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import FlagStatus from "deco-sites/cadeachavefacens/components/Flags/FlagStatus.tsx";
import Loading from "deco-sites/cadeachavefacens/components/Modal/Loading.tsx";

export interface Props {
  title: string;
  input: string;
}

export default function CadastroSala(props: Props) {
  // deno-lint-ignore no-explicit-any
  const arraySalas = useSignal<any>(null);
  const teste = useSignal<string>("");
  const arraySala = useSignal<Array<string>>([]);
  const refInput = useRef<HTMLInputElement>(null);
  const toast = useSignal<boolean>(false);
  const status = useSignal<boolean>(false);
  const loading = useSignal<"loading" | null>(null);
  const message = useSignal<string>("Falha. Tente novamente mais tarde");

  function addSala() {
    const value = refInput.current?.value;

    if (value) {
      arraySala.value.push(value);
      teste.value = value;
    }

    refInput.current!.value = "";

    arraySalas.value = arraySala.value;
  }

  function removeFlag(label: string) {
    // Encontre o índice do item que você deseja remover
    const index = arraySala.value.indexOf(label);

    // Verifique se o item foi encontrado
    if (index !== -1) {
      // Remova o item usando o método splice
      arraySala.value.splice(index, 1);
    } else {
      console.log("Item não encontrado no array.");
    }

    teste.value = "remove" + arraySala.value;
    arraySalas.value = arraySala.value;
  }

  function postArraySala() {
    const cookies = getCookie("token");

    loading.value = "loading";
    arraySalas.value.map(async (sala: string, index: number) => {
      const res = await invoke.site.actions.Salas.postSala({
        token: cookies,
        nome: sala,
      }).then((r) => {
        console.log("return", r);
        return r;
      }).finally(() => {
        loading.value = null;
      });

      if (arraySala.value.length === (index + 1)) {
        if (res === 200) {
          status.value = true;
          toast.value = true;
        } else if (res === 409) {
          message.value = "Falha. Sala ja existe";
        } else {
          status.value = false;
        }
        toast.value = true;
      }

      setTimeout(() => {
        toast.value = false;
      }, 2000);
      if (status.value) {
        setTimeout(() => {
          globalThis.document.location.pathname = "/historico-salas";
        }, 500);
      }
    });
  }

  return (
    <>
      <div class="w-full h-full flex justify-center pt-8 overflow-x-hidden relative pb-6">
        <FlagStatus
          show={toast.value}
          status={status.value}
          successLabel="Sala(s) criada(s) com Sucesso"
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
              class="outline-none bg-[#EAEAEA] h-10 w-full rounded-l-lg px-2"
            >
            </input>
            <button
              class="min-w-10 bg-green-500 w-10 h-10 flex justify-center items-center rounded-lg text-white"
              onClick={addSala}
              type="button"
            >
              <Icon id="Plus" size={24} />
            </button>
          </div>
          {(arraySala.value.length > 0) && (
            <div class="flex flex-row gap-2">
              {arraySala.value.map((sala: string) => {
                return (
                  <FlagSala
                    label={sala}
                    action={() => removeFlag(sala)}
                  />
                );
              })}
            </div>
          )}
          <ButtonCustom
            label="Salvar e Voltar"
            background="#FFA800"
            colorText="white"
            action={() => postArraySala()}
          />
        </div>
      </div>
      {loading.value === "loading" && <Loading />}
    </>
  );
}
