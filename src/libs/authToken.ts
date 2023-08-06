import { useSession } from "next-auth/react";
const AuthToken = () => {
  const { data: session } = useSession();

  const token = session?.user.token ? session?.user.token : "";
  return { Authorization: token };
};
export default AuthToken;
