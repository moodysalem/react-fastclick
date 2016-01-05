'use strict';

var React = require('react');
var assign = require('object-assign');

var d = React.DOM;

var isFocused = function (el) {
  return el && el === document.activeElement;
};

var isInput = function (el) {
  return el && el.tagName === 'input';
};

var isFocusedInput = function (el) {
  return el && isInput(el) && isFocused(el);
};

var isCheckbox = function (el) {
  return el && isInput(el) && el.type === 'checkbox';
};

var isSelect = function (el) {
  return el && el.tagName === 'select';
};
var isTextArea = function (el) {
  return el && el.tagName === 'textarea';
};
var isFocusedTextArea = function (el) {
  return isFocused(el) && isTextArea(el);
};

module.exports = React.createClass({
  displayName: "React FastClick",

  propTypes: {
    // the number of px that the finger can move before the touch should no longer trigger the click event at touch end
    threshold: React.PropTypes.number,
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

    var target = tch.target;

    // if it's an input where typing is allowed and it's already focused,
    // don't do anything. this is probably an attempt to move the cursor
    if ((isFocusedInput(target) || isFocusedTextArea(el)) && !isCheckbox(el)) {
      this.clearTouchData();
      return;
    }

    // prevent the simulated mouse events
    e.preventDefault();
    // we don't need this touch end event to be handled multiple times if it's interpreted as a click
    e.stopPropagation();
    // clear the data and then trigger the click
    this.clearTouchData(function () {
      this.triggerClick(target);
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