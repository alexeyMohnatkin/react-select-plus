'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = clearRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clearRenderer(_ref) {
	var theme = _ref.theme;

	return _react2.default.createElement('span', {
		className: theme.clear,
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
}