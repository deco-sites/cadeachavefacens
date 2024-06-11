export interface Sala {
  nome: string;
  aberta: boolean;
  ativo: boolean;
}

export interface Props {
  token: string;
  nome: string;
}

const loader = async (props: Props): Promise<number> => {
  const url = `https://cadeachave-1715465469308.azurewebsites.net/api/sala`;

  const sala: Sala = {
    nome: props.nome,
    aberta: true,
    ativo: true,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
    body: JSON.stringify(sala),
  }).then((r) => {
    console.log("return", r);
    return r;
  });

  return response.status;
};

export default loader;
