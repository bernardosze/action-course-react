import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	USER_LOADED,
	AUTH_ERROR
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

// LOAD USER
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		await axios.get('https://cerberus-backend.herokuapp.com/api/auth').then(response => {
			dispatch({
				type: USER_LOADED,
				payload: response.data
			});
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
}; //END: LOAD USER

// REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, email, password });
	try {
		await axios
			.post('https://cerberus-backend.herokuapp.com/api/user', body, config)
			.then(response => {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: response.data
				});

				dispatch(loadUser());
			});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL
		});
	}
}; //END: REGISTER USER

// LOGIN USER
export const login = ({ email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, password });
	try {
		await axios
			.post('https://cerberus-backend.herokuapp.com/api/auth', body, config)
			.then(response => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: response.data
				});

				dispatch(loadUser());
			});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: LOGIN_FAIL
		});
	}
}; //END: LOGIN USER

// LOGOUT
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
};
