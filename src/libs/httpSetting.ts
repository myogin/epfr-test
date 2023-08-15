import axios from "axios";

export default axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
  },
  httpsAgent: {
    rejectUnauthorized: false,
  }, // (NOTE: this will disable client verification)
});
