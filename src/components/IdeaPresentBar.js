// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import _ from 'underscore';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';

import { withGQLLoadingOrError } from 'src/components/withBranches';

import { IdeaPresentBarQuery } from 'src/constants/appQueries';

type Props = {
  before: {
    beforeSlug: String,
  },
  after: {
    title: String,
    afterSlug: String,
  },
  currentSlug: String,
  currentCreatedBy: String,
  userId: String,
  isSuperuser: boolean,
  onEdit: () => null,
  onPrevious: () => null,
  onNext: () => null,
};

function IdeaPresentBar({
  before: { slug: beforeSlug },
  after: { title, slug: afterSlug, createdBy },
  currentSlug,
  currentCreatedBy,
  userId,
  isSuperuser,
  onEdit,
  onPrevious,
  onNext,
  ...rest
}: Props) {
  const canEdit = isSuperuser || userId === (currentCreatedBy && currentCreatedBy.id);
  return (
    <Box justifyContent="between" style={{ backgroundColor: 'white', height: 60 }}>
      <Box rootClassName="w-100" justifyContent="start" alignItems="center">
        <MenuItem
          value="chevron_left"
          icon="chevron_left"
          onClick={onPrevious}
          style={{ width: 100, height: '100%' }}
        />
      </Box>

      <Box rootClassName="w-100" justifyContent="center" alignItems="center">
        {canEdit && (
          <MenuItem
            value="mode_edit"
            icon="mode_edit"
            onClick={onEdit}
            style={{ height: '100%' }}
          />
        )}
      </Box>
      <Box rootClassName="w-100" justifyContent="end" alignItems="center">
        <MenuItem onClick={onNext} style={{ width: '100%', height: '100%', textAlign: 'left' }}>
          <Box rootClassName="w-100" flexDirection="column">
            <div style={{ color: '#49a9ee', fontSize: '2rem', lineHeight: 1 }}>
              {`Next: ${title.substring(0, 25)}${title.length >= 25 ? '...' : ''}`}
            </div>
            <div> {createdBy && createdBy.name}</div>
          </Box>
          <MenuItem value="chevron_right" icon="chevron_right" onClick={onPrevious} />
        </MenuItem>
      </Box>
    </Box>
  );
}

export default compose(
  withRouter,
  graphql(IdeaPresentBarQuery),
  withGQLLoadingOrError(),
  withProps(({ data }) => ({
    data,
    before: _(data.before).first(),
    after: _(data.after).first(),
  })),
  withHandlers({
    onPrevious: ({ history, before: { slug } }) => () => {
      history.push(`/ideas/${slug}/show`);
    },
    onNext: ({ history, after: { slug } }) => () => {
      history.push(`/ideas/${slug}/show`);
    },
    onEdit: ({ history, currentSlug }) => () => {
      history.push(`/ideas/${currentSlug}/edit`);
    },
  }),
)(IdeaPresentBar);
