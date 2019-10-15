import React, { Fragment } from 'react';
import spinner from '../../styles/img/spinner.svg';

export default () => {
	return (
		<Fragment>
			<img src={spinner} alt='loading...' className='loading-spinner' />
		</Fragment>
	);
};
