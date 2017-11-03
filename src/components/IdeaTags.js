// @flow
import React from 'react';
import { Tag } from 'antd';

type Props = {
  isPresenting: boolean,
  isInFinalRound: boolean,
};
export default function IdeaTags({ isPresenting, isInFinalRound }: Props) {
  return (
    <span className="IdeaTags d-inline-block">
      {isPresenting && (
        <span>
          <Tag color="#87d068">Demo</Tag>
        </span>
      )}
      {isInFinalRound && (
        <span>
          <Tag color="#f50">Final</Tag>
        </span>
      )}
    </span>
  );
}
