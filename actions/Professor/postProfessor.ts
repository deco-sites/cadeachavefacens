interface Professor {
  nome: string;
  cpf: string;
  salas: number[] | null;
}

interface Props {
  token: string;
  professor: Professor;
}

const loader = async (props: Props): Promise<number | null> => {
  const url = `https://cadeachave.onrender.com/api/professor`;
  const professor: Professor = {
    nome: props.professor.nome,
    cpf: props.professor.cpf,
    salas: props.professor.salas,
  };

  console.log("profesor", professor);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
    body: JSON.stringify(professor),
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  console.log("response", response);

  if (!response) {
    return null;
  }

  return response.id;
};

export default loader;
