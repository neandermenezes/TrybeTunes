import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumImage: '',
      artistName: '',
      albumName: '',
      songList: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    this.getAlbumSongs();
  }

  getAlbumSongs = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const songs = await getMusics(id);

    this.setState({
      albumImage: songs[0].artworkUrl100,
      artistName: songs[0].artistName,
      albumName: songs[0].collectionName,
      songList: songs,
    });
  };

  render() {
    const {
      artistName,
      albumName, songList,
      albumImage,
      loading,
    } = this.state;
    const display = (
      <div>
        <Header />
        <div data-testid="page-album">
          <div className="album-container">
            <div className="current-album">
              <img src={ albumImage } alt="album" />
              <h4 data-testid="artist-name">{artistName}</h4>
              <p data-testid="album-name">{albumName}</p>
            </div>
            <div className="songs-container">
              {songList.slice(1).map((elem, index) => (
                <MusicCard
                  key={ index }
                  song={ elem }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
    return loading ? <Loading /> : display;
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Album;
