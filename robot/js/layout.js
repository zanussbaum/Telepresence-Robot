'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Title() {
	return React.createElement(
		"h1",
		null,
		"Welcome to the Telepresence Robot"
	);
}

function Button(props) {
	return React.createElement(
		"button",
		{ className: "control", onClick: props.onClick },
		props.value
	);
}

var Header = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "header" },
				React.createElement(Title, null)
			);
		}
	}]);

	return Header;
}(React.Component);

var ButtonContainer = function (_React$Component2) {
	_inherits(ButtonContainer, _React$Component2);

	function ButtonContainer() {
		_classCallCheck(this, ButtonContainer);

		return _possibleConstructorReturn(this, (ButtonContainer.__proto__ || Object.getPrototypeOf(ButtonContainer)).apply(this, arguments));
	}

	_createClass(ButtonContainer, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "container" },
				React.createElement(
					"table",
					null,
					React.createElement(
						"tbody",
						null,
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								React.createElement(Button, { value: "Camera Up" }),
								React.createElement(Button, { value: "Camera Down" }),
								React.createElement(Button, { value: "Camera Left" }),
								React.createElement(Button, { value: "Camera Right" })
							)
						)
					)
				)
			);
		}
	}]);

	return ButtonContainer;
}(React.Component);

var Video = function (_React$Component3) {
	_inherits(Video, _React$Component3);

	function Video(props) {
		_classCallCheck(this, Video);

		var _this3 = _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this, props));

		_this3.state = {
			baseSite: window.location.href
		};
		return _this3;
	}

	_createClass(Video, [{
		key: "render",
		value: function render() {
			var feed = "video_feed";

			var path = this.state.baseSite + feed;

			return React.createElement("img", { src: path });
		}
	}]);

	return Video;
}(React.Component);

var Body = function (_React$Component4) {
	_inherits(Body, _React$Component4);

	function Body() {
		_classCallCheck(this, Body);

		return _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).apply(this, arguments));
	}

	_createClass(Body, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "body" },
				React.createElement(
					"div",
					{ className: "video" },
					React.createElement(Video, null),
					React.createElement(ButtonContainer, null)
				)
			);
		}
	}]);

	return Body;
}(React.Component);

var Webpage = function (_React$Component5) {
	_inherits(Webpage, _React$Component5);

	function Webpage() {
		_classCallCheck(this, Webpage);

		return _possibleConstructorReturn(this, (Webpage.__proto__ || Object.getPrototypeOf(Webpage)).apply(this, arguments));
	}

	_createClass(Webpage, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(Header, null),
				React.createElement(
					"div",
					{ className: "body" },
					React.createElement(Body, null)
				)
			);
		}
	}]);

	return Webpage;
}(React.Component);

var domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(Webpage, null), domContainer);