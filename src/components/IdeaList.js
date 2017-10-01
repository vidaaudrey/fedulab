// @flow
import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

import IdeaDetail from 'src/components/IdeaDetail';

export function IdeaList({ match }: MatchProps) {
  return (
    <div>
      <h2>Ideas</h2>
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
      <Route path={`${match.url}/:topicId`} component={IdeaDetail} />
      <Route exact path={match.url} render={() => <h3>Please select an idea.</h3>} />
    </div>
  );
}

export default withRouter(IdeaList);
