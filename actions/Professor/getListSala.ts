export interface Sala {
  nome: string;
  id: number;
}

export interface Props {
  token: string;
  termo: string;
}

const loader = async (props: Props): Promise<Sala[] | null> => {
  const url = `https://cadeachave.onrender.com/api/sala/nomeCom/${props.termo}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  console.log("response", response);

  if (!response) {
    return null;
  }

  const arraySala: Sala[] = [];

  response.content?.map((item: Sala) => {
    arraySala.push({ nome: item.nome, id: item.id });
  });

  return arraySala;
};

export default loader;
