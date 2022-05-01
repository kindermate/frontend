import axios from 'axios';
import { setInterceptors } from './interceptors';

const createInstance = () => {
  const instance = axios.create();
  instance.defaults.baseURL = process.env.VUE_APP_API_URL;
  instance.defaults.withCredentials = true;
  return setInterceptors(instance);
};

const instance = createInstance();

export const getUserInfo = () => {
  return axios.get('/json/userInfo.json');
};

export const getRecentMission = id => {
  return instance.get(`/missions/recent/${id}`);
};

// user
export const join = payload => {
  return instance.post('/users/join', payload);
};

export const login = payload => {
  return instance.post('/users/login', payload);
};

export const getCurrentUser = () => {
  return instance.get('/users');
};

export const checkPassword = payload => {
  return instance.post('/users/check-password', payload);
};

export const checkUsername = username => {
  return instance.get(`/users/check-username?username=${username}`);
};

export const updateUserInfo = payload => {
  return instance.put(`/users/${payload.id}`, payload);
};

export const changePassword = payload => {
  return instance.put(`/users/change-password/${payload.id}`, payload);
};

// account
export const findUsernameWithEmail = email => {
  return instance.get(`/users/find-username/${email}`);
};

export const resetPasswordWithEmail = email => {
  return instance.get(`/users/reset-password/${email}`);
};

// member
export const getMemberAll = id => {
  return instance.get(`/members/${id}`);
};

export const createMember = payload => {
  return instance.post('/members/create', payload);
};

export const updateMember = payload => {
  return instance.put('/members', payload);
};

export const deleteMember = id => {
  return instance.delete(`/members/${id}`);
};

// test
export const getTestInfo = payload => {
  return instance.get(`/tests/${payload}`);
};

export const getQuestion = payload => {
  return instance.get(`/tests/questions/${payload}`);
};

export const createAnswer = payload => {
  return instance.post('/tests/answer', payload);
};

// result
export const getResultAll = id => {
  return instance.get(`/results/${id}`);
};

export const getCommentary = payload => {
  return instance.get(`/commentary?${payload}`);
};

// mission
export const getMembersWithMissions = id => {
  return instance.get(`/missions/${id}`);
};

export const getMissionInfo = payload => {
  return instance.get(
    `/missions/weeks?code=${payload.code ? payload.code : ''}&week=${payload.week}&grade=${payload.grade}`,
  );
};

export const updateMissionWeek = id => {
  return instance.put(`/missions/next/${id}`);
};

export const missionComplete = id => {
  return instance.put(`/missions/${id}`);
};

export const getMessage = score => {
  return instance.get(`/missions/message/${score}`);
};

export const getMemoAll = payload => {
  return instance.get(`/memos?mission=${payload.id}&week=${payload.week}`);
};

export const getMemoOne = id => {
  return instance.get(`/memos/${id}`);
};

export const createMemo = payload => {
  return instance.post('/memos', payload);
};

export const updateMemo = payload => {
  return instance.put('/memos', payload);
};

export const deleteMemo = id => {
  return instance.delete(`/memos/${id}`);
};

export const getRating = payload => {
  return instance.get(`/ratings?mission=${payload.mission}&week=${payload.week}`);
};

export const sendRating = payload => {
  return instance.post('/ratings', payload);
};

// post
export const getPostAll = payload => {
  return instance.get(`/posts?${payload}`);
};

export const getPost = id => {
  return instance.get(`/posts/${id}`);
};

// guide
export const getGuides = payload => {
  return instance.get(`/guides?CTT=${payload}`);
};
