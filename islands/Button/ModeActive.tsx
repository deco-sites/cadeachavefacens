import Component from "deco-sites/cadeachavefacens/components/cards/Button/ModeActive.tsx";
import type { Props } from "deco-sites/cadeachavefacens/components/cards/Button/ModeActive.tsx";

export default function islands(props: Props) {
  return (
    <Component
      id={props.id}
      ativo={props.ativo}
      nome={props.nome}
      aberto={props.aberto}
    />
  );
}
