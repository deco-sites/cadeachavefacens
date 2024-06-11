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
  nome: string;
  abriu?: boolean;
  ativo: boolean;
  size?: number;
}

const loader = async (props: Props): Promise<Response | null> => {
  const { nome, abriu, ativo, size } = props;

  const arrayCot: string[] = [];

  if (nome) {
    arrayCot.push(`nome=${nome}`);
  }
  if (abriu) {
    arrayCot.push(`aberta=${abriu}`);
  }
  if (!abriu) {
    arrayCot.push(`aberta=${abriu}`);
  }
  if (ativo) {
    arrayCot.push(`ativo=${ativo}`);
  }
  if (ativo == false) {
    arrayCot.push(`ativo=${ativo}`);
  }
  if (size) {
    arrayCot.push(`size=${size}`);
  }

  let stringUrl = "";

  arrayCot.map((cont, index) => {
    const condicao = index === 0 ? "?" : "&";

    stringUrl += condicao + cont;
  });

  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/sala/nomeComEAberta${stringUrl}`;

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
