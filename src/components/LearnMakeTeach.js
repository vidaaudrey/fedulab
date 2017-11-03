// @flow
import React from 'react';
import { Container } from '@coursera/coursera-ui';
import { Row, Col } from 'antd';
import LEARN from 'src/assets/makeathon_logos/learn-sm.png';
import MAKE from 'src/assets/makeathon_logos/make-sm.png';
import TEACH from 'src/assets/makeathon_logos/teach-sm.png';

const CONFIG = [
  {
    icon: LEARN,
    title: 'Learn',
    description: "It's what we do best!",
  },
  {
    icon: MAKE,
    title: 'Make',
    description: 'Create, share, and have impact.',
  },
  {
    icon: TEACH,
    title: 'Teach',
    description: 'Together, we can go far.',
  },
];

const LOGO_SIZE = 220;

export default function LearnMakeTeach() {
  return (
    <div className="LearnMakeTeach text-xs-center bg-light p-y-3">
      <Container>
        <Row gutter={16} className="p-t-3">
          {CONFIG.map(({ title, icon, description }) => (
            <Col key={title} xs={24} sm={8} className="m-b-2">
              <img className="m-b-1" height={LOGO_SIZE} src={icon} alt={title} />
              <p className="font-weight-200">{description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
