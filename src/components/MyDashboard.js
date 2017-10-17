// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import _ from 'underscore';

import { withGQLLoadingOrError } from 'src/components/withBranches';

export function MyDashboard({ name = 'Audrey', likedIdeas, ...rest }: MatchProps) {
  console.warn('me', likedIdeas, rest);

  return (
    <div className="MyDashboard">
      <h3>Welcome {name}</h3>
      <h2>My Liked Ideas</h2>
      {likedIdeas.map(idea => (
        <div className="p-b-1s" key={idea.id}>
          <Link to={`/ideas/${idea.slug}`}>
            <span className="font-weight-bold">{idea.title}</span>
          </Link>
        </div>
      ))}
      <h2>My Votes</h2>
    </div>
  );
}

const userQuery = gql`
  query userQuery {
    user {
      id
      name
      picture
      isSuperuser
      likes {
        id
        idea {
          id
          title
          slug
          coverBackgroundUrl
        }
      }
    }
  }
`;

export default compose(
  graphql(userQuery, {
    props: ({ data, data: { user } }) => ({
      data,
      isLoggedIn: !!user,
      userId: user && user.id,
      isSuperuser: user && user.isSuperuser,
      picture: user && user.picture,
      likedIdeas: user && user.likes && _(user.likes).pluck('idea'),
      dataFieldName: 'user',
    }),
  }),
  withGQLLoadingOrError(),
  withHandlers({
    dosomething: () => () => {},
  }),
)(MyDashboard);
