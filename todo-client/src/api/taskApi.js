import axiosClient from "./axiosClient";

const taskApi = {
  getAll: () => axiosClient.get("/Tasks"),
  create: (data) => axiosClient.post("/Tasks", data),
  update: (id, data) => axiosClient.put(`/Tasks/${id}`, data),
  delete: (id) => axiosClient.delete(`/Tasks/${id}`),
};

export default taskApi;
