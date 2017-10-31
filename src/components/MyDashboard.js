// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import _ from 'underscore';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import FullpageLoading from 'src/components/FullpageLoading';

export function MyDashboard({
  name,
  isSuperuser,
  userId,
  myIdeas,
  likedIdeas,
  ...rest
}: MatchProps) {
  const nonNullIdeas = likedIdeas.filter(item => !!item);
  return (
    <div className="MyDashboard p-y-1 h-100">
      <div className="max-text-width bg-white p-a-2 m-x-auto min-vh">
        <div className="text-xs-center">
          <h2 className="font-xl font-weight-200">Welcome {name}</h2>
          <p className="font-weight-200 m-b-1">Profile, created ideas, likes and votes</p>
        </div>
        <h3>My Ideas</h3>
        {myIdeas.map(idea => (
          <div className="p-b-1s" key={idea.id}>
            <Link to={`/ideas/${idea.slug}`}>
              <span className="font-weight-bold">{idea.title}</span>
            </Link>
          </div>
        ))}
        <h3>My Liked Ideas</h3>
        {nonNullIdeas.map(idea => (
          <div className="p-b-1s" key={idea.id}>
            <Link to={`/ideas/${idea.slug}`}>
              <span className="font-weight-bold">{idea.title}</span>
            </Link>
          </div>
        ))}
        <h3>My Votes</h3>
      </div>
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
      myIdeas {
        id
        title
        slug
        coverBackgroundUrl
      }
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
      myIdeas: (user && user.myIdeas) || [],
      likedIdeas: (user && user.likes && _(user.likes).pluck('idea')) || [],
      dataFieldName: 'user',
    }),
  }),
  withGQLLoadingOrError(FullpageLoading),
  withHandlers({
    dosomething: () => () => {},
  }),
)(MyDashboard);
