export interface Sala {
  nome: string;
  aberta: boolean;
  ativo: boolean;
  id: number;
}

export interface Props {
  token: string;
  nome: string;
  id: number;
  aberto: boolean;
  ativo: boolean;
}

const loader = async (props: Props): Promise<Sala | null | string> => {
  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/sala/${props.id}`;

  const sala: Omit<Sala, "id"> = {
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

  if (!response) {
    return null;
  } else if (response.message) {
    console.log("message", response.message);
    return response.message;
  }

  return response;
};

export default loader;
