import React, { Component } from "react";
import PropTypes from "prop-types";

class SuggestionsList extends Component {
  static propTypes = {
    suggestions: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <ul id="suggestion-list">
        {this.props.suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => this.props.onClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    );
  }
}

export default SuggestionsList;
