// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Box } from '@coursera/coursera-ui';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import _ from 'underscore';

import { withGQLLoadingOrError } from 'src/components/withBranches';

import { IdeaNextQuery } from 'src/constants/appQueries';
import { LOADER_SIZE } from 'src/components/IdeaPrev';

type Props = {
  idea: {
    title: string,
    slug: string,
  },
};

function IdeaNext({ idea: { title, slug, createdBy, contributorsText } }: Props) {
  return (
    <Box
      rootClassName="text-xs-right"
      alignItems="center"
      tag={Link}
      to={`/ideas/${slug}${isPresentationMode ? '/show' : ''}`}
      style={
        isPresentationMode && {
          textShadow:
            '1px  1px 1px black, 1px -1px 1px black, -1px  1px 1px black, -1px -1px 1px black',
        }
      }
    >
      {isPresentationMode && <div>Next</div>}
      {`${title.substring(0, charLimit)}${title.length >= charLimit ? '...' : ''}`}
      {isPresentationMode && (
        <h3 className="text-secondary font-lg">{`${createdBy && createdBy.name}${contributorsText
          ? ` | ${contributorsText}`
          : ''}`}</h3>
      )}
      {!isPresentationMode && <FontIcon className="m-l-1s" value="chevron_right" alt="next icon" />}
    </Box>
  );
}

export default compose(
  withRouter,
  graphql(IdeaNextQuery, {
    props: ({ data: { loading, error, allIdeas } }) => ({
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
)(IdeaNext);
