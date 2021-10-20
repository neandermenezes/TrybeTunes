import React from 'react';
import Header from './Header';

class Search extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <p>Search placeholder</p>
        </div>
      </div>
    );
  }
}

export default Search;
