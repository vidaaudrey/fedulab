// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';

import IdeaAddEditForm from 'src/components/IdeaAddEditForm';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';

import { IdeaEditQuery } from 'src/constants/appQueries';
import type { RouterMatch } from 'src/types/common';

type MatchProps = { match: RouterMatch };

type Props = {
  match: MatchProps,
  data: Object,
  userId: String,
  slug: String,
  isSuperuser: boolean,
};

function IdeaEdit({
  match,
  data: { loading, error, Idea: idea },
  userId,
  isSuperuser,
  slug,
  ...rest
}: Props) {
  if (loading || error || !idea) {
    return <IdeaLoadPreCheck loading={loading} error={error} idea={idea} slug={slug} />;
  }

  return (
    <div>{idea && <IdeaAddEditForm idea={idea} userId={userId} isSuperuser={isSuperuser} />}</div>
  );
}

export default compose(
  withRouter,
  withProps(({ match }) => ({
    slug: match.params.ideaSlug,
  })),
  graphql(IdeaEditQuery),
)(IdeaEdit);
