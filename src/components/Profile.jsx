import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
    };
  }

  componentDidMount = () => {
    this.userInfo();
  }

  userInfo = async () => {
    const userDetails = await getUser();
    this.setState({ user: userDetails });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-profile">
          <div className="profile-image">
            <img data-testid="profile-image" src={ user.image } alt="foto do usuario" />
            <Link to="/profile/edit">
              <button type="button"> Editar perfil </button>
            </Link>
          </div>
          <div className="profile-email">
            <p>{ user.email }</p>
          </div>
          <div className="profile-description">
            <p>{ user.description }</p>
          </div>
          <div className="profile-name">
            <p>{ user.name }</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
