import React from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import AlbumCard from './AlbumCard';

const MIN_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      isButtonDisabled: true,
      loading: false,
      showSearchResults: false,
      currentArtist: '',
      albuns: [],
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

  searchArtist = async () => {
    const { inputValue } = this.state;

    this.setState({ loading: true, currentArtist: inputValue });
    const artist = await searchAlbumsAPI(inputValue);
    this.setState({
      inputValue: '',
      loading: false,
      showSearchResults: true,
      albuns: artist,
    });
  };

  render() {
    const {
      inputValue,
      isButtonDisabled,
      loading,
      showSearchResults,
      currentArtist,
      albuns,
    } = this.state;
    const display = (
      <div className="search-container">
        <Header />
        <div className="page-search" data-testid="page-search">
          <div className="artist-name-search">
            <input
              name="inputValue"
              type="text"
              data-testid="search-artist-input"
              value={ inputValue }
              onChange={ this.handleChange }
              placeholder="Nome do artista"
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
              onClick={ this.searchArtist }
            >
              Pesquisar
            </button>
          </div>
        </div>
      </div>
    );
    return (
      <>
        { loading ? <Loading /> : display }
        {showSearchResults && (
          <div className="main-container">
            <h2 className="main-title">{`Resultado de álbuns de: ${currentArtist}`}</h2>
            <div className="albuns">
              { albuns.length > 0 ? albuns.map((elem) => (
                <AlbumCard key={ elem.collectionId } info={ elem } />
              )) : <h1>Nenhum álbum foi encontrado</h1>}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Search;
