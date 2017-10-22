// @flow
import React from 'react';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';

import GalleryIdeaItem from 'src/components/GalleryIdeaItem';

import { MAKEATHON_8_IDEAS } from 'src/constants/makeathonData';

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
    <Row className="m-b-3">
      <QueueAnim>
        {ideas.map(idea => (
          <Col key={idea.id} xs={12} md={8} lg={6} className="p-a-1 m-b-2">
            <GalleryIdeaItem idea={idea} />
          </Col>
        ))}
      </QueueAnim>
    </Row>
  </div>
);

export default GalleryIdeaList;
