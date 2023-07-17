export default function authHeader() {
  let token = null;
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  } else {
    token = `${process.env.NEXT_PUBLIC_KEY}`;
  }

  console.log("Token: ",token);
  if (token) {
    return { Authorization: token };
  } else {
    return {};
  }
}
