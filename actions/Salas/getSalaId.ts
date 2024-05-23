export interface Sala {
  nome: string;
  id: number;
  aberta: boolean;
  ativo: boolean;
}

export interface Props {
  token: string;
  id: number;
}

const loader = async (props: Props): Promise<Sala | null> => {
  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/sala/${props.id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  console.log("responseSalas", response);

  if (!response) {
    return null;
  }

  return response;
};

export default loader;
