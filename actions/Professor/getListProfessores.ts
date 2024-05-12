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

export interface Props {
  token: string;
  termo: string;
}

const loader = async (props: Props): Promise<Professor[] | null> => {
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

  const arrayProfessores: Professor[] = [];
  const arraySalas: Sala[] = [];

  console.log("response ", response);

  response.content.map((item: Professor) => {
    item.salas.map((sala) => {
      arraySalas.push({
        nome: sala.nome,
        id: sala.id,
        aberta: sala.aberta,
        ativo: sala.ativo,
      });
    });

    arrayProfessores.push({
      id: item.id,
      nome: item.nome,
      cpf: item.cpf,
      salas: arraySalas,
    });
  });

  return arrayProfessores;
};

export default loader;