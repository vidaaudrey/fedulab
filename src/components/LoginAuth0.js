// @flow
import React from 'react';
import { Button } from 'antd';

import { compose, setDisplayName, withProps, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';

import Auth0Lock from 'auth0-lock';

import { CLIENT_ID, DOMAIN } from 'src/constants/config';

type Props = {
  onShowLogin: () => void,
};

function LoginAuth0({ onShowLogin }: Props) {
  return (
    <Button type="default" onClick={onShowLogin}>
      Login
    </Button>
  );
}

export default compose(
  setDisplayName('LoginAuth0HOC'),
  withRouter,
  withProps(({ history, onAuthFinished }) => {
    const lock = new Auth0Lock(CLIENT_ID, DOMAIN);

    lock.on('authenticated', (authResult) => {
      lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          console.warn('error');
          return;
        }
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        window.localStorage.setItem('auth0IdToken', authResult.idToken);
        // TODO(Audrey): figure out why history push doesn't trigger GQL requery
        window.location.pathname = '/';
        // history.push('/');
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
