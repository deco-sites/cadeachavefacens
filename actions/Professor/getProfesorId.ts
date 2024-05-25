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
  salas: Sala[] | null;
}

export interface User {
  professor_id: number;
  login: string;
  password: string;
  role: string;
  ative: boolean;
  professor: Professor;
  id: string;
}

export interface Props {
  token: string;
  id: string;
}

const loader = async (props: Props): Promise<User | null> => {
  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/user/professor/${props.id}`;

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

  return response;
};

export default loader;
