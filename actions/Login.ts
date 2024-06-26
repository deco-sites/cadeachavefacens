export interface Props {
  user: string;
  password: string;
}

const login = async ({ user, password }: Props) => {
  const url =
    "https://cadeachave-1715465469308.azurewebsites.net/api/user/login";

  const obj = {
    login: user,
    password: password,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((r) => r.json());

  return response;
};

export default login;
