// @flow
import React from 'react';
import { Card } from 'antd';
import { Box } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import IdeaActions from 'src/components/IdeaActions';
import HumanTime from 'src/components/HumanTime';
import IdeaLike from 'src/components/IdeaLike';
import { ENABLE_QUICK_ADMIN_OP } from 'src/constants/appConstants';

const MAX_WIDTH = 560;
const CARD_HEIGHT = 420;
const CARD_IMAGE_HEIGHT = 160;

type Props = {
  idea: Object,
  isSuperuser: boolean,
  userId: boolean,
  onCardClick: () => void,
};

export function IdeaListItem({
  idea,
  idea: {
    pitchedBy,
    tagline,
    createdBy,
    coverBackgroundUrl,
    createdAt,
    id,
    likes,
    title,
    description,
    slug,
  },
  onCardClick,
  isSuperuser,
  userId,
}: Props) {
  const allContributorNames = idea.contributors.map(item => item.name).join(',  ');

  return (
    <Box
      tag={Card}
      rootClassName="custom-card"
      flexDirection="column"
      onClick={onCardClick}
      style={{
        width: '100%',
        maxWidth: MAX_WIDTH,
        height: 420,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div
        style={{
          minHeight: CARD_IMAGE_HEIGHT,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${coverBackgroundUrl})`,
        }}
      >
        <span />
      </div>
      <Box
        rootClassName="p-a-1"
        flexDirection="column"
        flex={1}
        style={{ height: CARD_HEIGHT - CARD_IMAGE_HEIGHT - 64 }}
      >
        <h3>{title}</h3>
        <span className="font-sm text-secondary">
          {pitchedBy || createdBy.name}
          <span className="p-l-1">
            <HumanTime time={createdAt} />
          </span>
        </span>
        <h4>{allContributorNames}</h4>
        <p style={{ color: 'gray' }}>{tagline}</p>
        {ENABLE_QUICK_ADMIN_OP && (
          <IdeaActions
            canDelete={isSuperuser || userId === (createdBy && createdBy.id)}
            canEdit={isSuperuser || userId === (createdBy && createdBy.id)}
            id={id}
            slug={slug}
            isSuperuser={isSuperuser}
          />
        )}
      </Box>
      <Box rootClassName="p-a-1" justifyContent="end" alignSelf="end">
        <IdeaLike ideaId={id} ideaLikes={likes} userId={userId} />
      </Box>
    </Box>
  );
}

export default compose(
  withRouter,
  withHandlers({
    onCardClick: ({ history, idea }) => () => {
      history.push(`/ideas/${idea.slug}`);
    },
  }),
)(IdeaListItem);
