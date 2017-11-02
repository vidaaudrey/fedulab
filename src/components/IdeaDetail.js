// @flow
import React from 'react';
import { StyleSheet, Box, css, CenterBox } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import cx from 'classnames';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaActions from 'src/components/IdeaActions';
import HumanTime from 'src/components/HumanTime';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';
import IdeaNext from 'src/components/IdeaNext';
import IdeaPrev from 'src/components/IdeaPrev';
import IdeaDetailLinks from 'src/components/IdeaDetailLinks';

import animationUtils from 'src/utils/animationUtils';

import { IdeaDetailQuery } from 'src/constants/appQueries';
import { DEFAULT_COVER_BG } from 'src/constants/appConstants';

const styles = StyleSheet.create({
  banner: {
    textAlign: 'center',
    minHeight: 500,
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
    slidesUrl = 'fewafew',
    docsUrl = 'fewafew',
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
          <h1 className="font-weight-900">{title}</h1>
          <h2 className="m-b-1">{tagline}</h2>
          <Box flexDirection="column" rootClassName="text-xs-center color-white">
            <span>
              <span>Created by {createdBy.name} </span>
              <span>
                <HumanTime time={createdAt} />
              </span>
            </span>
            {contributorsText && <span>{contributorsText}</span>}
            <CenterBox rootClassName="m-b-0">
              <IdeaActions
                shouldRedirectToListAfterDelete
                canEdit={isSuperuser || userId === (createdBy && createdBy.id)}
                id={id}
                slug={slug}
                likes={idea.likes}
                userId={userId}
                showPresent
                enhanceBg
                inverse
              />
            </CenterBox>
          </Box>
        </div>
      </Box>

      <Box
        key={id}
        justifyContent="center"
        flexDirection="column"
        rootClassName="max-text-width m-x-auto bg-white p-a-1 m-y-1 overflow-hidden"
      >
        <Box flexDirection="column">
          <div className="m-b-2">
            <h2 className="font-xl font-weight-200"> Idea Details</h2>
            <div className="font-sm m-b-1">
              <span className="m-r-1">
                <span className="text-secondary text-uppercase"> Category: </span>
                {category}
              </span>
              {pitchedBy && (
                <span className="font-sm">
                  <span className="text-secondary text-uppercase"> Pitched By: </span>
                  {pitchedBy}
                </span>
              )}
              <IdeaDetailLinks
                slackUrl={slackUrl}
                youtubeVideoUrl={youtubeVideoUrl}
                slidesUrl={slidesUrl}
                docsUrl={docsUrl}
                courseraVideoUrl={courseraVideoUrl}
              />
            </div>
            <p className="m-b-1" style={{ overflow: 'scroll' }}>
              <span className="text-secondary text-uppercase font-sm">Description: </span> <br />
              {description}
            </p>
          </div>

          <div className="m-b-1">
            <h2 className="font-xl font-weight-200">Collaborate</h2>
            <span className="m-r-1">
              <span className="font-sm text-secondary text-uppercase"> How to conribute: </span>
              {howToContribute}
            </span>
          </div>
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
