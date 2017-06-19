import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { themr } from 'react-css-themr';

import defaultTheme from '../css/default.css';
@themr('React-Select-Plus', defaultTheme)
class OptionGroup extends Component {

	constructor(props) {
		super(props);

		this.blockEvent = this.blockEvent.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
	}

	blockEvent(event) {
		event.preventDefault();
		event.stopPropagation();
		if ((event.target.tagName !== 'A') || !('href' in event.target)) {
			return;
		}
		if (event.target.target) {
			window.open(event.target.href, event.target.target);
		} else {
			window.location.href = event.target.href;
		}
	}

	handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	handleTouchEnd(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		this.handleMouseDown(event);
	}

	handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	}

	handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	}

	render() {
		var { option } = this.props;
		var className = classNames(this.props.className, option.className);
		const { theme } = this.props;

		return option.disabled ? (
			<div className={className}
				onMouseDown={this.blockEvent}
				onClick={this.blockEvent}>
				{this.props.children}
			</div>
		) : (
			<div className={className}
				style={option.style}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onTouchEnd={this.handleTouchEnd}
				title={option.title}>
				<div className={theme.optionGroupLabel}>
					{this.props.label}
				</div>
				{this.props.children}
			</div>
		);
	}
}

OptionGroup.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,             // className (based on mouse position)
	label: PropTypes.node,                   // the heading to show above the child options
	option: PropTypes.object.isRequired,     // object that is base for that option group
};

module.exports = OptionGroup;
