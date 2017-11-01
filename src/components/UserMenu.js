// @flow
import React from 'react';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import { Link } from 'react-router-dom';
import { COLOR_PRIMARY } from 'src/constants/theme';
import { ADD_IDEA_TEXT } from 'src/constants/appConstants';

type Props = {
  name: string,
  picture: string,
  loading: boolean,
  isLoggedIn: boolean,
  isSuperuser: boolean,
  isActive: boolean,
  onLogout: () => void,
};

export default function UserMenu({
  name,
  picture,
  isActive,
  loading,
  isLoggedIn,
  isSuperuser,
  onLogout,
}: Props) {
  return (
    <div>
      <Link to="/me" className="p-x-1 d-inline-block">
        <Avatar
          style={{ border: isActive ? `2px solid ${COLOR_PRIMARY}` : 'none' }}
          title={name}
          image={picture}
        />
      </Link>
      <IconMenu icon="more_vert" position="topRight" menuRipple>
        <Link to="/add-idea" className="hidden-sm-up">
          <MenuItem value="add" icon="add" caption={ADD_IDEA_TEXT} />
        </Link>
        <Link to="/ideas" className="hidden-sm-up">
          <MenuItem value="browse" icon="explore" caption="Browse" />
        </Link>
        {isSuperuser && (
          <Link to="/su">
            <MenuItem value="help" icon="whatshot" caption="Superuser" />
          </Link>
        )}
        <Link to="/me">
          <MenuItem value="help" icon="favorite" caption="Liked Ideas" />
        </Link>
        <Link to="/about">
          <MenuItem value="about" icon="info" caption="About" />
        </Link>
        <MenuDivider />
        <MenuItem value="signout" icon="exit_to_app" caption="Logout" onClick={onLogout} />
      </IconMenu>
    </div>
  );
}
