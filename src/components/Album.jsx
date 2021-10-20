import React from 'react';
import Header from './Header';

class Album extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <p>placeholder</p>
        </div>
      </div>
    );
  }
}

export default Album;
