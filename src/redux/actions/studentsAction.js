import ACTIONS from "./index";
import axios from "axios";

export const fetchAllStudents = async (token) => {
  const res = await axios.get("/student/allstudents", {
    headers: { Authorization: token },
  });
  return res;
};
export const dispatchGetAllStudents = (res) => {
  return {
    type: ACTIONS.GET_ALL_STUDENTS,
    payload: {
      students: res.data,
    },
  };
};
