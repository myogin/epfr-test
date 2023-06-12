export default function authHeader() {
  let token = null;
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  } else {
    token = `${process.env.NEXT_PUBLIC_KEY}`;
  }
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
