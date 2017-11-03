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
import IdeaTags from 'src/components/IdeaTags';
import { ENABLE_QUICK_ADMIN_OP } from 'src/constants/appConstants';

const MAX_WIDTH = 560;
const CARD_HEIGHT = 440;
const CARD_IMAGE_HEIGHT = 160;
const CARD_FOOTER_HEIGHT = 80;

type Props = {
  idea: Object,
  isSuperuser: boolean,
  userId: string,
  userEmail: string,
  onCardClick: () => void,
  showSuperuserOp: boolean,
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
    isPresenting,
    isInFinalRound,
  },
  onCardClick,
  isSuperuser,
  userId,
  userEmail,
  showSuperuserOp,
}: Props) {
  const isUserCreated = userId === (createdBy && createdBy.id);
  const canClaim = !isUserCreated && userEmail === pitchedBy;
  const enableQuickAdmin = isSuperuser && ENABLE_QUICK_ADMIN_OP;
  return (
    <Box
      tag={Card}
      rootClassName="custom-card"
      flexDirection="column"
      onClick={onCardClick}
      style={{
        width: '100%',
        maxWidth: MAX_WIDTH,
        height: showSuperuserOp ? CARD_HEIGHT + 40 : CARD_HEIGHT,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div className="h-100">
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
          style={{
            height: CARD_HEIGHT - CARD_IMAGE_HEIGHT - CARD_FOOTER_HEIGHT - 16,
            overflow: 'scroll',
          }}
        >
          <TextTruncate rootClassName="h4 m-b-1s" line={2} text={title} />
          <Box rootClassName="font-sm text-secondary m-b-1s" flexWrap="wrap">
            <span className="d-inline-block m-r-1">{createdBy.name}</span>
            <span className="font-italic m-r-1">
              <HumanTime time={createdAt} />
            </span>
            <IdeaTags isPresenting={isPresenting} isInFinalRound={isInFinalRound} />
          </Box>
          <TextTruncate
            rootClassName="h5 m-b-0 font-italic"
            line={2}
            truncateText="…"
            text={tagline}
          />
          <IdeaActions
            hideLikes
            canDelete={showSuperuserOp || enableQuickAdmin}
            canEdit={showSuperuserOp || enableQuickAdmin || isUserCreated}
            canClaim={canClaim}
            canToggleFinal={showSuperuserOp}
            id={id}
            isInFinalRound={isInFinalRound}
            slug={slug}
            userId={userId}
            isSuperuser={isSuperuser}
            noRightMargin
          />
        </Box>
        <Box
          justifyContent="between"
          alignSelf="end"
          alignItems="end"
          rootClassName="p-x-1 m-b-1"
          style={{ height: CARD_FOOTER_HEIGHT, overflow: 'scroll' }}
          flexWrap="wrap"
        >
          <span className="font-sm">{contributorsText}</span>
        </Box>
      </div>
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
