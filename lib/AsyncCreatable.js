'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function reduce(obj) {
	var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	return Object.keys(obj).reduce(function (props, key) {
		var value = obj[key];

		if (typeof value !== 'undefined') {
			props[key] = value;
		}
		return props;
	}, props);
}

var AsyncCreatable = function (_Component) {
	_inherits(AsyncCreatable, _Component);

	function AsyncCreatable() {
		_classCallCheck(this, AsyncCreatable);

		return _possibleConstructorReturn(this, (AsyncCreatable.__proto__ || Object.getPrototypeOf(AsyncCreatable)).apply(this, arguments));
	}

	_createClass(AsyncCreatable, [{
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				_Select2.default.Async,
				this.props,
				function (asyncProps) {
					return _react2.default.createElement(
						_Select2.default.Creatable,
						_this2.props,
						function (creatableProps) {
							return _react2.default.createElement(_Select2.default, _extends({}, reduce(asyncProps, reduce(creatableProps, {})), {
								onInputChange: function onInputChange(input) {
									creatableProps.onInputChange(input);
									return asyncProps.onInputChange(input);
								},
								ref: function ref(_ref) {
									_this2.select = _ref;
									creatableProps.ref(_ref);
									asyncProps.ref(_ref);
								}
							}));
						}
					);
				}
			);
		}
	}]);

	return AsyncCreatable;
}(_react.Component);

AsyncCreatable.displayName = 'AsyncCreatableSelect';


module.exports = AsyncCreatable;