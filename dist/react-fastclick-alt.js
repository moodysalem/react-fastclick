(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactFastClick"] = factory(require("react"));
	else
		root["ReactFastClick"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp2;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var isFocused = function isFocused(el) {
	  return document.activeElement === el;
	};

	var isTag = function isTag(el, tagName) {
	  return el && typeof el.tagName === 'string' && el.tagName.toLowerCase() === tagName.toLowerCase();
	};

	var isInput = function isInput(el) {
	  return isTag(el, 'input');
	};

	var isFocusedInput = function isFocusedInput(el) {
	  return isInput(el) && isFocused(el);
	};

	var isCheckbox = function isCheckbox(el) {
	  return isInput(el) && el.type && el.type.toLowerCase() === 'checkbox';
	};

	var isSelect = function isSelect(el) {
	  return isTag(el, 'select');
	};

	var isTextArea = function isTextArea(el) {
	  return isTag(el, 'textarea');
	};

	var isFocusedTextArea = function isFocusedTextArea(el) {
	  return isFocused(el) && isTextArea(el);
	};

	var ReactFastClick = (_temp2 = _class = function (_Component) {
	  _inherits(ReactFastClick, _Component);

	  function ReactFastClick() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, ReactFastClick);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactFastClick)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	      touchId: null,
	      touchX: null,
	      touchY: null,
	      touchTime: null
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(ReactFastClick, [{
	    key: 'shouldComponentUpdate',


	    /**
	     * We only re-render if the children have changed-the state changes in this component do not affect the rendered html
	     * @param nextProps
	     * @returns {boolean}
	     */
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.children !== nextProps.children;
	    }

	    /**
	     * Clear all touch data
	     * @param callback
	     */

	  }, {
	    key: 'clearTouchData',
	    value: function clearTouchData(callback) {
	      this.setState({
	        touchId: null,
	        touchX: null,
	        touchY: null,
	        touchTime: null
	      }, callback);
	    }

	    /**
	     * Handle the touch start event
	     * @param e
	     */

	  }, {
	    key: 'handleTouchStart',
	    value: function handleTouchStart(e) {
	      // one+ touches means the user isn't trying to tap this element
	      if (e.touches.length !== 1 || e.targetTouches.length !== 1) {
	        this.clearTouchData();
	        return;
	      }

	      var tch = e.targetTouches[0];

	      this.setState({
	        touchId: tch.identifier,
	        touchX: tch.screenX,
	        touchY: tch.screenY,
	        touchTime: new Date().getTime()
	      });
	    }

	    /**
	     * Handle the touch move event
	     * @param e
	     */

	  }, {
	    key: 'handleTouchMove',
	    value: function handleTouchMove(e) {
	      var touchId = this.state.touchId;
	      var threshold = this.props.threshold;


	      if (touchId === null) {
	        return;
	      }

	      if (e.touches.length !== 1 || e.targetTouches.length !== 1) {
	        this.clearTouchData();
	        return;
	      }

	      var touch = e.targetTouches[0];
	      if (touchId !== touch.identifier) {
	        this.clearTouchData();
	        return;
	      }

	      // verify that the touch did not move outside the threshold
	      var dist = this.calculateTouchDistanceFromOrigin(touch);
	      // if it was moved farther than the allowed amount, then we should cancel the touch
	      if (dist > threshold) {
	        this.clearTouchData();
	      }
	    }
	  }, {
	    key: 'calculateTouchDistanceFromOrigin',
	    value: function calculateTouchDistanceFromOrigin(touch) {
	      var _state = this.state;
	      var touchX = _state.touchX;
	      var touchY = _state.touchY;
	      var screenX = touch.screenX;
	      var screenY = touch.screenY;


	      return Math.sqrt(Math.pow(screenX - touchX, 2) + Math.pow(screenY - touchY, 2));
	    }
	  }, {
	    key: 'handleTouchEnd',
	    value: function handleTouchEnd(e) {
	      var _state2 = this.state;
	      var touchId = _state2.touchId;
	      var touchTime = _state2.touchTime;
	      var _props = this.props;
	      var timeThreshold = _props.timeThreshold;
	      var threshold = _props.threshold;


	      if (touchId === null) {
	        return;
	      }

	      if (timeThreshold !== null) {
	        // length of press exceeds the amount of time that we are doing anything for
	        if (new Date().getTime() - touchTime > timeThreshold) {
	          this.clearTouchData();
	          return;
	        }
	      }

	      // still a touch remaining
	      if (e.touches.length !== 0) {
	        this.clearTouchData();
	        return;
	      }

	      // get the touch from the list of changed touches
	      var touch = null;
	      for (var i = 0; i < e.changedTouches.length; i++) {
	        var oneTouch = e.changedTouches[i];
	        if (oneTouch.identifier === this.state.touchId) {
	          touch = oneTouch;
	          break;
	        }
	      }

	      if (touch === null) {
	        this.clearTouchData();
	        return;
	      }

	      // verify that the touch did not move outside the threshold
	      var dist = this.calculateTouchDistanceFromOrigin(touch);
	      // if it was moved farther than the allowed amount, then we should cancel the touch
	      if (dist > threshold) {
	        this.clearTouchData();
	        return;
	      }

	      var targetEl = touch.target;

	      // if it's an input where typing is allowed and it's already focused,
	      // don't do anything. this is probably an attempt to move the cursor
	      if ((isFocusedInput(targetEl) || isFocusedTextArea(targetEl)) && !isCheckbox(targetEl)) {
	        this.clearTouchData();
	        return;
	      }

	      // prevent the simulated mouse events
	      e.preventDefault();
	      // we don't need this touch end event to be handled multiple times if it's interpreted as a click
	      e.stopPropagation();
	      // clear the data and then trigger the click
	      this.clearTouchData(function () {
	        ReactFastClick.triggerClick(targetEl);
	      });
	    }
	  }, {
	    key: 'handleTouchCancel',
	    value: function handleTouchCancel() {
	      this.clearTouchData();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var children = this.props.children;


	      var touchProps = {
	        onTouchStart: function onTouchStart(e) {
	          return _this2.handleTouchStart(e);
	        },
	        onTouchMove: function onTouchMove(e) {
	          return _this2.handleTouchMove(e);
	        },
	        onTouchEnd: function onTouchEnd(e) {
	          return _this2.handleTouchEnd(e);
	        },
	        onTouchCancel: function onTouchCancel(e) {
	          return _this2.handleTouchCancel(e);
	        }
	      };

	      return _react2.default.createElement(
	        'span',
	        touchProps,
	        children
	      );
	    }
	  }], [{
	    key: 'triggerClick',
	    value: function triggerClick(target) {
	      while (target && typeof target.click !== "function") {
	        target = target.parentNode;
	      }

	      if (!target) {
	        return;
	      }

	      target.click();

	      // if it's an input and not a checkbox, focus it
	      // or if it's a select
	      // or if it's a textarea
	      if (isInput(target) && !isCheckbox(target) || isSelect(target) || isTextArea(target)) {
	        target.focus();
	      }
	    }
	  }]);

	  return ReactFastClick;
	}(_react.Component), _class.propTypes = {
	  // The number of px that the finger may move before the gesture is no longer considered a tap
	  threshold: _react2.default.PropTypes.number,
	  // The amount of time in ms that the finger may be down before the gesture is no longer considered a tap by this
	  // component
	  timeThreshold: _react2.default.PropTypes.number
	}, _class.defaultProps = {
	  threshold: 15,
	  timeThreshold: 125
	}, _temp2);
	exports.default = ReactFastClick;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;