'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Creatable = require('./propTypes/Creatable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function defaultChildren(props) {
	return _react2.default.createElement(_Select2.default, props);
}

var Creatable = (_dec = (0, _reactCssThemr.themr)('React-Select-Plus'), _dec(_class = function (_Component) {
	_inherits(Creatable, _Component);

	function Creatable(props) {
		_classCallCheck(this, Creatable);

		var _this = _possibleConstructorReturn(this, (Creatable.__proto__ || Object.getPrototypeOf(Creatable)).call(this, props));

		_this.createNewOption = _this.createNewOption.bind(_this);
		_this.filterOptions = _this.filterOptions.bind(_this);
		_this.isOptionUnique = _this.isOptionUnique.bind(_this);
		_this.menuRenderer = _this.menuRenderer.bind(_this);
		_this.onInputChange = _this.onInputChange.bind(_this);
		_this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
		_this.onOptionSelect = _this.onOptionSelect.bind(_this);
		_this.focus = _this.focus.bind(_this);
		return _this;
	}

	_createClass(Creatable, [{
		key: 'createNewOption',
		value: function createNewOption() {
			var _props = this.props,
			    isValidNewOption = _props.isValidNewOption,
			    newOptionCreator = _props.newOptionCreator,
			    onNewOptionClick = _props.onNewOptionClick,
			    _props$options = _props.options,
			    options = _props$options === undefined ? [] : _props$options,
			    shouldKeyDownEventCreateNewOption = _props.shouldKeyDownEventCreateNewOption;


			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var isOptionUnique = this.isOptionUnique({ option: option });

				// Don't add the same option twice.
				if (isOptionUnique) {
					if (onNewOptionClick) {
						onNewOptionClick(option);
					} else {
						options.unshift(option);

						this.select.selectValue(option);
					}
				}
			}
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions() {
			var _props2 = this.props,
			    filterOptions = _props2.filterOptions,
			    isValidNewOption = _props2.isValidNewOption,
			    options = _props2.options,
			    promptTextCreator = _props2.promptTextCreator,
			    theme = _props2.theme;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.

			var excludeOptions = (arguments.length <= 2 ? undefined : arguments[2]) || [];

			var filteredOptions = filterOptions.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var newOptionCreator = this.props.newOptionCreator;


				var option = newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey,
					className: theme.createOptionPlaceholder
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var isOptionUnique = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (isOptionUnique) {
					var prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = newOptionCreator({
						label: prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey,
						className: theme.createOptionPlaceholder
					});

					filteredOptions.unshift(this._createPlaceholderOption);
				}
			}

			return filteredOptions;
		}
	}, {
		key: 'isOptionUnique',
		value: function isOptionUnique(_ref) {
			var option = _ref.option,
			    options = _ref.options;
			var isOptionUnique = this.props.isOptionUnique;

			var resOptions = options || this.select.filterFlatOptions();

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: resOptions,
				valueKey: this.valueKey
			});
		}
	}, {
		key: 'menuRenderer',
		value: function menuRenderer(params) {
			var menuRenderer = this.props.menuRenderer;


			return menuRenderer(_extends({}, params, {
				onSelect: this.onOptionSelect,
				selectValue: this.onOptionSelect
			}));
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(input) {
			var onInputChange = this.props.onInputChange;


			if (onInputChange) {
				onInputChange(input);
			}

			// This value may be needed in between Select mounts (when this.select is null)
			this.inputValue = input;
		}
	}, {
		key: 'onInputKeyDown',
		value: function onInputKeyDown(event) {
			var _props3 = this.props,
			    shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption,
			    onInputKeyDown = _props3.onInputKeyDown;

			console.log(this.select);
			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			} else if (onInputKeyDown) {
				onInputKeyDown(event);
			}
		}
	}, {
		key: 'onOptionSelect',
		value: function onOptionSelect(option, event) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props4 = this.props,
			    newOptionCreator = _props4.newOptionCreator,
			    shouldKeyDownEventCreateNewOption = _props4.shouldKeyDownEventCreateNewOption,
			    restProps = _objectWithoutProperties(_props4, ['newOptionCreator', 'shouldKeyDownEventCreateNewOption']);

			// We can't use destructuring default values to set the children,
			// because it won't apply work if `children` is null. A falsy check is
			// more reliable in real world use-cases.

			var children = this.props.children || defaultChildren;

			var props = _extends({}, restProps, {
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				innerRef: function innerRef(ref) {
					_this2.select = ref;

					// These values may be needed in between Select mounts (when this.select is null)
					if (ref) {
						_this2.labelKey = ref.props.labelKey;
						_this2.valueKey = ref.props.valueKey;
					}
				}
			});
			return children(props);
			// return <Select {...props} />;
		}
	}]);

	return Creatable;
}(_react.Component)) || _class);
Creatable.displayName = 'CreatableSelect';
Creatable.propTypes = _Creatable.propTypes;
Creatable.defaultProps = _extends({}, _Creatable.defaultProps, Creatable.defaultProps);


module.exports = Creatable;