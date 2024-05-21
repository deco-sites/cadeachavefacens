export interface Sala {
  nome: string;
  id: number;
  aberta: boolean;
  ativo: boolean;
}

export interface Props {
  token: string;
  nome: string;
  abriu: boolean;
  ativo: boolean;
}

const loader = async (props: Props): Promise<Sala[] | null> => {
  console.log("props", props);

  const { nome, abriu, ativo } = props;

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

  let stringUrl = "";

  arrayCot.map((cont, index) => {
    const condicao = index === 0 ? "?" : "&";

    stringUrl += condicao + cont;
  });

  console.log("string", stringUrl)
   
  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/sala/nomeComEAberta${stringUrl}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
  }).then((r) => r.json()).catch((r) => console.log("error", r));

  console.log("response", response);

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

  return arraySala;
};

export default loader;
