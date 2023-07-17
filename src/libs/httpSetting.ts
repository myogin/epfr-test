import axios from "axios";

export default axios.create({
  // baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  baseURL: `http://localhost:8009/api/`,
  headers: {
    "Content-type": "application/json;multipart/form-data",
  }
});
