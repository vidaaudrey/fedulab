// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';
import { Row, Col } from 'antd';

import { SLACK_URL } from 'src/constants/appConstants';
import ABOUT from 'src/assets/imgs/about.jpg';

export default function AboutMakeAThon() {
  return (
    <div className="AboutMakeAThon bg-white">
      <Row gutter={0}>
        <Col
          xs={24}
          sm={12}
          className="p-a-1"
          style={{
            minHeight: 440,
            backgroundImage: `url(${ABOUT})`,
            backgroundSize: 'cover',
          }}
        />
        <Col xs={24} sm={12} className="p-y-3 p-x-2 m-b-2">
          <div className="p-a-2">
            <h3 className="font-xl font-weight-200">Why Does Make-A-Thon Matter?</h3>
            <p className="font-weight-200 m-b-1">
              When everyone at Coursera joins together to create, there are so many possibilities.
            </p>
            <Box flexDirection="column">
              <a
                href={SLACK_URL}
                title="Join Slack Conversation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute Your Ideas
              </a>
              <a
                href={SLACK_URL}
                title="Join Slack Conversation"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"Shape Coursera's Future"}
              </a>
              <a
                href={SLACK_URL}
                title="Join Slack Conversation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Have Positive Social Impact
              </a>
            </Box>
          </div>
        </Col>
      </Row>
    </div>
  );
}
