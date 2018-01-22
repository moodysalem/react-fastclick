import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FastClick from './index.jsx';
import ReactTestUtils from 'react-dom/test-utils';
import assert from 'assert';

const { Simulate } = ReactTestUtils;

class ChangeOnClick extends Component {
  state = {
    clicked: false
  };

  clicked() {
    this.setState({ clicked: true });
  }

  render() {
    const { clicked } = this.state;
    return (
      <FastClick>
        <div id="showclicked" onClick={() => this.clicked()}>{clicked ? 'clicked' : 'notclicked'}</div>
      </FastClick>
    );
  }
}

describe('react-fastclick-alt', function () {
  var test, showClicked, sc;
  beforeEach(function () {
    document.body.innerHTML = '<div id="test"></div>';
    test = document.getElementById('test');
    ReactDOM.render(<ChangeOnClick/>, test);
    showClicked = document.getElementById('showclicked');
    sc = showClicked;
  });

  var wasClicked = function () {
    return showClicked.innerText === 'clicked';
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
    Simulate.touchStart(sc, { touches: [ ti ], targetTouches: [ ti ] });
    Simulate.touchEnd(sc, { touches: [], targetTouches: [], changedTouches: [ ti ] });

    assert(wasClicked());
  });

  it('shows clicked when tapped for 100ms', function (done) {
    assert(!wasClicked());

    var ti = { identifier: 0, screenX: 0, screenY: 0, target: sc };
    Simulate.touchStart(sc, { touches: [ ti ], targetTouches: [ ti ] });
    setTimeout(function () {
      Simulate.touchEnd(sc, { touches: [], targetTouches: [], changedTouches: [ ti ] });

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
    Simulate.touchStart(sc, { touches: [ ti ], targetTouches: [ ti ] });
    Simulate.touchEnd(sc, { touches: [], targetTouches: [], changedTouches: [ te ] });

    assert(wasClicked());
  });

  it('not clicked when finger moves for >15px', function () {
    assert(!wasClicked());

    var ti = { identifier: 0, screenX: 0, screenY: 0, target: sc };
    var te = { identifier: 0, screenX: 12, screenY: 12, target: sc };
    Simulate.touchStart(sc, { touches: [ ti ], targetTouches: [ ti ] });
    Simulate.touchEnd(sc, { touches: [], targetTouches: [], changedTouches: [ te ] });

    assert(!wasClicked());
  });

});
