import ACTIONS from "../actions/";

const initialState = {
  students: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_STUDENTS:
      return {
        ...state,
        students: action.payload.students,
      };
    default:
      return state;
  }
};

export default studentReducer;
