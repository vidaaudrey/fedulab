// @flow
import React from 'react';
import { Container } from '@coursera/coursera-ui';
import { Row, Col } from 'antd';
import LEARN from 'src/assets/svg/learn.svg';
import MAKE from 'src/assets/svg/make.svg';
import TEACH from 'src/assets/svg/teach.svg';

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
export default function LearnMakeTeach() {
  return (
    <div className="LearnMakeTeach bg-white text-xs-center p-y-2">
      <Container>
        <Row gutter={16}>
          {CONFIG.map(({ title, icon, description }) => (
            <Col key={title} xs={24} sm={12} md={8} className="p-a-1 m-b-2">
              <img src={icon} alt={title} />
              <h3>{title}</h3>
              <p className="font-weight-200">{description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
