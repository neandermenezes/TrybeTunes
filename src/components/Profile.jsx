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

  editProfile() {
    return (
      <Link to="/profile/edit">
        <p>Editar perfil</p>
      </Link>
    );
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <Link to="/profile/edit">
            Editar perfil
          </Link>
          <div>
            <img data-testid="profile-image" src={ user.image } alt="foto do usuario" />
            <h2>{ user.name }</h2>
            <h3>{ user.email }</h3>
            <p>{ user.description }</p>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
