'use strict';

var React = require('react/addons');

var Popover = require('./popover');
var DateUtil = require('./util/date');
var Calendar = require('./calendar');
var DateInput = require('./date_input');

var DatePicker = React.createClass({
  displayName: 'DatePicker',

  propTypes: {
    onChange: React.PropTypes.func,
    onKeyDown: React.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      focus: true
    };
  },

  handleFocus: function handleFocus() {
    this.setState({
      focus: true
    });
  },

  hideCalendar: function hideCalendar() {
    this.setState({
      focus: false
    });
  },

  handleSelect: function handleSelect(date) {
    this.hideCalendar();
    this.setSelected(date);
  },

  setSelected: function setSelected(date) {
    this.props.onChange(date.moment());
  },

  onInputClick: function onInputClick() {
    this.setState({
      focus: true
    });
  },

  calendar: function calendar() {
    if (this.state.focus) {
      return React.createElement(
        Popover,
        null,
        React.createElement(Calendar, {
          selected: this.props.selected,
          onSelect: this.handleSelect,
          hideCalendar: this.hideCalendar,
          minDate: this.props.minDate,
          maxDate: this.props.maxDate })
      );
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(DateInput, {
        ref: 'dateinput',
        date: this.props.selected,
        dateFormat: this.props.dateFormat,
        focus: this.state.focus,
        onFocus: this.handleFocus,
        onKeyDown: this.props.onKeyDown,
        handleClick: this.onInputClick,
        handleEnter: this.hideCalendar,
        setSelected: this.setSelected,
        hideCalendar: this.hideCalendar,
        placeholderText: this.props.placeholderText }),
      this.calendar()
    );
  }
});

module.exports = DatePicker;