// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';

import IdeaList from 'src/components/IdeaList';
import UserCreate from 'src/components/UserCreate';
import IdeaCreate from 'src/components/IdeaCreate';
import About from 'src/components/About';
import UserMenu from 'src/components/UserMenu';
import Home from 'src/components/Home';

import { AUTH_KEY } from 'src/constants/config';
import 'src/App.css';

function App({ data, loading, isLoggedIn, onLogout, ...rest }: Props) {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/ideas">Ideas</Link>
          </li>
          <li>
            <Link to="/add-idea">Add Idea</Link>
          </li>
        </ul>
        <hr />
        <Route
          path="/"
          render={({ match, history }) => (
            <div className="main">
              <UserMenu isLoggedIn={isLoggedIn} loading={loading} onLogout={onLogout} />
              {isLoggedIn && <IdeaCreate match={match} />}
            </div>
          )}
        />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/ideas" component={IdeaList} />
        <Route path="/add-idea" component={IdeaCreate} />
        <Route path="/signup" component={UserCreate} />
      </div>
    </Router>
  );
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`;
export default compose(
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' },
    props: ({ data, data: { loading, user } }) => ({ loading, isLoggedIn: !!user, data }),
  }),
  withHandlers({
    onLogout: () => () => {
      window.localStorage.removeItem(AUTH_KEY);
      // eslint-disable-next-line
      location.reload();
    },
  }),
)(App);
