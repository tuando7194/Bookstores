const ACTION = 'LOAD_BOOKS';
const ACTION_REQUEST = `${ACTION}_REQUEST`;
const ACTION_SUCCESS = `${ACTION}_SUCCESS`;
const ACTION_ERROR = `${ACTION}_ERROR`;
const DEL_BOOK_SUCCESS = 'DEL_BOOK_SUCCESS';
const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';

const loadBooks = () => ({
  type: ACTION_REQUEST,
});

const actionSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
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
    case DEL_BOOK_SUCCESS:
      const deletedBook = action.payload
      return {...state, data: state.data.filter(book => book._id !== deletedBook._id)};
    case UPDATE_BOOK_SUCCESS:
      const updatedBook = action.payload
      return {
        ...state,
        data: state.data.map(book => (book._id === updatedBook._id) ? updatedBook : book)
      };
    default:
      return state;
  }
};

export { ACTION_REQUEST, loadBooks, actionSuccess, actionError };
