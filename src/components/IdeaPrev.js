// @flow
import React from 'react';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import { Box } from '@coursera/coursera-ui';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import _ from 'underscore';

import { withGQLLoadingOrError } from 'src/components/withBranches';

import { IdeaPrevQuery } from 'src/constants/appQueries';

export const LOADER_SIZE = 32;

type Props = {
  idea: {
    title: string,
    slug: string,
  },
};

function IdeaPrev({ idea: { title, slug } }: Props) {
  return (
    <Box alignItems="center" tag={Link} to={`/ideas/${slug}`}>
      <FontIcon className="m-r-1s" value="chevron_left" alt="next icon" />
      {`${title.substring(0, charLimit)}${title.length >= charLimit ? '...' : ''}`}
    </Box>
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
      isLoadingCircle: true,
      loaderSize: LOADER_SIZE,
    }),
  }),
  withGQLLoadingOrError(),
)(IdeaPrev);
