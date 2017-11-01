// @flow
import React from 'react';
import { Layout } from 'antd';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Home from 'src/components/Home';

const { Content } = Layout;

export default function HomeShell() {
  return (
    <Layout className="min-support-width">
      <Header isLoggedIn={false} />
      <Content style={{ minHeight: '92vh', paddingTop: 72 }}>
        <Home isLoggedout />
      </Content>
      <Footer />
    </Layout>
  );
}
