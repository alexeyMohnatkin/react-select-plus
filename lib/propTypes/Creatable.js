'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.propTypes = exports.defaultProps = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _defaultFilterOptions = require('../utils/defaultFilterOptions');

var _defaultFilterOptions2 = _interopRequireDefault(_defaultFilterOptions);

var _defaultMenuRenderer = require('../utils/defaultMenuRenderer');

var _defaultMenuRenderer2 = _interopRequireDefault(_defaultMenuRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isOptionUnique(_ref) {
	var option = _ref.option,
	    options = _ref.options,
	    labelKey = _ref.labelKey,
	    valueKey = _ref.valueKey;

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
}

function isValidNewOption(_ref2) {
	var label = _ref2.label;

	return !!label;
}

function newOptionCreator(_ref3) {
	var label = _ref3.label,
	    labelKey = _ref3.labelKey,
	    valueKey = _ref3.valueKey,
	    className = _ref3.className;

	var option = {};

	option[valueKey] = label;
	option[labelKey] = label;
	option.className = className;
	return option;
}

function promptTextCreator(label) {
	return 'Create option "' + label + '"';
}

function shouldKeyDownEventCreateNewOption(_ref4) {
	var keyCode = _ref4.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;

		default:
			return false;
	}
}

// Default prop methods
// Creatable.isOptionUnique = isOptionUnique;
// Creatable.isValidNewOption = isValidNewOption;
// Creatable.newOptionCreator = newOptionCreator;
// Creatable.promptTextCreator = promptTextCreator;
// Creatable.shouldKeyDownEventCreateNewOption = shouldKeyDownEventCreateNewOption;

var defaultProps = exports.defaultProps = {
	filterOptions: _defaultFilterOptions2.default,
	isOptionUnique: isOptionUnique,
	isValidNewOption: isValidNewOption,
	menuRenderer: _defaultMenuRenderer2.default,
	newOptionCreator: newOptionCreator,
	promptTextCreator: promptTextCreator,
	shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
};

var propTypes = exports.propTypes = {
	// Child function responsible for creating the inner Select component
	// This component can be used to compose HOCs (eg Creatable and Async)
	// (props: Object): PropTypes.element
	children: _propTypes2.default.func,

	// See Select.propTypes.filterOptions
	filterOptions: _propTypes2.default.any,

	// Searches for any matching option within the set of options.
	// This function prevents duplicate options from being created.
	// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
	isOptionUnique: _propTypes2.default.func.isRequired,

	// Determines if the current input text represents a valid option.
	// ({ label: string }): boolean
	isValidNewOption: _propTypes2.default.func,

	// See Select.propTypes.menuRenderer
	menuRenderer: _propTypes2.default.any,

	// Factory to create new option.
	// ({ label: string, labelKey: string, valueKey: string }): Object
	newOptionCreator: _propTypes2.default.func,

	// input change handler: function (inputValue) {}
	onInputChange: _propTypes2.default.func,

	// input keyDown handler: function (event) {}
	onInputKeyDown: _propTypes2.default.func,

	// new option click handler: function (option) {}
	onNewOptionClick: _propTypes2.default.func,

	// See Select.propTypes.options
	options: _propTypes2.default.array,

	// Creates prompt/placeholder option text.
	// (filterText: string): string
	promptTextCreator: _propTypes2.default.func,

	// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
	shouldKeyDownEventCreateNewOption: _propTypes2.default.func
};