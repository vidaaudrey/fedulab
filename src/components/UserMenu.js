// @flow
import React from 'react';
import { Button } from 'antd';
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
      {loading && <h2>Loading</h2>}
      {!loading &&
        isLoggedIn && (
          <div className="pv3">
            <Button type="default" onClick={onLogout}>
              Logout
            </Button>
          </div>
        )}
      {!loading &&
        !isLoggedIn && (
          <div>
            <div className="pv3">
              <LoginAuth0 clientId={CLIENT_ID} domain={DOMAIN} />
            </div>
          </div>
        )}
    </div>
  );
}
