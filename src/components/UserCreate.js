// @flow
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose, setDisplayName, withHandlers, lifecycle, withProps, withState } from 'recompose';

import { graphql, gql } from 'react-apollo';
import { withGQLLoadingOrError } from 'src/components/withBranches';

type Props = {
  data: {
    loading: boolean,
    user: ?Object,
  },
  onCreateUser: () => void,
  isCreatingUser: boolean,
};

function UserCreate({ data, onCreateUser, isCreatingUser }: Props) {
  if (isCreatingUser) {
    return <span>Creating users...</span>;
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
  withProps(() => ({ shouldRenderNothing: true })),
  withGQLLoadingOrError(),
  withState('isCreatingUser', 'isCreatingUserSet', false),
  withHandlers({
    onCreateUser: ({ history, createUser, isCreatingUserSet }) => () => {
      const profile = JSON.parse(window.localStorage.getItem('profile'));

      const variables = {
        idToken: window.localStorage.getItem('auth0IdToken'),
        name: profile.name,
        userName: profile.nickname || 'randomName', // TODO(Audrey):auto gen name
        emailAddress: profile.email,
        picture: profile.picture,
      };

      isCreatingUserSet(true);
      createUser({ variables })
        .then((response) => {
          console.warn('user created', response);
          // TODO(Audrey): figure out why history doesn't trigger GQL requery
          // history.replace('/home');
          window.location.pathname = '/home';
        })
        .catch((e) => {
          console.error(e);
          isCreatingUserSet(false);
          history.replace('/');
        });
    },
  }),
  lifecycle({
    componentDidMount() {
      const { data, onCreateUser } = this.props;
      if (!(data.user || window.localStorage.getItem('auth0IdToken') === null)) {
        onCreateUser();
      }
    },
  }),
)(UserCreate);
