interface User {
  login: string;
  password?: string | null;
  role: string;
  ativo?: boolean;
  professor_id: number;
}

interface Props {
  token: string;
  user: User;
  id: string;
}

const loader = async (props: Props) => {
  const url =
    `https://cadeachave-1715465469308.azurewebsites.net/api/user/${props.id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
    body: JSON.stringify(props.user),
  }).then((r) => {
    return r.ok;
  });

  return response;
};

export default loader;
