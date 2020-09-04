import {
  GET_POSTS,
  GET_POST,
  CREATE_POST,
  UPDATE_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from './postConstants';

const initialState = {
  posts: [],
  post: null,
  error: {},
  likes: {},
  comments: [],
  loading: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case UPDATE_POST:
    case CREATE_POST:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        likes: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    default:
      return state;
  }
}
