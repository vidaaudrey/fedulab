// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from 'src/logo.svg';

import type { RouterMatch } from 'src/types/common';
import 'src/App.css';

type MatchProps = { match: RouterMatch };

const Home = () => (
  <div>
    <h2>Home</h2>
    <img src={logo} className="App-logo" alt="logo" />
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }: MatchProps) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }: MatchProps) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => <h3>Please select a topic.</h3>} />
  </div>
);

const Page = () => (
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
          <Link to="/topics">Topics</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

export default function App() {
  return <Page />;
}
