import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import LoadingSmall from './LoadingSmall';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  handleFavorite = async () => {
    const { song } = this.props;
    this.setState({ loading: true });
    await addSong(song);
    this.setState({ loading: false });
  }

  render() {
    const { song } = this.props;
    const { loading } = this.state;
    const { previewUrl, trackName, artworkUrl30, trackId } = song;
    return (
      <div className="song-container">
        <div className="song-full">
          <div className="song-audio">
            <img src={ artworkUrl30 } alt="aa" />
            <p>{ trackName }</p>
            { loading ? <LoadingSmall /> : '' }
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
          <div className="favorite-section">
            <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
              Favorita
              <input
                id={ trackId }
                type="checkbox"
                onClick={ this.handleFavorite }
              />
            </label>
          </div>
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
};

export default MusicCard;
