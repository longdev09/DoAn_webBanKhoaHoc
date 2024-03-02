import axios from "axios";

// tao base Url
const request = axios.create({
  baseURL: `https://localhost:44352/api`,
});

// khoi tao get dung chung api nhan vao url

// pt get
export const get = async (api) => {
  const response = await request.get(api);
  return response.data;
};

// pt post
export const post = async (api, data) => {
  const response = await request.post(api, data);
  return response.data;
};
// pt update

export const put = async (api, data) => {
  const response = await request.put(api, data);
  return response.data;
};

// pt delete
export const Delete = async (api, data) => {
  const response = await request.delete(api, data);
  return response.data;
};

export default request;
