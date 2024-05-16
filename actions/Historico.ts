export interface Props {
  token: string;
  dataInicial: string;
  dataFinal: string;
  professorId?: number;
  salaId?: number;
  abriu?: boolean;
}

export interface Historico {
  sala: string;
  professor: string;
  horario: string;
  aberto: boolean;
}

const loader = async (props: Props): Promise<Historico[] | null> => {
  const { professorId, salaId, abriu } = props;

  const arrayCot: string[] = [];

  if (professorId) {
    arrayCot.push(`professorId=${professorId}`);
  }
  if (salaId) {
    arrayCot.push(`salaId=${salaId}`);
  }
  if (abriu) {
    arrayCot.push(`abriu=${abriu}`);
  }
  if (!abriu && abriu != undefined) {
    arrayCot.push(`abriu=${abriu}`);
  }

  let stringUrl = "";

  arrayCot.map((cont, index) => {
    const condicao = index === 0 ? "?" : "&";

    stringUrl += condicao + cont;
  });

  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/historico/filtro/${props.dataInicial}/${props.dataFinal} + ${stringUrl}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  if (!response) {
    return null;
  }

  const arrayHistorico: Historico[] = [];

  // deno-lint-ignore no-explicit-any
  response.content.map((item: any) => {
    arrayHistorico.push({
      sala: item.sala.nome,
      professor: item.professor.nome,
      horario: item.horario,
      aberto: item.abriu,
    });
  });

  return arrayHistorico;
};

export default loader;
