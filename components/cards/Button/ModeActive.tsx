import Icon from "deco-sites/cadeachavefacens/components/ui/Icon.tsx";
import { getCookie } from "deco-sites/cadeachavefacens/sdk/useCookies.ts";
import { invoke } from "deco-sites/cadeachavefacens/runtime.ts";
import { useSignal } from "@preact/signals";
import { identity } from "deco/utils/object.ts";
import ModalConfirm from "deco-sites/cadeachavefacens/components/Modal/ModalConfirm.tsx";
import Loading from "deco-sites/cadeachavefacens/components/Modal/Loading.tsx";

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
  const modal = useSignal<boolean>(false);
  const modalstatus = useSignal<"loading" | null>(null);

  const sala = useSignal<Sala>({
    id: id,
    ativo: ativo,
    aberta: aberto,
    nome: nome,
  });
  const active = useSignal(ativo);

  async function putSala(salaO: Sala) {
    modalstatus.value = "loading";
    const { id, ativo, aberta, nome } = salaO;
    const cookies = getCookie("token");

    const res = await invoke.site.actions.Salas.putSala({
      token: cookies,
      id: id,
      ativo: !ativo,
      aberto: aberta,
      nome: nome,
    }).then((r) => {
      return r;
    }).finally(() => {
      modalstatus.value = null;
      modal.value = false;
    });

    if (res && typeof res === "object") {
      active.value = res?.ativo || false;
      sala.value.ativo = res?.ativo || false;
    }
  }

  return (
    <>
      <button
        class=" font-semibold px-1 py-1 rounded-lg text-white cursor-pointer"
        style={{ background: active.value ? "#FF0000" : "#7ffc36" }}
        onClick={() => modal.value = true}
      >
        {active.value
          ? <Icon id="Ban" size={24} />
          : <Icon id="Check" size={24} />}
      </button>
      {modal.value && modalstatus.value === null &&
        (
          <ModalConfirm
            title={active.value
              ? "Deseja Desativar a Sala:"
              : "Deseja Ativar a Sala:"}
            name={sala.value.nome}
            buttonYes={() => putSala(sala.value)}
            buttonNot={() => modal.value = false}
          />
        )}
      {modalstatus.value === "loading" && <Loading />}
    </>
  );
}
