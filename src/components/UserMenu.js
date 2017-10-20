// @flow
import React from 'react';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import { Link } from 'react-router-dom';

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
      <IconMenu icon="more_vert" position="topRight" menuRipple>
        <MenuItem value="download" icon="get_app" caption="Download" />
        <MenuItem value="help" icon="favorite" caption="Favorite" />
        <MenuItem value="settings" icon="open_in_browser" caption="Open in app" />
        <MenuDivider />
        <MenuItem value="signout" icon="exit_to_app" caption="Logout" onClick={onLogout} />
      </IconMenu>
    </div>
  );
}
