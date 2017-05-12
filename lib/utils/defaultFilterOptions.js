'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stripDiacritics = require('./stripDiacritics');

var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterOptions(options, filterValue, excludeOptions, props) {
	var _this = this;

	var filteredValue = filterValue;

	if (props.ignoreAccents) {
		filteredValue = (0, _stripDiacritics2.default)(filteredValue);
	}

	if (props.ignoreCase) {
		filteredValue = filteredValue.toLowerCase();
	}

	var excludedOptions = !!excludeOptions && excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludedOptions && excludedOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(_this, option, filteredValue);
		if (!filteredValue) return true;
		var valueTest = String(option[props.valueKey]);
		var labelTest = String(option[props.labelKey]);

		if (props.ignoreAccents) {
			if (props.matchProp !== 'label') valueTest = (0, _stripDiacritics2.default)(valueTest);
			if (props.matchProp !== 'value') labelTest = (0, _stripDiacritics2.default)(labelTest);
		}
		if (props.ignoreCase) {
			if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}
		return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, filteredValue.length) === filteredValue || props.matchProp !== 'value' && labelTest.substr(0, filteredValue.length) === filteredValue : props.matchProp !== 'label' && valueTest.indexOf(filteredValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(filteredValue) >= 0;
	});
}

exports.default = filterOptions;