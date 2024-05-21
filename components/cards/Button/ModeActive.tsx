import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useSignal } from "@preact/signals";
import { identity } from "deco/utils/object.ts";

export interface Props {
  id: number;
  ativo: boolean;
  aberto: boolean;
  nome: string;
}

interface Sala {
  nome: string;
  id: number;
  aberta: boolean;
  ativo: boolean;
}

export default function ButtonActive({ id, ativo, aberto, nome }: Props) {
  const sala = useSignal<Sala>({
    id: id,
    ativo: ativo,
    aberta: aberto,
    nome: nome,
  });
  const active = useSignal(ativo);

  async function putSala(salaO: Sala) {
    const { id, ativo, aberta, nome } = salaO;
    const cookies = getCookie("token");

    const res = await invoke.site.actions.Salas.putSala({
      token: cookies,
      id: id,
      ativo: !ativo,
      aberto: aberta,
      nome: nome,
    });

    active.value = res?.ativo || false;
    sala.value.ativo = res?.ativo || false;
  }

  return (
    <button
      class=" font-semibold px-1 py-1 rounded-lg text-white cursor-pointer"
      style={{ background: active.value ? "#FF0000" : "#7ffc36" }}
      onClick={() => putSala(sala.value)}
    >
      {active.value
        ? <Icon id="Ban" size={24} />
        : <Icon id="Check" size={24} />}
    </button>
  );
}
