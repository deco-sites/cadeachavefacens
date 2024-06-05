export interface Props {
  token: string;
  dataInicial: string;
  dataFinal: string;
  professorId?: number;
  salaId?: number;
  abriu?: boolean;
  page?: number;
  totalElements?: number;
}

export interface Historico {
  sala: string;
  professor: string;
  horario: string;
  aberto: boolean;
}

export interface Response {
  totalPage: number;
  number: number;
  totalElements?: number;
  historico: Array<Historico>;
}

const loader = async (props: Props): Promise<Response | null> => {
  const { professorId, salaId, abriu, page, totalElements } = props;

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
  if (page) {
    arrayCot.push(`page=${page}`);
  }
  if (totalElements) {
    arrayCot.push(`size=${totalElements}`);
  }

  let stringUrl = "";

  arrayCot.map((cont, index) => {
    const condicao = index === 0 ? "?" : "&";

    stringUrl += condicao + cont;
  });

  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/historico/filtro/${props.dataInicial}/${props.dataFinal}${stringUrl}`;

  console.log("props", props, url);
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

  console.log("response", response);

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

  const data: Response = {
    totalPage: response.totalPages,
    number: response.number,
    historico: arrayHistorico,
    totalElements: response.totalElements,
  };

  return data;
};

export default loader;
