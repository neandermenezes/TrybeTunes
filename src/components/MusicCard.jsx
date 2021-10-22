import React from 'react';
import PropTypes from 'prop-types';

import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

import LoadingSmall from './LoadingSmall';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false,
    };
  }

  componentDidMount = () => {
    this.getFavoriteSongList();
  };

  getFavoriteSongList = async () => {
    const {
      song: { trackId },
    } = this.props;
    const favoriteList = await getFavoriteSongs();
    const isFavorite = favoriteList.find((elem) => elem.trackId === trackId);
    if (isFavorite) {
      this.setState({ favorite: true });
    }
  };

  handleFavorite = async ({ target }) => {
    const { song, favoriteUpdate } = this.props;
    this.setState({ loading: true });
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(value);
    if (value) {
      await addSong(song);
      this.setState({ loading: false, favorite: true });
    }
    if (!value) {
      await removeSong(song);
      this.setState({ loading: false, favorite: false });
      favoriteUpdate();
    }
  };

  render() {
    const { song } = this.props;
    const { loading, favorite } = this.state;
    const { previewUrl, trackName, artworkUrl30, trackId } = song;
    return (
      <div className="song-container">
        <div className="song-full">
          <div className="song-audio">
            <img src={ artworkUrl30 } alt="aa" />
            <p>{trackName}</p>
            {loading ? <LoadingSmall /> : ''}
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
          <label
            className="favorite-section"
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              name="checked"
              id={ trackId }
              checked={ favorite }
              type="checkbox"
              onChange={ this.handleFavorite }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    artworkUrl30: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  favoriteUpdate: PropTypes.func.isRequired,
};

export default MusicCard;
