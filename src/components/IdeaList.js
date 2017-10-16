// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IdeaListItem from 'src/components/IdeaListItem';

import { IdeaListQuery } from 'src/constants/appQueries';

type Props = {
  data: Object,
  isSuperuser: boolean,
  userId: boolean,
};

export function IdeaList({ data, userId, isSuperuser, ...rest }: MatchProps) {
  if (data.loading) {
    return <h2>Loading</h2>;
  }
  if (data.error) {
    return <h2>Error loading the data</h2>;
  }
  const ideas = data.allIdeas || [];

  return (
    <div>
      <h2>Ideas</h2>
      {ideas.length === 0 && (
        <div className="text-xs-center">
          <h2>There are no ideas.</h2>
          <Link to="/add-idea">Add My Idea</Link>
        </div>
      )}
      <Row gutter={16}>
        <QueueAnim>
          {ideas.map(idea => (
            <Col xs={24} sm={12} md={8} lg={6} key={idea.id} className="p-a-1 m-b-2">
              <IdeaListItem idea={idea} key={idea.id} isSuperuser={isSuperuser} userId={userId} />
            </Col>
          ))}
        </QueueAnim>
      </Row>
    </div>
  );
}

export default compose(withRouter, graphql(IdeaListQuery))(IdeaList);
