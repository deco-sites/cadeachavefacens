import ButtonCustom from "../Cadastro/ButtonCustom.tsx";
import { useRef } from "preact/compat";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";

export default function () {
  const user = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const { token } = useUI();

  async function login() {
    const userValue = user.current?.value;
    const passworValue = password.current?.value;

    if (userValue != null && passworValue != null) {
      const res = await invoke.site.actions.Login({
        user: userValue,
        password: passworValue,
      });

      if (res.message.includes("returned null")) {
        console.log("not user")
      } else {
        console.log("token", res.message)
        token.value = res;
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
      <label class="text-white ">
        Senha:
      </label>
      <input
        type={"text"}
        ref={password}
        class=" rounded-lg border border-white w-full px-3 py-2 bg-[#ffffff9c]"
      >
      </input>
      <ButtonCustom
        label="Login"
        colorText="#00000"
        background="#66F5A7"
        action={login}
      />
    </form>
  );
}
