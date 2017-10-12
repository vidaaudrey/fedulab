// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import type { RouterMatch } from 'src/types/common';

type MatchProps = { match: RouterMatch };

type Props = {
  match: MatchProps,
  data: Object,
};

function IdeaDetail({ match, data, ...rest }: Props) {
  if (data.loading) {
    return <h2>Loading</h2>;
  }
  if (data.error) {
    return <h2>Error loading the data</h2>;
  }

  const {
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
  } = data.Idea;
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
      }
      contributors {
        name
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
