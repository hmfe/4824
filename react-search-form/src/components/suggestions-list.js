import React, { Component } from "react";

class SuggestionsList extends Component {

  //Todo: add proptypes

  render() {
    return (
      <ul id="suggestion-list">
        {this.props.suggestions.map(suggestion => (
          <li key={suggestion}>
            {suggestion}
          </li>
        ))}
      </ul>
    )
  }

}

export default SuggestionsList;