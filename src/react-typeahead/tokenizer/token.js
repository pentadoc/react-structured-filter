"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = window.React || require('react');

/**
 * Encapsulates the rendering of an option that has been "selected" in a
 * TypeaheadTokenizer
 */
var Token = React.createClass({
  displayName: "Token",

  propTypes: {
    children: React.PropTypes.object,
    onRemove: React.PropTypes.func
  },

  render: function render() {
    return React.createElement(
      "div",
      _extends({}, this.props, { className: "typeahead-token" }),
      this.props.children["category"],
      " ",
      this.props.children["operator"],
      " \"",
      this.props.children["value"],
      "\"",
      this._makeCloseButton()
    );
  },

  _makeCloseButton: function _makeCloseButton() {
    if (!this.props.onRemove) {
      return "";
    }
    return React.createElement(
      "a",
      { className: "typeahead-token-close", href: "#", onClick: (function (event) {
          this.props.onRemove(this.props.children);
          event.preventDefault();
        }).bind(this) },
      "×"
    );
  }
});

module.exports = Token;