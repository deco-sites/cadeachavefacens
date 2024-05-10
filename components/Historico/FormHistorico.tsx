import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import { ChangeEvent } from "https://esm.sh/v128/preact@10.19.6/compat/src/index.js";
import { signal, useSignal } from "@preact/signals";

interface ProfessorCPFOrName {
  id: number;
  nome: string;
  cpf: string;
}

export interface Sala {
  nome: string;
  id: number;
}

export default function FormHistorico() {
  const valueProfessor = useSignal<string>("");
  const valueSala = useSignal<string>("");
  const valueSalas = useSignal<Sala[] | null>(null);
  const valueProfessores = useSignal<ProfessorCPFOrName[] | null>(null);
  const selectDivName = useSignal(false);
  const selectDivCPF = useSignal(false);

  async function getResponseProfessores() {
    const cookies = document.cookie;

    const res = await invoke.site.actions.Professor.getCpfOrName({
      token: cookies,
      termo: valueProfessor.value,
    });

    valueProfessores.value = res;
  }

  async function getResponseSalas() {
    const cookies = document.cookie;

    const res = await invoke.site.actions.Professor.getListSala({
      token: cookies,
      termo: valueSala.value,
    });

    valueSalas.value = res;
  }

  function ExitInput() {
    setTimeout(() => {
      selectDivName.value = false;
      selectDivCPF.value = false;
    }, 250);
  }

  function getOptions(
    e: ChangeEvent<HTMLInputElement>,
    type: "professor" | "cpf",
  ) {
    e.preventDefault();

    if (type == "professor") {
      selectDivName.value = type == "professor" ? true : false;

      if (e.currentTarget.value !== valueProfessor.value) {
        valueProfessor.value = e.currentTarget.value;
        setTimeout(getResponseProfessores, 500);
      }
    } else {
      selectDivCPF.value = type == "cpf" ? true : false;

      if (e.currentTarget.value !== valueSala.value) {
        valueSala.value = e.currentTarget.value;
        setTimeout(getResponseSalas, 500);
      }
    }
  }

  function SelectOption(value: string, type: "professor" | "cpf") {
    if (type == "professor") {
      valueProfessor.value = value;
      selectDivName.value = false;
    } else {
      valueSala.value = value;
      selectDivCPF.value = false;
    }
  }

  return (
    <form class="flex flex-col gap-2 col-span-1">
      <div class="flex flex-row p-2 shadow-lg gap-2 rounded-lg">
        <div class="w-2/4">
          <label class="font-semibold">
            Horario Inicial
          </label>
          <input
            type={"text"}
            class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
          >
          </input>
        </div>
        <div class="w-2/4">
          <label class="font-semibold">
            Horario Final
          </label>
          <input
            type={"text"}
            class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
          >
          </input>
        </div>
      </div>
      <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg relative">
        <label class="font-semibold">
          Professor:
        </label>
        <input
          type={"text"}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
          value={valueProfessor.value}
          onKeyUp={(e) => getOptions(e, "professor")}
          onBlur={ExitInput}
        >
        </input>
        {selectDivName.value && (
          <div class="absolute top-full rounded-lg bg-white flex flex-col gap-2 z-10 w-full items-start">
            {valueProfessores.value?.map((item) => (
              <button
                class="w-full h-auto px-2 py-1 hover:bg-[#1f70b8] hover:text-white text-start"
                type={"button"}
                onClick={() => SelectOption(item.nome, "professor")}
              >
                {item.nome}
              </button>
            ))}
          </div>
        )}
      </div>
      <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg relative">
        <label class="font-semibold">
          Salas:
        </label>
        <input
          type={"text"}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
          value={valueSala.value}
          onKeyUp={(e) => getOptions(e, "cpf")}
          onBlur={ExitInput}
        >
        </input>
        {selectDivCPF.value && (
          <div class="absolute top-full rounded-lg bg-white flex flex-col gap-2 z-10 w-full items-start">
            {valueSalas.value?.map((item) => (
              <button
                class="w-full h-auto px-2 py-1 hover:bg-[#1f70b8] hover:text-white text-start"
                type={"button"}
                onClick={() => SelectOption(item.nome, "cpf")}
              >
                {item.nome}
              </button>
            ))}
          </div>
        )}
      </div>
      <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg">
        <label class="font-semibold">
          Status:
        </label>
        <div class="flex flex-row gap-2 py-3">
          <button class="text-black font-semibold px-3 py-2 rounded-lg bg-[#66F5A7]">
            Aberto
          </button>
          <button class="text-black font-semibold px-3 py-2 rounded-lg bg-[#FF0000]">
            Fechado
          </button>
        </div>
      </div>
      <div class="w-full flex flex-row gap-2 justify-center items-center">
        <button class="flex justify-center items-center px-3 py-3 text-white bg-[#69B1F2] rounded-lg w-2/4 text-xl gap-2">
          Aplicar Filtros <Icon id="Search" size={24} />
        </button>
        <button class="flex justify-center items-center px-3 py-3 text-white bg-[#FFA800] rounded-lg w-2/4 text-xl gap-2">
          Limpar
          <Icon id="Plus" size={24} class="rotate-45" />
        </button>
      </div>
      <button class="flex justify-center items-center px-3 py-3 text-white bg-[#185C37] rounded-lg w-full text-xl">
        Gerar Excel
      </button>
    </form>
  );
}
