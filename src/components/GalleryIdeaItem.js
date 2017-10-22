// @flow
import React from 'react';
import { spacing, Card, CardImage, CardBlock } from '@coursera/coursera-ui';

import ContributorList from 'src/components/ContributorList';

import { getYoutubeUrlById } from 'src/utils/appUtils';

const CARD_HEIGHT = 400;
const IMAGE_HEIGHT = 144;

type Props = {};
export default function GalleryIdeaItem({
  idea: {
    id,
    title,
    tagline,
    description,
    slack,
    startTime,
    estimatedFinishTime,
    video,
    featureImageUrl,
    creator,
    contributors,
    contributorsDescription,
    slideUrl,
    youtubeVideoId,
    courseraVideoId,
  },
}: Props) {
  return (
    <Card
      isInteractive
      rootClassName="IdeaListItem w-100"
      name="IdeaCard"
      tagAttributes={{
        isInteractive: true,
        xsMinWidth: true,
      }}
      style={{
        marginBottom: spacing.md,
        height: CARD_HEIGHT,
      }}
    >
      <CardImage
        maxImgHeight={IMAGE_HEIGHT}
        imgSrc={featureImageUrl}
        style={{ height: IMAGE_HEIGHT }}
      />
      <CardBlock style={{ height: CARD_HEIGHT - IMAGE_HEIGHT }}>
        <div className="vertical-box h-100">
          <div className="flex-1">
            <h3 className="p-t-1">{title}</h3>
            <h5 className="m-b-0 text-secondary font-italic">{tagline}</h5>
          </div>
          <div className="horizontal-box wrap">
            <ContributorList contributors={contributors.edges} size={40} />
            {contributorsDescription && (
              <span className="font-sm d-inline-block truncate">{contributorsDescription}</span>
            )}
            {slideUrl && (
              <a href={slideUrl} title="slide" className="d-inline-block m-r-1">
                Slide
              </a>
            )}
            {courseraVideoId && (
              <a href={courseraVideoId} title="slide" className="d-inline-block m-r-1">
                Video
              </a>
            )}
            {youtubeVideoId && (
              <a href={getYoutubeUrlById(youtubeVideoId)} title="youtube video">
                Youtube
              </a>
            )}
          </div>
        </div>
      </CardBlock>
    </Card>
  );
}
