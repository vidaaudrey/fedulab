// @flow
import React from 'react';
import { Tag } from 'antd';

type Props = {
  isPresenting: boolean,
  isInFinalRound: boolean,
  winningCategory: ?string,
};
export default function IdeaTags({ isPresenting, isInFinalRound, winningCategory }: Props) {
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
      {winningCategory &&
        winningCategory !== '' && (
          <span>
            <Tag color="#108ee9">{winningCategory}</Tag>
          </span>
        )}
    </span>
  );
}
