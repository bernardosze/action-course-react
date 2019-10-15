import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Container className='container main-content text-center'>
			<Row>
				<Col>
					<h1>Welcome to ActionCourse</h1>
					<p>Manage your projects and your employees!</p>
				</Col>
			</Row>
			<Row>
				<Col md={{ size: 3, offset: 3 }}>
					<Link to='/register'>
						<Button block color='info'>
							Register
						</Button>
					</Link>
				</Col>
				<Col md='3'>
					<Link to='/login'>
						<Button block color='info'>
							Login
						</Button>
					</Link>
				</Col>
			</Row>
		</Container>
	);
};

Home.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
