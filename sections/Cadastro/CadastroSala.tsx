import ButtonCustom from "../../components/Cadastro/ButtonCustom.tsx";
import Icon from "../../components/ui/Icon.tsx";
import FlagSala from "./Flag.tsx";

export interface Props {
  title: string;
  input: string;
}

export default function CadastroSala(props: Props) {
  return (
    <div class="w-full h-full flex justify-center ">
      <div class="rounded-2xl border shadow-xl p-2 gap-4 flex flex-col lg:min-w-[440px]">
        <h1 class="uppercase text-4xl text-center">{props.title}</h1>
        <span class="text-sm">
          {props.input}
        </span>
        <div class="flex flex-row h-10 w-full rounded-lg bg-[#EAEAEA]">
          <input
            type={"text"}
            class="outline-none bg-[#EAEAEA] h-10 w-full rounded-l-lg px-2"
          >
          </input>
          <button class="min-w-10 bg-green-500 w-10 h-10 flex justify-center items-center rounded-lg text-white">
            <Icon id="Plus" size={24} />
          </button>
        </div>
        <div class="flex flex-row gap-2">
          <FlagSala label={"L24"} />
          <FlagSala label={"L24"} />
          <FlagSala label={"L24"} />
        </div>
        <ButtonCustom
          label="Salvar e Voltar"
          background="#FFA800"
          colorText="white"
        />
      </div>
    </div>
  );
}
