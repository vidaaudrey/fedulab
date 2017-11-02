// @flow
import React from 'react';
import { Card } from 'antd';
import { Box } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import TextTruncate from 'src/components/hoc/TextTruncate';
import IdeaActions from 'src/components/IdeaActions';
import { ENABLE_QUICK_ADMIN_OP } from 'src/constants/appConstants';

const CARD_HEIGHT = 150;

type Props = {
  idea: Object,
  isSuperuser: boolean,
  userId: string,
  onCardClick: () => void,
};

export function IdeaDescription({
  idea,
  idea: {
    id,
    slug,
    title,
    tagline,
    coverBackgroundUrl,
    pitchedBy,
    createdBy,
  },
  onCardClick,
  isSuperuser,
  userId,
}: Props) {
  const isUserCreated = userId === (createdBy && createdBy.id);

  return (
    <Card
      className="custom-card"
      onClick={onCardClick}
      style={{
        width: '100%',
        height: CARD_HEIGHT,
        cursor: 'pointer',
      }}
      bodyStyle={{ display: 'flex', padding: 0, }}
    >
      <div style={{
        width: 150,
        height: 150,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${coverBackgroundUrl})`,
      }} />
      <Box
        rootClassName="p-a-1"
        flexDirection="column"
        style={{ width: '75%', height: CARD_HEIGHT, margin: 0 }}
      >
        <TextTruncate rootClassName="h4 m-b-0" line={2} truncateText="…" text={title} />
        <Box rootClassName="font-sm text-secondary" flexWrap="wrap">
          <span>{(pitchedBy && pitchedBy.split('@')[0]) || createdBy.name}</span>
        </Box>
        <p style={{ color: 'gray' }}>{tagline}</p>
        <div className="p-b-1" style={{ position: 'absolute', bottom: '0' }}>
          <IdeaActions
            hideLikes
            canDelete={(isSuperuser && ENABLE_QUICK_ADMIN_OP) || isUserCreated}
            canEdit={(isSuperuser && ENABLE_QUICK_ADMIN_OP) || isUserCreated}
            id={id}
            slug={slug}
            userId={userId}
            isSuperuser={isSuperuser}
          />
        </div>
      </Box>
    </Card>
  );
}

export default compose(
  withRouter,
  withHandlers({
    onCardClick: ({ history, idea }) => () => {
      history.push(`/ideas/${idea.slug}`);
    },
  }),
)(IdeaDescription);
