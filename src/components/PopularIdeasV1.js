// @flow
import React from 'react';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { compose, withProps } from 'recompose';

import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaListItem from 'src/components/IdeaListItem';
import FullpageLoading from 'src/components/FullpageLoading';

import withResponsiveSection from 'src/components/hoc/withResponsiveSection';

import { IdeaListQuery } from 'src/constants/appQueries';

const LOADING_MIN_HEIGHT = 560;

type Props = {
  isSuperuser: boolean,
  userId: boolean,
  allIdeas: [Object],
};

type PopularIdeasListProps = {
  displayCount: ?number,
  ideas: [Object],
  isSuperuser: boolean,
  userId: boolean,
};

function PopularIdeasList({ displayCount, ideas, isSuperuser, userId }: PopularIdeasListProps) {
  const ideaList = displayCount === undefined ? ideas : ideas.slice(0, displayCount);
  return (
    <Row className="PopularIdeasList">
      <QueueAnim>
        {ideaList.map(idea => (
          <Col xs={24} sm={12} md={8} lg={6} key={idea.id} className="p-a-1 m-b-2">
            <IdeaListItem idea={idea} key={idea.id} isSuperuser={isSuperuser} userId={userId} />
          </Col>
        ))}
      </QueueAnim>
    </Row>
  );
}

const PopularIdeasListResponsive = withResponsiveSection(PopularIdeasList);

function PopularIdeas({ allIdeas, isSuperuser, userId, ...rest }: Props) {
  return (
    <PopularIdeasListResponsive
      moreLink="/ideas"
      moreTag={Link}
      titleTag="h2"
      sectionTitle="Popular Ideas"
      total={24}
      xsDisplayCount={2}
      smDisplayCount={4}
      mdDisplayCount={6}
      lgDisplayCount={8}
      xxlDisplayCount={12}
      ideas={allIdeas}
      isSuperuser={isSuperuser}
      userId={userId}
    />
  );
}

export default compose(
  graphql(IdeaListQuery, {
    options: ({ isPresenting }) => ({ variables: isPresenting ? { isPresenting } : {} }),
    props: ({ data: { allIdeas }, data }) => ({ data, allIdeas, minHeight: LOADING_MIN_HEIGHT }),
  }),
  withProps(() => ({ dataFieldName: 'allIdeas' })),
  withGQLLoadingOrError(FullpageLoading),
)(PopularIdeas);
