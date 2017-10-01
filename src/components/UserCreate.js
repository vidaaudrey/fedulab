// @flow
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose, setDisplayName, withHandlers } from 'recompose';

import { graphql, gql } from 'react-apollo';

type Props = {
  data: {
    loading: boolean,
    user: ?Object,
  },
  onCreateUser: () => void,
};
function UserCreate({ data, onCreateUser }: Props) {
  if (data.loading) {
    return <div>Loading</div>;
  }

  // Redirect if user is logged in or did not finish Auth0 Lock dialog
  if (data.user || window.localStorage.getItem('auth0IdToken') === null) {
    console.warn('not a new user or already logged in');
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return (
    <button className="pa3 bg-black-10 bn dim ttu pointer" onClick={onCreateUser}>
      Sign up
    </button>
  );
}

const CreateUserMutation = gql`
  mutation(
    $idToken: String!
    $name: String!
    $userName: String!
    $emailAddress: String!
    $picture: String!
  ) {
    createUser(
      authProvider: { auth0: { idToken: $idToken } }
      name: $name
      userName: $userName
      emailAddress: $emailAddress
      picture: $picture
    ) {
      id
      name
      userName
      emailAddress
      picture
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default compose(
  withRouter,
  setDisplayName('UserCreateHOC'),
  graphql(CreateUserMutation, { name: 'createUser' }),
  graphql(userQuery, { options: { fetchPolicy: 'network-only' } }),
  withHandlers({
    onCreateUser: ({ history, createUser }) => () => {
      const profile = JSON.parse(window.localStorage.getItem('profile'));

      const variables = {
        idToken: window.localStorage.getItem('auth0IdToken'),
        name: profile.name,
        userName: profile.nickname || 'randomName', // TODO(Audrey):auto gen name
        emailAddress: profile.email,
        picture: profile.picture,
      };

      createUser({ variables })
        .then((response) => {
          history.replace('/');
        })
        .catch((e) => {
          console.error(e);
          history.replace('/');
        });
    },
  }),
)(UserCreate);
