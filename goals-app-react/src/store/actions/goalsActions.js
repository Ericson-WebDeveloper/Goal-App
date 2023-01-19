import axios from "../../axios/index";

export const getGoalsService = () => {
  return axios.get("/api/goals");
};

export const postGoalsService = (goals) => {
  return axios.post("/api/goals", goals);
};

export const deleteGoalsService = (id) => {
  return axios.delete(`/api/goals/${id}`);
};
