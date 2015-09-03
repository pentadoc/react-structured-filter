'use strict';

var React = require('react/addons');
var moment = require('moment');

var Day = React.createClass({
  displayName: 'Day',

  handleClick: function handleClick(event) {
    if (this.props.disabled) return;

    this.props.onClick(event);
  },

  render: function render() {
    classes = React.addons.classSet({
      'datepicker__day': true,
      'datepicker__day--disabled': this.props.disabled,
      'datepicker__day--selected': this.props.day.sameDay(this.props.selected),
      'datepicker__day--today': this.props.day.sameDay(moment())
    });

    return React.createElement(
      'div',
      { className: classes, onClick: this.handleClick },
      this.props.day.day()
    );
  }
});

module.exports = Day;