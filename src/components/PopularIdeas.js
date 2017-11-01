// @flow
import React from 'react';
import { Icon } from 'antd';
import { compose, withProps } from 'recompose';
import { css, color, breakPoint, StyleSheet } from '@coursera/coursera-ui';

import { graphql } from 'react-apollo';
import Slider from 'react-slick';
import Button from 'react-toolbox/lib/button/Button';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaListItem from 'src/components/IdeaListItem';
import FullpageLoading from 'src/components/FullpageLoading';

import { IdeaListQuery } from 'src/constants/appQueries';

const CONFIG = {
  loadingMinHeight: 560,
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
      settings: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
      },
    },
  ]
}

const styles = StyleSheet.create({
  navButton: {
    fontSize: 30,
    color: color.lightGrayText,
    ':hover': {
      color: color.secondaryText,
    },
  },
  sliderButton: {
    width: '30px',
    height: '30px',
    position: 'absolute',
    top: '50%',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    outline: 'none',
  },
  buttonLeft: {
    left: '-45px',
  },
  buttonRight: {
    right: '-45px',
  },
  ideaContainer: {
    padding: '1rem 0.5rem',
    width: '300px',
  }
});

type Props = {
  isSuperuser: boolean,
  userId: boolean,
  allIdeas: [Object],
}

type NavButtonProps = {
  direction: 'left' | 'right',
  onClick: Function,
  style: Object,
}

function PopularIdeas({ allIdeas, isSuperuser, userId, ...rest }: Props) {
  const ideaList = allIdeas.slice(0, 8);
  return (
    <div>
      <div className="text-xs-center m-b-2">
        <h2 className="font-xl font-weight-200"> Popular Ideas</h2>
        <Button icon="arrow_forward" label="Browse All" href="/ideas" />
      </div>
      <Slider
        autoplay
        centerMode
        pauseOnHover
        slidesToShow={4}
        prevArrow={<NavButton direction="left" />}
        nextArrow={<NavButton direction="right" />}
        responsive={CONFIG.responsive}
      >
        {ideaList.map(idea => (
          <div {...css(styles.ideaContainer)} key={idea.id}>
            <IdeaListItem idea={idea} key={idea.id} isSuperuser={isSuperuser} userId={userId} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function NavButton({ direction, onClick, style }: NavButtonProps) {
  const directionStyle = direction === 'left' ? styles.buttonLeft : styles.buttonRight;
  return (
    <button onClick={onClick} {...css(styles.sliderButton, directionStyle)}>
      <Icon type={`${direction}-circle-o`} {...css(styles.navButton)} />
    </button>
  );
}

export default compose(
  graphql(IdeaListQuery, {
    options: ({ isPresenting }) => ({ variables: isPresenting ? { isPresenting } : {} }),
    props: ({ data: { allIdeas }, data }) => ({ data, allIdeas, minHeight: CONFIG.loadingMinHeight }),
  }),
  withProps(() => ({ dataFieldName: 'allIdeas' })),
  withGQLLoadingOrError(FullpageLoading),
)(PopularIdeas);
