// @flow
import React from 'react';
import IdeaLike from 'src/components/IdeaLike';
import { compose, withHandlers } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import withPromiseHandler from 'src/components/withPromiseHandler';
import ActionIconButton from 'src/components/ActionIconButton';

import {
  DeleteIdeaMutation,
  ClaimIdeaMutation,
  IdeaListQuery,
  UpdateFinalRoundMutation,
} from 'src/constants/appQueries';

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
  canToggleFinal: boolean,
  isInFinalRound: boolean,
  onToggleFinal: () => void,
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
  canToggleFinal,
  onToggleFinal,
  isInFinalRound,
  ...rest
}: Props) {
  return (
    <div className="IdeaActions">
      {!hideLikes && (
        <span className="d-inline-block m-r-1">
          <IdeaLike ideaId={id} ideaLikes={likes} userId={userId} />
        </span>
      )}
      {canToggleFinal && (
        <ActionIconButton
          icon={isInFinalRound ? 'wb_sunny' : 'wb_iridescent'}
          onClick={onToggleFinal}
          className={noRightMargin ? '' : 'm-r-1'}
          inverse={inverse}
        />
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
  graphql(UpdateFinalRoundMutation, { name: 'updateFinalRound' }),
  withPromiseHandler({ shouldResetToDefaultStatus: true }),
  withHandlers({
    cancelEvent: () => (e) => {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }
    },
  }),
  withHandlers({
    onToggleFinal: ({ updateFinalRound, id, isInFinalRound, handlePromise, cancelEvent }) => (e) => {
      cancelEvent(e);
      handlePromise({
        apiPromiseFn: () =>
          updateFinalRound({ variables: { id, isInFinalRound: !isInFinalRound } }),
      });
    },
    onClaimIdea: ({ claimIdea, id, userId, handlePromise, cancelEvent }) => (e) => {
      cancelEvent(e);
      handlePromise({
        apiPromiseFn: () => claimIdea({ variables: { id, createdById: userId } }),
      });
    },
    onDeleteIdea: ({
      deleteIdea,
      id,
      history,
      shouldRedirectToListAfterDelete,
      handlePromise,
      cancelEvent,
    }) => (e) => {
      cancelEvent(e);
      handlePromise({
        apiPromiseFn: () =>
          deleteIdea({
            update: (store, { data }) => {
              // Read the data from our cache for this query.
              const cacheData = store.readQuery({ query: IdeaListQuery });
              const allIdeas = cacheData.allIdeas.filter(item => item.id !== data.deleteIdea.id);
              // Write our data back to the cache.
              store.writeQuery({ query: IdeaListQuery, data: { allIdeas } });
            },
          }),
        apiSuccessCallback: () => {
          if (shouldRedirectToListAfterDelete) {
            history.push('/ideas');
          }
        },
      });
    },
    onEdit: ({ history, slug, cancelEvent }) => (e) => {
      cancelEvent(e);
      history.replace(`/ideas/${slug}/edit/`);
    },
  }),
)(IdeaActions);
