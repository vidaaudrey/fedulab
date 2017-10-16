// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import moment from 'moment';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaActions from 'src/components/IdeaActions';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';

import { IdeaDetailQuery } from 'src/constants/appQueries';

import type { RouterMatch } from 'src/types/common';

type MatchProps = { match: RouterMatch };

type Props = {
  match: MatchProps,
  data: Object,
  userId: String,
  isSuperuser: boolean,
  slug: string,
};

function IdeaDetail({
  match,
  data: { loading, error, Idea: idea },
  slug,
  userId,
  isSuperuser,
  ...rest
}: Props) {
  // if (loading || error || !idea) {
  //   return <IdeaLoadPreCheck loading={loading} error={error} idea={idea} slug={slug} />;
  // }
  const {
    id,
    title,
    tagline,
    description,
    category,
    courseraVideoUrl,
    coverBackgroundUrl,
    howToContribute,
    slackUrl,
    youtubeVideoUrl,
    contributors,
    createdBy,
    createdAt,
  } = idea;
  const allContributorNames = contributors.map(item => item.name).join(',  ');
  const createdAtMoment = moment(createdAt);
  console.warn('ideaDetail', idea, createdAtMoment);
  return (
    <div>
      <div className="custom-image">
        <img
          alt="example"
          width="100%"
          height="200"
          className="overflow-hidden"
          src={coverBackgroundUrl}
        />
      </div>
      <div className="custom-card text-primary">
        <h3>{title}</h3>
        <small>
          By {createdBy.name}, Contributors:{allContributorNames}
        </small>
        <span>{moment(createdAt).fromNow()}</span>
        <h4>{tagline}</h4>
        <span>{category}</span>
        <p style={{ color: 'gray' }}>{description}</p>
        <p>{howToContribute}</p>
        <p>{youtubeVideoUrl}</p>
        <p>{slackUrl}</p>
        <p>{courseraVideoUrl}</p>
        <p>{courseraVideoUrl}</p>
        <IdeaActions
          shouldRedirectToListAfterDelete
          canDelete={isSuperuser || userId === (createdBy && createdBy.id)}
          id={id}
          slug={slug}
        />
      </div>
    </div>
  );
}

export default compose(
  withRouter,
  withProps(({ match }) => ({
    slug: match.params.ideaSlug,
    dataFieldName: 'Idea',
  })),
  graphql(IdeaDetailQuery),
  withGQLLoadingOrError(IdeaLoadPreCheck),
)(IdeaDetail);
