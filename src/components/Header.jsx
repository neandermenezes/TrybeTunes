import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount = () => this.handleUser();

  handleUser = async () => {
    const api = await getUser();
    this.setState({ user: api.name, loading: false });
  };

  render() {
    const { user, loading } = this.state;
    const display = (
      <div data-testid="header-component" className="header">
        <div className="upper-box">
          <img src="https://i.imgur.com/7jAetaD.png" alt="header" />
          <div className="user">
            <div className="user-container">
              <h1 className="username" data-testid="header-user-name">{ user }</h1>
            </div>
          </div>
        </div>
        <div className="lower-box">
          <div className="link-container">
            <Link
              className="link"
              data-testid="link-to-search"
              to="/search"
            >
              Procurar
            </Link>
          </div>
          <div className="link-container-green">
            <Link
              className="link-white"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favoritos
            </Link>
          </div>
          <div className="link-container">
            <Link
              className="link"
              data-testid="link-to-profile"
              to="/profile"
            >
              Perfil
            </Link>
          </div>
        </div>
      </div>
    );
    return loading ? <Loading /> : display;
  }
}

export default Header;
