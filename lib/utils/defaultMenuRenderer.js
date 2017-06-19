'use strict';

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isGroup(option) {
	return option && Array.isArray(option.options);
}

function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption,
	    instancePrefix = _ref.instancePrefix,
	    labelKey = _ref.labelKey,
	    onFocus = _ref.onFocus,
	    onOptionRef = _ref.onOptionRef,
	    onSelect = _ref.onSelect,
	    optionClassName = _ref.optionClassName,
	    optionComponent = _ref.optionComponent,
	    optionGroupComponent = _ref.optionGroupComponent,
	    optionRenderer = _ref.optionRenderer,
	    options = _ref.options,
	    valueArray = _ref.valueArray,
	    valueKey = _ref.valueKey,
	    theme = _ref.theme;

	var OptionGroup = optionGroupComponent;
	var Option = optionComponent;
	var renderLabel = optionRenderer || this.getOptionLabel;

	var renderOptions = function renderOptions(optionsSubset) {
		return optionsSubset.map(function (option, i) {
			if (isGroup(option)) {
				return _react2.default.createElement(
					OptionGroup,
					{
						className: theme.optionGroup,
						key: 'option-group-' + i,
						label: renderLabel(option),
						option: option,
						optionIndex: i
					},
					renderOptions(option.options)
				);
			}
			var isSelected = valueArray && valueArray.indexOf(option) > -1;
			var isFocused = option === focusedOption;
			var optionRef = isFocused ? 'focused' : null;
			var optionClass = (0, _classnames2.default)(theme.option, optionClassName, isSelected && theme.isSelected, isFocused && theme.isFocused, option.disabled && theme.isDisabled);

			return _react2.default.createElement(
				Option,
				{
					className: optionClass,
					instancePrefix: instancePrefix,
					isDisabled: option.disabled,
					isFocused: isFocused,
					isSelected: isSelected,
					key: 'option-' + i + '-' + option[valueKey],
					onFocus: onFocus,
					onSelect: onSelect,
					option: option,
					optionIndex: i,
					ref: function ref(_ref2) {
						onOptionRef(_ref2, isFocused);
					}
				},
				renderLabel(option, i)
			);
		});
	};

	return renderOptions(options);
}

module.exports = menuRenderer;