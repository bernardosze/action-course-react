import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavLink,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

const Header = ({ auth: { isAuthenticated, loading, user }, logout }) => {
	const authLinks = (
		<Fragment>
			<NavItem>
				<NavLink href='/dashboard'>Dashboard</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href='/project'>Projects</NavLink>
			</NavItem>
			<UncontrolledDropdown nav inNavbar>
				<DropdownToggle nav caret>
					{user && user.name}
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem href='/profile'>Profile</DropdownItem>
					<DropdownItem divider />
					<DropdownItem onClick={logout}>
						Logout <i className='fas fa-sign-out-alt' />
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<NavItem>
				<NavLink href='/register'>Register </NavLink>
			</NavItem>
			<NavItem>
				<NavLink href='/login'>Login</NavLink>
			</NavItem>
		</Fragment>
	);

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Navbar color='light' light expand='md'>
			<NavbarBrand href='/'>
				<i className='fas fa-ruler-triangle' />
				ActionCourse
			</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className='ml-auto' navbar>
					{!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
				</Nav>
			</Collapse>
		</Navbar>
	);
};

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	user: state.auth.user
});

export default connect(
	mapStateToProps,
	{ logout }
)(Header);
