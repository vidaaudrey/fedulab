// @flow
import React from 'react';
import { CenterBox } from '@coursera/coursera-ui';
import { Row, Col } from 'antd';
import Button from 'react-toolbox/lib/button/Button';
import Avatar from 'react-toolbox/lib/avatar';

import { BUTTON_LG_HEIGHT } from 'src/constants/theme';
import { SLACK_URL } from 'src/constants/appConstants';
import JON from 'src/assets/imgs/jon.jpg';

export default function JoinDiscussion() {
  return (
    <div className="JoinDiscussion p-y-3 bg-white">
      <Row gutter={16}>
        <Col xs={24} sm={12} className="p-a-1 m-b-2">
          <div className="p-a-3">
            <h3 className="font-xl font-weight-200">#MakeAThon</h3>
            <p className="font-weight-200 m-b-1">Join the conversations</p>
            <a
              href={SLACK_URL}
              title="Join Slack Conversation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                style={{ height: BUTTON_LG_HEIGHT, width: 184 }}
                label="Share My Passion"
                raised
                accent
              />
            </a>
          </div>
        </Col>
        <Col xs={24} sm={12} className="p-a-1 m-b-2" style={{ minHeight: 360 }}>
          <CenterBox>
            <Avatar title="Jon" image={JON} style={{ width: 320, height: 320 }} />
          </CenterBox>
        </Col>
      </Row>
    </div>
  );
}
