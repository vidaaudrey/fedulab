// @flow
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
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

  const isIdeaOwner = idea.createdBy && idea.createdBy.id;
  if (isSuperuser || isIdeaOwner) {
    return (
      <div className="EditIdea m-t-3 p-y-1">
        <div className="max-text-width bg-white p-a-2 m-x-auto">
          {idea && (
            <IdeaAddEditForm
              idea={idea}
              userId={userId}
              isSuperuser={isSuperuser}
              isIdeaOwner={isIdeaOwner}
            />
          )}
        </div>
      </div>
    );
  }
  return <Redirect to={`/ideas/${idea.slug}`} />;
}

export default compose(
  withRouter,
  withProps(({ match }) => ({
    slug: match.params.ideaSlug,
  })),
  graphql(IdeaEditQuery),
)(IdeaEdit);
