# [![Build Status](https://travis-ci.org/moodysalem/react-fastclick.svg)](https://travis-ci.org/moodysalem/react-fastclick) [![npm version](https://img.shields.io/npm/v/react-fastclick-alt.svg)](https://www.npmjs.com/package/react-fastclick-alt) react-fastclick

Wrapper div that implements the FastClick logic in its touch events, triggering appropriate click and focus events on
its children if it detects a 'tap'.

## Deprecation
This isn't needed now that iOS and Android have both eliminated the click delay in their native browsers for pages that can't zoom

# Demo
[Live Demo](http://moodysalem.github.io/react-fastclick/)

# Install

    npm install --save-dev react-fastclick-alt

# Component Usage
Wrap your component in an instance of this component, and it should respond to short taps with immediate click
events.

    var React = require('react');
    var FastClick = require('react-fastclick-alt');
    var ReactDOM = require('react-dom');
    ReactDOM.render(<FastClick><MyApp/></FastClick>, document.getElementById('app'));
    
Note this is safe to do even if child components include react-fastclick-alt because a touchend event that triggers
a click will not be propagated.

## Properties
There are two optional props to this component.

### threshold (Number)
How far a touch can move before it can no longer be converted to a click, in px. Defaults to 15px.


### timeThreshold (Number)
How long a tap can be held before it can no longer be converted to a click, in milliseconds. Defaults to 125ms.
