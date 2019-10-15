import React from 'react';
import PropTypes from 'prop-types';
import { Alert as DefaultAlert } from 'reactstrap';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map(alert => (
		<DefaultAlert key={alert.id} color={alert.alertType}>
			{alert.msg}
		</DefaultAlert>
	));

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
