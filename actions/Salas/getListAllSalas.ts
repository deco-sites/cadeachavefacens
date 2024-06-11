export interface Sala {
  nome: string;
  id: number;
  aberta: boolean;
  ativo: boolean;
}

export interface Response {
  totalPage: number;
  number: number;
  totalElements?: number;
  salas: Array<Sala>;
}

export interface Props {
  token: string;
}

const loader = async (props: Props): Promise<Response | null> => {
  const url = `https://cadeachave-1715465469308.azurewebsites.net/api/sala`;

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

  const arraySala: Sala[] = [];

  response.content?.map((item: Sala) => {
    arraySala.push({
      nome: item.nome,
      id: item.id,
      aberta: item.aberta,
      ativo: item.ativo,
    });
  });

  const data: Response = {
    totalPage: response.totalPages,
    number: response.number,
    salas: arraySala,
    totalElements: response.totalElements,
  };

  return data;
};

export default loader;
