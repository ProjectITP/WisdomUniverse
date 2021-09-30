import ACTIONS from "../actions/"

const initialState = {
    accounts: [],
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_STUDENTS:
            return {
                ...state,
                accounts: action.payload.students
            }
        default:
            return state
    }
}

export default studentReducer