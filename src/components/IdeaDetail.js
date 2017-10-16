// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IdeaActions from 'src/components/IdeaActions';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';

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
  if (loading || error || !idea) {
    return <IdeaLoadPreCheck loading={loading} error={error} idea={idea} slug={slug} />;
  }
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
  } = idea;
  const allContributorNames = contributors.map(item => item.name).join(',  ');

  return (
    <div>
      <div className="custom-image">
        <img alt="example" width="100%" src={coverBackgroundUrl} />
      </div>
      <div className="custom-card">
        <h3>{title}</h3>
        <small>
          By {createdBy.name}, Contributors:{allContributorNames}
        </small>
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

const IdeaDetailQuery = gql`
  query IdeaDetailQuery($slug: String!) {
    Idea(slug: $slug) {
      id
      title
      tagline
      displayOrder
      slug
      description
      category
      courseraVideoUrl
      coverBackgroundUrl
      howToContribute
      slackUrl
      youtubeVideoUrl
      createdBy {
        name
        id
      }
      contributors {
        name
        id
      }
    }
  }
`;

export default compose(
  withRouter,
  withProps(({ match }) => ({
    slug: match.params.ideaSlug,
  })),
  graphql(IdeaDetailQuery),
)(IdeaDetail);
