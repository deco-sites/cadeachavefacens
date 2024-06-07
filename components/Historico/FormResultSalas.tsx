import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import { signal, useSignal } from "@preact/signals";
import {
  ChangeEvent,
  useRef,
} from "https://esm.sh/v128/preact@10.19.6/compat/src/index.js";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useUI } from "deco-sites/cadeachavefacens/sdk/useUI.ts";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.2/package/xlsx.mjs";

export interface Sala {
  nome: string;
  id?: number;
}

export default function FormResultSalas() {
  const inputAbriu = useRef<HTMLInputElement>(null);
  const inputFechado = useRef<HTMLInputElement>(null);
  const abriu = useSignal<boolean>(false);
  const selectDivSalas = useSignal(false);
  const valueSalas = useSignal<Sala[] | null>(null);
  const valueSala = useSignal<Sala>({ nome: "" });

  const { salas, loading } = useUI();

  async function getResponseSalas() {
    const cookies = getCookie("token");

    const res = await invoke.site.actions.Professor.getListSala({
      token: cookies,
      termo: valueSala.value.nome,
    }).then((r) => {
      return r;
    }).finally(() => {
    });

    valueSalas.value = res;
  }

  function SelectOption(value: string, id: number) {
    valueSala.value.nome = value;
    valueSala.value.id = id;
    selectDivSalas.value = false;
  }

  function ExitInput() {
    setTimeout(() => {
      selectDivSalas.value = false;
    }, 250);
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
      setTimeout(getResponseSalas, 500);
    }
  }

  async function ApplyFilter() {
    const cookies = getCookie("token");

    loading.value = true;
    const res = await invoke.site.actions.Salas.getListSalas({
      token: cookies,
      nome: valueSala.value.nome,
      abriu: abriu.value,
    });
    loading.value = false;

    salas.value = res;
  }

  async function exportTable() {
    const cookies = getCookie("token");

    const res = await invoke.site.actions.Salas.getListAllSalas({
      token: cookies,
    });

    // Cria uma tabela
    const data = [
      ["ID", "Nome", "Ativo", "Aberto"],
    ];

    if (res) {
      res.forEach((item) => {
        data.push([
          item.id.toString(),
          item.nome,
          item.ativo.valueOf().toString(),
          item.aberta.valueOf().toString(),
        ]);
      });
    }

    //Criar a planilha
    const ws = XLSX.utils.aoa_to_sheet(data);

    //Criar o arquivo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salas");

    //Exportar o arquivo
    XLSX.writeFile(wb, "Salas.xlsx");
  }

  return (
    <div class="flex flex-col gap-2 col-span-1">
      <h2 class="text-3xl font-semibold">Filtro de Salas:</h2>
      <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg relative">
        <label class="font-semibold">
          Nome:
        </label>
        <input
          type={"text"}
          class="outline-none bg-[#EAEAEA] h-10 w-full rounded-lg px-2"
          value={valueSala.value.nome}
          onKeyUp={(e) => getOptions(e)}
          onBlur={ExitInput}
        >
        </input>
        {selectDivSalas.value && (
          <div class="absolute top-full rounded-lg bg-white flex flex-col gap-2 z-10 w-full items-start">
            {valueSalas.value?.map((item) => (
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
      <div class="flex flex-col p-2 shadow-lg gap-2 rounded-lg">
        <label class="font-semibold">
          Ação:
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
      <a
        href="/cadastro-sala"
        class="flex justify-center items-center px-3 py-3 text-white bg-[#66F5A7] rounded-lg w-full text-xl gap-2"
      >
        Cadastrar Sala
        <Icon id="Door" size={24} />
      </a>
      <button
        onClick={() => exportTable()}
        class="flex justify-center items-center px-3 py-3 text-white bg-[#185C37] rounded-lg w-full text-xl"
      >
        Gerar Excel
      </button>
    </div>
  );
}
