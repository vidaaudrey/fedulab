// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IdeaAddEditForm from 'src/components/IdeaAddEditForm';
import type { RouterMatch } from 'src/types/common';

type MatchProps = { match: RouterMatch };

type Props = {
  match: MatchProps,
  data: Object,
  userId: String,
  slug: String,
};

function IdeaEdit({ match, data, userId, slug, ...rest }: Props) {
  console.warn('data', data);

  if (data.loading) {
    return <h2>Loading</h2>;
  }
  if (data.error) {
    return <h2>Error loading the data</h2>;
  }

  if (!data.Idea) {
    return (
      <div className="p-a-1">
        <h2>
          Idea with slug:
          <span className="text-danger"> {slug} </span>
          not not found
        </h2>
        View <Link to="/ideas"> All Ideas </Link>
      </div>
    );
  }

  return <div>{data.Idea && <IdeaAddEditForm idea={data.Idea} userId={userId} />}</div>;
}

const IdeaEditQuery = gql`
  query IdeaEditQuery($slug: String!) {
    Idea(slug: $slug) {
      id
      contributorsText
      category
      courseraVideoUrl
      coverBackgroundUrl
      description
      displayOrder
      estimatedFinishTime
      howToContribute
      needMyLaptop
      presentLive
      slackUrl
      slug
      startTime
      tagline
      title
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
  graphql(IdeaEditQuery),
)(IdeaEdit);
