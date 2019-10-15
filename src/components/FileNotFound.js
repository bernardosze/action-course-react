import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const FileNotFound = () => {
	return (
		<Container className='container main-content text-center'>
			<Row>
				<Col>
					<h1 className='error-status'>404</h1>
					<h3 className='error-status'>Page not found</h3>
					<p>
						The page you are looking for might have been removed, <br /> had its name changed, or is
						temporarily unavailable.
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export default FileNotFound;
