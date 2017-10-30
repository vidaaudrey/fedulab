// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import _ from 'underscore';

import { withGQLLoadingOrError } from 'src/components/withBranches';

import { IdeaPrevQuery } from 'src/constants/appQueries';

type Props = {
  idea: {
    title: string,
    slug: string,
  },
};

function IdeaPrev({ idea: { title, slug } }: Props) {
  return (
    <div className="p-r-1">
      <Link to={`/ideas/${slug}`}> {`< ${title}`}</Link>
    </div>
  );
}

export default compose(
  withRouter,
  graphql(IdeaPrevQuery, {
    props: ({ data: { loading, error, allIdeas }, data }) => ({
      dataFieldName: 'idea',
      shouldRenderNothing: true,
      loading,
      error,
      idea: _(allIdeas).first(),
    }),
  }),
  withGQLLoadingOrError(),
)(IdeaPrev);
