interface User {
  login: string;
  password?: string;
  role: string;
  professor_id: number;
  ativo?: boolean;
}

interface Props {
  token: string;
  user: User;
  id: number;
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
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  console.log("put", response);

  if (!response) {
    return null;
  }

  return response.id;
};

export default loader;
