// @flow
import React from 'react';
import { Box, Container } from '@coursera/coursera-ui';
import { Row, Col } from 'antd';
import Input from 'react-toolbox/lib/input/Input';
import Switch from 'react-toolbox/lib/switch/Switch';
import QueueAnim from 'rc-queue-anim';
import { withRouter, Link } from 'react-router-dom';
import { compose, withProps, withHandlers, withState } from 'recompose';

import { Search } from 'js-search';
import { graphql } from 'react-apollo';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaListItem from 'src/components/IdeaListItem';
import FullpageLoading from 'src/components/FullpageLoading';

import { IdeaListQuery } from 'src/constants/appQueries';

type Props = {
  allIdeas: [Object],
  filteredIdeas: [Object],
  userId: string,
  isSuperuser: boolean,
  isPresenting: boolean,
  onChange: (SyntheticInputEvent<>) => void,
  toggleIsPresenting: boolean => void,
  searchText: string,
};

export function IdeaList({
  allIdeas = [],
  filteredIdeas = [],
  userId,
  isSuperuser,
  onChange,
  isPresenting,
  toggleIsPresenting,
  searchText,
  ...rest
}: Props) {
  return (
    <div className="bg-light p-y-3">
      <Container>
        <div className="text-xs-center">
          <h2 className="font-xl font-weight-200"> {allIdeas.length} Ideas</h2>
          <span className="font-weight-200">Browse ideas for Coursera 9th Make-A-Thon</span>
          <Box rootClassName="m-b-1" flexWrap="wrap" alignItems="center" justifyContent="center">
            <Input
              icon="search"
              type="text"
              label="Search"
              name="searchText"
              value={searchText}
              onChange={onChange}
            />
            <span className="p-x-1">
              <Switch checked={!!isPresenting} label="Presenting" onChange={toggleIsPresenting} />
            </span>
          </Box>
          {allIdeas.length === 0 && (
            <div className="text-xs-center p-a-3">
              <h2>There are no ideas.</h2>
              <Link to="/add-idea">Add My Idea</Link>
            </div>
          )}
          {allIdeas.length > 0 &&
            filteredIdeas.length === 0 && (
              <div className="text-xs-center p-a-3">
                <h3>
                  No results found: <span className="text-danger">{searchText}</span>
                </h3>
              </div>
            )}
        </div>
        <Row gutter={16}>
          <QueueAnim>
            {filteredIdeas.map(idea => (
              <Col xs={24} sm={12} md={8} lg={6} key={idea.id} className="p-a-1 m-b-2">
                <IdeaListItem idea={idea} key={idea.id} isSuperuser={isSuperuser} userId={userId} />
              </Col>
            ))}
          </QueueAnim>
        </Row>
      </Container>
    </div>
  );
}

export default compose(
  withRouter,
  withState('isPresenting', 'isPresentingSet', undefined),
  graphql(IdeaListQuery, {
    options: ({ isPresenting }) => ({ variables: isPresenting ? { isPresenting } : {} }),
  }),
  withProps(() => ({ dataFieldName: 'allIdeas' })),
  withGQLLoadingOrError(FullpageLoading),
  withState('searchText', 'searchTextSet', ''),
  withProps(({ data, searchText }) => {
    if (searchText.length === 0) {
      return { filteredIdeas: data.allIdeas, allIdeas: data.allIdeas };
    }
    const search = new Search(['id']);
    search.addIndex('title');
    search.addIndex('contributorsText');
    search.addIndex('description');
    search.addIndex('category');
    search.addIndex('slug');
    search.addIndex('contributorsText');
    search.addIndex(['createdBy', 'name']);
    search.addDocuments(data.allIdeas);
    return {
      filteredIdeas: search.search(searchText),
      allIdeas: data.allIdeas,
    };
  }),
  withHandlers({
    onChange: ({ searchTextSet }) => (ev) => {
      searchTextSet(ev);
    },
    toggleIsPresenting: ({ isPresenting, isPresentingSet }) => () => {
      // Only toggle between all ideas and presenting ideas
      if (isPresenting) {
        isPresentingSet(undefined);
      } else {
        isPresentingSet(true);
      }
    },
  }),
)(IdeaList);
