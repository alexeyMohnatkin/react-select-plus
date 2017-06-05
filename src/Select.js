/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AutosizeInput from 'react-input-autosize';
import classNames from 'classnames';
import { themr } from 'react-css-themr';

import { propTypes, defaultProps } from './propTypes/Select';
import defaultFilterOptions from './utils/defaultFilterOptions';

import Async from './Async';
import AsyncCreatable from './AsyncCreatable';
import Creatable from './Creatable';


function isGroup(option) {
	return option && Array.isArray(option.options);
}

function stringifyValue(value) {
	const valueType = typeof value;

	if (valueType === 'string') {
		return value;
	} else if (valueType === 'object') {
		return JSON.stringify(value);
	} else if (valueType === 'number' || valueType === 'boolean') {
		return String(value);
	}
	return '';

}

let instanceId = 1;

const invalidOptions = {};

@themr('React-Select-Plus')
class Select extends Component {
	static displayName = 'Select';
	static propTypes = { ...propTypes, ...Select.propTypes };
	static defaultProps = { ...defaultProps, ...Select.defaultProps };

	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false,
		};

		const methods = ['toggleTouchOutsideEvent', 'handleTouchOutside', 'focus', 'blurInput', 'handleTouchMove', 'handleTouchStart', 'handleTouchEnd', 'handleTouchEndClearValue', 'handleMouseDown', 'handleMouseDownOnArrow', 'handleMouseDownOnMenu', 'closeMenu', 'handleInputFocus', 'handleInputBlur', 'handleInputChange', 'handleKeyDown', 'handleValueClick', 'handleMenuScroll', 'handleRequired', 'getOptionLabel', 'getValueArray', 'expandValue', 'setValue', 'selectValue', 'addValue', 'popValue', 'removeValue', 'clearValue', 'popValue', 'getResetValue', 'focusOption', 'focusNextOption', 'focusPreviousOption', 'focusPageUpOption', 'focusPageDownOption', 'focusStartOption', 'focusEndOption', 'focusAdjacentOption', 'getFocusedOption', 'getInputValue', 'selectFocusedOption', 'renderLoading', 'renderValue', 'renderInput', 'renderClear', 'renderArrow', 'filterFlatOptions', 'flattenOptions', 'unflattenOptions', 'onOptionRef', 'renderMenu', 'renderHiddenField', 'getFocusableOptionIndex', 'renderOuter'];

		methods.forEach(method => {
			this[method] = this[method].bind(this);
		});
	}

	componentWillMount() {
		this._flatOptions = this.flattenOptions(this.props.options);
		this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
		const valueArray = this.getValueArray(this.props.value);

		if (this.props.required) {
			this.setState({
				required: this.handleRequired(valueArray[0], this.props.multi),
			});
		}
	}

	componentDidMount() {
		if (this.props.autofocus) {
			this.focus();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.options !== this.props.options) {
			this._flatOptions = this.flattenOptions(nextProps.options);
		}

		const valueArray = this.getValueArray(nextProps.value, nextProps);

		if (!nextProps.isOpen && this.props.isOpen) {
			this.closeMenu();
		}

		if (nextProps.required) {
			this.setState({
				required: this.handleRequired(valueArray[0], nextProps.multi),
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextState.isOpen !== this.state.isOpen) {
			this.toggleTouchOutsideEvent(nextState.isOpen);
			const handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;

			handler && handler();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// focus to the selected option
		if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
			let focusedOptionNode = ReactDOM.findDOMNode(this.focused);
			let focusedOptionPreviousSibling = focusedOptionNode.previousSibling;
			let focusedOptionParent = focusedOptionNode.parentElement;
			let menuNode = ReactDOM.findDOMNode(this.menu);

			if (focusedOptionPreviousSibling) {
				menuNode.scrollTop = focusedOptionPreviousSibling.offsetTop;
			} else if (focusedOptionParent && focusedOptionParent === 'Select-menu') {
				menuNode.scrollTop = focusedOptionParent.offsetTop;
			} else {
				menuNode.scrollTop = focusedOptionNode.offsetTop;
			}
			this.hasScrolledToOption = true;
		} else if (!this.state.isOpen) {
			this.hasScrolledToOption = false;
		}

		if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
			this._scrollToFocusedOptionOnUpdate = false;
			const focusedDOM = ReactDOM.findDOMNode(this.focused);
			const menuDOM = ReactDOM.findDOMNode(this.menu);
			const focusedRect = focusedDOM.getBoundingClientRect();
			const menuRect = menuDOM.getBoundingClientRect();

			if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
				menuDOM.scrollTop = (focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight);
			}
		}
		if (this.props.scrollMenuIntoView && this.menuContainer) {
			const menuContainerRect = this.menuContainer.getBoundingClientRect();

			if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
				window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
			}
		}
		if (prevProps.disabled !== this.props.disabled) {
			this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
			this.closeMenu();
		}
	}

	componentWillUnmount() {
		if (!document.removeEventListener && document.detachEvent) {
			document.detachEvent('ontouchstart', this.handleTouchOutside);
		} else {
			document.removeEventListener('touchstart', this.handleTouchOutside);
		}
	}

	toggleTouchOutsideEvent(enabled) {
		if (enabled) {
			if (!document.addEventListener && document.attachEvent) {
				document.attachEvent('ontouchstart', this.handleTouchOutside);
			} else {
				document.addEventListener('touchstart', this.handleTouchOutside);
			}
		} else if (!document.removeEventListener && document.detachEvent) {
			document.detachEvent('ontouchstart', this.handleTouchOutside);
		} else {
			document.removeEventListener('touchstart', this.handleTouchOutside);
		}
	}

	handleTouchOutside(event) {
		// handle touch outside on ios to dismiss menu
		if (this.wrapper && !this.wrapper.contains(event.target) &&
        this.menuContainer && !this.menuContainer.contains(event.target)) {
			this.closeMenu();
		}
	}

	focus() {
		if (!this.input) return;
		this.input.focus();

		if (this.props.openAfterFocus) {
			this.setState({
				isOpen: true,
			});
		}
	}

	blurInput() {
		if (!this.input) return;
		this.input.blur();
	}

	handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	}

	handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	}

	handleTouchEnd(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Fire the mouse events
		this.handleMouseDown(event);
	}

	handleTouchEndClearValue(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Clear the value
		this.clearValue(event);
	}

	handleMouseDown(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}

		if (event.target.tagName === 'INPUT') {
			return;
		}

		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();

		// for the non-searchable select, toggle the menu
		if (!this.props.searchable) {
			this.focus();
			return this.setState({
				isOpen: !this.state.isOpen,
			});
		}

		if (this.state.isFocused) {
			// On iOS, we can get into a state where we think the input is focused but it isn't really,
			// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
			// Call focus() again here to be safe.
			this.focus();

			let input = this.input;

			if (typeof input.getInput === 'function') {
				// Get the actual DOM input if the ref is an <AutosizeInput /> component
				input = input.getInput();
			}

			// clears the value so that the cursor will be at the end of input when the component re-renders
			input.value = '';

			// if the input is focused, ensure the menu is open
			this.setState({
				isOpen: true,
				isPseudoFocused: false,
			});
		} else {
			// otherwise, focus the input and open the menu
			this._openAfterFocus = this.props.openOnFocus;
			this.focus();
		}
	}

	handleMouseDownOnArrow(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}
		// If the menu isn't open, let the event bubble to the main handleMouseDown
		if (!this.state.isOpen) {
			return;
		}
		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();
		// close the menu
		this.closeMenu();
	}

	handleMouseDownOnMenu(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();

		this._openAfterFocus = true;
		this.focus();
	}

	closeMenu() {
		if (this.props.onCloseResetsInput) {
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
				inputValue: ''
			});
		} else {
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
				inputValue: this.state.inputValue
			});
		}
		this.hasScrolledToOption = false;
	}

	handleInputFocus(event) {
		if (this.props.disabled) return;
		const isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;

		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
		this.setState({
			isFocused: true,
			isOpen: isOpen
		});
		this._openAfterFocus = false;
	}

	handleInputBlur(event) {
		// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
		if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
			this.focus();
			return;
		}

		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
		const onBlurredState = {
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
		};

		if (this.props.onBlurResetsInput) {
			onBlurredState.inputValue = '';
		}
		this.setState(onBlurredState);
	}

	handleInputChange(event) {
		let newInputValue = event.target.value;

		if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
			let nextState = this.props.onInputChange(newInputValue);
			// Note: != used deliberately here to catch undefined and null

			if (nextState != null && typeof nextState !== 'object') {
				newInputValue = '' + nextState;
			}
		}

		this.setState({
			isOpen: true,
			isPseudoFocused: false,
			inputValue: newInputValue,
		});
	}

	handleKeyDown(event) {
		if (this.props.disabled) return;

		if (typeof this.props.onInputKeyDown === 'function') {
			this.props.onInputKeyDown(event);
			if (event.defaultPrevented) {
				return;
			}
		}

		switch (event.keyCode) {
			case 8: // backspace
				if (!this.state.inputValue && this.props.backspaceRemoves) {
					event.preventDefault();
					this.popValue();
				}
				return;
			case 9: // tab
				if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
					return;
				}
				this.selectFocusedOption();
				return;
			case 13: // enter
				if (!this.state.isOpen) return;
				event.stopPropagation();
				this.selectFocusedOption();
				break;
			case 27: // escape
				if (this.state.isOpen) {
					this.closeMenu();
					event.stopPropagation();
				} else if (this.props.clearable && this.props.escapeClearsValue) {
					this.clearValue(event);
					event.stopPropagation();
				}
				break;
			case 38: // up
				this.focusPreviousOption();
				break;
			case 40: // down
				this.focusNextOption();
				break;
			case 33: // page up
				this.focusPageUpOption();
				break;
			case 34: // page down
				this.focusPageDownOption();
				break;
			case 35: // end key
				if (event.shiftKey) {
					return;
				}
				this.focusEndOption();
				break;
			case 36: // home key
				if (event.shiftKey) {
					return;
				}
				this.focusStartOption();
				break;
			case 46: // backspace
				if (!this.state.inputValue && this.props.deleteRemoves) {
					event.preventDefault();
					this.popValue();
				}
				return;
			default: return;
		}
		event.preventDefault();
	}

	handleValueClick(option, event) {
		if (!this.props.onValueClick) return;
		this.props.onValueClick(option, event);
	}

	handleMenuScroll(event) {
		if (!this.props.onMenuScrollToBottom) return;
		let { target } = event;

		if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
			this.props.onMenuScrollToBottom();
		}
	}

	handleRequired(value, multi) {
		if (!value) return true;
		return (multi ? value.length === 0 : Object.keys(value).length === 0);
	}

	getOptionLabel(op) {
		return op[this.props.labelKey];
	}

	/**
	 * Turns a value into an array from the given options
	 * @param	{String|Number|Array}	value		- the value of the select input
	 * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	 * @returns	{Array}	the value of the select represented in an array
	 */
	getValueArray(value, nextProps) {
		/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
		const props = typeof nextProps === 'object' ? nextProps : this.props;

		let resValue = value;

		if (props.multi) {
			if (typeof value === 'string') {
				resValue = value.split(props.delimiter);
			}
			if (!Array.isArray(resValue)) {
				if (resValue === null || typeof resValue === 'undefined') {
					return [];
				}
				resValue = [resValue];
			}
			return resValue.map(value => this.expandValue(value, props)).filter(i => i);
		}
		const expandedValue = this.expandValue(value, props);

		return expandedValue ? [expandedValue] : [];
	}

	/**
	 * Retrieve a value from the given options and valueKey
	 * @param	{String|Number|Array}	value	- the selected value(s)
	 * @param	{Object}		props	- the Select component's props (or nextProps)
	 */
	expandValue(value, props) {
		const valueType = typeof value;

		if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
		let { labelKey, valueKey, renderInvalidValues } = this.props;
		let options = this._flatOptions;

		if (!options || value === '') return;
		for (let i = 0; i < options.length; i++) {
			if (options[i][valueKey] === value) return options[i];
		}

		// no matching option, return an invalid option if renderInvalidValues is enabled
		if (renderInvalidValues) {
			invalidOptions[value] = invalidOptions[value] || {
				invalid: true,
				[labelKey]: value,
				[valueKey]: value
			};
			return invalidOptions[value];
		}
	}

	setValue(value) {
		if (this.props.autoBlur) {
			this.blurInput();
		}
		if (!this.props.onChange) return;
		if (this.props.required) {
			const required = this.handleRequired(value, this.props.multi);

			this.setState({ required });
		}
		if (this.props.simpleValue && value) {
			const newValue = this.props.multi ? value.map(i => i[this.props.valueKey]).join(this.props.delimiter) : value[this.props.valueKey];

			this.props.onChange(newValue);
			return;
		}
		this.props.onChange(value);
	}

	selectValue(value) {
		//NOTE: update value in the callback to make sure the input value is empty so that there are no styling issues (Chrome had issue otherwise)
		this.hasScrolledToOption = false;
		if (this.props.multi) {
			this.setState({
				inputValue: '',
				focusedIndex: null
			}, () => {
				this.addValue(value);
			});
		} else {
			this.setState({
				isOpen: false,
				inputValue: '',
				isPseudoFocused: this.state.isFocused,
			}, () => {
				this.setValue(value);
			});
		}
	}

	addValue(value) {
		var valueArray = this.getValueArray(this.props.value);
		const visibleOptions = this._visibleOptions.filter(val => !val.disabled);
		const lastValueIndex = visibleOptions.indexOf(value);

		this.setValue(valueArray.concat(value));
		if (visibleOptions.length - 1 === lastValueIndex) {
			// the last option was selected; focus the second-last one
			this.focusOption(visibleOptions[lastValueIndex - 1]);
		} else if (visibleOptions.length > lastValueIndex) {
			// focus the option below the selected one
			this.focusOption(visibleOptions[lastValueIndex + 1]);
		}
	}

	popValue() {
		var valueArray = this.getValueArray(this.props.value);

		if (!valueArray.length) return;
		if (valueArray[valueArray.length-1].clearableValue === false) return;
		this.setValue(valueArray.slice(0, valueArray.length - 1));
	}

	removeValue(value) {
		var valueArray = this.getValueArray(this.props.value);

		this.setValue(valueArray.filter(i => i !== value));
	}

	clearValue(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		this.setValue(this.getResetValue());
		this.setState({
			isOpen: false,
			inputValue: '',
			// -----------------
			focusedOption: null,
			// -----------------
		}, this.focus);
	}

	getResetValue() {
		if (typeof this.props.resetValue !== 'undefined') {
			return this.props.resetValue;
		} else if (this.props.multi) {
			return [];
		}
		return null;

	}

	focusOption(option) {
		this.setState({
			focusedOption: option
		});
	}

	focusNextOption() {
		this.focusAdjacentOption('next');
	}

	focusPreviousOption() {
		this.focusAdjacentOption('previous');
	}

	focusPageUpOption() {
		this.focusAdjacentOption('page_up');
	}

	focusPageDownOption() {
		this.focusAdjacentOption('page_down');
	}

	focusStartOption() {
		this.focusAdjacentOption('start');
	}

	focusEndOption() {
		this.focusAdjacentOption('end');
	}

	focusAdjacentOption(dir) {
		var options = this._visibleOptions
			.map((option, index) => ({ option, index }))
			.filter(option => !option.option.disabled);

		this._scrollToFocusedOptionOnUpdate = true;
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: '',
				focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null)
			});
			return;
		}
		if (!options.length) return;
		let focusedIndex = -1;

		for (let i = 0; i < options.length; i++) {
			if (this._focusedOption === options[i].option) {
				focusedIndex = i;
				break;
			}
		}
		if (dir === 'next' && focusedIndex !== -1) {
			focusedIndex = (focusedIndex + 1) % options.length;
		} else if (dir === 'previous') {
			if (focusedIndex > 0) {
				focusedIndex -= 1;
			} else {
				focusedIndex = options.length - 1;
			}
		} else if (dir === 'start') {
			focusedIndex = 0;
		} else if (dir === 'end') {
			focusedIndex = options.length - 1;
		} else if (dir === 'page_up') {
			const potentialIndex = focusedIndex - this.props.pageSize;

			if (potentialIndex < 0) {
				focusedIndex = 0;
			} else {
				focusedIndex = potentialIndex;
			}
		} else if (dir === 'page_down') {
			const potentialIndex = focusedIndex + this.props.pageSize;

			if (potentialIndex > options.length - 1) {
				focusedIndex = options.length - 1;
			} else {
				focusedIndex = potentialIndex;
			}
		}

		if (focusedIndex === -1) {
			focusedIndex = 0;
		}

		this.setState({
			focusedIndex: options[focusedIndex].index,
			focusedOption: options[focusedIndex].option
		});
	}

	getFocusedOption() {
		return this._focusedOption;
	}

	getInputValue() {
		return this.state.inputValue;
	}

	selectFocusedOption() {
		if (this._focusedOption) {
			return this.selectValue(this._focusedOption);
		}
	}

	renderLoading() {
		if (!this.props.isLoading) return;
		const { theme } = this.props;

		return (
			<span className={theme.spinnerZone} aria-hidden="true">
				<span className={theme.spinner} />
			</span>
		);
	}

	renderValue(valueArray, isOpen) {
		const { theme } = this.props;
		let renderLabel = this.props.valueRenderer || this.getOptionLabel;
		let ValueComponent = this.props.valueComponent;

		if (!valueArray.length) {
			return !this.state.inputValue ? <div className={theme.placeholder}>{this.props.placeholder}</div> : null;
		}
		let onClick = this.props.onValueClick ? this.handleValueClick : null;

		if (this.props.multi) {
			return valueArray.map((value, i) => {
				return (
					<ValueComponent
						id={this._instancePrefix + '-value-' + i}
						instancePrefix={this._instancePrefix}
						disabled={this.props.disabled || value.clearableValue === false}
						key={`value-${i}-${value[this.props.valueKey]}`}
						onClick={onClick}
						onRemove={this.removeValue}
						value={value}
						theme={theme}
					>
						{renderLabel(value, i)}
						<span className={theme.ariaOnly}>&nbsp;</span>
					</ValueComponent>
				);
			});
		} else if (!this.state.inputValue) {
			if (isOpen) onClick = null;
			return (
				<ValueComponent
					id={this._instancePrefix + '-value-item'}
					disabled={this.props.disabled}
					instancePrefix={this._instancePrefix}
					onClick={onClick}
					value={valueArray[0]}
					theme={theme}
				>
					{renderLabel(valueArray[0])}
				</ValueComponent>
			);
		}
	}

	renderInput(valueArray, focusedOptionIndex) {
		const { theme } = this.props;
		const className = classNames(theme.input, this.props.inputProps.className);
		const isOpen = !!this.state.isOpen;

		const ariaOwns = classNames({
			[this._instancePrefix + '-list']: isOpen,
			[this._instancePrefix + '-backspace-remove-message']: this.props.multi
				&& !this.props.disabled
				&& this.state.isFocused
				&& !this.state.inputValue
		});

		// TODO: Check how this project includes Object.assign()
		const inputProps = Object.assign({}, this.props.inputProps, {
			'role': 'combobox',
			'aria-expanded': '' + isOpen,
			'aria-owns': ariaOwns,
			'aria-haspopup': '' + isOpen,
			'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
			'aria-describedby': this.props['aria-describedby'],
			'aria-labelledby': this.props['aria-labelledby'],
			'aria-label': this.props['aria-label'],
			'className': className,
			'tabIndex': this.props.tabIndex,
			'onBlur': this.handleInputBlur,
			'onChange': this.handleInputChange,
			'onFocus': this.handleInputFocus,
			'ref': ref => this.input = ref,
			'required': this.state.required,
			'value': this.state.inputValue
		});

		if (this.props.inputRenderer) {
			return this.props.inputRenderer(inputProps);
		}

		if (this.props.disabled || !this.props.searchable) {
			const { inputClassName, ...divProps } = this.props.inputProps;

			return (
				<div
					{...divProps}
					role="combobox"
					aria-expanded={isOpen}
					aria-owns={isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value'}
					aria-activedescendant={isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value'}
					className={className}
					tabIndex={this.props.tabIndex || 0}
					onBlur={this.handleInputBlur}
					onFocus={this.handleInputFocus}
					ref={ref => this.input = ref}
					aria-readonly={'' + !!this.props.disabled}
					style={{ border: 0, width: 1, display: 'inline-block' }}/>
			);
		}

		if (this.props.autosize) {
			return (
				<AutosizeInput {...inputProps} minWidth="5" />
			);
		}
		return (
			<div className={ className }>
				<input {...inputProps} />
			</div>
		);
	}

	renderClear() {
		if (!this.props.clearable || (!this.props.value || this.props.value === 0) || (this.props.multi && !this.props.value.length) || this.props.disabled || this.props.isLoading) return;
		const { theme } = this.props;
		const Clear = this.props.clearRenderer;

		return (
			<span className={theme.clearZone} title={this.props.multi ? this.props.clearAllText : this.props.clearValueText}
				aria-label={this.props.multi ? this.props.clearAllText : this.props.clearValueText}
				onMouseDown={this.clearValue}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onTouchEnd={this.handleTouchEndClearValue}
			>
				<Clear theme={theme} />
			</span>
		);
	}

	renderArrow() {
		const onMouseDown = this.handleMouseDownOnArrow;
		const isOpen = this.state.isOpen;
		const { theme, hideArrowOnSingleValue } = this.props;
		const Arrow = this.props.arrowRenderer;

		if (hideArrowOnSingleValue && this.props.options.length === 1 && this.props.value) {
			return null;
		}
		return (
			<span
				className={theme.arrowZone}
				onMouseDown={onMouseDown}
			>
				<Arrow onMouseDown={onMouseDown} isOpen={isOpen} theme={theme} />
			</span>
		);
	}

	filterFlatOptions(excludeOptions) {
		const filterValue = this.state.inputValue;
		const flatOptions = this._flatOptions;

		if (this.props.filterOptions) {
      // Maintain backwards compatibility with boolean attribute
			const filterOptions = typeof this.props.filterOptions === 'function'
        ? this.props.filterOptions
        : defaultFilterOptions;

			return filterOptions(
        flatOptions,
        filterValue,
        excludeOptions,
				{
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					valueKey: this.props.valueKey,
				}
      );
		}
		return flatOptions;

	}

	flattenOptions(options, group) {
		if (!options) return [];
		let flatOptions = [];

		for (let i = 0; i < options.length; i++) {
      // We clone each option with a pointer to its parent group for efficient unflattening
			const optionCopy = { ...options[i] };

			optionCopy.isInTree = false;
			if (group) {
				optionCopy.group = group;
			}
			if (isGroup(optionCopy)) {
				flatOptions = flatOptions.concat(this.flattenOptions(optionCopy.options, optionCopy));
				optionCopy.options = [];
			} else {
				flatOptions.push(optionCopy);
			}
		}
		return flatOptions;
	}

	unflattenOptions(flatOptions) {
		const groupedOptions = [];
		let parent;
		let child;

    // Remove all ancestor groups from the tree
		flatOptions.forEach((option) => {
			option.isInTree = false;
			parent = option.group;
			while (parent) {
				if (parent.isInTree) {
					parent.options = [];
					parent.isInTree = false;
				}
				parent = parent.group;
			}
		});

    // Now reconstruct the options tree
		flatOptions.forEach((option) => {
			child = option;
			parent = child.group;
			while (parent) {
				if (!child.isInTree) {
					parent.options.push(child);
					child.isInTree = true;
				}

				child = parent;
				parent = child.group;
			}
			if (!child.isInTree) {
				groupedOptions.push(child);
				child.isInTree = true;
			}
		});
		return groupedOptions;
	}

	onOptionRef(ref, isFocused) {
		if (isFocused) {
			this.focused = ref;
		}
	}

	renderMenu(options, valueArray, focusedOption) {
		const { theme } = this.props;

		if (options && options.length) {
			return this.props.menuRenderer({
				focusedOption,
				focusOption: this.focusOption,
				instancePrefix: this._instancePrefix,
				labelKey: this.props.labelKey,
				onFocus: this.focusOption,
				onOptionRef: this.onOptionRef,
				onSelect: this.selectValue,
				optionClassName: this.props.optionClassName,
				optionComponent: this.props.optionComponent,
				optionGroupComponent: this.props.optionGroupComponent,
				optionRenderer: this.props.optionRenderer || this.getOptionLabel,
				options,
				selectValue: this.selectValue,
				valueArray,
				valueKey: this.props.valueKey,
				inputValue: this.state.inputValue,
				theme,
			});
		} else if (this.props.noResultsText) {
			return (
				<div className={theme.noresults}>
					{this.props.noResultsText}
				</div>
			);
		}
		return null;

	}

	renderHiddenField(valueArray) {
		if (!this.props.name) return;
		if (this.props.joinValues) {
			let value = valueArray.map(i => stringifyValue(i[this.props.valueKey])).join(this.props.delimiter);

			return (
				<input
					type="hidden"
					// ref={ref => this.value = ref}
					name={this.props.name}
					value={value}
					disabled={this.props.disabled} />
			);
		}
		return valueArray.map((item, index) => (
			<input key={'hidden.' + index}
				type="hidden"
				// ref={'value' + index}
				name={this.props.name}
				value={stringifyValue(item[this.props.valueKey])}
				disabled={this.props.disabled} />
		));
	}

	getFocusableOptionIndex(selectedOption) {
		var options = this._visibleOptions;

		if (!options.length) return null;

		let focusedOption = this.state.focusedOption || selectedOption;

		if (focusedOption && !focusedOption.disabled) {
			const focusedOptionIndex = options.indexOf(focusedOption);

			if (focusedOptionIndex !== -1) {
				return focusedOptionIndex;
			}

			if (this.state.inputValue) {
				for (let i = 0; i < options.length; i++) {
					if (!options[i].disabled) return i;
				}
			}

			return null;

			/*let focusedOptionIndex = -1;

			options.some((option, index) => {
				const isOptionEqual = option.value === focusedOption.value;

				if (isOptionEqual) {
					focusedOptionIndex = index;
				}
				return isOptionEqual;
			});
			if (focusedOptionIndex !== -1) {
				return focusedOptionIndex;
			}*/
		}

		for (let i = 0; i < options.length; i++) {
			if (!options[i].disabled) return i;
		}
		return null;
	}

	renderOuter(options, valueArray, focusedOption) {
		let Dropdown = this.props.dropdownComponent;
		let menu = this.renderMenu(options, valueArray, focusedOption);

		if (!menu) {
			return null;
		}
		const { theme } = this.props;

		return (
      <Dropdown>
        <div ref={ref => this.menuContainer = ref} className={theme.menuOuter} style={this.props.menuContainerStyle}>
          <div ref={ref => this.menu = ref} role="listbox" className={theme.menu} id={this._instancePrefix + '-list'}
               style={this.props.menuStyle}
               onScroll={this.handleMenuScroll}
               onMouseDown={this.handleMouseDownOnMenu}>
            {menu}
          </div>
        </div>
      </Dropdown>
		);
	}

	render() {
		const { theme } = this.props;
		let valueArray = this.getValueArray(this.props.value);

		this._visibleOptions = this.filterFlatOptions(this.props.multi ? valueArray : null);
		let options = this.unflattenOptions(this._visibleOptions);
		let isOpen = typeof this.props.isOpen === 'boolean' ? this.props.isOpen : this.state.isOpen;

		if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
		const focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

		let focusedOption = null;

		if (focusedOptionIndex !== null) {
			focusedOption = this._focusedOption = this._visibleOptions[focusedOptionIndex];
		} else {
			focusedOption = this._focusedOption = null;
		}
		let className = classNames(
			theme.Select,
			this.props.className,

			this.props.multi && theme.multi,
			!this.props.multi && theme.single,
			this.props.disabled && theme.isDisabled,
			this.state.isFocused && theme.isFocused,
			this.props.isLoading && theme.isLoading,
			isOpen && theme.isOpen,
			this.state.isPseudoFocused && theme.isPseudoFocused,
			this.props.searchable && theme.isSearchable,
			valueArray.length && theme.hasValue,
		);

		let removeMessage = null;

		if (this.props.multi &&
			!this.props.disabled &&
			valueArray.length &&
			!this.state.inputValue &&
			this.state.isFocused &&
			this.props.backspaceRemoves) {
			removeMessage = (
				<span id={this._instancePrefix + '-backspace-remove-message'} className={theme.ariaOnly} aria-live="assertive">
					{this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])}
				</span>
			);
		}

		return (
			<div ref={ref => this.wrapper = ref}
				className={className}
				style={this.props.wrapperStyle}
			>
				{this.renderHiddenField(valueArray)}
				<div ref={ref => this.control = ref}
					className={theme.control}
					style={this.props.style}
					onKeyDown={this.handleKeyDown}
					onMouseDown={this.handleMouseDown}
					onTouchEnd={this.handleTouchEnd}
					onTouchStart={this.handleTouchStart}
					onTouchMove={this.handleTouchMove}
				>
					<span className={theme.multiValueWrapper} id={this._instancePrefix + '-value'}>
						{this.renderValue(valueArray, isOpen)}
						{this.renderInput(valueArray, focusedOptionIndex)}
					</span>
					{removeMessage}
					{this.renderLoading()}
					{this.renderClear()}
					{this.renderArrow()}
				</div>
				{isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null}
			</div>
		);
	}

}


Select.Async = Async;
Select.AsyncCreatable = AsyncCreatable;
Select.Creatable = Creatable;

export default Select;
