# react-fastclick
Wrapper div that implements the FastClick logic in its touch events, triggering appropriate click and focus events on
its children if it detects a 'tap'.

# Install
    npm install --save react-fastclick-alt

# Component Usage
Wrap your component in an instance of this component, and it should respond to short taps with immediate click
events.

    var React = require('react');
    var FastClick = require('react-fastclick-alt');
    var ReactDOM = require('react-dom');
    ReactDOM.render(FastClick({}, MyApp()), document.getElementById('app'));

## Properties
There are two optional props to this component.

### threshold (Number)
How far a touch can move before it can no longer be converted to a click, in px. Defaults to 15px.


### timeThreshold (Number)
How long a tap can be held before it can no longer be converted to a click, in milliseconds. Defaults to 125ms.
