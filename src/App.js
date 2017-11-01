// @flow
import React from 'react';
import { Layout } from 'antd';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';

import 'assets/react-toolbox/theme.css';
import theme from 'assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import Header from 'src/components/Header';
import IdeaListPage from 'src/components/IdeaListPage';
import IdeaDetail from 'src/components/IdeaDetail';
import UserCreate from 'src/components/UserCreate';
import IdeaAdd from 'src/components/IdeaAdd';
import IdeaEdit from 'src/components/IdeaEdit';
import IdeaPresent from 'src/components/IdeaPresent';
import About from 'src/components/About';
import Superuser from 'src/components/Superuser';
import Gallery from 'src/components/Gallery';
import MyDashboard from 'src/components/MyDashboard';
import Home from 'src/components/Home';
import Footer from 'src/components/Footer';
import FullpageLoading from 'src/components/FullpageLoading';

import { UserDetailsQuery } from 'src/constants/appQueries';
import { AUTH_KEY } from 'src/constants/config';

import 'antd/dist/antd.css';
import '@coursera/coursera-ui/css/utilities.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'src/styles/App.css';

const { Content } = Layout;

function App({
  data,
  loading,
  error,
  userId,
  isSuperuser,
  username,
  picture,
  isLoggedIn,
  onLogout,
  location,
  ...rest
}: Props) {
  if (!isLoggedIn && !loading && !error) {
    if (location.pathname !== '/' && location.pathname !== '/signup') {
      return <Redirect to={{ pathname: '/' }} />;
    }
  }
  const lastPathName = location.pathname.split('/').pop();
  const isPresentationMode = lastPathName === 'show';

  return (
    <Layout className="min-support-width">
      {!isPresentationMode && (
        <Header
          name={username}
          picture={picture}
          isLoggedIn={isLoggedIn}
          loading={loading}
          onLogout={onLogout}
          isSuperuser={isSuperuser}
        />
      )}
      <Content style={{ minHeight: '92vh', paddingTop: 72 }}>
        <div>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                isLoggedout={!isLoggedIn}
                {...props}
                userId={userId}
                isSuperuser={isSuperuser}
              />
            )}
          />
          <Route
            exact
            path="/ideas/:ideaSlug"
            render={props =>
              (isLoggedIn ? (
                <IdeaDetail {...props} userId={userId} isSuperuser={isSuperuser} />
              ) : null)}
          />
          <Route
            exact
            path="/ideas/:ideaSlug/edit"
            render={props =>
              (isLoggedIn ? <IdeaEdit {...props} userId={userId} isSuperuser={isSuperuser} /> : null)}
          />
          <Route
            exact
            path="/ideas/:ideaSlug/show"
            render={props =>
              (isLoggedIn ? (
                <IdeaPresent {...props} userId={userId} isSuperuser={isSuperuser} />
              ) : null)}
          />
          <Route
            exact
            path="/add-idea"
            render={props =>
              (isLoggedIn ? <IdeaAdd {...props} userId={userId} isSuperuser={isSuperuser} /> : null)}
          />
          <Route
            exact
            path="/ideas"
            render={props =>
              (isLoggedIn ? (
                <IdeaListPage {...props} userId={userId} isSuperuser={isSuperuser} />
              ) : null)}
          />
          <Route
            exact
            path="/su"
            render={props =>
              (isLoggedIn && isSuperuser ? (
                <Superuser {...props} userId={userId} isSuperuser={isSuperuser} />
              ) : null)}
          />
          <Route path="/loading" component={FullpageLoading} />
          <Route path="/about" component={About} />
          <Route path="/gallery" component={Gallery} />
          {isLoggedIn && <Route path="/me" component={MyDashboard} />}
          {isLoggedIn && <Route exact path="/signup" component={UserCreate} />}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

const AppWithTheme = props => (
  <ThemeProvider theme={theme}>
    <App {...props} />
  </ThemeProvider>
);

export default compose(
  graphql(UserDetailsQuery, {
    options: { fetchPolicy: 'network-only' },
    props: ({ data, data: { loading, error, user } }) => ({
      loading,
      error,
      isLoggedIn: !!user,
      userId: user && user.id,
      isSuperuser: user && user.isSuperuser,
      picture: user && user.picture,
      data,
    }),
  }),
  withHandlers({
    onLogout: () => () => {
      window.localStorage.removeItem(AUTH_KEY);
      // eslint-disable-next-line
      location.reload();
    },
  }),
  // withGQLLoadingOrError(HomeShell),
  withRouter,
)(AppWithTheme);
