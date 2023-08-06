import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.appURL}/api`,
});

export default instance;
