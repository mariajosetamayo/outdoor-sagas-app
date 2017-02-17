import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth-reducer';
import appReducer from './app-reducers';

const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  app: appReducer
});

export default rootReducer;
