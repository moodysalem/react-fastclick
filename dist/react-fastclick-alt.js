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

	var React = __webpack_require__(1);
	var assign = __webpack_require__(2);

	var d = React.DOM;

	var isFocused = function (el) {
	  return document.activeElement === el;
	};

	var isTag = function (el, tagName) {
	  return el && typeof el.tagName === 'string' && el.tagName.toLowerCase() === tagName.toLowerCase();
	};

	var isInput = function (el) {
	  return isTag(el, 'input');
	};

	var isFocusedInput = function (el) {
	  return isInput(el) && isFocused(el);
	};

	var isCheckbox = function (el) {
	  return isInput(el) && el.type && el.type.toLowerCase() === 'checkbox';
	};

	var isSelect = function (el) {
	  return isTag(el, 'select');
	};

	var isTextArea = function (el) {
	  return isTag(el, 'textarea');
	};

	var isFocusedTextArea = function (el) {
	  return isFocused(el) && isTextArea(el);
	};

	module.exports = React.createClass({
	  displayName: "React FastClick",

	  propTypes: {
	    // The number of px that the finger may move before the gesture is no longer considered a tap
	    threshold: React.PropTypes.number,
	    // The amount of time in ms that the finger may be down before the gesture is no longer considered a tap by this
	    // component
	    timeThreshold: React.PropTypes.number
	  },

	  getDefaultProps: function () {
	    return {
	      threshold: 15,
	      timeThreshold: 125
	    };
	  },

	  shouldComponentUpdate: function (nextProps) {
	    return this.props.children !== nextProps.children;
	  },

	  getInitialState: function () {
	    return {
	      touchId: null,
	      touchX: null,
	      touchY: null,
	      touchTime: null
	    };
	  },

	  // clear the touch data we've gathered
	  clearTouchData: function (callback) {
	    if (this.isMounted()) {
	      this.setState({
	        touchId: null,
	        touchX: null,
	        touchY: null,
	        touchTime: null
	      }, callback);
	    }
	  },

	  handleTouchStart: function (e) {
	    // one+ touches means the user isn't trying to tap this element
	    if (e.touches.length !== 1 || e.targetTouches.length !== 1) {
	      this.clearTouchData();
	      return;
	    }
	    var tch = e.targetTouches[ 0 ];
	    this.setState({
	      touchId: tch.identifier,
	      touchX: tch.screenX,
	      touchY: tch.screenY,
	      touchTime: (new Date()).getTime()
	    });
	  },

	  handleTouchMove: function (e) {
	    if (this.state.touchId === null) {
	      return;
	    }

	    if (e.touches.length !== 1 || e.targetTouches.length !== 1) {
	      this.clearTouchData();
	      return;
	    }

	    var tch = e.targetTouches[ 0 ];
	    if (this.state.touchId !== tch.identifier) {
	      this.clearTouchData();
	      return;
	    }

	    // verify that the touch did not move outside the threshold
	    var dist = Math.sqrt(Math.pow(tch.screenX - this.state.touchX, 2) + Math.pow(tch.screenY - this.state.touchY, 2));
	    // if it was moved farther than the allowed amount, then we should cancel the touch
	    if (dist > this.props.threshold) {
	      this.clearTouchData();
	    }
	  },

	  handleTouchEnd: function (e) {
	    if (this.state.touchId === null) {
	      return;
	    }

	    if (this.props.timeThreshold !== null) {
	      // length of press exceeds the amount of time that we are doing anything for
	      if (((new Date()).getTime() - this.state.touchTime > this.props.timeThreshold)) {
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
	    var tch = null;
	    for (var i = 0; i < e.changedTouches.length; i++) {
	      var oneTouch = e.changedTouches[ i ];
	      if (oneTouch.identifier === this.state.touchId) {
	        tch = oneTouch;
	        break;
	      }
	    }

	    if (tch === null) {
	      this.clearTouchData();
	      return;
	    }

	    var targetEl = tch.target;

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
	      this.triggerClick(targetEl);
	    });
	  },

	  handleTouchCancel: function () {
	    this.clearTouchData();
	  },

	  triggerClick: function (target) {
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
	    if ((isInput(target) && !isCheckbox(target)) || isSelect(target) || isTextArea(target)) {
	      target.focus();
	    }
	  },

	  render: function () {
	    return d.span(assign({}, this.props, {
	      onTouchStart: this.handleTouchStart,
	      onTouchMove: this.handleTouchMove,
	      onTouchEnd: this.handleTouchEnd,
	      onTouchCancel: this.handleTouchCancel
	    }), this.props.children);
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }
/******/ ])
});
;