import React, { PropTypes } from 'react';

const Dropdown = (props) => (
	props.children
);

Dropdown.propTypes = {
	children: PropTypes.node,
};

module.exports = Dropdown;
