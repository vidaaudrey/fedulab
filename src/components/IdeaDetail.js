// @flow
import React from 'react';
import { StyleSheet, Box, css, CenterBox } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaActions from 'src/components/IdeaActions';
import HumanTime from 'src/components/HumanTime';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';
import IdeaNext from 'src/components/IdeaNext';
import IdeaPrev from 'src/components/IdeaPrev';
import IdeaDetailLinks from 'src/components/IdeaDetailLinks';
import IdeaTags from 'src/components/IdeaTags';

import animationUtils from 'src/utils/animationUtils';

import { IdeaDetailQuery } from 'src/constants/appQueries';
import { DEFAULT_COVER_BG } from 'src/constants/appConstants';

const styles = StyleSheet.create({
  banner: {
    textAlign: 'center',
    minHeight: 720,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  metaInfoContainer: {
    background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .7))',
  },
  inverse: {
    color: '#fff',
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
    isInFinalRound,
    isPresenting,
    slackUrl,
    youtubeVideoUrl,
    contributorsText,
    createdBy,
    createdAt,
    pitchedBy,
    slidesUrl,
    docsUrl,
  } = idea;

  return (
    <div
      {...css('IdeaDetail header-margin-offset', animationUtils.fadeInSlow)}
      style={{ minHeight: '96vh' }}
    >
      <Box
        rootClassName={styles.banner}
        flexDirection="column"
        justifyContent="end"
        alignItems="center"
        style={{ backgroundImage: `url(${coverBackgroundUrl || DEFAULT_COVER_BG})` }}
      >
        <div
          {...css(
            'p-a-2 inverse w-100',
            styles.metaInfoContainer,
            isBackgroundImageDark && styles.inverse,
          )}
        >
          <h1 className="font-weight-900">{title}</h1>
          <h2 className="m-b-1s h3 font-italic">{tagline}</h2>
          <Box flexDirection="column" rootClassName="text-xs-center color-white font-md">
            <span>
              <span className="d-inline-block m-r-1s">Created by {createdBy.name} </span>
              <span className="font-italic m-r-1s">
                <HumanTime time={createdAt} />
              </span>
              <IdeaTags isPresenting={isPresenting} isInFinalRound={isInFinalRound} />
            </span>

            {contributorsText && <span>{contributorsText}</span>}
            <CenterBox rootClassName="m-b-0">
              <IdeaActions
                shouldRedirectToListAfterDelete
                canDelete={isSuperuser}
                canToggleFinal={isSuperuser}
                canEdit={isSuperuser || userId === (createdBy && createdBy.id)}
                isInFinalRound={isInFinalRound}
                id={id}
                slug={slug}
                likes={idea.likes}
                userId={userId}
                isSuperuser={isSuperuser}
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
              <div className="m-b-1s">
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
              </div>
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
      <Box rootClassName="max-text-width m-x-auto m-b-1 p-a-1 bg-white" justifyContent="between">
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
