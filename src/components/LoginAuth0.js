// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';
import { Button } from 'antd';
import { compose, setDisplayName, withProps, withHandlers, withState } from 'recompose';
import { withRouter } from 'react-router-dom';
import _ from 'underscore';

import Auth0Lock from 'auth0-lock';
import { ENABLE_NON_COURSERA_SIGN_IN } from 'src/constants/appConstants';
import { CLIENT_ID, DOMAIN } from 'src/constants/config';

type Props = {
  onShowLogin: () => void,
};

function LoginAuth0({ onShowLogin, error }: Props) {
  return (
    <Box flexDirection="column">
      <Button type="default" onClick={onShowLogin} className="m-b-1">
        Login
      </Button>
      {error && <span className="text-error">Please login with your Coursera credential</span>}
    </Box>
  );
}

export default compose(
  setDisplayName('LoginAuth0HOC'),
  withRouter,
  withState('error', 'errorSet', null),
  withProps(({ history, createUser, errorSet }) => {
    const lock = new Auth0Lock(CLIENT_ID, DOMAIN);

    lock.on('authenticated', (authResult) => {
      lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          console.warn('error');
          return;
        }
        const emailSplits = profile.email && profile.email.split('@');
        if (_(emailSplits).last() === 'coursera.org' || ENABLE_NON_COURSERA_SIGN_IN) {
          localStorage.setItem('accessToken', authResult.accessToken);
          localStorage.setItem('profile', JSON.stringify(profile));
          window.localStorage.setItem('auth0IdToken', authResult.idToken);
          // TODO(Audrey): user history?
          window.location.pathname = '/home';
          // history.replace('/signup');
        } else {
          errorSet(true);
        }
      });
    });
    return { lock };
  }),
  withHandlers({
    onShowLogin: ({ lock }) => () => {
      lock.show({
        closable: true,
        auth: {
          params: {
            responseType: 'id_token token',
          },
        },
      });
    },
  }),
)(LoginAuth0);
