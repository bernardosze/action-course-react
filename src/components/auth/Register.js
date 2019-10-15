import React, { useState } from 'react';
import { Container, Form, FormGroup, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		passwordCheck: ''
	});

	const { name, email, password, passwordCheck } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if (password !== passwordCheck) {
			setAlert('Passwords do no match', 'danger');
		} else {
			register({ name, email, password });
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Container className='main-content text-center'>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Create Your Account
			</p>
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
				<Input type='submit' className='btn btn-info' value='Register' />
			</Form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</Container>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ setAlert, register }
)(Register);
