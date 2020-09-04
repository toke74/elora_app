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
import api from '../../app/common/util/api';
import { closeModal } from '../../app/modals/modalActions';
import { reset } from 'redux-form';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get('/posts/post');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post by Id
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Create post
export const createPost = (values, history) => async (dispatch) => {
  try {
    const res = await api.post('/posts', values);

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
    dispatch(reset('PostForm'));
    dispatch(closeModal());
    dispatch(getPosts());
    history.push('/');
  } catch (err) {
    console.log(err.response);
  }
};

// Update post
export const updatePost = (values, history) => async (dispatch) => {
  console.log(values);
  try {
    const res = await api.put(`/posts/${values._id}`, values);

    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
    dispatch(reset('PostForm'));
    dispatch(closeModal());
    dispatch(getPosts());
    history.push('/');
  } catch (err) {
    console.log(err.response);
  }
};

// Delete post
export const deletePost = (values) => async (dispatch) => {
  if (window.confirm('Are you sure, You want to delete this post ? ')) {
    try {
      const res = await api.delete(`/posts/${values}`);
      dispatch({
        type: DELETE_POST,
        payload: res.data,
      });
      dispatch(getPosts());
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.msg,
      });
    }
  }
};

// Add like on post
export const addLike = (id, history) => async (dispatch) => {
  try {
    const res = await api.put(`/likes/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
    dispatch(getPosts());
    dispatch(getPost(id));
  } catch (err) {
    history.push('/login');
    // if (err.response) {
    //   toastr.error('User not authorized, Please login');
    // }
  }
};

// Dislike posts
export const addDislike = (id, history) => async (dispatch) => {
  try {
    const res = await api.put(`/likes/dislike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
    dispatch(getPosts());
    dispatch(getPost(id));
  } catch (err) {
    history.push('/login');
  }
};

// Create comment
export const createComment = (id, newComment) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${id}`, newComment);

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data,
    });
    dispatch(getPost(id));
    dispatch(reset('ChatForm'));
  } catch (err) {
    if (err.response) {
      console.log(err.response.statusText);
    }
  }
};

// Delete Comment
export const deleteComment = (id, postId) => async (dispatch) => {
  try {
    const res = await api.delete(`/posts/comment/${id}`);
    console.log(res.data);
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
    dispatch(getPost(postId));
  } catch (err) {
    if (err.response) {
      console.log(err.response.data.msg);
    }
  }
};
