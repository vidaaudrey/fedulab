// @flow
import React from 'react';
import { StyleSheet, css, color, transition } from '@coursera/coursera-ui';
import { Row, Col } from 'antd';

import { Link } from 'react-router-dom';
import GalleryIdeaItem from 'src/components/GalleryIdeaItem';

import { MAKEATHON_8_IDEAS } from 'src/constants/makeathonData';

const styles = StyleSheet.create({
  GalleryIdeaList: {
    minHeight: 104,
  },
  transition: transition.easeOut(),
});

type Props = {
  ideas: [Object],
};

const GalleryIdeaList = ({ ideas = MAKEATHON_8_IDEAS }: Props) => (
  <div>
    <div className="text-xs-center m-b-2">
      <h2 className="font-xl font-weight-200"> Idea Gallery</h2>
      <span className="font-weight-200">
        Browse {ideas.length} ideas from Coursera 8th Make-A-Thon
      </span>
    </div>
    <Row gutter={24} className="m-b-3">
      {ideas.map(idea => (
        <Col key={idea.id} xs={12} md={8} lg={6}>
          <GalleryIdeaItem idea={idea} />
        </Col>
      ))}
    </Row>
  </div>
);

export default GalleryIdeaList;
