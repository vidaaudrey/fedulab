// @flow
import React from 'react';
import { Button } from 'antd';

import { withRouter, Link } from 'react-router-dom';
import { compose, withProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import { DeleteIdeaMutation, IdeaListQuery } from 'src/constants/appQueries';

type Props = {
  id: string,
  slug: string,
  onDeleteIdea: () => void,
  canDelete: boolean,
};

function IdeaActions({ id, slug, onDeleteIdea, canDelete, ...rest }: Props) {
  return (
    <div>
      {canDelete && (
        <Button type="danger" onClick={onDeleteIdea} className="m-r-1">
          Delete Idea
        </Button>
      )}
      <Link to={`/ideas/${slug}/edit/`}>Edit</Link>
    </div>
  );
}

export default compose(
  withRouter,
  graphql(DeleteIdeaMutation, { name: 'deleteIdea' }),
  withHandlers({
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
  }),
)(IdeaActions);
