interface Professor {
  id?: number;
  nome: string;
  cpf: string;
  salas: number[] | null;
  ativo: boolean;
}

interface Props {
  token: string;
  professor: Professor;
  id: number;
}

const loader = async (props: Props): Promise<Professor | null> => {
  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/professor/${props.id}`;
  const professor: Professor = {
    nome: props.professor.nome,
    cpf: props.professor.cpf,
    salas: props.professor.salas,
    ativo: props.professor.ativo,
  };

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
    body: JSON.stringify(professor),
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  if (!response) {
    return null;
  }

  return response;
};

export default loader;
