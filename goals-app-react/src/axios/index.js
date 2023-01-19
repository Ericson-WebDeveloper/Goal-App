import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5019",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

let token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : null;
instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default instance;
