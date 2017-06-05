'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defaultProps = exports.propTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dropdown = require('../Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Option = require('../Option');

var _Option2 = _interopRequireDefault(_Option);

var _OptionGroup = require('../OptionGroup');

var _OptionGroup2 = _interopRequireDefault(_OptionGroup);

var _Value = require('../Value');

var _Value2 = _interopRequireDefault(_Value);

var _defaultArrowRenderer = require('../utils/defaultArrowRenderer');

var _defaultArrowRenderer2 = _interopRequireDefault(_defaultArrowRenderer);

var _defaultFilterOptions = require('../utils/defaultFilterOptions');

var _defaultFilterOptions2 = _interopRequireDefault(_defaultFilterOptions);

var _defaultMenuRenderer = require('../utils/defaultMenuRenderer');

var _defaultMenuRenderer2 = _interopRequireDefault(_defaultMenuRenderer);

var _defaultClearRenderer = require('../utils/defaultClearRenderer');

var _defaultClearRenderer2 = _interopRequireDefault(_defaultClearRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stringOrNode = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]);

var propTypes = exports.propTypes = {
	'addLabelText': _propTypes2.default.string, // placeholder displayed when you want to add a label on a multi-value input
	'aria-describedby': _propTypes2.default.string, // HTML ID(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': _propTypes2.default.string, // Aria label (for assistive tech)
	'aria-labelledby': _propTypes2.default.string, // HTML ID of an element that should be used as the label (for assistive tech)
	'arrowRenderer': _propTypes2.default.func, // Create drop-down caret element
	'hideArrowOnSingleValue': _propTypes2.default.bool, // Hide arrow on single value
	'autoBlur': _propTypes2.default.bool, // automatically blur the component when an option is selected
	'autofocus': _propTypes2.default.bool, // autofocus the component on mount
	'autosize': _propTypes2.default.bool, // whether to enable autosizing or not
	'backspaceRemoves': _propTypes2.default.bool, // whether backspace removes an item if there is no text input
	'backspaceToRemoveMessage': _propTypes2.default.string, // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	'className': _propTypes2.default.string, // className for the outer element
	'clearAllText': stringOrNode, // title for the "clear" control when multi: true
	'clearRenderer': _propTypes2.default.func, // create clearable x element
	'clearValueText': stringOrNode, // title for the "clear" control
	'clearable': _propTypes2.default.bool, // should it be possible to reset value
	'deleteRemoves': _propTypes2.default.bool, // whether backspace removes an item if there is no text input
	'delimiter': _propTypes2.default.string, // delimiter to use to join multiple values for the hidden field value
	'disabled': _propTypes2.default.bool, // whether the Select is disabled or not
	'dropdownComponent': _propTypes2.default.func, // dropdown component to render the menu in
	'escapeClearsValue': _propTypes2.default.bool, // whether escape clears the value when the menu is closed
	'filterOption': _propTypes2.default.func, // method to filter a single option (option, filterString)
	'filterOptions': _propTypes2.default.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
	'ignoreAccents': _propTypes2.default.bool, // whether to strip diacritics when filtering
	'ignoreCase': _propTypes2.default.bool, // whether to perform case-insensitive filtering
	'inputProps': _propTypes2.default.object, // custom attributes for the Input
	'inputRenderer': _propTypes2.default.func, // returns a custom input component
	'instanceId': _propTypes2.default.string, // set the components instanceId
	'isLoading': _propTypes2.default.bool, // whether the Select is loading externally or not (such as options being loaded)
	'isOpen': _propTypes2.default.bool, // whether the Select dropdown menu is open or not
	'joinValues': _propTypes2.default.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
	'labelKey': _propTypes2.default.string, // path of the label value in option objects
	'matchPos': _propTypes2.default.string, // (any|start) match the start or entire string when filtering
	'matchProp': _propTypes2.default.string, // (any|label|value) which option property to filter on
	'menuBuffer': _propTypes2.default.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
	'menuContainerStyle': _propTypes2.default.object, // optional style to apply to the menu container
	'menuRenderer': _propTypes2.default.func, // renders a custom menu with options
	'menuStyle': _propTypes2.default.object, // optional style to apply to the menu
	'multi': _propTypes2.default.bool, // multi-value input
	'name': _propTypes2.default.string, // generates a hidden <input /> tag with this field name for html forms
	'noResultsText': stringOrNode, // placeholder displayed when there are no matching search results
	'onBlur': _propTypes2.default.func, // onBlur handler: function (event) {}
	'onBlurResetsInput': _propTypes2.default.bool, // whether input is cleared on blur
	'onChange': _propTypes2.default.func, // onChange handler: function (newValue) {}
	'onClose': _propTypes2.default.func, // fires when the menu is closed
	'onCloseResetsInput': _propTypes2.default.bool, // whether input is cleared when menu is closed through the arrow
	'onFocus': _propTypes2.default.func, // onFocus handler: function (event) {}
	'onInputChange': _propTypes2.default.func, // onInputChange handler: function (inputValue) {}
	'onInputKeyDown': _propTypes2.default.func, // input keyDown handler: function (event) {}
	'onMenuScrollToBottom': _propTypes2.default.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
	'onOpen': _propTypes2.default.func, // fires when the menu is opened
	'onValueClick': _propTypes2.default.func, // onClick handler for value labels: function (value, event) {}
	'openAfterFocus': _propTypes2.default.bool, // boolean to enable opening dropdown when focused
	'openOnFocus': _propTypes2.default.bool, // always open options menu on focus
	'optionClassName': _propTypes2.default.string, // additional class(es) to apply to the <Option /> elements
	'optionComponent': _propTypes2.default.func, // option component to render in dropdown
	'optionGroupComponent': _propTypes2.default.func, // option group component to render in dropdown
	'optionRenderer': _propTypes2.default.func, // optionRenderer: function (option) {}
	'options': _propTypes2.default.array, // array of options
	'pageSize': _propTypes2.default.number, // number of entries to page when using page up/down keys
	'placeholder': stringOrNode, // field placeholder, displayed when there's no value
	'renderInvalidValues': _propTypes2.default.bool, // boolean to enable rendering values that do not match any options
	'required': _propTypes2.default.bool, // applies HTML5 required attribute when needed
	'resetValue': _propTypes2.default.any, // value to use when you clear the control
	'scrollMenuIntoView': _propTypes2.default.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	'searchable': _propTypes2.default.bool, // whether to enable searching feature or not
	'simpleValue': _propTypes2.default.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	'style': _propTypes2.default.object, // optional style to apply to the control
	'tabIndex': _propTypes2.default.string, // optional tab index of the control
	'tabSelectsValue': _propTypes2.default.bool, // whether to treat tabbing out while focused to be value selection
	'value': _propTypes2.default.any, // initial field value
	'valueComponent': _propTypes2.default.func, // value component to render
	'valueKey': _propTypes2.default.string, // path of the label value in option objects
	'valueRenderer': _propTypes2.default.func, // valueRenderer: function (option) {}
	'wrapperStyle': _propTypes2.default.object, // optional style to apply to the component wrapper
	'theme': _propTypes2.default.object
};

