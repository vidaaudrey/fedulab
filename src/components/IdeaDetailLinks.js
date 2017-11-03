// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';

import SLACK from 'src/assets/svg/slack.svg';
import YOUTUBE from 'src/assets/svg/youtube.svg';
import DOCS from 'src/assets/svg/google_docs.svg';
import SLIDES from 'src/assets/svg/google_slides.svg';
import FILES from 'src/assets/svg/files.svg';

type Props = {
  slackUrl?: string,
  youtubeVideoUrl?: string,
  slidesUrl?: string,
  docsUrl?: string,
  courseraVideoUrl?: string,
  showLinkText?: boolean,
};

export default function IdeaDetailLinks({
  slackUrl,
  youtubeVideoUrl,
  slidesUrl,
  docsUrl,
  courseraVideoUrl,
  showLinkText,
}: Props) {
  return (
    <Box rootClassName="m-b-1" alignItems="center" flexWrap="wrap">
      {showLinkText && <div className="text-uppercase font-sm text-secondary">Links: </div>}
      {slackUrl && (
        <a
          href={slackUrl}
          alt="Slack Url"
          title={slackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="d-inline-block m-r-1"
        >
          <img width="80" src={SLACK} alt="Slack Url" />
        </a>
      )}
      {youtubeVideoUrl && (
        <a
          href={youtubeVideoUrl}
          alt="Slack Url"
          title={youtubeVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="d-inline-block m-r-1"
        >
          <img width="80" src={YOUTUBE} alt="Slack Url" />
        </a>
      )}
      {slidesUrl && (
        <a
          href={slidesUrl}
          alt="Google Slides Url"
          title={slidesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="d-inline-block m-r-1"
        >
          <img width="32" src={SLIDES} alt="Google Slides Url" />
        </a>
      )}
      {docsUrl && (
        <a
          href={docsUrl}
          alt="Google Docs Url"
          title={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="d-inline-block m-r-1"
        >
          <img width="32" src={DOCS} alt="Google Docs Url" />
        </a>
      )}
      {courseraVideoUrl && (
        <a
          href={courseraVideoUrl}
          alt="Slack Url"
          title={courseraVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="d-inline-block m-r-1"
        >
          <img width="32" src={FILES} alt="Files Url" />
        </a>
      )}
    </Box>
  );
}
