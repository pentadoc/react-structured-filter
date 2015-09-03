'use strict';

var React = require('react/addons');
var Tether = require('tether/tether');

var Popover = React.createClass({
  displayName: 'Popover',

  componentWillMount: function componentWillMount() {
    popoverContainer = document.createElement('span');
    popoverContainer.className = 'datepicker__container';

    this._popoverElement = popoverContainer;

    document.querySelector('body').appendChild(this._popoverElement);
  },

  componentDidMount: function componentDidMount() {
    this._renderPopover();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._renderPopover();
  },

  _popoverComponent: function _popoverComponent() {
    var className = this.props.className;
    return React.createElement(
      'div',
      { className: className },
      this.props.children
    );
  },

  _tetherOptions: function _tetherOptions() {
    return {
      element: this._popoverElement,
      target: this.getDOMNode().parentElement,
      attachment: 'top left',
      targetAttachment: 'bottom left',
      targetOffset: '10px 0',
      optimizations: {
        moveElement: false // always moves to <body> anyway!
      },
      constraints: [{
        to: 'window',
        attachment: 'together',
        pin: true
      }]
    };
  },

  _renderPopover: function _renderPopover() {
    React.render(this._popoverComponent(), this._popoverElement);

    if (this._tether != null) {
      this._tether.setOptions(this._tetherOptions());
    } else {
      this._tether = new Tether(this._tetherOptions());
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this._tether.destroy();
    React.unmountComponentAtNode(this._popoverElement);
    if (this._popoverElement.parentNode) {
      this._popoverElement.parentNode.removeChild(this._popoverElement);
    }
  },

  render: function render() {
    return React.createElement('span', null);
  }
});

module.exports = Popover;