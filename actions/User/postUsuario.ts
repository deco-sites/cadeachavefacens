interface User {
  login: string;
  password: string;
  role: string;
  professor_id: number;
}

interface Props {
  token: string;
  user: User;
}

const loader = async (props: Props) => {
  const url = `https://cadeachave.onrender.com/api/user`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + props.token,
    },
    body: JSON.stringify(props.user),
  }).then((r) => r.json()).catch((r) => console.error("error", r));

  if (!response) {
    return null;
  }

  return response;
};

export default loader;
