import { MAKEATHON_8_GALLERY_IDEAS } from 'src/constants/makeathonData';

export function getYoutubeUrlById(id) {
  return `https://youtu.be/${id}`;
}

export const GALLERY_SECTION_IDEAS = MAKEATHON_8_GALLERY_IDEAS.map(
  ({ id, title, slideUrl, youtubeVideoId, courseraVideoId, featureImageUrl }) => ({
    id,
    title,
    link: slideUrl || (youtubeVideoId && getYoutubeUrlById(youtubeVideoId)) || courseraVideoId,
    featureImageUrl,
  }),
);
