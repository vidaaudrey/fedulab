// @flow
import React from 'react';
import Button from 'react-toolbox/lib/button/Button';
import { StyleSheet, Box, css } from '@coursera/coursera-ui';
import { withRouter, Link } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import cx from 'classnames';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaActions from 'src/components/IdeaActions';
import HumanTime from 'src/components/HumanTime';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';
import IdeaNext from 'src/components/IdeaNext';
import IdeaPrev from 'src/components/IdeaPrev';
import IdeaLike from 'src/components/IdeaLike';

import animationUtils from 'src/utils/animationUtils';

import { IdeaDetailQuery } from 'src/constants/appQueries';
import { DEFAULT_COVER_BG } from 'src/constants/appConstants';

const styles = StyleSheet.create({
  banner: {
    textAlign: 'center',
    minHeight: 800,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

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
    isBackgroundImageDark,
    slackUrl,
    youtubeVideoUrl,
    contributorsText,
    contributors,
    createdBy,
    createdAt,
    pitchedBy,
  } = idea;
  const allContributorNames = contributors.map(item => item.name).join(',  ');

  return (
    <div {...css('IdeaDetail header-margin-offset', animationUtils.fadeInSlow)}>
      <Box
        rootClassName={styles.banner}
        flexDirection="column"
        justifyContent="end"
        alignItems="center"
        style={{ backgroundImage: `url(${coverBackgroundUrl || DEFAULT_COVER_BG})` }}
      >
        <div className={cx('p-a-3', { inverse: isBackgroundImageDark })}>
          <h1 className="font-weight-900" style={{ fontSize: '3.2rem' }}>
            {title}
          </h1>
          <h2 className="m-b-1">{tagline}</h2>
          <h3>
            <Link to={`/ideas/${slug}/show`}>
              <Button icon="airplay" className="m-r-1s" label="Present" raised />
            </Link>
          </h3>
        </div>
      </Box>
      <Box
        key={id}
        justifyContent="center"
        flexDirection="column"
        rootClassName="max-text-width m-x-auto"
      >
        <div className="p-a-2 bg-white m-b-1">
          <span className="text-secondary">By {createdBy && createdBy.name}</span>
          {contributorsText && (
            <div className="text-secondary">Contributors:{contributorsText}</div>
          )}
          {allContributorNames && (
            <div className="text-secondary">Contributors:{allContributorNames}</div>
          )}
          <IdeaActions
            shouldRedirectToListAfterDelete
            canDelete={isSuperuser || userId === (createdBy && createdBy.id)}
            canEdit={isSuperuser || userId === (createdBy && createdBy.id)}
            id={id}
            slug={slug}
          />
          <HumanTime time={createdAt} />
          <IdeaLike ideaId={idea.id} ideaLikes={idea.likes} userId={userId} />
          <span>{category}</span>
          <p style={{ color: 'gray' }}>{description}</p>
          <p>{howToContribute}</p>
          <p>Pitched by {pitchedBy}</p>
          <p>{youtubeVideoUrl}</p>
          <p>{slackUrl}</p>
          <p>{courseraVideoUrl}</p>
          <p>{courseraVideoUrl}</p>
        </div>
        <Box rootClassName="m-b-1 bg-white p-a-2" justifyContent="between" flexWrap="wrap">
          <div className="p-r-1">
            <IdeaPrev last={1} before={idea.id} />
          </div>
          <div className="p-l-1">
            <IdeaNext first={1} after={idea.id} />
          </div>
        </Box>
      </Box>
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
