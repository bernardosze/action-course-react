import { GET_CLOCKS, CLOCK_SUCCESS, CLOCK_FAIL } from './types';
import { setAlert } from './alert';
import axios from 'axios';

// GET ALL CLOCKS
export const getClocks = () => async dispatch => {
	try {
		await axios.get('https://cerberus-backend.herokuapp.com/api/clockout').then(response => {
			dispatch({
				type: GET_CLOCKS,
				payload: response.data
			});
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: CLOCK_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
}; //END: GET ALL CLOCKS

// GET ALL CLOCKS BY USER
export const getClocksByUser = () => async dispatch => {
	try {
		await axios.get('https://cerberus-backend.herokuapp.com/api/clockin').then(response => {
			dispatch({
				type: GET_CLOCKS,
				payload: response.data
			});
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: CLOCK_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
}; //END: GET ALL CLOCKS BY USER

// CLOCK IN
export const clockin = ({ project, type }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ project, type });
	try {
		await axios
			.post('https://cerberus-backend.herokuapp.com/api/clockin', body, config)
			.then(response => {
				dispatch({
					type: CLOCK_SUCCESS,
					payload: response.data
				});
				dispatch(setAlert('Clocked In Successful!', 'success'));
			});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: CLOCK_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
}; //END: CLOCK IN

// CLOCK OUT
export const clockout = ({ project, type }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ project, type });
	try {
		await axios
			.post('https://cerberus-backend.herokuapp.com/api/clockout', body, config)
			.then(response => {
				dispatch({
					type: CLOCK_SUCCESS,
					payload: response.data
				});
				dispatch(setAlert('Clocked Out Successful!', 'success'));
			});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: CLOCK_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
}; //END: CLOCK OUT
