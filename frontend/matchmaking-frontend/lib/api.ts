import { BACKEND_URL } from "./ENV";

const API = {
  LOGIN: `${BACKEND_URL}/user/login`,
  SIGNUP: `${BACKEND_URL}/user/signup`,
  DEV: `${BACKEND_URL}/dev`,
};

export default API;