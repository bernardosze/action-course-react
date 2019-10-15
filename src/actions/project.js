import { GET_ALL_PROJECTS, GET_PROJECT, PROJECT_ERROR } from './types';
import { setAlert } from './alert';
import axios from 'axios';

// GET ALL PROJECTS
export const getAllProjects = () => async dispatch => {
	try {
		await axios.get('https://cerberus-backend.herokuapp.com/api/project').then(response => {
			dispatch({
				type: GET_ALL_PROJECTS,
				payload: response.data
			});
		});
	} catch (err) {
		dispatch({
			type: PROJECT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
}; //END: GET ALL PROJECTS

// GET PROJECT
export const getProject = id => async dispatch => {
	try {
		await axios.get(`https://cerberus-backend.herokuapp.com/api/project/${id}`).then(response => {
			dispatch({
				type: GET_PROJECT,
				payload: response.data
			});
		});
	} catch (err) {
		dispatch({
			type: PROJECT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
}; //END: GET PROJECT

// CREATE NEW PROJECT
export const createProject = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		await axios
			.post('https://cerberus-backend.herokuapp.com/api/project', formData, config)
			.then(response => {
				dispatch({
					type: GET_PROJECT,
					payload: response.data
				});
				dispatch(setAlert('Project Created!', 'success'));
			});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROJECT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
}; //END: UPDATE USER
