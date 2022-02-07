import axios from "axios";

export const getUserInfo = () => {
  return axios.get("/json/userInfo.json");
};
