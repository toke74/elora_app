import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from './authConstants';
import api from '../../app/common/util/api';
// import { reset } from 'redux-form';
import setAuthToken from '../../app/common/util/setAuthToken';
import { reset } from 'redux-form';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await api.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (values, history) => async (dispatch) => {
  try {
    const res = await api.post('/users', values);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    history.push('/');
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      console.log(errors);
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.errors,
      });
    }
  }
};

// Login User
export const login = (values, history) => async (dispatch) => {
  try {
    const res = await api.post('/auth', values);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
    dispatch(loadUser());
    history.push('/');
  } catch (err) {
    if (err.response) {
      console.log(err.response);
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.errors,
      });
    }
  }
};

// Logout
export const logout = (history) => (dispatch) => {
  dispatch({ type: LOGOUT });
  history.push('/login');
};

// Change User password
export const changePassword = (values) => async (dispatch) => {
  try {
    const res = await api.post('/users/change-password', values);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(reset('account'));
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.errors,
      });
      dispatch(reset('account'));
    }
  }
};
