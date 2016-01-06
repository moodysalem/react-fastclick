'use strict';

var React = require('react');
var dom = require('react-dom');
var fastclick = React.createFactory(require('./index.js'));
var rtu = require('react-addons-test-utils');
var sim = rtu.Simulate;
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
  var test, showClicked, sc;
  beforeEach(function () {
    $("body").html($("<div>").attr("id", "test"));
    test = $("#test").get(0);
    dom.render(changeOnClick({}), test);
    showClicked = $("#showclicked");
    sc = showClicked.get(0);
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

    var ti = { identifier: 0, screenX: 0, screenY: 0, target: sc };
    sim.touchStart(sc, { touches: [ ti ], targetTouches: [ ti ] });
    sim.touchEnd(sc, { touches: [], targetTouches: [], changedTouches: [ ti ] });

    assert(wasClicked());
  });

  it('shows clicked when tapped for 100ms', function (done) {
    assert(!wasClicked());

    var ti = { identifier: 0, screenX: 0, screenY: 0, target: sc };
    sim.touchStart(sc, { touches: [ ti ], targetTouches: [ ti ] });
    setTimeout(function () {
      sim.touchEnd(sc, { touches: [], targetTouches: [], changedTouches: [ ti ] });

      if (!wasClicked()) {
        throw Error('was not clicked');
      }
      done();
    }, 100);
  });

  it('clicked when finger moves for <15px', function () {
    assert(!wasClicked());

    var ti = { identifier: 0, screenX: 0, screenY: 0, target: sc };
    var te = { identifier: 0, screenX: 10, screenY: 0, target: sc };
    sim.touchStart(sc, { touches: [ ti ], targetTouches: [ ti ] });
    sim.touchEnd(sc, { touches: [], targetTouches: [], changedTouches: [ te ] });

    assert(wasClicked());
  });

  it('not clicked when finger moves for >15px', function () {
    assert(!wasClicked());

    var ti = { identifier: 0, screenX: 0, screenY: 0, target: sc };
    var te = { identifier: 0, screenX: 12, screenY: 12, target: sc };
    sim.touchStart(sc, { touches: [ ti ], targetTouches: [ ti ] });
    sim.touchEnd(sc, { touches: [], targetTouches: [], changedTouches: [ te ] });

    assert(!wasClicked());
  });

});