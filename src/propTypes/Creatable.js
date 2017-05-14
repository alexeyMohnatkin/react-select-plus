import PropTypes from 'prop-types';
import defaultFilterOptions from '../utils/defaultFilterOptions';
import defaultMenuRenderer from '../utils/defaultMenuRenderer';

function isOptionUnique({ option, options, labelKey, valueKey }) {
	return options
		.filter((existingOption) =>
			existingOption[labelKey] === option[labelKey] ||
			existingOption[valueKey] === option[valueKey]
		)
		.length === 0;
}

function isValidNewOption({ label }) {
	return !!label;
}

function newOptionCreator({ label, labelKey, valueKey, className }) {
	const option = {};

	option[valueKey] = label;
	option[labelKey] = label;
	option.className = className;
	return option;
}

function promptTextCreator(label) {
	return `Create option "${label}"`;
}

function shouldKeyDownEventCreateNewOption({ keyCode }) {
	switch (keyCode) {
		case 9:   // TAB
		case 13:  // ENTER
		case 188: // COMMA
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

export const defaultProps = {
	filterOptions: defaultFilterOptions,
	isOptionUnique,
	isValidNewOption,
	menuRenderer: defaultMenuRenderer,
	newOptionCreator,
	promptTextCreator,
	shouldKeyDownEventCreateNewOption,
};

export const propTypes = {
	// Child function responsible for creating the inner Select component
	// This component can be used to compose HOCs (eg Creatable and Async)
	// (props: Object): PropTypes.element
	children: PropTypes.func,

	// See Select.propTypes.filterOptions
	filterOptions: PropTypes.any,

	// Searches for any matching option within the set of options.
	// This function prevents duplicate options from being created.
	// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
	isOptionUnique: PropTypes.func.isRequired,

	// Determines if the current input text represents a valid option.
	// ({ label: string }): boolean
	isValidNewOption: PropTypes.func,

	// See Select.propTypes.menuRenderer
	menuRenderer: PropTypes.any,

	// Factory to create new option.
	// ({ label: string, labelKey: string, valueKey: string }): Object
	newOptionCreator: PropTypes.func,

	// input change handler: function (inputValue) {}
	onInputChange: PropTypes.func,

	// input keyDown handler: function (event) {}
	onInputKeyDown: PropTypes.func,

	// new option click handler: function (option) {}
	onNewOptionClick: PropTypes.func,

	// See Select.propTypes.options
	options: PropTypes.array,

	// Creates prompt/placeholder option text.
	// (filterText: string): string
	promptTextCreator: PropTypes.func,

	// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
	shouldKeyDownEventCreateNewOption: PropTypes.func,
};
