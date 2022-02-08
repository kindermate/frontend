import axios from "axios";

export const getUserInfo = () => {
  return axios.get("/json/userInfo.json");
};

export const getRecentMission = () => {
  return axios.get("/json/recentMission.json");
};
