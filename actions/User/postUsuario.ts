interface User {
  login: string;
  password?: string;
  role: string;
}

interface Props {
  token: string;
  user: User;
}

const loader = async (props: Props): Promise<boolean> => {
  const url = `https://cadeachave-1715465469308.azurewebsites.net/api/user`;

  const response = await fetch(url, {
    method: "POST",
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
