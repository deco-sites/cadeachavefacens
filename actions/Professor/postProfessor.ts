interface Professor {
  nome: string;
  cpf: string;
  salas: number[] | null;
  ativo: boolean;
}

interface Props {
  token: string;
  professor: Professor;
}

const loader = async (props: Props): Promise<number | null> => {
  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/professor`;
  const professor: Professor = {
    nome: props.professor.nome,
    cpf: props.professor.cpf,
    salas: props.professor.salas,
    ativo: props.professor.ativo,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
    body: JSON.stringify(professor),
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  console.log(response);

  if (!response) {
    return null;
  }

  return response.id;
};

export default loader;
