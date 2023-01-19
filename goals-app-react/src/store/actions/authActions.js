import axios from "../../axios/index";

export const registerService = (user) => {
  return axios.post(`/api/auth/signin`, user);
  // if(response) {
  //      localStorage.setItem('user', JSON.stringify(response.data));
  // }
  // return response.data;
};

export const signinService = (user) => {
  return axios.post(`/api/auth/login`, user);
};
