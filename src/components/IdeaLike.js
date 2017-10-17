// @flow
import React from 'react';
import { Card, Icon, Button } from 'antd';

import { compose, withProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import _ from 'underscore';

import { IdeaLikeMutation, IdeaUnlikeMutation, IdeaListQuery } from 'src/constants/appQueries';

type Props = {
  totalLikes: number,
  hasLiked: boolean,
  userId: string,
  onUnlike: () => void,
  onLike: () => void,
};

function IdeaLike({ totalLikes, hasLiked, userId, onUnlike, onLike }: Props) {
  return (
    <div>
      <span className="d-inline-block p-r-1s">{totalLikes}</span>
      {hasLiked && (
        <Button onClick={onUnlike}>
          <Icon type="heart" />
        </Button>
      )}
      {!hasLiked && (
        <Button onClick={onLike}>
          <Icon type="heart-o" />
        </Button>
      )}
    </div>
  );
}

export default compose(
  withProps(({ ideaLikes, userId }) => {
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
