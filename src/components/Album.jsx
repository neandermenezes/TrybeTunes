import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      songList: [],
    };
  }

  componentDidMount = () => this.getAlbumSongs();

  getAlbumSongs = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const songs = await getMusics(id);

    this.setState({
      artistName: songs[0].artistName,
      albumName: songs[0].collectionName,
      songList: songs,
    });
  }

  render() {
    const { artistName, albumName, songList } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <div className="album-container">
            <div className="current-album">
              <h1 data-testid="artist-name">{ artistName }</h1>
              <h2 data-testid="album-name">{ albumName }</h2>
            </div>
            <div className="songs-container">
              { songList.slice(1).map((elem) => <MusicCard key={ elem } song={ elem } />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Album;
