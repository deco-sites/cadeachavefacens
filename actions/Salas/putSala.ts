export interface Sala {
  nome: string;
  aberta: boolean;
  ativo: boolean;
  id?: number;
}

export interface Props {
  token: string;
  nome: string;
  id: number;
  aberto: boolean;
  ativo: boolean;
}

const loader = async (props: Props): Promise<Sala | null> => {
  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/sala/${props.id}`;

  const sala: Sala = {
    nome: props.nome,
    aberta: props.aberto,
    ativo: props.ativo,
  };

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
    body: JSON.stringify(sala),
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  console.log("response", response, sala);

  if (!response) {
    return null;
  }

  return response;
};

export default loader;
