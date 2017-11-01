// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';
import { Layout } from 'antd';
import Button from 'react-toolbox/lib/button/Button';
import { Route, Link, withRouter } from 'react-router-dom';

import UserMenu from 'src/components/UserMenu';
import Logo from 'src/assets/logo_light.svg';

import { ADD_IDEA_TEXT } from 'src/constants/appConstants';

const { Header } = Layout;

type Props = {
  isSuperuser: boolean,
  username: string,
  picture: string,
  isLoggedIn: boolean,
  loading: boolean,
  onLogout: MouseEventHandler,
  location: {
    pathname: string,
  },
};

function HeaderAlt({
  isSuperuser,
  username,
  picture,
  isLoggedIn,
  loading,
  onLogout,
  location,
  location: { pathname },
  ...rest
}: Props) {
  return (
    <Header
      className="shadow min-support-width p-x-2"
      style={{
        position: 'fixed',
        width: '100%',
        background: 'rgba(255, 255, 255, .88)',
        zIndex: 1000,
        height: 72,
      }}
    >
      <Box rootClassName="w-100 h-100" justifyContent="between" alignItems="center">
        <Box tag={Link} rootClassName="logo" alignItems="center" to="/" flex={1}>
          <img src={Logo} alt="fedulab" width="144px" />
        </Box>
        {isLoggedIn && (
          <Box>
            <Box
              rootClassName="hidden-sm-down"
              style={{ lineHeight: '68px', borderBottom: 'none' }}
            >
              {/* <Menu.Item key="1">
              <Link to="/add-idea">+Idea</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/ideas">Ideas</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/about">About</Link>
            </Menu.Item> */}
              <Link to="/add-idea">
                <Button label={ADD_IDEA_TEXT} primary={pathname === '/add-idea'} />
              </Link>
              <Link to="/ideas">
                <Button label="Browse" primary={pathname === '/ideas'} />
              </Link>
            </Box>

            <Route
              path="/"
              render={({ match, history }) => (
                <div className="userMenuWrapper">
                  <UserMenu
                    isSuperuser={isSuperuser}
                    name={username}
                    picture={picture}
                    isLoggedIn={isLoggedIn}
                    loading={loading}
                    onLogout={onLogout}
                    isActive={pathname === '/me'}
                  />
                </div>
              )}
            />
          </Box>
        )}
      </Box>
    </Header>
  );
}

export default withRouter(HeaderAlt);
