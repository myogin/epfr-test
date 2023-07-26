export default function authHeader() {
  let checkToken = localStorage.getItem("login") ? localStorage.getItem("login") : "";
  let tokenFix = null;
  if (checkToken) {
    let token = JSON.parse(checkToken);
    tokenFix = token.state.token;
  } else {
    tokenFix = `${process.env.NEXT_PUBLIC_KEY}`;
  }

  if (tokenFix) {
    return { Authorization: tokenFix };
  } else {
    return {};
  }
}
