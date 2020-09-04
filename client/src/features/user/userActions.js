import {
  GET_PROFILE,
  CREATE_PROFILE,
  FOLLOW_USER,
  GET_PROFILES,
  GET_NOTIFICATIONS,
  MARK_NOTIFICATION_READ,
} from './userConstants';
import { toastr } from 'react-redux-toastr';
import api from '../../app/common/util/api';
import { loadUser } from '../auth/authActions';

// Get  users profile by id
export const getUserProfileById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      toastr.error(`${err.response}`);
    }
  }
};
// Get  users profile by id
export const getAllProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      toastr.error(`${err.response}`);
    }
  }
};

// Create or update profile
export const createProfile = (values) => async (dispatch) => {
  try {
    const res = await api.post('/profile', values);
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
    toastr.success('Profile updated Successfully');
    if (res.data) {
      dispatch(getUserProfileById(res.data.user));
    }
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      toastr.error(`${err.response.data.msg}`);
    }
  }
};

// Follow  user
export const followUser = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await api.put(`/profile/follow/${id}`);

    dispatch({
      type: FOLLOW_USER,
      payload: res.data,
    });
    dispatch(getUserProfileById(id));
    dispatch(getAllProfile());
  } catch (err) {
    if (err.response) {
      console.log(err.response);
      toastr.error(`${err.response.statusText}`);
    }
  }
};

// Unfollow  user
export const unfollowUser = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await api.put(`/profile/unfollow/${id}`);

    dispatch({
      type: FOLLOW_USER,
      payload: res.data,
    });
    dispatch(getUserProfileById(id));
    dispatch(getAllProfile());
  } catch (err) {
    if (err.response) {
      console.log(err.response);
      toastr.error(`${err.response.statusText}`);
    }
  }
};

// Update user avatar
export const updateUserAvatar = (avatar) => async (dispatch) => {
  try {
    await api.post(
      '/users/img',
      JSON.stringify({
        avatar,
      })
    );

    toastr.success('Profile Image updated Successfully');
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      toastr.error(`${err.response.data.msg}`);
    }
  }
};

// set Main Photo
export const setMainPhoto = (avatar) => async (dispatch) => {
  try {
    await api.post(
      '/users/main',
      JSON.stringify({
        avatar,
      })
    );

    toastr.success('Profile Image updated setup');
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      toastr.error(`${err.response.data.msg}`);
    }
  }
};

//delete profile photo
export const deletePhoto = (avatar) => async (dispatch) => {
  try {
    await api.put(
      '/users',
      JSON.stringify({
        avatar,
      })
    );
    toastr.success('Photo seccussfully  deleted');
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      toastr.error(`${err.response.data.msg}`);
    }
  }
};

// Get users Notifications
export const getNotifications = () => async (dispatch) => {
  try {
    const res = await api.get('/notifications');
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      toastr.error(`${err.response}`);
    }
  }
};

export const markNotificationsRead = (notificationIds) => async (dispatch) => {
  try {
    await api.put('/notifications/markNotificationRead', notificationIds);
    dispatch({
      type: MARK_NOTIFICATION_READ,
    });
    dispatch(getNotifications());
  } catch (err) {
    if (err.response) {
      toastr.error(`${err.response}`);
    }
  }
};
