'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrowRenderer = function arrowRenderer(_ref) {
	var theme = _ref.theme,
	    onMouseDown = _ref.onMouseDown;

	return _react2.default.createElement('span', {
		className: theme.arrow,
		onMouseDown: onMouseDown
	});
};

exports.default = arrowRenderer;