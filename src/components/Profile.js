import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { setAlert } from '../actions/alert';
import { getUser, updateUser } from '../actions/user';
import Spinner from './layout/Spinner';

const Profile = ({ getUser, updateUser, user: { user, loading } }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		role: '',
		password: '',
		passwordCheck: ''
	});

	useEffect(() => {
		getUser();
		setFormData({
			name: loading || !user.name ? '' : user.name,
			email: loading || !user.email ? '' : user.email,
			role: loading || !user.role ? '' : user.role,
			password: loading || !user.password ? '' : user.password
		});
	}, [loading]);

	const { name, email, role, password, passwordCheck } = formData;
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if (password !== passwordCheck) {
			setAlert('Passwords do no match', 'danger');
		} else {
			updateUser({ name, email, role, password });
		}
	};

	return loading && user === null ? (
		<Spinner />
	) : (
		<Container className='main-content text-center'>
			<h2 className='large text-primary'>Profile</h2>
			<Form className='form' onSubmit={e => onSubmit(e)}>
				<FormGroup>
					<Input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={e => onChange(e)}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={e => onChange(e)}
						required
					/>
				</FormGroup>
				{user && user.role === 'Admin' && (
					<FormGroup>
						<Input type='select' name='role' value={role} onChange={e => onChange(e)} required>
							<option disabled value='' hidden>
								Select user role
							</option>
							<option value='Admin'>Admin</option>
							<option value='Worker'>Worker</option>
						</Input>
					</FormGroup>
				)}

				<FormGroup>
					<Input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						value={password}
						onChange={e => onChange(e)}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type='password'
						placeholder='Confirm Password'
						name='passwordCheck'
						minLength='6'
						value={passwordCheck}
						onChange={e => onChange(e)}
					/>
				</FormGroup>
				<Input type='submit' className='btn btn-info' value='Update Profile' />
			</Form>
		</Container>
	);
};

Profile.propTypes = {
	getUser: PropTypes.func.isRequired,
	updateUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	user: state.user
});

export default connect(
	mapStateToProps,
	{ getUser, updateUser }
)(Profile);
