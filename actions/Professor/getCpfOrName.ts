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
    `https://cadeachave-1715465469308.azurewebsites.net/api/professor/cpfOuNome?termo=${props.termo}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
  }).then((r) => {
    if (r.ok) {
      return r.json();
    } else {
      return null;
    }
  }).catch((r) => console.error("error", r));

  if (!response) {
    return null;
  }

  const arrayProfessores: ProfessorCPFOrName[] = [];

  response.content.map((item: ProfessorCPFOrName) => {
    arrayProfessores.push({ id: item.id, nome: item.nome, cpf: item.cpf });
  });

  return arrayProfessores;
};

export default loader;
