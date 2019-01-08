import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
  }

  onInputChange(e) {
    const searchTerm = e.target.value.toLowerCase();
    this.setState({ searchTerm });
    console.log(searchTerm);
  }

  onSearchSubmit(e) {
    e.preventDefault();
    if (this.state.searchTerm) {
      this.props.onSubmit(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSearchSubmit.bind(this)}>
          <input id="search-box" type="text" onChange={this.onInputChange.bind(this)} />
          <span>
            <button className="btn orange lighten-2 z-depth-o" id="search-btn" type="submit">Search</button>
          </span>
        </form>
      </div>
    );
  }
}

export default SearchBar;
