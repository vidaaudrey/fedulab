// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaActions from 'src/components/IdeaActions';
import HumanTime from 'src/components/HumanTime';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';
import IdeaNext from 'src/components/IdeaNext';
import IdeaPrev from 'src/components/IdeaPrev';
import IdeaLike from 'src/components/IdeaLike';

import { IdeaDetailQuery } from 'src/constants/appQueries';

type Props = {
  data: Object,
  userId: String,
  isSuperuser: boolean,
  slug: string,
};

function IdeaDetail({
  data: { loading, error, Idea: idea },
  slug,
  userId,
  isSuperuser,
  ...rest
}: Props) {
  const {
    id,
    title,
    tagline,
    description,
    category,
    courseraVideoUrl,
    coverBackgroundUrl,
    howToContribute,
    slackUrl,
    youtubeVideoUrl,
    contributors,
    createdBy,
    createdAt,
  } = idea;
  const allContributorNames = contributors.map(item => item.name).join(',  ');

  return (
    <div>
      <div className="custom-image">
        <img
          alt="example"
          width="100%"
          height="200"
          className="overflow-hidden"
          src={coverBackgroundUrl}
        />
      </div>
      <div className="custom-card">
        <h3>{title}</h3>
        <small className="text-secondary">
          By {createdBy.name}, Contributors:{allContributorNames}
        </small>
        <HumanTime time={createdAt} />
        <IdeaLike ideaId={idea.id} ideaLikes={idea.likes} userId={userId} />

        <h4>{tagline}</h4>
        <span>{category}</span>
        <p style={{ color: 'gray' }}>{description}</p>
        <p>{howToContribute}</p>
        <p>{youtubeVideoUrl}</p>
        <p>{slackUrl}</p>
        <p>{courseraVideoUrl}</p>
        <p>{courseraVideoUrl}</p>
        <IdeaActions
          shouldRedirectToListAfterDelete
          canDelete={isSuperuser || userId === (createdBy && createdBy.id)}
          canEdit={isSuperuser || userId === (createdBy && createdBy.id)}
          id={id}
          slug={slug}
        />
        <Box rootClassName="m-y-1" justifyContent="between" flexWrap="wrap">
          <div className="p-r-1">
            <IdeaPrev last={1} before={idea.id} />
          </div>
          <div className="p-l-1">
            <IdeaNext first={1} after={idea.id} />
          </div>
        </Box>
      </div>
    </div>
  );
}

export default compose(
  withRouter,
  withProps(({ match }) => ({
    slug: match.params.ideaSlug,
    dataFieldName: 'Idea',
  })),
  graphql(IdeaDetailQuery),
  withGQLLoadingOrError(IdeaLoadPreCheck),
)(IdeaDetail);
