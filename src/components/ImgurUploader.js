import * as React from 'react';
import { StyleSheet, css, color, Button, CenterBox } from '@coursera/coursera-ui';
import { SvgCloudUpload, SvgLoaderSignal } from '@coursera/coursera-ui/svg';
import Dropzone from 'react-dropzone';
import { compose, withState, withHandlers } from 'recompose';
import {
  API_BEFORE_SEND,
  API_SUCCESS,
  API_ERROR,
  API_IN_PROGRESS,
} from 'src/constants/apiNotificationConstants';

const IMGUR = {
  apiUrl: 'https://api.imgur.com/3/',
  uploadUrl: 'https://api.imgur.com/3/image',
  clientId: '402413b6b3dbf72',
  secret: 'aaec0d1ce5479c823a78fb087d09754a69f5d206',
};

const styles = StyleSheet.create({
  ImgurUploader: {
    width: '100%',
    minHeight: 160,
    overflow: 'visible',
    border: `2px dashed ${color.divider}`,
  },
  img: {
    height: 'auto',
  },
});

type ApiStatusType = API_BEFORE_SEND | API_IN_PROGRESS | API_SUCCESS | API_ERROR;

type Props = {
  onImgUploaded: () => void,
  accept: string,
  onDrop: ([Object]) => void,
  apiStatus: ApiStatusType,
  imgUrl: ?string,
  defaultMessage: ?string,
};

function ImgurUploader({
  defaultMessage = 'Choose an image to upload',
  accept = 'image/jpeg,image/jpg, image/png,image/gif',
  onDrop,
  apiStatus,
  imgUrl,
}: Props): React.Node {
  return (
    <CenterBox tag={Dropzone} rootClassName={styles.ImgurUploader} onDrop={onDrop} accept={accept}>
      <CenterBox>
        {apiStatus === API_BEFORE_SEND &&
          !imgUrl && (
            <CenterBox>
              <SvgCloudUpload color={color.primary} />
              <Button type="link">{defaultMessage}</Button>
            </CenterBox>
          )}
        {apiStatus === API_IN_PROGRESS && <SvgLoaderSignal size={36} color={color.primary} />}
        {(apiStatus === API_BEFORE_SEND || apiStatus === API_SUCCESS) &&
          imgUrl && <img {...css('w-100', styles.img)} src={imgUrl} alt="Uploaded File" />}
        {apiStatus === API_ERROR && (
          <CenterBox>
            <SvgLoaderSignal size={36} color={color.primary} />
            <span className="color-danger">
              Failed to upload the image. Refresh or try again later.
            </span>
          </CenterBox>
        )}
      </CenterBox>
    </CenterBox>
  );
}

export default compose(
  withState('files', 'filesSet', []),
  withState('imgUrl', 'imgUrlSet', ({ imgUrl }) => imgUrl),
  withState('apiStatus', 'apiStatusSet', API_BEFORE_SEND),
  withHandlers({
    onDrop: ({ onImgUploaded, filesSet, apiStatusSet, imgUrlSet }) => (acceptedFiles) => {
      const data = new FormData();
      data.append('image', acceptedFiles[0]);
      apiStatusSet(API_IN_PROGRESS);
      fetch(IMGUR.uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${IMGUR.clientId}`,
        },
        body: data,
      })
        .then(res => res.json())
        .then((json) => {
          const imgUrl = json.data && json.data.link;
          console.log('uploading success', json, imgUrl);
          if (imgUrl && onImgUploaded) {
            onImgUploaded(imgUrl);
          }
          apiStatusSet(API_SUCCESS);
          imgUrlSet(imgUrl);
        })
        .catch((ex) => {
          console.log('uploading failed', ex);
          apiStatusSet(API_ERROR);
        });
    },
  }),
)(ImgurUploader);
