import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import { signal, useSignal } from "@preact/signals";
import { useRef } from "preact/compat";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import { ChangeEvent } from "https://esm.sh/v128/preact@10.19.6/compat/src/index.js";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";

interface ProfessorCPFOrName {
  id?: number;
  nome: string;
  cpf: string;
}

export default function FormResultProfessores() {
  const valueProfessor = useSignal<ProfessorCPFOrName>({ nome: "", cpf: "" });
  const valueProfessores = useSignal<ProfessorCPFOrName[] | null>(null);
  const selectDivName = useSignal(false);
  const { professores, loading } = useUI();

  async function ApplyFilter() {
    const cookies = getCookie("token");
    loading.value = true;

    const res = await invoke.site.actions.Professor.getListProfessores({
      token: cookies,
      termo: valueProfessor.value.nome,
    }).then((r) => {
      return r;
    }).finally(() => {
      loading.value = false;
    });

    console.log("res", res);

    professores.value = res;
  }

  async function getResponseProfessores() {
    const cookies = getCookie("token");

    const res = await invoke.site.actions.Professor.getCpfOrName({
      token: cookies,
      termo: valueProfessor.value.nome,
    });

    console.log("res", res);

    valueProfessores.value = res;
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
    }
  }

  function ExitInput() {
    setTimeout(() => {
      selectDivName.value = false;
    }, 250);
  }

  function SelectOption(value: string, id: number) {
    valueProfessor.value.nome = value;
    valueProfessor.value.id = id;
    selectDivName.value = false;
  }

  async function ClearFilter() {
    valueProfessor.value.nome = "";

    const cookies = getCookie("token");
    const res = await invoke.site.actions.Professor["getListAllProfessores,"]({
      token: cookies,
    });

    console.log("clear");

    professores.value = res;
  }

  return (
    <div class="flex flex-col gap-2 col-span-1">
      <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg relative">
        <label class="font-semibold">
          Nome ou CPF:
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
                onClick={() => SelectOption(item.nome, item.id || 0)}
              >
                {item.nome}
              </button>
            ))}
          </div>
        )}
      </div>
      <div class="w-full flex flex-row gap-2 justify-center items-center">
        <button
          class="flex justify-center items-center px-3 py-3 text-white bg-[#69B1F2] rounded-lg w-2/4 text-xl gap-2"
          onClick={ApplyFilter}
        >
          Aplicar Filtros <Icon id="Search" size={24} />
        </button>
        <button
          class="flex justify-center items-center px-3 py-3 text-white bg-[#FFA800] rounded-lg w-2/4 text-xl gap-2"
          onClick={ClearFilter}
        >
          Limpar
          <Icon id="Plus" size={24} class="rotate-45" />
        </button>
      </div>
      <a
        href="/cadastro-professores"
        class="flex justify-center items-center px-3 py-3 text-white bg-[#66F5A7] rounded-lg w-full text-xl gap-2"
      >
        Cadastrar Professores
        <Icon id="PlusOctagon" size={24} />
      </a>
      <button class="flex justify-center items-center px-3 py-3 text-white bg-[#185C37] rounded-lg w-full text-xl">
        Gerar Excel
      </button>
    </div>
  );
}
