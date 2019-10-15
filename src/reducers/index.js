import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import project from './project';
import clock from './clock';

export default combineReducers({
	alert,
	auth,
	user,
	project,
	clock
});
