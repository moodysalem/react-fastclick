'use strict';

var React = require('react');
var fastclick = React.createFactory(require('./index.js'));
var rtu = require('react-addons-test-utils');
var assert = require('assert');

var renderer = rtu.createRenderer();
var d = React.DOM;

var sim = rtu.Simulate;

it('triggers click events on tap (to be implemented)', function () {
  renderer.render(fastclick({}, d.div({}, 'hello world')));
  var out = renderer.getRenderOutput();

  // TO-DO we probably need to move this to a browser to actually test the behavior unfortunately.


});