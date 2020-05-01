import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (author, title, url) => {
  const object = { author, title, url };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

export default { getAll, createNew };
