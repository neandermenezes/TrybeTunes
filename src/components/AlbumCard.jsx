import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { info } = this.props;
    const { artworkUrl100, collectionName, artistName, collectionId } = info;
    return (
      <div className="album-card">
        <img
          className="album-image"
          src={ artworkUrl100 }
          alt="imagem-album"
        />
        <div className="album-description">
          <h3 className="album-name">{collectionName}</h3>
          <p className="album-artist">{artistName}</p>
          <Link
            to={ `album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          />
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  info: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};

export default AlbumCard;
