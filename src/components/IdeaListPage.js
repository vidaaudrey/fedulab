// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import IdeaList from 'src/components/IdeaList';

export function IdeaListPage({ ...rest }) {
  return (
    <div>
      <IdeaList />
    </div>
  );
}

export default compose(withRouter)(IdeaListPage);
