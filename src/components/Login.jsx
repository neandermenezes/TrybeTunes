import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN_NAME_LENGTH = 3;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      redirect: false,
      inputValue: '',
      isButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.handleButton);
  }

  handleButton = () => {
    const { inputValue } = this.state;
    if (inputValue.length >= MIN_NAME_LENGTH) this.setState({ isButtonDisabled: false });
    else this.setState({ isButtonDisabled: true });
  }

  handleApi = async () => {
    const { inputValue } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputValue });
    this.setState({ redirect: true });
  }

  render() {
    const { inputValue, isButtonDisabled, redirect, loading } = this.state;
    const form = (
      <div data-testid="page-login">
        <form>
          <div className="form">
            <label htmlFor="form-name">
              Nome:
              <input
                name="inputValue"
                value={ inputValue }
                onChange={ this.handleChange }
                id="form-name"
                data-testid="login-name-input"
                type="text"
              />
            </label>
            <button
              disabled={ isButtonDisabled }
              type="button"
              onClick={ this.handleApi }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
    if (redirect) { return <Redirect to="/search" />; }
    return (loading) ? <Loading /> : form;
  }
}

export default Login;
