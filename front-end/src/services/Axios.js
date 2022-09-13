import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "http://localhost:3333",
  // baseURL: "http://192.168.137.1:3333",
});

instance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default instance;
