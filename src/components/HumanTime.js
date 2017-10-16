// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import moment from 'moment';

type Props = {
  time: string, // TODO(Audrey): better type?
};

export default function HumanTime({ time }: Props) {
  return <span>{moment(time).fromNow()}</span>;
}
