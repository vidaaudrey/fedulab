// @flow
import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { CLIENT_ID, DOMAIN } from 'src/constants/config';
import LoginAuth0 from 'src/components/LoginAuth0';

type Props = {
  loading: boolean,
  isLoggedIn: boolean,
  onLogout: () => void,
};

export default function UserMenu({ loading, isLoggedIn, onLogout }: Props) {
  return (
    <div>
      <Link to="/me" className="p-x-1 d-inline-block">
        Me
      </Link>
      {loading && <h2>Loading</h2>}
      {!loading &&
        isLoggedIn && (
          <Button type="default" onClick={onLogout}>
            Logout
          </Button>
        )}
      {!loading && !isLoggedIn && <LoginAuth0 clientId={CLIENT_ID} domain={DOMAIN} />}
    </div>
  );
}
