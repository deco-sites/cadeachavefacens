export interface ProfessorCPFOrName {
  id: number;
  nome: string;
  cpf: string;
}

export interface Props {
  token: string;
  termo: string;
}

const loader = async (props: Props): Promise<ProfessorCPFOrName[] | null> => {
  const url =
    `https://cadeachave.onrender.com/api/professor/cpfOuNome/${props.termo}`;

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

  const arrayProfessores: ProfessorCPFOrName[] = [];

  console.log("response ", response);

  response.content.map((item: ProfessorCPFOrName) => {
    arrayProfessores.push({ id: item.id, nome: item.nome, cpf: item.cpf });
  });

  return arrayProfessores;
};

export default loader;
