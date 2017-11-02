// @flow
import React from 'react';
import { compose, withProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import _ from 'underscore';

import ActionIconButton from 'src/components/ActionIconButton';

import { IdeaLikeMutation, IdeaUnlikeMutation, IdeaListQuery } from 'src/constants/appQueries';

type Props = {
  totalLikes: number,
  hasLiked: boolean,
  isOverIdeaCard: boolean,
  userId: string,
  onUnlike: () => void,
  onLike: () => void,
};

function IdeaLike({ totalLikes, hasLiked, userId, onUnlike, onLike, isOverIdeaCard }: Props) {
  const onLikeHandler = hasLiked ? onUnlike : onLike;
  return (
    <ActionIconButton
      style={{ fontSize: 20, minWidth: 40, background: 'transparent' }}
      icon={hasLiked ? 'favorite' : 'favorite_border'}
      onClick={onLikeHandler}
      label={`${totalLikes}`}
    />
  );
}

export default compose(
  withProps(({ ideaLikes = [], userId }) => {
    const totalLikes = ideaLikes.length;
    const myLike = _(ideaLikes).findWhere(item => item.user.id === userId);
    const myLikeId = myLike && myLike.id;
    return {
      totalLikes,
      hasLiked: !!myLikeId,
      myLikeId,
    };
  }),
  graphql(IdeaLikeMutation, { name: 'likeIdea' }),
  graphql(IdeaUnlikeMutation, { name: 'unlikeIdea' }),
  withHandlers({
    onUnlike: ({ unlikeIdea, id, ideaId, userId }) => (e) => {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }

      unlikeIdea({
        update: (store, { data: { deleteLike } }) => {
          const data = store.readQuery({ query: IdeaListQuery });
          const allIdeas = data.allIdeas;
          const newAllIdeas = [];
          allIdeas.forEach((idea) => {
            if (idea.id === ideaId) {
              const newChangedIdeaLikes = idea.likes.filter(like => like.user.id !== userId);
              newAllIdeas.push({ ...idea, likes: newChangedIdeaLikes });
            } else {
              newAllIdeas.push(idea);
            }
          });
          store.writeQuery({
            query: IdeaListQuery,
            data: { allIdeas: newAllIdeas },
          });
        },
      })
        .then((res) => {
          console.warn('res', res);
        })
        .catch(error => console.warn('error', error));
    },
    onLike: ({ likeIdea, userId, ideaId }) => (e) => {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }

      // Store update is handled automatically
      likeIdea()
        .then((res) => {
          console.warn('res', res);
        })
        .catch(error => console.warn('error', error));
    },
  }),
)(IdeaLike);
