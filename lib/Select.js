'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*!
                                                                                                                                                                                                                                                                                Copyright (c) 2016 Jed Watson.
                                                                                                                                                                                                                                                                                Licensed under the MIT License (MIT), see
                                                                                                                                                                                                                                                                                http://jedwatson.github.io/react-select
                                                                                                                                                                                                                                                                              */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactInputAutosize = require('react-input-autosize');

var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _Select = require('./propTypes/Select');

var _defaultFilterOptions = require('./utils/defaultFilterOptions');

var _defaultFilterOptions2 = _interopRequireDefault(_defaultFilterOptions);

var _Async = require('./Async');

var _Async2 = _interopRequireDefault(_Async);

var _AsyncCreatable = require('./AsyncCreatable');

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _Creatable = require('./Creatable');

var _Creatable2 = _interopRequireDefault(_Creatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isGroup(option) {
	return option && Array.isArray(option.options);
}

function stringifyValue(value) {
	var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);

	if (valueType === 'string') {
		return value;
	} else if (valueType === 'object') {
		return JSON.stringify(value);
	} else if (valueType === 'number' || valueType === 'boolean') {
		return String(value);
	}
	return '';
}

var instanceId = 1;

var invalidOptions = {};

var Select = (_dec = (0, _reactCssThemr.themr)('React-Select-Plus'), _dec(_class = function (_Component) {
	_inherits(Select, _Component);

	function Select(props) {
		_classCallCheck(this, Select);

		var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		_this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false
		};

		var methods = ['toggleTouchOutsideEvent', 'handleTouchOutside', 'focus', 'blurInput', 'handleTouchMove', 'handleTouchStart', 'handleTouchEnd', 'handleTouchEndClearValue', 'handleMouseDown', 'handleMouseDownOnArrow', 'handleMouseDownOnMenu', 'closeMenu', 'handleInputFocus', 'handleInputBlur', 'handleInputChange', 'handleKeyDown', 'handleValueClick', 'handleMenuScroll', 'handleRequired', 'getOptionLabel', 'getValueArray', 'expandValue', 'setValue', 'selectValue', 'addValue', 'popValue', 'removeValue', 'clearValue', 'popValue', 'getResetValue', 'focusOption', 'focusNextOption', 'focusPreviousOption', 'focusPageUpOption', 'focusPageDownOption', 'focusStartOption', 'focusEndOption', 'focusAdjacentOption', 'getFocusedOption', 'getInputValue', 'selectFocusedOption', 'renderLoading', 'renderValue', 'renderInput', 'renderClear', 'renderArrow', 'filterFlatOptions', 'flattenOptions', 'unflattenOptions', 'onOptionRef', 'renderMenu', 'renderHiddenField', 'getFocusableOptionIndex', 'renderOuter'];

		methods.forEach(function (method) {
			_this[method] = _this[method].bind(_this);
		});
		return _this;
	}

	_createClass(Select, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._flatOptions = this.flattenOptions(this.props.options);
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], this.props.multi)
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.autofocus) {
				this.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.options !== this.props.options) {
				this._flatOptions = this.flattenOptions(nextProps.options);
			}

			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (!nextProps.isOpen && this.props.isOpen) {
				this.closeMenu();
			}

			if (nextProps.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], nextProps.multi)
				});
			}
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			if (nextState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(nextState.isOpen);
				var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;

				handler && handler();
			}

			if (nextProps.filterValue !== this.props.filterValue) {
				this.setFilterValue(nextProps.filterValue);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = _reactDom2.default.findDOMNode(this.focused);
				var focusedOptionPreviousSibling = focusedOptionNode.previousSibling;
				var focusedOptionParent = focusedOptionNode.parentElement;
				var menuNode = _reactDom2.default.findDOMNode(this.menu);

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
				var focusedDOM = _reactDom2.default.findDOMNode(this.focused);
				var menuDOM = _reactDom2.default.findDOMNode(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();

				if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();

				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (!document.removeEventListener && document.detachEvent) {
				document.detachEvent('ontouchstart', this.handleTouchOutside);
			} else {
				document.removeEventListener('touchstart', this.handleTouchOutside);
			}
		}
	}, {
		key: 'toggleTouchOutsideEvent',
		value: function toggleTouchOutsideEvent(enabled) {
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
	}, {
		key: 'handleTouchOutside',
		value: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target) && this.menuContainer && !this.menuContainer.contains(event.target)) {
				this.closeMenu();
			}
		}
	}, {
		key: 'setFilterValue',
		value: function setFilterValue(filterValue) {
			this.setState({ inputValue: filterValue });
			this.focus();
		}
	}, {
		key: 'focus',
		value: function focus() {
			if (!this.input) return;
			this.input.focus();

			if (this.props.openAfterFocus) {
				this.setState({
					isOpen: true
				});
			}
		}
	}, {
		key: 'blurInput',
		value: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchEndClearValue',
		value: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
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
					isOpen: !this.state.isOpen
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;

				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: true,
					isPseudoFocused: false
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = this.props.openOnFocus;
				this.focus();
			}
		}
	}, {
		key: 'handleMouseDownOnArrow',
		value: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
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
	}, {
		key: 'handleMouseDownOnMenu',
		value: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
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
	}, {
		key: 'handleInputFocus',
		value: function handleInputFocus(event) {
			if (this.props.disabled) return;
			var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;

			if (this.props.onFocus) {
				this.props.onFocus(event);
			}
			this.setState({
				isFocused: true,
				isOpen: isOpen
			});
			this._openAfterFocus = false;
		}
	}, {
		key: 'handleInputBlur',
		value: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};

			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = '';
			}
			this.setState(onBlurredState);
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
				var nextState = this.props.onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null

				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newInputValue = '' + nextState;
				}
			}

			this.setState({
				isOpen: true,
				isPseudoFocused: false,
				inputValue: newInputValue
			});
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						return;
					}
					this.selectFocusedOption();
					return;
				case 13:
					// enter
					if (!this.state.isOpen) return;
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 27:
					// escape
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 38:
					// up
					this.focusPreviousOption();
					break;
				case 40:
					// down
					this.focusNextOption();
					break;
				case 33:
					// page up
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						return;
					}
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						return;
					}
					this.focusStartOption();
					break;
				case 46:
					// backspace
					if (!this.state.inputValue && this.props.deleteRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				default:
					return;
			}
			event.preventDefault();
		}
	}, {
		key: 'handleValueClick',
		value: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		}
	}, {
		key: 'handleMenuScroll',
		value: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;


			if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
				this.props.onMenuScrollToBottom();
			}
		}
	}, {
		key: 'handleRequired',
		value: function handleRequired(value, multi) {
			if (!value) return true;
			return multi ? value.length === 0 : Object.keys(value).length === 0;
		}
	}, {
		key: 'getOptionLabel',
		value: function getOptionLabel(op) {
			return op[this.props.labelKey];
		}

		/**
   * Turns a value into an array from the given options
   * @param	{String|Number|Array}	value		- the value of the select input
   * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
   * @returns	{Array}	the value of the select represented in an array
   */

	}, {
		key: 'getValueArray',
		value: function getValueArray(value, nextProps) {
			var _this2 = this;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object' ? nextProps : this.props;

			var resValue = value;

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
				return resValue.map(function (value) {
					return _this2.expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = this.expandValue(value, props);

			return expandedValue ? [expandedValue] : [];
		}

		/**
   * Retrieve a value from the given options and valueKey
   * @param	{String|Number|Array}	value	- the selected value(s)
   * @param	{Object}		props	- the Select component's props (or nextProps)
   */

	}, {
		key: 'expandValue',
		value: function expandValue(value, props) {
			var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);

			if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
			var _props = this.props,
			    labelKey = _props.labelKey,
			    valueKey = _props.valueKey,
			    renderInvalidValues = _props.renderInvalidValues;

			var options = this._flatOptions;

			if (!options || value === '') return;
			for (var i = 0; i < options.length; i++) {
				if (options[i][valueKey] === value) return options[i];
			}

			// no matching option, return an invalid option if renderInvalidValues is enabled
			if (renderInvalidValues) {
				var _ref;

				invalidOptions[value] = invalidOptions[value] || (_ref = {
					invalid: true
				}, _defineProperty(_ref, labelKey, value), _defineProperty(_ref, valueKey, value), _ref);
				return invalidOptions[value];
			}
		}
	}, {
		key: 'setValue',
		value: function setValue(value) {
			var _this3 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (!this.props.onChange) return;
			if (this.props.required) {
				var required = this.handleRequired(value, this.props.multi);

				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				var newValue = this.props.multi ? value.map(function (i) {
					return i[_this3.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];

				this.props.onChange(newValue);
				return;
			}
			this.props.onChange(value);
		}
	}, {
		key: 'selectValue',
		value: function selectValue(value) {
			var _this4 = this;

			//NOTE: update value in the callback to make sure the input value is empty so that there are no styling issues (Chrome had issue otherwise)
			this.hasScrolledToOption = false;
			if (this.props.multi) {
				this.setState({
					inputValue: '',
					focusedIndex: null
				}, function () {
					_this4.addValue(value);
				});
			} else {
				this.setState({
					isOpen: false,
					inputValue: '',
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this4.setValue(value);
				});
			}
		}
	}, {
		key: 'addValue',
		value: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			var visibleOptions = this._visibleOptions.filter(function (val) {
				return !val.disabled;
			});
			var lastValueIndex = visibleOptions.indexOf(value);

			this.setValue(valueArray.concat(value));
			if (visibleOptions.length - 1 === lastValueIndex) {
				// the last option was selected; focus the second-last one
				this.focusOption(visibleOptions[lastValueIndex - 1]);
			} else if (visibleOptions.length > lastValueIndex) {
				// focus the option below the selected one
				this.focusOption(visibleOptions[lastValueIndex + 1]);
			}
		}
	}, {
		key: 'popValue',
		value: function popValue() {
			var valueArray = this.getValueArray(this.props.value);

			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(valueArray.slice(0, valueArray.length - 1));
		}
	}, {
		key: 'removeValue',
		value: function removeValue(value) {
			var valueArray = this.getValueArray(this.props.value);

			this.setValue(valueArray.filter(function (i) {
				return i !== value;
			}));
		}
	}, {
		key: 'clearValue',
		value: function clearValue(event) {
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
				focusedOption: null
			}, this.focus);
		}
	}, {
		key: 'getResetValue',
		value: function getResetValue() {
			if (typeof this.props.resetValue !== 'undefined') {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			}
			return null;
		}
	}, {
		key: 'focusOption',
		value: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		}
	}, {
		key: 'focusNextOption',
		value: function focusNextOption() {
			this.focusAdjacentOption('next');
		}
	}, {
		key: 'focusPreviousOption',
		value: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		}
	}, {
		key: 'focusPageUpOption',
		value: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		}
	}, {
		key: 'focusPageDownOption',
		value: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		}
	}, {
		key: 'focusStartOption',
		value: function focusStartOption() {
			this.focusAdjacentOption('start');
		}
	}, {
		key: 'focusEndOption',
		value: function focusEndOption() {
			this.focusAdjacentOption('end');
		}
	}, {
		key: 'focusAdjacentOption',
		value: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});

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
			var focusedIndex = -1;

			for (var i = 0; i < options.length; i++) {
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
				var potentialIndex = focusedIndex - this.props.pageSize;

				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var _potentialIndex = focusedIndex + this.props.pageSize;

				if (_potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = _potentialIndex;
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
	}, {
		key: 'getFocusedOption',
		value: function getFocusedOption() {
			return this._focusedOption;
		}
	}, {
		key: 'getInputValue',
		value: function getInputValue() {
			return this.state.inputValue;
		}
	}, {
		key: 'selectFocusedOption',
		value: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		}
	}, {
		key: 'renderLoading',
		value: function renderLoading() {
			if (!this.props.isLoading) return;
			var theme = this.props.theme;


			return _react2.default.createElement(
				'span',
				{ className: theme.spinnerZone, 'aria-hidden': 'true' },
				_react2.default.createElement('span', { className: theme.spinner })
			);
		}
	}, {
		key: 'renderValue',
		value: function renderValue(valueArray, isOpen) {
			var _this5 = this;

			var theme = this.props.theme;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;

			if (!valueArray.length) {
				return !this.state.inputValue ? _react2.default.createElement(
					'div',
					{ className: theme.placeholder },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;

			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return _react2.default.createElement(
						ValueComponent,
						{
							id: _this5._instancePrefix + '-value-' + i,
							instancePrefix: _this5._instancePrefix,
							disabled: _this5.props.disabled || value.clearableValue === false,
							key: 'value-' + i + '-' + value[_this5.props.valueKey],
							onClick: onClick,
							onRemove: _this5.removeValue,
							value: value,
							theme: theme
						},
						renderLabel(value, i),
						_react2.default.createElement(
							'span',
							{ className: theme.ariaOnly },
							'\xA0'
						)
					);
				});
			} else if (!this.state.inputValue) {
				if (isOpen) onClick = null;
				return _react2.default.createElement(
					ValueComponent,
					{
						id: this._instancePrefix + '-value-item',
						disabled: this.props.disabled,
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						value: valueArray[0],
						theme: theme
					},
					renderLabel(valueArray[0])
				);
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput(valueArray, focusedOptionIndex) {
			var _classNames,
			    _this6 = this;

			var theme = this.props.theme;

			var className = (0, _classnames2.default)(theme.input, this.props.inputProps.className);
			var isOpen = !!this.state.isOpen;

			var ariaOwns = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

			// TODO: Check how this project includes Object.assign()
			var inputProps = Object.assign({}, this.props.inputProps, {
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
				'ref': function ref(_ref2) {
					return _this6.input = _ref2;
				},
				'required': this.state.required,
				'value': this.state.inputValue
			});

			if (this.props.inputRenderer) {
				return this.props.inputRenderer(inputProps);
			}

			if (this.props.disabled || !this.props.searchable) {
				var _props$inputProps = this.props.inputProps,
				    inputClassName = _props$inputProps.inputClassName,
				    divProps = _objectWithoutProperties(_props$inputProps, ['inputClassName']);

				return _react2.default.createElement('div', _extends({}, divProps, {
					role: 'combobox',
					'aria-expanded': isOpen,
					'aria-owns': isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value',
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					className: className,
					tabIndex: this.props.tabIndex || 0,
					onBlur: this.handleInputBlur,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref3) {
						return _this6.input = _ref3;
					},
					'aria-readonly': '' + !!this.props.disabled,
					style: { border: 0, width: 1, display: 'inline-block' } }));
			}

			if (this.props.autosize) {
				return _react2.default.createElement(_reactInputAutosize2.default, _extends({}, inputProps, { minWidth: '5' }));
			}
			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement('input', inputProps)
			);
		}
	}, {
		key: 'renderClear',
		value: function renderClear() {
			if (!this.props.clearable || !this.props.value || this.props.value === 0 || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
			var theme = this.props.theme;

			var Clear = this.props.clearRenderer;

			return _react2.default.createElement(
				'span',
				{ className: theme.clearZone, title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					onMouseDown: this.clearValue,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEndClearValue
				},
				_react2.default.createElement(Clear, { theme: theme })
			);
		}
	}, {
		key: 'renderArrow',
		value: function renderArrow() {
			var onMouseDown = this.handleMouseDownOnArrow;
			var isOpen = this.state.isOpen;
			var _props2 = this.props,
			    theme = _props2.theme,
			    hideArrowOnSingleValue = _props2.hideArrowOnSingleValue;

			var Arrow = this.props.arrowRenderer;

			if (hideArrowOnSingleValue && this.props.options.length === 1 && this.props.value) {
				return null;
			}
			return _react2.default.createElement(
				'span',
				{
					className: theme.arrowZone,
					onMouseDown: onMouseDown
				},
				_react2.default.createElement(Arrow, { onMouseDown: onMouseDown, isOpen: isOpen, theme: theme })
			);
		}
	}, {
		key: 'filterFlatOptions',
		value: function filterFlatOptions(excludeOptions) {
			var filterValue = this.state.inputValue;
			var flatOptions = this._flatOptions;

			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : _defaultFilterOptions2.default;

				return filterOptions(flatOptions, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					valueKey: this.props.valueKey
				});
			}
			return flatOptions;
		}
	}, {
		key: 'flattenOptions',
		value: function flattenOptions(options, group) {
			if (!options) return [];
			var flatOptions = [];

			for (var i = 0; i < options.length; i++) {
				// We clone each option with a pointer to its parent group for efficient unflattening
				var optionCopy = _extends({}, options[i]);

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
	}, {
		key: 'unflattenOptions',
		value: function unflattenOptions(flatOptions) {
			var groupedOptions = [];
			var parent = void 0;
			var child = void 0;

			// Remove all ancestor groups from the tree
			flatOptions.forEach(function (option) {
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
			flatOptions.forEach(function (option) {
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
	}, {
		key: 'onOptionRef',
		value: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		}
	}, {
		key: 'renderMenu',
		value: function renderMenu(options, valueArray, focusedOption) {
			var theme = this.props.theme;


			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
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
					options: options,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey,
					inputValue: this.state.inputValue,
					theme: theme
				});
			} else if (this.props.noResultsText) {
				return _react2.default.createElement(
					'div',
					{ className: theme.noresults },
					this.props.noResultsText
				);
			}
			return null;
		}
	}, {
		key: 'renderHiddenField',
		value: function renderHiddenField(valueArray) {
			var _this7 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this7.props.valueKey]);
				}).join(this.props.delimiter);

				return _react2.default.createElement('input', {
					type: 'hidden'
					// ref={ref => this.value = ref}
					, name: this.props.name,
					value: value,
					disabled: this.props.disabled });
			}
			return valueArray.map(function (item, index) {
				return _react2.default.createElement('input', { key: 'hidden.' + index,
					type: 'hidden'
					// ref={'value' + index}
					, name: _this7.props.name,
					value: stringifyValue(item[_this7.props.valueKey]),
					disabled: _this7.props.disabled });
			});
		}
	}, {
		key: 'getFocusableOptionIndex',
		value: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;

			if (!options.length) return null;

			var focusedOption = this.state.focusedOption || selectedOption;

			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = options.indexOf(focusedOption);

				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}

				if (this.state.inputValue) {
					for (var i = 0; i < options.length; i++) {
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

			for (var _i = 0; _i < options.length; _i++) {
				if (!options[_i].disabled) return _i;
			}
			return null;
		}
	}, {
		key: 'renderOuter',
		value: function renderOuter(options, valueArray, focusedOption) {
			var _this8 = this;

			var Dropdown = this.props.dropdownComponent;
			var menu = this.renderMenu(options, valueArray, focusedOption);

			if (!menu) {
				return null;
			}
			var theme = this.props.theme;


			return _react2.default.createElement(
				Dropdown,
				null,
				_react2.default.createElement(
					'div',
					{ ref: function ref(_ref5) {
							return _this8.menuContainer = _ref5;
						}, className: theme.menuOuter, style: this.props.menuContainerStyle },
					_react2.default.createElement(
						'div',
						{ ref: function ref(_ref4) {
								return _this8.menu = _ref4;
							}, role: 'listbox', className: theme.menu, id: this._instancePrefix + '-list',
							style: this.props.menuStyle,
							onScroll: this.handleMenuScroll,
							onMouseDown: this.handleMouseDownOnMenu },
						menu
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this9 = this;

			var theme = this.props.theme;

			var valueArray = this.getValueArray(this.props.value);

			this._visibleOptions = this.filterFlatOptions(this.props.multi ? valueArray : null);
			var options = this.unflattenOptions(this._visibleOptions);
			var isOpen = typeof this.props.isOpen === 'boolean' ? this.props.isOpen : this.state.isOpen;

			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;

			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = this._visibleOptions[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = (0, _classnames2.default)(theme.Select, this.props.className, this.props.multi && theme.multi, !this.props.multi && theme.single, this.props.disabled && theme.isDisabled, this.state.isFocused && theme.isFocused, this.props.isLoading && theme.isLoading, isOpen && theme.isOpen, this.state.isPseudoFocused && theme.isPseudoFocused, this.props.searchable && theme.isSearchable, valueArray.length && theme.hasValue);

			var removeMessage = null;

			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = _react2.default.createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: theme.ariaOnly, 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return _react2.default.createElement(
				'div',
				{ ref: function ref(_ref7) {
						return _this9.wrapper = _ref7;
					},
					className: className,
					style: this.props.wrapperStyle
				},
				this.renderHiddenField(valueArray),
				_react2.default.createElement(
					'div',
					{ ref: function ref(_ref6) {
							return _this9.control = _ref6;
						},
						className: theme.control,
						style: this.props.style,
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchStart: this.handleTouchStart,
						onTouchMove: this.handleTouchMove
					},
					_react2.default.createElement(
						'span',
						{ className: theme.multiValueWrapper, id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
			);
		}
	}]);

	return Select;
}(_react.Component)) || _class);
Select.displayName = 'Select';
Select.propTypes = _extends({}, _Select.propTypes, Select.propTypes);
Select.defaultProps = _extends({}, _Select.defaultProps, Select.defaultProps);


Select.Async = _Async2.default;
Select.AsyncCreatable = _AsyncCreatable2.default;
Select.Creatable = _Creatable2.default;

exports.default = Select;