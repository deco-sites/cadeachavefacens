import ButtonCustom from "./ButtonCustom.tsx";
import Icon from "../ui/Icon.tsx";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import FlagSala from "../Cadastro/Flag.tsx";
import { signal, useSignal, useSignalEffect } from "@preact/signals";
import { ChangeEvent, useRef } from "preact/compat";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import FlagStatus from "deco-sites/cadeachavefacens/components/Flags/FlagStatus.tsx";

interface Sala {
  id?: number;
  nome: string;
  aberta?: boolean;
  ativo?: boolean;
}

interface ProfessorPost {
  nome: string;
  cpf: string;
  salas: number[] | null;
  ativo: boolean;
}

export interface Props {
  title: string;
  inputName: string;
  inputCPF: string;
  inputPassword: string;
  inputConfirmePassword: string;
  inputClass: string;
}

export interface Professor {
  id?: number;
  nome: string;
  cpf: string;
  salas: Sala[] | undefined | null;
}

export interface User {
  professor_id: number;
  login: string;
  password: string;
  role: string;
  ative: boolean;
  professor: Professor;
  id: string;
}

interface UserPost {
  login: string;
  password?: string;
  role: string;
  ativo?: boolean;
  professor_id: number;
}

export default function CadastroProfessores(props: Props) {
  const professor = useSignal<User | null>(null);
  const refName = useRef<HTMLInputElement | null>(null);
  const refCPF = useRef<HTMLInputElement | null>(null);
  const refSenha = useRef<HTMLInputElement | null>(null);
  const refConfirSenha = useRef<HTMLInputElement | null>(null);
  const refUSER = useRef<HTMLInputElement | null>(null);
  const refADMIN = useRef<HTMLInputElement | null>(null);

  const validateName = useSignal(false);
  const validateCPF = useSignal(false);
  const validateSenha = useSignal(false);
  const validateConfirmSenha = useSignal(false);

  const listSalas = useSignal<Sala[] | null>(null);
  const listClassPost = useSignal<Sala[] | undefined | null>(null);

  const valueSala = useSignal<Sala>({ nome: "" });
  const selectDivSalas = useSignal(false);

  const toast = useSignal<boolean>(false);
  const status = useSignal<boolean>(false);

  const visiblePassword = useSignal<boolean>(false);
  const confirmPassword = useSignal<boolean>(false);

  const isEdit = useSignal(false);

  function ExitInput() {
    setTimeout(() => {
      selectDivSalas.value = false;
    }, 250);
  }

  async function getProfessor() {
    const path = globalThis.window.location.pathname;
    const pathSearch = "editar-professor";
    const cookies = getCookie("token");

    if (path.includes(pathSearch)) {
      isEdit.value = true;
      // Encontre a posição da string desejada
      const position = path.indexOf(pathSearch);

      // Verifique se a string foi encontrada
      if (position !== -1) {
        // Pegue o caractere depois da string
        const index = position + pathSearch.length;
        const id = path.substring(index);

        const res = await invoke.site.actions.Professor.getProfesorId({
          token: cookies,
          id: id,
        });

        professor.value = res;
        listClassPost.value = professor.value?.professor.salas;

        if (professor.value?.role == "USER") {
          refUSER.current!.checked = true;
        } else {
          refADMIN.current!.checked = true;
        }
      } else {
        isEdit.value = false;
      }
    }
  }

  async function getListSalas() {
    const cookies = getCookie("token");

    const res = await invoke.site.actions.Professor.getListSala({
      token: cookies,
      termo: valueSala.value.nome,
    });
    listSalas.value = res;
  }

  function addClass(sala: Sala) {
    const array: Sala[] = [];

    if (listClassPost.value?.find((r) => r.nome === sala.nome)) {
      return;
    }

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

    // Verifique se o item foi encontrado
    if (index !== undefined) {
      // Remova o item usando o método splice
      array?.splice(index, 1);
    }

    listClassPost.value = [];
    listClassPost.value = array;
  }

  function postProfessor() {
    const cookies = getCookie("token");

    // const resProfessor = invoke.site.actions.Professor.postProfessor({ token: cookies, professor:})
  }

  async function createProf() {
    const cookies = getCookie("token");

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
      !isEdit.value &&
      refCPF.current?.value && refName.current?.value &&
      refConfirSenha.current?.value
    ) {
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
        ativo: false,
      };

      const res = await invoke.site.actions.Professor.postProfessor({
        token: cookies,
        professor: professor,
      });

      if (res) {
        const user: User = {
          login: professor.cpf,
          password: refConfirSenha.current.value,
          role: refUSER.current?.checked ? "USER" : "ADMIN",
          ative: professor.ativo,
          professor_id: res,
          id: "",
          professor: {
            nome: professor.nome,
            cpf: professor.cpf,
            salas: listClassPost.value,
            id: res,
          },
        };
        const resUser = await invoke.site.actions.User.postUsuario({
          token: cookies,
          user: user,
        });

        if (resUser) {
          status.value = true;
          toast.value = true;
        } else {
          status.value = false;
        }
        toast.value = true;

        setTimeout(() => {
          toast.value = false;
        }, 2000);
      }
    } else if (
      isEdit.value && refCPF.current?.value && refName.current?.value &&
      refConfirSenha.current?.value
    ) {
      const arrayIndex: number[] | null = [];
      if (listClassPost.value && listClassPost.value?.length > 0) {
        listClassPost.value.map((index) => {
          if (index.id) {
            arrayIndex.push(index.id);
          }
        });
      }

      const professorPut: ProfessorPost = {
        nome: refName.current.value,
        cpf: refCPF.current.value,
        salas: arrayIndex || null,
        ativo: false,
      };

      const res = await invoke.site.actions.Professor.putProfessor({
        token: cookies,
        professor: professorPut,
        id: professor.value?.professor.id,
      });

      if (res) {
        const user: UserPost = {
          login: professorPut.cpf,
          password: refConfirSenha.current.value,
          role: refUSER.current?.checked && "USER" || "ADMIN",
          professor_id: res.id || professor.value?.professor_id || 0,
          ativo: true,
        };

        const resUser = await invoke.site.actions.User.putUsuario({
          token: cookies,
          user: user,
          id: professor.value?.id,
        });

        if (resUser) {
          status.value = true;
          toast.value = true;
        } else {
          status.value = false;
        }
        toast.value = true;

        setTimeout(() => {
          toast.value = false;
        }, 2000);
      }
    }
  }

  useSignalEffect(() => {
    getProfessor();
  });

  return (
    <div class="w-full h-full flex justify-center pt-6 pb-6 overflow-x-hidden relative">
      <FlagStatus
        show={toast.value}
        status={status.value}
        successLabel="Professor Editada com Sucesso"
        errorLabel="Falha. Tente novamente mais tarde"
      />
      <div class="rounded-2xl border shadow-xl p-2 gap-2 flex flex-col lg:min-w-[440px]">
        <h1 class="uppercase text-4xl text-center mb-3">{props.title}</h1>
        <span class="text-sm">
          {props.inputName}
        </span>
        <input
          type={"text"}
          value={professor.value?.professor.nome}
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
          value={professor.value?.professor.cpf}
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
        <div class="flex flex-row gap-2 bg-[#EAEAEA] rounded-lg px-2">
          <input
            type={visiblePassword.value ? "text" : "password"}
            ref={refSenha}
            class="outline-none bg-[#EAEAEA] h-10 w-full"
          >
          </input>
          <button
            onClick={() => visiblePassword.value = !visiblePassword.value}
            class="h-full w-7 flex justify-center items-center"
          >
            {!visiblePassword.value
              ? <Icon id="Eye" size={24} />
              : <Icon id="EyeOff" size={24} />}
          </button>
        </div>
        {validateSenha.value && (
          <span class="text-xs text-red-600">
            Preencha o campo corretamente*
          </span>
        )}
        <span class="text-sm">
          {props.inputConfirmePassword}
        </span>
        <div class="flex flex-row gap-2 bg-[#EAEAEA] rounded-lg px-2">
          <input
            type={confirmPassword.value ? "text" : "password"}
            ref={refConfirSenha}
            class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
          >
          </input>
          <button
            onClick={() => confirmPassword.value = !confirmPassword.value}
            class="h-full w-7 flex justify-center items-center"
          >
            {!confirmPassword.value
              ? <Icon id="Eye" size={24} />
              : <Icon id="EyeOff" size={24} />}
          </button>
        </div>
        {validateConfirmSenha.value && (
          <span class="text-xs text-red-600">As senhas estão incorretas*</span>
        )}
        <span>Tipo do usuario:</span>
        <div class="flex flex-row gap-2">
          <input
            type="radio"
            required
            ref={refADMIN}
            id="ADMIN"
            name="ROLE"
            value="ADMIN"
          />
          <label for="ADMIN">ADMIN</label>
          <input
            type="radio"
            required
            ref={refUSER}
            id="USER"
            name="ROLE"
            value="USER"
          />
          <label for="USER">USER</label>
        </div>
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
          {isEdit
            ? (
              <>
                {listClassPost.value?.map((sala) => (
                  <FlagSala
                    label={sala.nome}
                    id={sala.id}
                    action={() => removeFlag(sala)}
                  />
                ))}
              </>
            )
            : (
              <>
                {listClassPost.value?.map((sala) => (
                  <FlagSala
                    label={sala.nome}
                    id={sala.id}
                    action={() => removeFlag(sala)}
                  />
                ))}
              </>
            )}
        </div>
        <ButtonCustom
          label={isEdit.value ? "Salvar alterações" : "Cadastrar"}
          background="#66F5A7"
          colorText="white"
          action={() => createProf()}
        />
      </div>
    </div>
  );
}
