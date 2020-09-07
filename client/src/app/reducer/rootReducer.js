import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../../features/auth/authReducer';
import postReducer from '../../features/post/postReducer';
import modalReducer from '../modals/modalReducer';
import userReducer from '../../features/user/userReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  posts: postReducer,
  modals: modalReducer,
  profiles: userReducer,
});

export default rootReducer;
