// @flow
import React from 'react';
import IdeaLike from 'src/components/IdeaLike';
import { compose, withHandlers } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import ActionIconButton from 'src/components/ActionIconButton';

import { DeleteIdeaMutation, ClaimIdeaMutation, IdeaListQuery } from 'src/constants/appQueries';

type Props = {
  canDelete: boolean,
  canEdit: boolean,
  canClaim: boolean,
  id: string,
  userId: string,
  isSuperuser: boolean,
  onDeleteIdea: () => void,
  onClaimIdea: () => void,
  onEdit: () => void,
  slug: string,
  userId: string,
  likes: Array<Object>,
  hideLikes: boolean,
  showPresent: boolean,
  inverse: boolean,
  noRightMargin: boolean,
};

function IdeaActions({
  id,
  slug,
  onDeleteIdea,
  onClaimIdea,
  onEdit,
  isSuperuser,
  canDelete,
  canEdit,
  canClaim,
  likes,
  userId,
  hideLikes,
  showPresent,
  inverse,
  noRightMargin,
  ...rest
}: Props) {
  return (
    <div className="IdeaActions">
      {!hideLikes && (
        <span className="d-inline-block m-r-1">
          <IdeaLike ideaId={id} ideaLikes={likes} userId={userId} />
        </span>
      )}
      {canClaim && (
        <ActionIconButton
          onClick={onClaimIdea}
          className={noRightMargin ? '' : 'm-r-1'}
          minWidth={80}
          inverse={inverse}
        >
          Claim my idea
        </ActionIconButton>
      )}
      {canEdit && (
        <ActionIconButton
          icon="edit"
          size="large"
          onClick={onEdit}
          className={noRightMargin ? '' : 'm-r-1'}
          inverse={inverse}
        />
      )}
      {canDelete && (
        <ActionIconButton
          icon="delete"
          onClick={onDeleteIdea}
          className={showPresent || noRightMargin ? 'm-r-1' : ''}
          inverse={inverse}
        />
      )}
      {showPresent && (
        <Link to={`/ideas/${slug}/show`}>
          <ActionIconButton icon="airplay" inverse={inverse} />
        </Link>
      )}
    </div>
  );
}

export default compose(
  withRouter,
  graphql(DeleteIdeaMutation, { name: 'deleteIdea' }),
  graphql(ClaimIdeaMutation, { name: 'claimIdea' }),
  withHandlers({
    onClaimIdea: ({ claimIdea, id, userId }) => (e) => {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }

      claimIdea({ variables: { id, createdById: userId } })
        .then((res) => {
          console.warn('res', res);
        })
        .catch(error => console.warn('error', error));
    },
    onDeleteIdea: ({ deleteIdea, id, history, shouldRedirectToListAfterDelete }) => (e) => {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }

      deleteIdea({
        update: (store, { data }) => {
          // Read the data from our cache for this query.
          const cacheData = store.readQuery({ query: IdeaListQuery });
          const allIdeas = cacheData.allIdeas.filter(item => item.id !== data.deleteIdea.id);
          // Write our data back to the cache.
          store.writeQuery({ query: IdeaListQuery, data: { allIdeas } });
        },
      })
        .then((res) => {
          console.warn('res', res);
          if (shouldRedirectToListAfterDelete) {
            history.push('/ideas');
          }
        })
        .catch(error => console.warn('error', error));
    },
    onEdit: ({ history, slug }) => (e) => {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }
      history.replace(`/ideas/${slug}/edit/`);
    },
  }),
)(IdeaActions);
