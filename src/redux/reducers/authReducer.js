import ACTIONS from "../actions/";

const initialState = {
  student: [],
  isLogged: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_STUDENT:
      return {
        ...state,
        student: action.payload.student,
      };
    case ACTIONS.DELETE:
      return {
        ...state,
        student: [],
        isLogged: false,
      };
    default:
      return state;
  }
};

export default authReducer;
