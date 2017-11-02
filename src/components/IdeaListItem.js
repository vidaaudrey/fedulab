// @flow
import React from 'react';
import { Card } from 'antd';
import { Box } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import TextTruncate from 'src/components/hoc/TextTruncate';
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
  userId: string,
  userEmail: string,
  onCardClick: () => void,
};

export function IdeaListItem({
  idea,
  idea: {
    pitchedBy,
    tagline,
    createdBy,
    contributors,
    coverBackgroundUrl,
    createdAt,
    id,
    likes,
    title,
    description,
    slug,
    contributorsText,
  },
  onCardClick,
  isSuperuser,
  userId,
  userEmail,
}: Props) {
  const isUserCreated = userId === (createdBy && createdBy.id);

  return (
    <Box
      tag={Card}
      rootClassName="custom-card"
      flexDirection="column"
      onClick={onCardClick}
      style={{
        width: '100%',
        maxWidth: MAX_WIDTH,
        height: CARD_HEIGHT,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div
        className="text-xs-right color-white"
        style={{
          minHeight: CARD_IMAGE_HEIGHT,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${coverBackgroundUrl})`,
        }}
      >
        <IdeaLike ideaId={id} ideaLikes={likes || []} userId={userId} isOverIdeaCard />
      </div>
      <Box
        rootClassName="p-a-1"
        flexDirection="column"
        flex={1}
        style={{ height: CARD_HEIGHT - CARD_IMAGE_HEIGHT - 64, overflow: 'scroll' }}
      >
        <TextTruncate rootClassName="h4 m-b-0" line={3} truncateText="…" text={title} />
        <Box rootClassName="font-sm text-secondary m-b-1s" flexWrap="wrap">
          <span className="d-inline-block m-r-1">{createdBy.name}</span>
          <span className="font-italic">
            <HumanTime time={createdAt} />
          </span>
        </Box>
        <TextTruncate
          rootClassName="h5 m-b-0 font-italic"
          line={3}
          truncateText="…"
          text={tagline}
        />
      </Box>
      <Box justifyContent="between" alignSelf="end">
        <span className="font-sm p-x-1">{contributorsText}</span>
        <IdeaActions
          hideLikes
          canDelete={ENABLE_QUICK_ADMIN_OP}
          canEdit={(isSuperuser && ENABLE_QUICK_ADMIN_OP) || isUserCreated}
          canClaim={!isUserCreated && userEmail === pitchedBy}
          id={id}
          slug={slug}
          userId={userId}
          isSuperuser={isSuperuser}
        />
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
