import { create } from "apisauce";

const apiClient = create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default apiClient;
