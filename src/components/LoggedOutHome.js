// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';
import { Route, withRouter } from 'react-router-dom';

import { graphql, gql, compose } from 'react-apollo';

import { CLIENT_ID, DOMAIN } from 'src/constants/config';
import LoginAuth0 from 'src/components/LoginAuth0';
// import MakeAThonAnim from 'src/components/MakeAThonAnim';
import UserCreate from 'src/components/UserCreate';
import Logo from 'src/assets/logo_light.svg';

type Props = {
  loading: Boolean,
  isLoggedIn: Boolean,
  error: any,
  location: {
    pathname: string,
  },
  history: Object,
};

function LoggedOutHome({ loading, location, history, isLoggedIn, error, ...rest }: Props) {
  return (
    <Box
      rootClassName="LoggedOutHome bg-white"
      style={{ width: '100vw', height: '100vh' }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img src={Logo} alt="fedulab" />
      {loading && <h1>Loading</h1>}
      {error && <h1>Error: {error}</h1>}
      {!loading &&
        !isLoggedIn &&
        !error && (
          <Box flexDirection="column" justifyContent="center" alignItems="center">
            <h1 className="color-white m-b-1">Welcome to 9th Make-a-thon</h1>
            <Route path="/signup" component={UserCreate} />
            <LoginAuth0 clientId={CLIENT_ID} domain={DOMAIN} />
          </Box>
        )}
    </Box>
  );
}
('');

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`;

export default compose(
  withRouter,
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' },
    props: ({ data, data: { loading, user, error } }) => ({
      error,
      loading,
      isLoggedIn: !!user,
      data,
    }),
  }),
)(LoggedOutHome);
