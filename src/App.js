import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import Header from './components/navbar/Header';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import Login from './components/login/Login' ;
import { Register } from './components/register/Register';

import { ProtectedRoute } from './components/shared/auth/ProtectedRoute';
import { LoggedInRoute } from './components/shared/auth/LoggedInRoute';

import * as actions from './actions';

import './App.css';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <Header logout={this.logout} />
            <div className='container'>
              { /* this.state.isRentalList ? <RentalList /> : <RentalDetail /> */}

              <Route exact path='' component={RentalListing} />
              <ProtectedRoute path='/rental/:id' component={RentalDetail} />
              <Route path='/login' component={Login} />
              <LoggedInRoute path='/register' component={Register} />

            </div>
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
