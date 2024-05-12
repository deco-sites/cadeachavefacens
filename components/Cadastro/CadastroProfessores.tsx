import ButtonCustom from "./ButtonCustom.tsx";
import Icon from "../ui/Icon.tsx";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import FlagSala from "../Cadastro/Flag.tsx";
import { signal, useSignal, useSignalEffect } from "@preact/signals";

interface Sala {
  id: number;
  nome: string;
  aberta: boolean;
  ativo: boolean;
}

export interface Professor {
  id: number;
  nome: string;
  cpf: string;
  salas: Sala[];
}

export interface User {
  id: string;
  login: string;
  password: string;
  role: string;
  ativo: boolean;
  professor: Professor;
}

export interface Props {
  title: string;
  inputName: string;
  inputCPF: string;
  inputPassword: string;
  inputConfirmePassword: string;
  inputClass: string;
}

export default function CadastroProfessores(props: Props) {
  const professor = useSignal<Professor | null>(null);

  async function getProfessor() {
    const path = globalThis.window.location.pathname;
    const pathSearch = "cadastro-professor";
    const cookies = document.cookie;

    if (path.includes(pathSearch)) {
      // Encontre a posição da string desejada
      const position = path.indexOf(pathSearch);

      // Verifique se a string foi encontrada
      if (position !== -1) {
        // Pegue o caractere depois da string
        const id = path[position + pathSearch.length + 1];

        const res = await invoke.site.actions.Professor.getProfesorId({
          token: cookies,
          id: id,
        });

        professor.value = res;

        console.log("professor", professor.value);
      } else {
        console.log("String não encontrada");
      }
    }
  }

  useSignalEffect(() => {
    getProfessor();
  });

  return (
    <div class="w-full h-full flex justify-center pt-6">
      <div class="rounded-2xl border shadow-xl p-2 gap-2 flex flex-col lg:min-w-[440px]">
        <h1 class="uppercase text-4xl text-center mb-3">{props.title}</h1>
        <span class="text-sm">
          {props.inputName}
        </span>
        <input
          type={"text"}
          value={professor.value?.nome}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
        >
        </input>
        <span class="text-sm">
          {props.inputCPF}
        </span>
        <input
          type={"text"}
          value={professor.value?.cpf}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
        >
        </input>
        <span class="text-sm">
          {props.inputPassword}
        </span>
        <input
          type={"text"}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
        >
        </input>
        <span class="text-sm">
          {props.inputConfirmePassword}
        </span>
        <input
          type={"text"}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
        >
        </input>
        <span class="text-sm">
          {props.inputClass}
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
          {professor.value?.salas.map((sala) => (
            <FlagSala label={sala.nome} id={sala.id} />
          ))}
        </div>
        <ButtonCustom
          label="Cadastrar"
          background="#66F5A7"
          colorText="white"
        />
      </div>
    </div>
  );
}
