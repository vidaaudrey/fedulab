// @flow
import React from 'react';
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
            <button className="dib bg-red white pa3 pointer dim" onClick={onLogout}>
              Logout
            </button>
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
