interface Sala {
  id: number;
  nome: string;
  aberta: boolean;
  ativo: boolean;
}

export interface Professor {
  id: number;
  nome: string;
  cpf: string;
  salas: Sala[];
}

export interface User {
  id: string;
  login: string;
  password: string;
  role: string;
  ative: boolean;
  professor: Professor;
}

export interface Props {
  token: string;
  id: string;
}

const loader = async (props: Props): Promise<Professor | null> => {
  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/professor/${props.id}`;

  const response: Professor = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  if (!response) {
    return null;
  }

  return response;
};

export default loader;
