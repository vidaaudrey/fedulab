// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import _ from 'underscore';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';

import { IdeaPrevQuery } from 'src/constants/appQueries';

type Props = {
  idea: {
    title: string,
    slug: string,
  },
};

function IdeaPrev({ idea: { title, slug } }: Props) {
  return (
    <div>
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
