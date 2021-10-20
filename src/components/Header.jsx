import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
    return (
      <div data-testid="header-component" className="header">
        <div className="upper-box">
          <img src="https://i.imgur.com/7jAetaD.png" alt="header" />
          <div className="user">
            {loading ? (
              <p> Carregando... </p>
            ) : (
              <p data-testid="header-user-name">{user}</p>
            )}
          </div>
        </div>
        <div className="lower-box">
          <div className="links">
            <Link data-testid="link-to-search" to="/search" />
            <Link data-testid="link-to-favorites" to="/favorites" />
            <Link data-testid="link-to-profile" to="/profile" />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
