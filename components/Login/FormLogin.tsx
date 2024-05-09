import ButtonCustom from "../Cadastro/ButtonCustom.tsx";
import { useRef } from "preact/compat";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import { useSignal } from "@preact/signals";

export default function () {
  const user = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const inputUser = useSignal<boolean>(true);
  const inputPassword = useSignal<boolean>(true);

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
        const res = await invoke.site.actions.Login({
          user: userValue,
          password: passworValue,
        });

        if (res.message) {
          alert("Usuario ou senha incorretos");
        } else {
          console.log("token", res);
          token.value = res;
          document.cookie = res.token;
          window.location.pathname = "/historico";
        }
      }
    }
  }

  return (
    <form class="flex flex-col w-full h-full gap-2">
      <label class="text-white ">
        Usuario
      </label>
      <input
        type={"text"}
        name={"usuario"}
        ref={user}
        class=" rounded-lg border border-white w-full px-3 py-2 bg-[#ffffff9c]"
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
      <input
        type={"password"}
        ref={password}
        class=" rounded-lg border border-white w-full px-3 py-2 bg-[#ffffff9c]"
      >
      </input>
      {!inputPassword.value && (
        <span class="text-xs text-red-600">Preencha senha corretamente *</span>
      )}
      <ButtonCustom
        label="Login"
        colorText="#00000"
        background="#66F5A7"
        action={login}
      />
    </form>
  );
}
