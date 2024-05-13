import ButtonCustom from "./ButtonCustom.tsx";
import Icon from "../ui/Icon.tsx";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import FlagSala from "../Cadastro/Flag.tsx";
import { signal, useSignal, useSignalEffect } from "@preact/signals";
import { ChangeEvent, useRef } from "preact/compat";

interface Sala {
  id?: number;
  nome: string;
  aberta?: boolean;
  ativo?: boolean;
}

export interface Professor {
  id: number;
  nome: string;
  cpf: string;
  salas: Sala[];
}

interface ProfessorPost {
  nome: string;
  cpf: string;
  salas: number[] | null;
}

export interface Props {
  title: string;
  inputName: string;
  inputCPF: string;
  inputPassword: string;
  inputConfirmePassword: string;
  inputClass: string;
}

interface User {
  login: string;
  password: string;
  role: string;
  professor_id: number;
}

export default function CadastroProfessores(props: Props) {
  const professor = useSignal<Professor | null>(null);
  const refName = useRef<HTMLInputElement | null>(null);
  const refCPF = useRef<HTMLInputElement | null>(null);
  const refSenha = useRef<HTMLInputElement | null>(null);
  const refConfirSenha = useRef<HTMLInputElement | null>(null);

  const validateName = useSignal(false);
  const validateCPF = useSignal(false);
  const validateSenha = useSignal(false);
  const validateConfirmSenha = useSignal(false);

  const listSalas = useSignal<Sala[] | null>(null);
  const listClassPost = useSignal<Sala[] | null>(null);

  const valueSala = useSignal<Sala>({ nome: "" });
  const selectDivSalas = useSignal(false);

  function ExitInput() {
    setTimeout(() => {
      selectDivSalas.value = false;
    }, 250);
  }

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

  async function getListSalas() {
    const cookies = document.cookie;

    console.log("foi aq");

    const res = await invoke.site.actions.Professor.getListSala({
      token: cookies,
      termo: valueSala.value.nome,
    });
    listSalas.value = res;

    console.log("res", listSalas.value, res);
  }

  function addClass(sala: Sala) {
    const array: Sala[] = [];

    listClassPost.value?.map((item) => {
      array.push({
        id: item.id || 0,
        nome: item.nome,
        aberta: item.aberta || true,
        ativo: item.ativo,
      });
    });

    array.push(sala);

    listClassPost.value = array;
  }

  function SelectOption(e: Event, value: string, id: number) {
    e.preventDefault();
    valueSala.value.nome = value;
    valueSala.value.id = id;
    selectDivSalas.value = false;
  }

  function getOptions(
    e: ChangeEvent<HTMLInputElement>,
  ) {
    e.preventDefault();

    selectDivSalas.value = true;

    if (e.currentTarget.value !== valueSala.value.nome) {
      valueSala.value.id = valueSala.value.nome == ""
        ? undefined
        : valueSala.value.id;
      valueSala.value.nome = e.currentTarget.value;
      setTimeout(getListSalas, 500);
    }
  }

  function removeFlag(sala: Sala) {
    // Encontre o índice do item que você deseja remover
    const array = listClassPost.value || [];
    const index = array.findIndex((r) => r.nome == sala.nome);

    console.log("remove", index, array);

    // Verifique se o item foi encontrado
    if (index !== undefined) {
      // Remova o item usando o método splice
      array?.splice(index, 1);
    } else {
      console.log("Item não encontrado no array.");
    }

    listClassPost.value = [];
    listClassPost.value = array;
  }

  function postProfessor() {
    const cookies = document.cookie;

    // const resProfessor = invoke.site.actions.Professor.postProfessor({ token: cookies, professor:})
  }

  async function createProf() {
    const cookies = document.cookie;

    if (!refName.current?.value) {
      validateName.value = true;
    } else {
      validateName.value = false;
    }
    if (!refCPF.current?.value) {
      validateCPF.value = true;
    } else {
      validateCPF.value = false;
    }
    if (!refSenha.current?.value) {
      validateSenha.value = true;
    } else {
      validateSenha.value = false;
    }
    if (refConfirSenha.current?.value != refSenha.current?.value) {
      validateConfirmSenha.value = true;
    } else {
      validateConfirmSenha.value = false;
    }

    if (
      refCPF.current?.value && refName.current?.value &&
      refConfirSenha.current?.value
    ) {
      console.log("validate");

      const arrayIndex: number[] | null = [];

      if (listClassPost.value && listClassPost.value?.length > 0) {
        listClassPost.value.map((index) => {
          if (index.id) {
            arrayIndex.push(index.id);
          }
        });
      }

      const professor: ProfessorPost = {
        nome: refName.current.value,
        cpf: refCPF.current.value,
        salas: arrayIndex || null,
      };

      const res = await invoke.site.actions.Professor.postProfessor({
        token: cookies,
        professor: professor,
      });

      if (res) {
        const user: User = {
          login: professor.cpf,
          password: refConfirSenha.current.value,
          role: "USER",
          professor_id: await res,
        };
        const resUser = await invoke.site.actions.User.postUsuario({
          token: cookies,
          user: user,
        });

        console.log("user", resUser);
      }

      console.log("res", res);
    }
  }

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
          ref={refName}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
        >
        </input>
        {validateName.value && (
          <span class="text-xs text-red-600">
            Preencha o campo corretamente*
          </span>
        )}
        <span class="text-sm">
          {props.inputCPF}
        </span>
        <input
          type={"text"}
          value={professor.value?.cpf}
          ref={refCPF}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
        >
        </input>
        {validateCPF.value && (
          <span class="text-xs text-red-600">
            Preencha o campo corretamente*
          </span>
        )}
        <span class="text-sm">
          {props.inputPassword}
        </span>
        <input
          type={"text"}
          ref={refSenha}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
        >
        </input>
        {validateCPF.value && (
          <span class="text-xs text-red-600">
            Preencha o campo corretamente*
          </span>
        )}
        <span class="text-sm">
          {props.inputConfirmePassword}
        </span>
        <input
          type={"text"}
          ref={refConfirSenha}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
        >
        </input>
        {validateConfirmSenha.value && (
          <span class="text-xs text-red-600">As senhas estão incorretas*</span>
        )}
        <span class="text-sm">
          {props.inputClass}
        </span>
        <div class="flex flex-row h-10 w-full rounded-lg bg-[#EAEAEA] relative">
          <input
            type={"text"}
            class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
            value={valueSala.value.nome}
            onKeyUp={(e) => getOptions(e)}
            onBlur={ExitInput}
          >
          </input>
          <button class="min-w-10 bg-green-500 w-10 h-10 flex justify-center items-center rounded-lg text-white">
            <Icon
              id="Plus"
              size={24}
              onClick={() => addClass(valueSala.value)}
            />
          </button>
          {selectDivSalas.value && (
            <div class="absolute top-full rounded-lg bg-white flex flex-col gap-2 z-10 w-full items-start max-h-28 overflow-y-scroll">
              {listSalas.value?.map((item) => (
                <button
                  class="w-full h-auto px-2 py-1 hover:bg-[#1f70b8] hover:text-white text-start"
                  type={"button"}
                  onClick={() => addClass(item)}
                >
                  {item.nome}
                </button>
              ))}
            </div>
          )}
        </div>
        <div class="flex flex-row gap-2">
          {professor.value?.salas.map((sala) => (
            <FlagSala
              label={sala.nome}
              id={sala.id}
              action={() => removeFlag(sala)}
            />
          ))}
          {listClassPost.value?.map((sala) => (
            <FlagSala
              label={sala.nome}
              id={sala.id}
              action={() => removeFlag(sala)}
            />
          ))}
        </div>
        <ButtonCustom
          label="Cadastrar"
          background="#66F5A7"
          colorText="white"
          action={() => createProf()}
        />
      </div>
    </div>
  );
}
