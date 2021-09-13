import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import students from "./StudentsReducer";

export default combineReducers({
  auth,
  token,
  students,
});
