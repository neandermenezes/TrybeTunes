import React from 'react';
import { Redirect } from 'react-router';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.display = this.display.bind(this);

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
    };
  }

  componentDidMount = async () => {
    await this.getUserInfo();
    await this.handleSaveButton();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const favorite = await getUser();
    this.setState({
      name: favorite.name,
      email: favorite.email,
      description: favorite.description,
      image: favorite.image,
      buttonDisabled: true,
      redirect: false,
      loading: false,
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleSaveButton);
  };

  handleSaveButton = () => {
    const { name, email, description, image } = this.state;
    if (
      name !== ''
      && email !== ''
      && description !== ''
      && image !== ''
    ) {
      return this.setState({ buttonDisabled: false });
    }
    this.setState({ buttonDisabled: true });
  };

  saveInfo = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    const obj = { name, email, image, description };
    await updateUser(obj);
    this.setState({ redirect: true, loading: false });
  }

  display() {
    const { name, email, description, image, buttonDisabled } = this.state;
    return (
      <div>
        <div data-testid="page-profile-edit">
          <form>
            <input
              data-testid="edit-input-name"
              name="name"
              type="text"
              value={ name }
              onChange={ this.onInputChange }
            />
            <input
              data-testid="edit-input-email"
              name="email"
              type="text"
              value={ email }
              onChange={ this.onInputChange }
            />
            <input
              data-testid="edit-input-description"
              name="description"
              type="text"
              value={ description }
              onChange={ this.onInputChange }
            />
            <input
              data-testid="edit-input-image"
              name="image"
              value={ image }
              type="text"
              onChange={ this.onInputChange }
            />
            <button
              disabled={ buttonDisabled }
              type="button"
              data-testid="edit-button-save"
              onClick={ this.saveInfo }
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    );
  }

  render() {
    const { redirect, loading } = this.state;
    return (
      <>
        <Header />
        { loading ? <Loading /> : this.display() }
        { redirect && <Redirect to="/profile" /> }
      </>
    );
  }
}

export default ProfileEdit;
