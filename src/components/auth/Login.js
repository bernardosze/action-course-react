import React, { useState } from 'react';
import { Container, Form, FormGroup, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async e => {
		e.preventDefault();
		login({ email, password });
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Container className='main-content text-center'>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Sign Into Your Account
			</p>
			<Form className='form' onSubmit={e => onSubmit(e)}>
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

				<Input type='submit' className='btn btn-info' value='Login' />
			</Form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</Container>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ login }
)(Login);
