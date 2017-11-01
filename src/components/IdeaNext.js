// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import _ from 'underscore';

import { withGQLLoadingOrError } from 'src/components/withBranches';

import { IdeaNextQuery } from 'src/constants/appQueries';
import { LOADER_SIZE } from 'src/components/IdeaPrev';

type Props = {
  isPresentationMode: boolean,
  idea: {
    title: string,
    slug: string,
  },
};

function IdeaNext({
  idea: { title, slug, createdBy, contributorsText },
  isPresentationMode,
}: Props) {
  const charLimit = isPresentationMode ? 80 : 40;
  return (
    <span className="p-l-1">
      {isPresentationMode && <div>Next</div>}
      <Link
        to={`/ideas/${slug}${isPresentationMode ? '/show' : ''}`}
        style={
          isPresentationMode && {
            textShadow:
              '1px  1px 1px black, 1px -1px 1px black, -1px  1px 1px black, -1px -1px 1px black',
          }
        }
      >
        {`${title.substring(0, charLimit)}${title.length >= charLimit
          ? '...'
          : ''} ${isPresentationMode ? '' : '>'}`}
      </Link>
      {isPresentationMode && (
        <h3 className="text-secondary font-lg">{`${createdBy && createdBy.name}${contributorsText
          ? ` | ${contributorsText}`
          : ''}`}</h3>
      )}
    </span>
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
