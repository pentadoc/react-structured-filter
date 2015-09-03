'use strict';

var React = require('react/addons');
var moment = require('moment');

var DateUtil = require('./util/date');

var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    onKeyDown: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      dateFormat: 'YYYY-MM-DD'
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.safeDateFormat(this.props.date)
    };
  },

  componentDidMount: function componentDidMount() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: this.safeDateFormat(newProps.date)
    });
  },

  toggleFocus: function toggleFocus(focus) {
    if (focus) {
      this.refs.entry.getDOMNode().focus();
    } else {
      this.refs.entry.getDOMNode().blur();
    }
  },

  handleChange: function handleChange(event) {
    var date = moment(event.target.value, this.props.dateFormat, true);

    this.setState({
      value: event.target.value
    });
  },

  safeDateFormat: function safeDateFormat(date) {
    return !!date ? date.format(this.props.dateFormat) : null;
  },

  isValueAValidDate: function isValueAValidDate() {
    var date = moment(event.target.value, this.props.dateFormat, true);

    return date.isValid();
  },

  handleEnter: function handleEnter(event) {
    if (this.isValueAValidDate()) {
      var date = moment(event.target.value, this.props.dateFormat, true);
      this.props.setSelected(new DateUtil(date));
    }
  },

  handleKeyDown: function handleKeyDown(event) {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        this.handleEnter(event);
        break;
      case "Backspace":
        this.props.onKeyDown(event);
        break;
    }
  },

  handleClick: function handleClick(event) {
    this.props.handleClick(event);
  },

  render: function render() {
    return React.createElement('input', {
      ref: 'entry',
      type: 'text',
      value: this.state.value,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      onFocus: this.props.onFocus,
      onChange: this.handleChange,
      className: 'datepicker__input',
      placeholder: this.props.placeholderText });
  }
});

module.exports = DateInput;