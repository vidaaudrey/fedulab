// @flow
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';

import IdeaAddEditForm from 'src/components/IdeaAddEditForm';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';

import { IdeaEditQuery, UserDetailsQuery } from 'src/constants/appQueries';
import type { RouterMatch } from 'src/types/common';

type MatchProps = { match: RouterMatch };

type Props = {
  match: MatchProps,
  ideaEditQuery: Object,
  userDetailsQuery: Object,
  userId: String,
  slug: String,
  isSuperuser: boolean,
};

function IdeaEdit({
  match,
  ideaEditQuery: { loading, error, Idea: idea },
  userDetailsQuery: { user },
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
      <div className="EditIdea p-y-1">
        <div className="max-text-width bg-white p-a-2 m-x-auto">
          {idea && (
            <IdeaAddEditForm
              idea={idea}
              userId={userId}
              userEmail={user.emailAddress}
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
  graphql(IdeaEditQuery, { name: 'ideaEditQuery' }),
  graphql(UserDetailsQuery, { name: 'userDetailsQuery' }),
)(IdeaEdit);
