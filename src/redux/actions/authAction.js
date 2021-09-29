import ACTIONS from "./index";
import axios from "axios";

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};
export const fetchStudent = async (token) => {
  const res = await axios.get("/student/profile", {
    headers: { Authorization: token },
  });
  return res;
};
export const dispatchGetStudent = (res) => {
  return {
    type: ACTIONS.GET_STUDENT,
    payload: {
      student: res.data,
    },
  };
};
export const dispatchDelete = (res) => {
  return {
    type: ACTIONS.DELETE,
  };
};
