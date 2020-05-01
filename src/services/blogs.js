import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (author, title, url) => {
  const config = {
    headers: { Authorization: token }
  };
  const object = { author, title, url, likes: 0 };
  const response = await axios.post(baseUrl, object, config);
  return response.data;
};

const addLike = newObject => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return request.then(response => response.data);
};

const deleteBlog = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  if (request.includes("object")) {
    return null;
  } else {
    return request.then(response => response.data);
  }
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  };
  const object = { comment };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    object,
    config
  );
  return response.data;
};
// const deleteBlog = (id)
export default { getAll, createNew, setToken, addLike, deleteBlog, addComment };
