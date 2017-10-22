// @flow
import React from 'react';
import { Layout } from 'antd';

const { Footer: FooterAnt } = Layout;

export default function Footer() {
  return (
    <FooterAnt>
      <p className="text-xs-center">Fedulab for Make-A-Thon ©2017 @Coursera</p>
    </FooterAnt>
  );
}
