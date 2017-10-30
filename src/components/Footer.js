// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Footer: FooterAnt } = Layout;

export default function Footer() {
  return (
    <FooterAnt className="bg-dark">
      <p className="text-xs-center">
        <Link to="/" title="Fedulab">
          Fedulab{' '}
        </Link>
        for Make-A-Thon ©2017 @Coursera
      </p>
    </FooterAnt>
  );
}
