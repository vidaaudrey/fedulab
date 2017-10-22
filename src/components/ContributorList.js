// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';
import _ from 'underscore';

import ContributorListItem from 'src/components/ContributorListItem';

type Props = {};

export default function ContributorList({
  contributors,
  size,
  rootClassName = '',
  isCenterAligned,
}: Props) {
  return (
    <Box flexWrap="wrap">
      {_(contributors)
        .uniq()
        .sort((item1, item2) => item1.node.createdAt > item2.node.createdAt)
        .map(({ node, node: { id } }) => (
          <ContributorListItem
            key={id}
            contributor={node}
            size={size}
            isCenterAligned={isCenterAligned}
          />
        ))}
    </Box>
  );
}
