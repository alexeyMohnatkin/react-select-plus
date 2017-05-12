import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { themr } from 'react-css-themr';

import defaultTheme from '../css/default.css';
@themr('React-Select-Plus', defaultTheme)
class Value extends Component {

	static displayName = 'Value';

	constructor(props) {
		super(props);

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.handleTouchEndRemove = this.handleTouchEndRemove.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.renderRemoveIcon = this.renderRemoveIcon.bind(this);
		this.renderLabel = this.renderLabel.bind(this);
	}

	handleMouseDown(event) {
		if (event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		if (this.props.onClick) {
			event.stopPropagation();
			this.props.onClick(this.props.value, event);
			return;
		}
		if (this.props.value.href) {
			event.stopPropagation();
		}
	}

	onRemove(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onRemove(this.props.value);
	}

	handleTouchEndRemove(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Fire the mouse events
		this.onRemove(event);
	}

	handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	}

	handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	}

	renderRemoveIcon() {
		if (this.props.disabled || !this.props.onRemove) return;
		const { theme } = this.props;

		return (
			<span className={theme.valueIcon}
				aria-hidden="true"
				onMouseDown={this.onRemove}
				onTouchEnd={this.handleTouchEndRemove}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}>
				&times;
			</span>
		);
	}

	renderLabel() {
		const { theme } = this.props;
		let className = theme.valueLabel;

		return this.props.onClick || this.props.value.href ? (
			<a className={className} href={this.props.value.href} target={this.props.value.target} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
				{this.props.children}
			</a>
		) : (
			<span className={className} role="option" aria-selected="true" id={this.props.id}>
				{this.props.children}
			</span>
		);
	}

	render() {
		const { theme } = this.props;

		return (
			<div className={classNames(theme.value, this.props.value.className)}
				style={this.props.value.style}
				title={this.props.value.title}
				>
				{this.renderRemoveIcon()}
				{this.renderLabel()}
			</div>
		);
	}

}

Value.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool, // disabled prop passed to ReactSelect
	id: PropTypes.string, // Unique id for the value - used for aria
	onClick: PropTypes.func, // method to handle click on value label
	onRemove: PropTypes.func, // method to handle removal of the value
	value: PropTypes.object.isRequired, // the option object for this value
};

module.exports = Value;
