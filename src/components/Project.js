import React, { useEffect } from 'react';
import {
	Button,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Col,
	Container,
	Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProjects } from '../actions/project';
import { clockin, clockout } from '../actions/clock';

const Project = ({ getAllProjects, clockin, clockout, project: { projects, loading }, user }) => {
	useEffect(() => {
		getAllProjects();
	}, []);

	const handleClockIn = async e => {
		e.preventDefault();
		console.log(e.target.name);
		const userID = user && user.id;
		clockin({ userID, project: e.target.name, type: 'IN' });
	};

	const handleClockOut = async e => {
		e.preventDefault();
		const userID = user && user.id;
		clockout({ userID, project: e.target.name, type: 'OUT' });
	};

	return (
		<Container className='main-content text-center'>
			{user && user.role === 'Admin' && (
				<Link to='/new-project'>
					<Button block color='info'>
						New Project
					</Button>
				</Link>
			)}
			{loading || !projects
				? ''
				: projects.map(project => (
						<Row key={project._id}>
							<Col xs='12'>
								<Card>
									<CardBody id='toggler'>
										<CardTitle>{project.title}</CardTitle>
										<CardSubtitle>{project.description}</CardSubtitle>
										<Row>
											<Col xs='12'>
												<CardText>
													{project.address}, {project.city}, {project.province}
												</CardText>
											</Col>
										</Row>
										<Row>
											<Col xs='6'>
												<Button color='success' name={project._id} onClick={e => handleClockIn(e)}>
													Clock-In
												</Button>
											</Col>
											<Col xs='6'>
												<Button color='danger' name={project._id} onClick={e => handleClockOut(e)}>
													Clock-Out
												</Button>
											</Col>
										</Row>
									</CardBody>
								</Card>
							</Col>
						</Row>
				  ))}
		</Container>
	);
};

Project.propTypes = {
	getAllProjects: PropTypes.func.isRequired,
	clockin: PropTypes.func.isRequired,
	clockout: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	project: state.project,
	user: state.auth.user
});

export default connect(
	mapStateToProps,
	{
		getAllProjects,
		clockin,
		clockout
	}
)(Project);
