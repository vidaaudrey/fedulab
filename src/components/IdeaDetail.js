// @flow
import React from 'react';
import Button from 'react-toolbox/lib/button/Button';
import { StyleSheet, Box, css, color, font, CenterBox } from '@coursera/coursera-ui';
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
    createdBy,
    createdAt,
    pitchedBy,
  } = idea;

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
      <CenterBox style={{ backgroundColor: color.white, height: '75px' }} rootClassName="m-b-1">
        <IdeaActions
          shouldRedirectToListAfterDelete
          canDelete={isSuperuser || userId === (createdBy && createdBy.id)}
          canEdit={isSuperuser || userId === (createdBy && createdBy.id)}
          id={id}
          slug={slug}
          likes={idea.likes}
          userId={userId}
        />
      </CenterBox>
      <Box
        key={id}
        justifyContent="center"
        flexDirection="column"
        rootClassName="max-text-width m-x-auto bg-white  p-a-1 m-b-1"
      >
        <Box alignSelf="center">
          <div className="text-secondary m-t-1" style={{ fontSize: font.sm }}>
            <span>Created by {createdBy.name} </span>
            <span>
              <HumanTime time={createdAt} />
            </span>
            {contributorsText && <div className="text-secondary">{contributorsText}</div>}
          </div>
        </Box>
        <Box flexDirection="column">
          <div>
            <div style={{ fontSize: font.sm, marginBottom: '0.3rem' }}>Category: {category} </div>
          </div>
          {pitchedBy && (
            <div>
              <div style={{ fontSize: font.sm, marginBottom: '1rem' }}>
                Pitched by: {pitchedBy}{' '}
              </div>
            </div>
          )}
          <div className="m-b-1">
            <div className="font-weight-500" style={{ fontSize: '1.5rem' }}>
              Project Description:
            </div>
            <p style={{ color: 'gray' }}>{description}</p>
          </div>
          {howToContribute && (
            <div className="m-b-1">
              <div className="font-weight-500" style={{ fontSize: '1.2rem' }}>
                How to conribute:
              </div>
              <p style={{ color: 'gray' }}>{howToContribute}</p>
            </div>
          )}
          {youtubeVideoUrl && <p>Youtube URL: {youtubeVideoUrl}</p>}
          {slackUrl && <p>Slack URL: {slackUrl}</p>}
          {courseraVideoUrl && <p>Coursera Video URL: {courseraVideoUrl}</p>}
        </Box>
      </Box>
      <Box rootClassName="max-text-width m-x-auto m-b-1 p-a-2 bg-white" justifyContent="between">
        <div className="p-r-1">
          <IdeaPrev last={1} before={idea.id} />
        </div>
        <div className="p-l-1">
          <IdeaNext first={1} after={idea.id} />
        </div>
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
