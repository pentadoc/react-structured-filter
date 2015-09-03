"use strict";

var React = require('react/addons');

/**
 * A single option within the TypeaheadSelector
 */
var TypeaheadOption = React.createClass({
  displayName: "TypeaheadOption",

  propTypes: {
    customClasses: React.PropTypes.object,
    onClick: React.PropTypes.func,
    children: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      customClasses: {},
      onClick: function onClick(event) {
        event.preventDefault();
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      hover: false
    };
  },

  render: function render() {
    var classes = {
      hover: this.props.hover
    };
    classes[this.props.customClasses.listItem] = !!this.props.customClasses.listItem;
    var classList = React.addons.classSet(classes);

    return React.createElement(
      "li",
      { className: classList, onClick: this._onClick },
      React.createElement(
        "a",
        { href: "#", className: this._getClasses(), ref: "anchor" },
        this.props.children
      )
    );
  },

  _getClasses: function _getClasses() {
    var classes = {
      "typeahead-option": true
    };
    classes[this.props.customClasses.listAnchor] = !!this.props.customClasses.listAnchor;
    return React.addons.classSet(classes);
  },

  _onClick: function _onClick() {
    return this.props.onClick();
  }
});

module.exports = TypeaheadOption;
