// @flow
import React from 'react';
import { StyleSheet, Box, css, color } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { Icon } from 'antd';
import cx from 'classnames';

import { FontIcon } from 'react-toolbox/lib/font_icon/FontIcon';
import TextTruncate from 'src/components/hoc/TextTruncate';
import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';
import IdeaPresentBar from 'src/components/IdeaPresentBar';
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
  youtubeIcon: {
    color: 'red',
    ':hover': { color: 'orangered' },
  },
  slideIcon: {
    color: 'gold',
    ':hover': { color: 'yellow' },
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
    slidesUrl,
    contributorsText,
  } = idea;
  const haveLink = courseraVideoUrl || youtubeVideoUrl || slidesUrl;
  return (
    <div {...css('IdeaPresent header-margin-offset', animationUtils.fadeInSlow)}>
      <Box
        rootClassName={styles.banner}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundImage: `url(${coverBackgroundUrl || DEFAULT_COVER_BG})`,
          position: 'relative',
        }}
      >
        <div
          className={cx('p-a-3', { inverse: isBackgroundImageDark })}
          style={{
            textShadow: `0 0 15px ${isBackgroundImageDark ? color.black : color.white}`,
          }}
        >
          <TextTruncate
            rootClassName="h1 m-b-2 font-weight-900"
            line={3}
            truncateText="…"
            text={title}
            style={{
              // fontSize: '8rem',
              lineHeight: 1.2,
            }}
          />
          <h3 className="text-secondary font-lg">{`${createdBy && createdBy.name}${contributorsText
            ? ` | ${contributorsText}`
            : ''}`}</h3>
          <Box rootClassName="p-t-2" justifyContent="center">
            {haveLink && (
              <div
                style={{
                  padding: 4,
                  paddingTop: 8,
                  borderRadius: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  textShadow: 'none',
                }}
              >
                {youtubeVideoUrl && (
                  <a {...css('p-a-1', styles.youtubeIcon)} href={youtubeVideoUrl} target="_blank">
                    <FontIcon value="subscriptions" style={{ fontSize: '2rem' }} />
                  </a>
                )}
                {courseraVideoUrl && (
                  <a className="p-a-1" href={courseraVideoUrl} target="_blank">
                    <FontIcon value="videocam" style={{ fontSize: '2rem' }} />
                  </a>
                )}
                {slidesUrl && (
                  <a {...css('p-a-1', styles.slideIcon)} href={slidesUrl} target="_blank">
                    <FontIcon value="assessment" style={{ fontSize: '2rem' }} />
                  </a>
                )}
              </div>
            )}
          </Box>
        </div>
        <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <IdeaPresentBar
            currentSlug={slug}
            currentCreatedBy={createdBy.id}
            id={idea.id}
            userId={userId}
            isSuperuser={isSuperuser}
          />
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
