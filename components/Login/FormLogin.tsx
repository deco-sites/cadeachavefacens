import ButtonCustom from "../Cadastro/ButtonCustom.tsx";
import { useRef } from "preact/compat";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import { useSignal, useSignalEffect } from "@preact/signals";
import { setCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import Loading from "deco-sites/cadeachavefacens/components/Modal/Loading.tsx";

export default function () {
  const user = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const inputUser = useSignal<boolean>(true);
  const inputPassword = useSignal<boolean>(true);

  const visiblePassword = useSignal<boolean>(false);
  const modalstatus = useSignal<"loading" | null>(null);

  const { token } = useUI();

  async function login() {
    const userValue = user.current?.value;
    const passworValue = password.current?.value;

    if (!userValue && !passworValue) {
      inputUser.value = false;
      inputPassword.value = false;
    } else if (!passworValue) {
      inputUser.value = true;
      inputPassword.value = false;
    } else if (!userValue) {
      inputUser.value = false;
      inputPassword.value = true;
    } else {
      inputUser.value = true;
      inputPassword.value = true;

      if (userValue != null && passworValue != null) {
        modalstatus.value = "loading";
        const res = await invoke.site.actions.Login({
          user: userValue,
          password: passworValue,
        }).then((r) => {
          return r;
        }).finally(() => {
          modalstatus.value = null;
        });

        if (res.message) {
          alert("Usuario ou senha incorretos");
        } else {
          token.value = res;
          setCookie("token", res.token, 0);
          setCookie("role", res.role, 0);
          window.location.pathname = "/historico";
        }
      }
    }
  }

  return (
    <>
      <form class="flex flex-col w-full h-full gap-2">
        <label class="text-white ">
          Usuário:
        </label>
        <input
          type={"text"}
          name={"usuario"}
          ref={user}
          class=" rounded-lg border border-white w-full px-3 py-2 bg-[#ffffff9c] outline-none"
        >
        </input>
        {!inputUser.value && (
          <span class="text-xs text-red-500">
            Preencha o nome de usuario corretamente *
          </span>
        )}
        <label class="text-white ">
          Senha:
        </label>
        <div class="flex flex-row gap-2 bg-[#ffffff9c] border-white rounded-lg px-3 justify-center items-center">
          <input
            type={visiblePassword.value ? "text" : "password"}
            ref={password}
            class=" rounded-lg w-full py-2 bg-transparent outline-none "
          >
          </input>
          <button
            type="button"
            onClick={() => visiblePassword.value = !visiblePassword.value}
            class="h-full w-7 flex justify-center items-center"
          >
            {!visiblePassword.value
              ? <Icon id="Eye" size={24} />
              : <Icon id="EyeOff" size={24} />}
          </button>
        </div>
        {!inputPassword.value && (
          <span class="text-xs text-red-600">
            Preencha senha corretamente *
          </span>
        )}
        <ButtonCustom
          label="Login"
          colorText="#00000"
          background="#66F5A7"
          action={login}
        />
      </form>
      {modalstatus.value === "loading" && <Loading />}
    </>
  );
}