var defaultProps = exports.defaultProps = {
	addLabelText: 'Add "{label}"?',
	arrowRenderer: _defaultArrowRenderer2.default,
	hideArrowOnSingleValue: false,
	autosize: true,
	backspaceRemoves: true,
	backspaceToRemoveMessage: 'Press backspace to remove {label}',
	clearable: true,
	clearAllText: 'Clear all',
	clearRenderer: _defaultClearRenderer2.default,
	clearValueText: 'Clear value',
	deleteRemoves: true,
	delimiter: ',',
	disabled: false,
	dropdownComponent: _Dropdown2.default,
	escapeClearsValue: true,
	filterOptions: _defaultFilterOptions2.default,
	ignoreAccents: true,
	ignoreCase: true,
	inputProps: {},
	isLoading: false,
	joinValues: false,
	labelKey: 'label',
	matchPos: 'any',
	matchProp: 'any',
	menuBuffer: 0,
	menuRenderer: _defaultMenuRenderer2.default,
	multi: false,
	noResultsText: 'No results found',
	onBlurResetsInput: true,
	onCloseResetsInput: true,
	openAfterFocus: false,
	optionComponent: _Option2.default,
	optionGroupComponent: _OptionGroup2.default,
	pageSize: 5,
	placeholder: 'Select...',
	renderInvalidValues: false,
	required: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	valueComponent: _Value2.default,
	valueKey: 'value'
};