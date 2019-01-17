const ACTION = 'LOAD_USER';
const ACTION_REQUEST = `${ACTION}_REQUEST`;
const ACTION_SUCCESS = `${ACTION}_SUCCESS`;
const ACTION_ERROR = `${ACTION}_ERROR`;

const getUser = () => ({
  type: ACTION_REQUEST,
});

const actionSuccess = (data) => ({
  type: ACTION_SUCCESS,
  data
});

const actionError = (error) => ({
  type: ACTION_ERROR,
  error
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
        data: action.data || {},
      };
    default:
      return state;
  }
};

export { ACTION_REQUEST, getUser, actionSuccess, actionError };
