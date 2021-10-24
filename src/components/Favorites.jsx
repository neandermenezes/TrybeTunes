import React from 'react';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteList: [],
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getFavorites();
  };

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites, loading: false });
  };

  componentDidUpdate = () => {
    this.getFavorites();
  };

  render() {
    const { favoriteList, loading } = this.state;
    const display = (
      <div>
        <Header />
        <div data-testid="page-favorites">
          <h2 className="main-title">Músicas favoritas:</h2>
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
    return loading ? <Loading /> : display;
  }
}

export default Favorites;
