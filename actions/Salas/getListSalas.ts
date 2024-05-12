export interface Sala {
  nome: string;
  id: number;
  aberto: boolean;
  ativo: boolean;
}

export interface Props {
  token: string;
  nome: string;
  abriu: boolean;
}

const loader = async (props: Props): Promise<Sala[] | null> => {
  console.log("props", props);

  const url =
    `https://cadeachave.onrender.com/api/nome/${props.nome}/${props.abriu}`;

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
      aberto: item.aberto,
      ativo: item.ativo,
    });
  });

  return arraySala;
};

export default loader;