import React, { Fragment, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Col, Container, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getClocks, getClocksByUser } from '../actions/clock';

const Dashboard = ({ auth, user, clock: { clocks, loading }, getClock, getClocksByUser }) => {
	useEffect(() => {
		//getClocks();
		getClocksByUser();
	}, []);
	return (
		<Container className='main-content'>
			<Row>
				<Col md='12' lg='6'>
					<ReactWeather forecast='5days' apikey='1a0eb3fb844547bb95b163457191607' type='auto' />
				</Col>
			</Row>
			<Row>
				<Col xs='12'>
					<Card>
						<CardBody>
							<CardTitle>Clocks</CardTitle>
						</CardBody>
						<CardBody>
							{loading || !clocks
								? ''
								: clocks.map(clock => (
										<Row key={clock.id}>
											<Col xs='4'>{clock.type}</Col>
											<Col xs='6'>
												{clock.clock.substring(0, 10)} {clock.clock.substring(11, 19)}
											</Col>
										</Row>
								  ))}
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

Dashboard.propTypes = {
	getClocks: PropTypes.func.isRequired,
	getClocksByUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	clock: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	user: state.auth.user,
	clock: state.clock
});

export default connect(
	mapStateToProps,
	{
		getClocks,
		getClocksByUser
	}
)(Dashboard);
