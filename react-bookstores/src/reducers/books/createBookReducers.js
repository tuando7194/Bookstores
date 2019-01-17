const ACTION = 'CREATE_BOOK';
const ACTION_REQUEST = `${ACTION}_REQUEST`;
const ACTION_SUCCESS = `${ACTION}_SUCCESS`;
const ACTION_ERROR = `${ACTION}_ERROR`;

const createBook = (payload) => ({
  type: ACTION_REQUEST,
  payload
});

const actionSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload
});

const actionError = error => ({
  type: ACTION_ERROR,
  error,
});

export const initialState = {
  data: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REQUEST:
      return {
        ...state,
        data: false,
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export { ACTION_REQUEST, createBook, actionSuccess, actionError };
