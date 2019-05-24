import React, { Component } from "react";
import DeleteButton from "./delete-button";
import ListItem from "./list-item";
import SuggestionsList from "./suggestions-list";
import moment from "moment";

class SearchForm extends Component {

  state = {
    inputValue: '',
    resultList: [],
    filteredList: []
  }

  /**
	 * @param {React.SyntheticEvent<?>} e
	 */
  handleChange = async (e) => {
    e.preventDefault();
    
    const inputValue = e.target.value;
    this.setState({ inputValue })

    if(this.debounce) {
       clearTimeout(this.debounce);
    }
    if(inputValue.length === 0) return;

    this.debounce = setTimeout(async ()=> {
      const apiRoot = 'https://api.github.com/search/repositories?q=';
  
      const fetchOptions = {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
        }
      };
  
    try {
      fetch(apiRoot + inputValue + '&in:name', fetchOptions).then( resp => {
        resp.json().then(data => {
          let filteredList = [];
          data.items.forEach((item, index) => {
            if(index > 15) return;
            filteredList.push(item.name)
          });
          this.setState({ filteredList });
        })
      })
    }
    catch (err) {
      console.log("Got API error for endpoint", err);
    }   
    }, 400);
  };

  /**
	 * @param {React.SyntheticEvent<?>} e
	 */
  handleSubmit = (e) => {
    e.preventDefault();
    this.updateResultList(this.state.inputValue);
  }

  /**
   * @param {String} searchInput 
   * @return {Void}
   */
  updateResultList(searchInput) {
    let date = moment().format("YYYY-MM-DD, h:mm a");

    const updatedResultList = [...this.state.resultList];
    updatedResultList.push({ searchInput, date});

    this.setState({inputValue: '', resultList: updatedResultList, filteredList: []});
  }

  /**
	 * @param {String} searchInput
   * @return {Void}
	 */
  removeResultListItem(searchInput) {
    let updatedResultList = [...this.state.resultList];
    updatedResultList = updatedResultList.filter(item => item.searchInput !== searchInput);

    this.setState({ resultList: updatedResultList });
  }

  /**
	 * @return {Void}
	 */
  clearResultList = () => {
    this.setState({ resultList: []});
  }

	render() {
		return (
			<article>
        <DeleteButton />
        <section>
          <form id='searchForm' onSubmit={this.handleSubmit}>
            <input type="search" onChange={this.handleChange} value={this.state.inputValue}/>
            {this.state.filteredList.length > 0 && 
              <SuggestionsList suggestions={this.state.filteredList} onClick={(item) => this.updateResultList(item)}/>
            }
          </form>

          <header>
            <h4>Search history</h4>
            <button className="button__clear-list" onClick={this.clearResultList}>Clear search history</button>
          </header>
          <ul>
            {this.state.resultList.map((item, index) => (
             <ListItem key={index} searchInput={item.searchInput} date={item.date} onClick={e => this.removeResultListItem(item.searchInput)}/>
            ))}
          </ul>
        </section>
			</article>
		);
	}
}

export default SearchForm;