import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { setAlert } from '../actions/alert';
import { getProject, createProject } from '../actions/project';
import Spinner from './layout/Spinner';

const EditProject = ({ createProject, user: { user, loading } }) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		address: '',
		city: '',
		province: '',
		status: ''
	});

	useEffect(() => {
		getProject();
		setFormData({
			name: loading || !user.name ? '' : user.name,
			email: loading || !user.email ? '' : user.email,
			role: loading || !user.role ? '' : user.role,
			password: loading || !user.password ? '' : user.password
		});
	}, [loading]);

	const { title, description, address, city, province, status } = formData;
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		createProject(formData);
	};

	return loading && user === null ? (
		<Spinner />
	) : (
		<Container className='main-content text-center'>
			<h2 className='large text-primary'>Project</h2>
			<Form className='form' onSubmit={e => onSubmit(e)}>
				<FormGroup>
					<Input
						type='text'
						placeholder='Title'
						name='title'
						value={title}
						onChange={e => onChange(e)}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type='text'
						placeholder='Description'
						name='description'
						value={description}
						onChange={e => onChange(e)}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type='text'
						placeholder='Address'
						name='address'
						value={address}
						onChange={e => onChange(e)}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type='text'
						placeholder='City'
						name='city'
						value={city}
						onChange={e => onChange(e)}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type='text'
						placeholder='Province'
						name='province'
						value={province}
						onChange={e => onChange(e)}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Input type='select' name='status' value={status} onChange={e => onChange(e)} required>
						<option disabled value='' hidden>
							Select the status
						</option>
						<option value='Planning'>Planning</option>
						<option value='Progress'>Progress</option>
						<option value='Done'>Done</option>
					</Input>
				</FormGroup>
				<Input type='submit' className='btn btn-info' value='Save Project' />
			</Form>
		</Container>
	);
};

EditProject.propTypes = {
	createProject: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(
	mapStateToProps,
	{ createProject }
)(EditProject);
