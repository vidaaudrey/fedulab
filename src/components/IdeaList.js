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

import { IdeaListQuery, UserDetailsQuery } from 'src/constants/appQueries';

type Props = {
  allIdeas: [Object],
  filteredIdeas: [Object],
  userId: string,
  userDetailsQuery: Object,
  isSuperuser: boolean,
  isPresenting: boolean,
  onChange: (SyntheticInputEvent<>) => void,
  toggleIsPresenting: () => void,
  searchText: string,
  isLatest: boolean,
  toggleIsLatest: void => void,
};

export function IdeaList({
  allIdeas = [],
  filteredIdeas = [],
  userId,
  userDetailsQuery: { user },
  isSuperuser,
  onChange,
  isPresenting,
  toggleIsPresenting,
  searchText,
  isLatest,
  toggleIsLatest,
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
            <span className="p-x-1">
              <Switch checked={!!isLatest} label="Latest" onChange={toggleIsLatest} />
            </span>
          </Box>
          {allIdeas.length === 0 && (
            <div className="text-xs-center p-a-3">
              <h2>There are no ideas.</h2>
              {!isPresenting && <Link to="/add-idea">Add My Idea</Link>}
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
                <IdeaListItem
                  idea={idea}
                  key={idea.id}
                  isSuperuser={isSuperuser}
                  userId={userId}
                  userEmail={user.emailAddress}
                />
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
  withState('isLatest', 'isLatestSet', false),
  graphql(IdeaListQuery, {
    options: ({ isPresenting, isLatest }) => {
      const variables = { orderBy: isLatest ? 'createdAt_DESC' : 'createdAt_ASC' };
      if (isPresenting) {
        variables.isPresenting = true;
      }
      // TODO(Audrey): figure out why toggle presenting, then latest, then back not triggering render
      return { variables };
    },
  }),
  graphql(UserDetailsQuery, {
    name: 'userDetailsQuery',
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
    toggleIsLatest: ({ isLatest, isLatestSet }) => (data) => {
      // Only toggle between all ideas and presenting ideas
      if (isLatest) {
        isLatestSet(false);
      } else {
        isLatestSet(true);
      }
    },
  }),
)(IdeaList);
