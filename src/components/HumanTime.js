// @flow
import React from 'react';
import moment from 'moment';

type Props = {
  time: string, // TODO(Audrey): better type?
};

export default function HumanTime({ time }: Props) {
  return <span>{moment(time).fromNow()}</span>;
}
