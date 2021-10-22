import React from 'react';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteList: [],
    };
  }

  componentDidMount = () => {
    this.getFavorites();
  };

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites });
  };

  componentDidUpdate = () => {
    this.getFavorites();
  };

  render() {
    const { favoriteList } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          <h2>Músicas favoritas:</h2>
          {favoriteList.map((elem, index) => (
            <MusicCard
              favoriteUpdate={ this.getFavorites }
              key={ index }
              song={ elem }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
