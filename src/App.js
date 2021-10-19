import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/search" render={ (props) => <Search { ...props } /> } />
        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route path="/favorites" render={ (props) => <Favorites { ...props } /> } />
        <Route path="/profile" render={ (props) => <Profile { ...props } /> } />
        <Route
          path="/profile/edit"
          render={ (props) => <ProfileEdit { ...props } /> }
        />
        <Route path="/" render={ (props) => <NotFound { ...props } /> } />
      </BrowserRouter>
    );
  }
}

export default App;
