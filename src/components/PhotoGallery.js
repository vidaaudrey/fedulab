// @flow

import React from 'react';
import Switch from 'react-toolbox/lib/switch/Switch';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import _ from 'underscore';

import { HEADER_HEIGHT, PHOTO_LIST_URL, PHOTO_URL_BASE } from 'src/constants/appConstants';

const SCROLL_DISTANCE = 10;
const SCROLL_TIME = 50;

type State = {
  gallery: Array,
  imageIndex: number,
  lightboxIsOpen: boolean,
  isScrolling: boolean,
};

export default class PhotoGallery extends React.Component<void, State> {
  state = {
    gallery: [],
    imageIndex: 0,
    lightboxIsOpen: false,
    isScrolling: false,
  };

  componentDidMount() {
    fetch(PHOTO_LIST_URL)
      .then(result => result.json())
      .then((data) => {
        this.setState({ gallery: data.resources });
      });
  }

  componentWillUnmount() {
    this.stopAutoScroll();
  }

  scrollHandle = undefined;

  startAutoScroll() {
    this.setState({ isScrolling: true });
    this.scrollHandle = setInterval(() => {
      window.scrollBy({ top: SCROLL_DISTANCE, left: 0, behavior: 'smooth' });
    }, SCROLL_TIME);
  }

  stopAutoScroll() {
    this.setState({ isScrolling: false });
    clearInterval(this.scrollHandle);
  }

  toggleScroll = () => {
    if (this.state.isScrolling) {
      this.stopAutoScroll();
    } else {
      this.startAutoScroll();
    }
  };

  openLightbox = (event, photo) => {
    this.stopAutoScroll();
    this.setState({
      imageIndex: photo.index,
      lightboxIsOpen: true,
    });
  };

  closeLightbox = () => {
    this.setState({
      imageIndex: 0,
      lightboxIsOpen: false,
    });
  };

  goToPrevious = () => {
    this.setState({
      imageIndex: this.state.imageIndex - 1,
    });
  };

  goToNext = () => {
    this.setState({
      imageIndex: this.state.imageIndex + 1,
    });
  };

  render() {
    const { gallery, isScrolling, imageIndex, lightboxIsOpen } = this.state;

    const photos = gallery.map(data => ({
      src: PHOTO_URL_BASE + data.public_id,
      width: data.width,
      height: data.height,
    }));

    return (
      <div className="bg-light p-y-3">
        <div
          className="p-t-2 p-b-1s p-x-2"
          style={{
            position: 'fixed',
            top: HEADER_HEIGHT,
            right: 0,
            background: 'rgba(247, 247, 247, .8)', // bg-light
            borderRadius: '0 0 10px 10px',
          }}
        >
          <Switch checked={isScrolling} label="Auto-scroll gallery" onChange={this.toggleScroll} />
        </div>
        <div className="text-xs-center m-b-2">
          <h2 className="font-xl font-weight-200">Make-A-Thon Moments</h2>
          <span className="font-weight-200">People from this and past Make-A-Thons.</span>
        </div>
        <div className="m-b-3">
          <Gallery photos={photos} onClick={this.openLightbox} />
          <Lightbox
            images={photos}
            onClose={this.closeLightbox}
            onClickPrev={this.goToPrevious}
            onClickNext={this.goToNext}
            currentImage={imageIndex}
            isOpen={lightboxIsOpen}
          />
        </div>
      </div>
    );
  }
}
