// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';
import { Layout, Menu } from 'antd';
import { Route, Link } from 'react-router-dom';

import UserMenu from 'src/components/UserMenu';
import Logo from 'src/assets/logo_light.svg';

const { Header } = Layout;

export default function HeaderAlt({ username, picture, isLoggedIn, loading, onLogout }: Props) {
  return (
    <Header
      className="shadow"
      style={{
        position: 'fixed',
        width: '100%',
        background: '#FFF',
        zIndex: 1000,
        height: 72,
      }}
    >
      <Box rootClassName="w-100 h-100" justifyContent="between" alignItems="center">
        <Box tag={Link} rootClassName="logo" alignItems="center" to="/home" flex={1}>
          <img src={Logo} alt="fedulab" width="144px" />
        </Box>
        <Box>
          <Box
            tag={Menu}
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '68px', borderBottom: 'none' }}
          >
            <Menu.Item key="1">
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/ideas">Ideas</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/add-idea">Add Idea</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/about">About</Link>
            </Menu.Item>
          </Box>

          <Route
            path="/"
            render={({ match, history }) => (
              <div className="userMenuWrapper">
                <UserMenu
                  name={username}
                  picture={picture}
                  isLoggedIn={isLoggedIn}
                  loading={loading}
                  onLogout={onLogout}
                />
              </div>
            )}
          />
        </Box>
      </Box>
    </Header>
  );
}
