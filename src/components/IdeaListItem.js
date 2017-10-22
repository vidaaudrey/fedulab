// @flow
import React from 'react';
import { Card } from 'antd';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import IdeaActions from 'src/components/IdeaActions';
import HumanTime from 'src/components/HumanTime';
import IdeaLike from 'src/components/IdeaLike';
import { ENABLE_QUICK_ADMIN_OP } from 'src/constants/appConstants';

const MAX_WIDTH = 560;

type Props = {
  idea: Object,
  isSuperuser: boolean,
  userId: boolean,
  onCardClick: () => void,
};

export function IdeaListItem({ idea, onCardClick, isSuperuser, userId }: Props) {
  const allContributorNames = idea.contributors.map(item => item.name).join(',  ');

  return (
    <Card
      onClick={onCardClick}
      style={{ width: '100%', maxWidth: MAX_WIDTH, height: 420, cursor: 'pointer' }}
      bodyStyle={{ padding: 0 }}
    >
      <div className="custom-image">
        <img alt="example" width="100%" src={idea.coverBackgroundUrl} />
      </div>
      <div className="custom-card p-a-1">
        <h3>{idea.title}</h3>
        <span className="font-sm text-secondary">
          By {idea.createdBy.name} <HumanTime time={idea.createdAt} />
        </span>
        <h4>{allContributorNames}</h4>
        <p style={{ color: 'gray' }}>{idea.description}</p>
        {ENABLE_QUICK_ADMIN_OP && (
          <IdeaActions
            canDelete={isSuperuser || userId === (idea.createdBy && idea.createdBy.id)}
            canEdit={isSuperuser || userId === (idea.createdBy && idea.createdBy.id)}
            id={idea.id}
            slug={idea.slug}
            isSuperuser={isSuperuser}
          />
        )}

        <IdeaLike ideaId={idea.id} ideaLikes={idea.likes} userId={userId} />
      </div>
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
)(IdeaListItem);
