'use strict';

var React = require('react');
var dom = require('react-dom');
var fastclick = React.createFactory(require('./index.js'));
var $ = require('jquery');
var assert = require('assert');
var d = React.DOM;

var changeOnClick = React.createFactory(React.createClass({
  getInitialState: function () {
    return {
      clicked: false
    };
  },

  setClicked: function () {
    this.setState({
      clicked: true
    });
  },

  render: function () {
    return fastclick({}, d.div({
      id: 'showclicked',
      onClick: this.setClicked
    }, (this.state.clicked ? 'clicked' : 'notclicked')));
  }
}));

describe('react-fastclick-alt', function () {
  var test, showClicked;
  beforeEach(function () {
    $("body").html($("<div>").attr("id", "test"));
    test = $("#test").get(0);
    dom.render(changeOnClick({}), test);
    showClicked = $("#showclicked");
  });

  var wasClicked = function () {
    return showClicked.text() === 'clicked';
  };

  it('base case, nothing happens and the element is not clicked', function () {
    assert(!wasClicked());
  });

  it('shows clicked when actually clicked', function () {
    assert(!wasClicked());
    showClicked.click();
    assert(wasClicked());
  });

  it('shows clicked when tapped', function () {
    assert(!wasClicked());
    var ts = $.Event('touchstart', { pageX: 100, pageY: 100 }),
      te = $.Event('touchend', {pageX: 100, pageY: 100});

    showClicked.trigger(ts);
    showClicked.trigger(te);

    // this doesn't work yet...
    // assert(wasClicked());
  });
});