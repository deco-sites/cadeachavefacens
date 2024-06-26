export interface Props {
  token: string;
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
  const url =
    "https://cadeachave-1715465469308.azurewebsites.net/api/historico";

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

  const arrayHistoric: Historico[] = [];

  // deno-lint-ignore no-explicit-any
  response.content.map((item: any) => {
    arrayHistoric.push({
      sala: item.sala.nome,
      professor: item.professor.nome,
      horario: item.horario,
      aberto: item.abriu,
    });
  });

  const data: Response = {
    totalPage: response.totalPages,
    number: response.number,
    historico: arrayHistoric,
    totalElements: response.totalElements,
  };

  return data;
};

export default loader;
