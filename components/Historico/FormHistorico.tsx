import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import { ChangeEvent } from "https://esm.sh/v128/preact@10.19.6/compat/src/index.js";
import { signal, useSignal } from "@preact/signals";
import { useRef } from "preact/compat";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";

interface ProfessorCPFOrName {
  id?: number;
  nome: string;
  cpf: string;
}

export interface Sala {
  nome: string;
  id?: number;
}

export default function FormHistorico() {
  const valueProfessor = useSignal<ProfessorCPFOrName>({ nome: "", cpf: "" });
  const valueSala = useSignal<Sala>({ nome: "" });
  const valueSalas = useSignal<Sala[] | null>(null);
  const valueProfessores = useSignal<ProfessorCPFOrName[] | null>(null);
  const selectDivName = useSignal(false);
  const selectDivCPF = useSignal(false);
  const initialDate = useRef<HTMLInputElement>(null);
  const finalDate = useRef<HTMLInputElement>(null);
  const inputAbriu = useRef<HTMLInputElement>(null);
  const inputFechado = useRef<HTMLInputElement>(null);
  const abriu = useSignal<boolean | undefined>(undefined);
  const { historico } = useUI();

  const date = new Date();

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  let beforeMonth = currentMonth - 1;
  let beforeYear = currentYear;

  if (beforeMonth < 0) {
    beforeMonth = 11;
    beforeYear = currentYear - 1;
  }

  const beforeDate = new Date(beforeYear, beforeMonth);

  function formatarDataParaDate(dateS: string) {
    // Adiciona ":00" para representar os segundos
    const novaString = dateS + ":00";

    // Converte a string para o formato desejado
    const dataFormatada = novaString.replace("T", " ");

    return dataFormatada;
  }

  async function ApplyFilter() {
    const cookies = document.cookie;

    console.log(
      "date",
      valueProfessor.value.id,
      valueSala.value.id,
      abriu.value,
    );

    const iDate = formatarDataParaDate(initialDate.current!.value);
    const fDate = formatarDataParaDate(finalDate.current!.value);

    const res = await invoke.site.actions.Historico({
      token: cookies,
      professorId: valueProfessor.value?.id,
      salaId: valueSala.value?.id,
      abriu: abriu.value,
      dataInicial: iDate,
      dataFinal: fDate,
    });

    historico.value = res;
  }

  function formatarDataParaInput(date: Date) {
    const dia = ("0" + date.getDate()).slice(-2);
    const mes = ("0" + (date.getMonth() + 1)).slice(-2);
    const ano = date.getFullYear();
    const hora = ("0" + date.getHours()).slice(-2);
    const minutos = ("0" + date.getMinutes()).slice(-2);
    return ano + "-" + mes + "-" + dia + "T" + hora + ":" + minutos;
  }

  const currentDateIput = formatarDataParaInput(date);
  const beforeDateinput = formatarDataParaInput(beforeDate);

  async function getResponseProfessores() {
    const cookies = document.cookie;

    const res = await invoke.site.actions.Professor.getCpfOrName({
      token: cookies,
      termo: valueProfessor.value.nome,
    });

    valueProfessores.value = res;
  }

  async function getResponseSalas() {
    const cookies = document.cookie;

    const res = await invoke.site.actions.Professor.getListSala({
      token: cookies,
      termo: valueSala.value.nome,
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

      if (e.currentTarget.value !== valueProfessor.value?.nome) {
        valueProfessor.value.id = valueProfessor.value.nome == ""
          ? undefined
          : valueProfessor.value.id;
        valueProfessor.value.nome = e.currentTarget.value;
        setTimeout(getResponseProfessores, 500);
      }
    } else {
      selectDivCPF.value = type == "cpf" ? true : false;

      if (e.currentTarget.value !== valueSala.value.nome) {
        valueSala.value.id = valueSala.value.nome == ""
          ? undefined
          : valueSala.value.id;
        valueSala.value.nome = e.currentTarget.value;
        setTimeout(getResponseSalas, 500);
      }
    }
  }

  function SelectOption(value: string, id: number, type: "professor" | "cpf") {
    if (type == "professor") {
      valueProfessor.value.nome = value;
      valueProfessor.value.id = id;
      selectDivName.value = false;
    } else {
      valueSala.value.nome = value;
      valueSala.value.id = id;
      selectDivCPF.value = false;
    }
  }

  async function ClearFilter() {
    valueProfessor.value.nome = "";
    valueSala.value.nome = "";
    abriu.value = undefined;
    inputAbriu.current!.checked = false;
    inputFechado.current!.checked = false;

    const cookies = document.cookie;
    const res = await invoke.site.loaders.Historic.ClassHistoric({
      token: cookies,
    });

    historico.value = res;
  }

  return (
    <form class="flex flex-col gap-2 col-span-1">
      <div class="flex flex-row p-2 shadow-lg gap-2 rounded-lg">
        <div class="w-2/4">
          <label class="font-semibold">
            Horario Inicial
          </label>
          <input
            type="datetime-local"
            ref={initialDate}
            value={beforeDateinput}
            class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
          >
          </input>
        </div>
        <div class="w-2/4">
          <label class="font-semibold">
            Horario Final
          </label>
          <input
            type="datetime-local"
            ref={finalDate}
            value={currentDateIput}
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
          value={valueProfessor.value.nome}
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
                onClick={() =>
                  SelectOption(item.nome, item.id || 0, "professor")}
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
          value={valueSala.value.nome}
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
                onClick={() => SelectOption(item.nome, item.id || 0, "cpf")}
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
          <div>
            <input
              type="radio"
              id="Aberto"
              name="status"
              value="Aberto"
              class="hidden peer"
              ref={inputAbriu}
              onClick={() => {
                abriu.value = true;
              }}
            >
            </input>
            <label
              for="Aberto"
              class="text-black font-semibold px-3 py-2 rounded-lg bg-[#66F5A7] peer-checked:border-black peer-checked:border-2 peer-checked:text-white peer-checked:bg-[#1d9654] "
            >
              Aberto
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="Fechado"
              name="status"
              value="Fechado"
              class="hidden peer"
              ref={inputFechado}
              onClick={() => {
                abriu.value = false;
              }}
            >
            </input>
            <label
              for="Fechado"
              class="text-black font-semibold px-3 py-2 rounded-lg bg-[#ff0000] peer-checked:border-black peer-checked:border-2 peer-checked:text-white peer-checked:bg-[#9d2020] "
            >
              Fechado
            </label>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-row gap-2 justify-center items-center">
        <button
          type="button"
          class="flex justify-center items-center px-3 py-3 text-white bg-[#69B1F2] rounded-lg w-2/4 text-xl gap-2"
          onClick={ApplyFilter}
        >
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
