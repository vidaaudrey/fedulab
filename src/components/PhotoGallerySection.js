//@flow

import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { breakPoint } from '@coursera/coursera-ui';
import _ from 'underscore';

import Loading from 'src/components/Loading';

import { PHOTO_LIST_URL, PHOTO_URL_BASE } from 'src/constants/appConstants';

const CONFIG = {
  photosToDisplay: 8,
  photoHeight: 400,
  responsive: [
    {
      breakpoint: breakPoint.xl,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: breakPoint.lg,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: breakPoint.sm,
      settings: { slidesToShow: 1, },
    },
  ],
}

export default class PhotoGallerySection extends React.Component {
  state = {
    gallery: []
  }

  componentDidMount() {
    fetch(PHOTO_LIST_URL)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ gallery: data.resources });
      });
  }

  render() {
    const { gallery } = this.state;
    const photosToShow = _.sample(gallery, CONFIG.photosToDisplay);
    const isLoading = photosToShow.length === 0;

    return (
      <div className="PhotoGallery bg-light text-xs-center p-y-3">
        <h2 className="font-xl font-weight-200">Make-A-Thon Moments</h2>
        <p className="font-weight-200 m-b-1">
          People from this and past Make-A-Thons.
          <Link
            to="photoGallery"
            className="text-secondary d-inline-block p-x-1s font-style-italic font-sm"
          >
            See all
          </Link>
        </p>
        {isLoading && <Loading />}
        {!isLoading &&
          <div className="m-b-3">
            <Slider
              autoplay
              infinite
              slidesToShow={4}
              arrows={false}
              responsive={CONFIG.responsive}
            >
              {photosToShow.map(data => (
                <div
                  key={data.public_id}
                  style={{
                    height: CONFIG.photoHeight,
                    background: `url(${PHOTO_URL_BASE + data.public_id})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
              ))}
            </Slider>
          </div>
        }
      </div>
    );
  }
}
