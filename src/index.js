import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import reducers from './reducers';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import UserHome from './components/user-home';
import RequireAuth from './components/auth/require_auth';
import Home from './components/home';
import AddSaga from './components/add-saga';
import SagaContainer from './components/saga-container';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

//If we have a token, consider the user to be signed in. // we need to update the application state
if(token){
  store.dispatch({type: AUTH_USER}) // updates all the state of the applicatio before it is rendered to say that we are signed in
}

ReactDOM.render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path="/" component = {App}>
        <IndexRoute component={Home} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="user-home" component={RequireAuth(UserHome)} />
        <Route path="add-saga" component={RequireAuth(AddSaga)} />
        <Route path="saga/:id" component={SagaContainer} />
        <Route path="delete-saga/:id" component={RequireAuth(SagaContainer)} />
        <Route path="add-saga/:id" component={RequireAuth(AddSaga)} />
      </Route>
      <App />
    </Router>
  </Provider>
  , document.querySelector('.app'));
