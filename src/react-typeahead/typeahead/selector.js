'use strict';

var React = require('react/addons');
var TypeaheadOption = require('./option');

/**
 * Container for the options rendered as part of the autocompletion process
 * of the typeahead
 */
var TypeaheadSelector = React.createClass({
  displayName: 'TypeaheadSelector',

  propTypes: {
    options: React.PropTypes.array,
    header: React.PropTypes.string,
    customClasses: React.PropTypes.object,
    selectionIndex: React.PropTypes.number,
    onOptionSelected: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      selectionIndex: null,
      customClasses: {},
      onOptionSelected: function onOptionSelected(option) {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      selectionIndex: this.props.selectionIndex,
      selection: this.getSelectionForIndex(this.props.selectionIndex)
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ selectionIndex: null });
  },

  render: function render() {
    var classes = {
      "typeahead-selector": true
    };
    classes[this.props.customClasses.results] = this.props.customClasses.results;
    var classList = React.addons.classSet(classes);

    var results = this.props.options.map(function (result, i) {
      return React.createElement(
        TypeaheadOption,
        { ref: result, key: result,
          hover: this.state.selectionIndex === i,
          customClasses: this.props.customClasses,
          onClick: this._onClick.bind(this, result) },
        result
      );
    }, this);
    return React.createElement(
      'ul',
      { className: classList },
      React.createElement(
        'li',
        { className: 'header' },
        this.props.header
      ),
      results
    );
  },

  setSelectionIndex: function setSelectionIndex(index) {
    this.setState({
      selectionIndex: index,
      selection: this.getSelectionForIndex(index)
    });
  },

  getSelectionForIndex: function getSelectionForIndex(index) {
    if (index === null) {
      return null;
    }
    return this.props.options[index];
  },

  _onClick: function _onClick(result) {
    this.props.onOptionSelected(result);
  },

  _nav: function _nav(delta) {
    if (!this.props.options) {
      return;
    }
    var newIndex;
    if (this.state.selectionIndex === null) {
      if (delta == 1) {
        newIndex = 0;
      } else {
        newIndex = delta;
      }
    } else {
      newIndex = this.state.selectionIndex + delta;
    }
    if (newIndex < 0) {
      newIndex += this.props.options.length;
    } else if (newIndex >= this.props.options.length) {
      newIndex -= this.props.options.length;
    }
    var newSelection = this.getSelectionForIndex(newIndex);
    this.setState({ selectionIndex: newIndex,
      selection: newSelection });
  },

  navDown: function navDown() {
    this._nav(1);
  },

  navUp: function navUp() {
    this._nav(-1);
  }

});

module.exports = TypeaheadSelector;
