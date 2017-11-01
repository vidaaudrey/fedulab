// @flow
import React from 'react';
import { StyleSheet, Box, css, color } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { Icon } from 'antd';
import cx from 'classnames';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';
import IdeaNext from 'src/components/IdeaNext';
import animationUtils from 'src/utils/animationUtils';

import { IdeaDetailQuery } from 'src/constants/appQueries';
import { DEFAULT_COVER_BG } from 'src/constants/appConstants';

const styles = StyleSheet.create({
  banner: {
    textAlign: 'center',
    minHeight: '100vh',
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

function IdeaPresent({
  data: { loading, error, Idea: idea },
  slug,
  userId,
  isSuperuser,
  ...rest
}: Props) {
  const {
    title,
    coverBackgroundUrl,
    isBackgroundImageDark,
    createdBy,
    courseraVideoUrl,
    youtubeVideoUrl,
    contributorsText,
    description,
  } = idea;
  const videoUrl = courseraVideoUrl || youtubeVideoUrl;

  return (
    <div {...css('IdeaPresent header-margin-offset', animationUtils.fadeInSlow)}>
      <Box
        rootClassName={styles.banner}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundImage: `url(${coverBackgroundUrl || DEFAULT_COVER_BG})` }}
      >
        <div
          className={cx('p-a-3', { inverse: isBackgroundImageDark })}
          style={{
            textShadow: `0 0 15px ${isBackgroundImageDark ? color.black : color.white}`,
          }}
        >
          <h1
            className="font-weight-900"
            style={{
              fontSize: '4.8rem',
            }}
          >
            {title}
          </h1>
          <h3 className="text-secondary font-lg">{`${createdBy && createdBy.name}${contributorsText
            ? ` | ${contributorsText}`
            : ''}`}</h3>
          <h4>{description}</h4>
          <h3>
            {videoUrl && (
              <a href={videoUrl} target="_blank">
                <Icon
                  type="video-camera"
                  style={{
                    fontSize: 50,
                    textAlign: 'center',
                    padding: 5,
                    paddingLeft: 8,
                    borderRadius: 10,
                    backgroundColor: 'black',
                    opacity: 0.5,
                  }}
                />
              </a>
            )}
          </h3>
          <div className="p-a-2 font-lg">
            <IdeaNext first={1} after={idea.id} isPresentationMode />
          </div>
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
)(IdeaPresent);
