import React from 'react';
import Header from './Header';

const MIN_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      isButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.handleButton);
  };

  handleButton = () => {
    const { inputValue } = this.state;
    if (inputValue.length >= MIN_LENGTH) {
      this.setState({ isButtonDisabled: false });
    } else this.setState({ isButtonDisabled: true });
  };

  render() {
    const { inputValue, isButtonDisabled } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <input
            name="inputValue"
            type="text"
            data-testid="search-artist-input"
            value={ inputValue }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
