import React, { Component } from "react";
import DeleteButton from "./delete-button";
import ListItem from "./list-item";
import SuggestionsList from "./suggestions-list";

class SearchForm extends Component {

  state = {
    inputValue: '',
    resultList: [{searchTerm: 'test', date: 'test'}],
    filteredList: []
  }

  // resultList = [{searchTerm: 'test', date: 'test'}];


  handleChange = async (e) => {
    e.preventDefault();
    this.setState({ inputValue: e.target.value })

    const listOfResults = ['White', 'Black', 'Green', 'Blue', 'Yellow', 'Red'];

    const filteredList = listOfResults.filter(item => item.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
    this.setState({ filteredList });
    
    const apiRoot = 'https://api.github.com/search/repositories?q=';

    const fetchOptions = {
      headers: {
        Accept: "application/vnd.github.mercy-preview+json",
      }
    };

  try {
    // const resp = await fetch(apiRoot + e.target.value, fetchOptions);
    // const response = resp.json();

    }
    catch (err) {
      console.log("Got API error for endpoint", err);
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date();
    date = date.toISOString().substring(0, 10);

    const updatedResultList = [...this.state.resultList];
    updatedResultList.push({ searchTerm: this.state.inputValue, date: date});

    this.setState({inputValue: '', resultList: updatedResultList});
    console.log(updatedResultList);

  }

  removeListItem(searchTerm) {
    let updatedResultList = [...this.state.resultList];
    updatedResultList = updatedResultList.filter(item => item.searchTerm !== searchTerm);

    this.setState({ resultList: updatedResultList });
  }

  clearList = () => {
    this.setState({ resultList: []});
  }

	render() {
		return (
			<div>
        <DeleteButton />
        <section>
          <form id='searchForm' onSubmit={this.handleSubmit}>
            <input type="search" onChange={this.handleChange} value={this.state.inputValue}/>
            <SuggestionsList suggestions={this.state.filteredList}/>
          </form>

          <header>
            <h4>Search history</h4>
            <button className="button__clear-list" onClick={this.clearList}>Clear search history</button>
          </header>
          <ul>
            {this.state.resultList.map((item, index) => (
             <ListItem key={index} searchTerm={item.searchTerm} date={item.date} onClick={e => this.removeListItem(item.searchTerm)}/>
            ))}
          </ul>


        </section>
			
			</div>
		);
	}
}

export default SearchForm;