import { GET_USER, USER_ERROR } from './types';
import { setAlert } from './alert';
import axios from 'axios';

// GET USER
export const getUser = () => async dispatch => {
	try {
		await axios.get('https://cerberus-backend.herokuapp.com/api/user/me').then(response => {
			dispatch({
				type: GET_USER,
				payload: response.data
			});
		});
	} catch (err) {
		dispatch({
			type: USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// UPDATE USER
export const updateUser = ({ name, email, role, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, email, role, password });
	try {
		await axios
			.put('https://cerberus-backend.herokuapp.com/api/user', body, config)
			.then(response => {
				dispatch({
					type: GET_USER,
					payload: response.data
				});
				dispatch(setAlert('User Updated!', 'success'));
			});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
}; //END: UPDATE USER
