// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IdeaListItem from 'src/components/IdeaListItem';

export function IdeaList({ match, data, ...rest }: MatchProps) {
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
      <Row gutter={16}>
        <QueueAnim>
          {ideas.map(idea => (
            <Col xs={24} sm={12} md={8} lg={6} key={idea.id} className="p-a-1 m-b-2">
              <IdeaListItem idea={idea} key={idea.id} />
            </Col>
          ))}
        </QueueAnim>
      </Row>
    </div>
  );
}

const IdeaListQuery = gql`
  query IdeaListQuery {
    allIdeas {
      id
      title
      tagline
      displayOrder
      slug
      description
      coverBackgroundUrl
      contributors {
        name
      }
    }
  }
`;
export default compose(withRouter, graphql(IdeaListQuery))(IdeaList);
