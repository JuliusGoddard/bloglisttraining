import axios from "axios";
const baseUrl = "/api/login";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login, getAll };
