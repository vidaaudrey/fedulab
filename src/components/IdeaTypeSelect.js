// @flow

import React from 'react';
import { Checkbox } from 'antd';
import { compose, withProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CheckboxGroup = Checkbox.Group;

type Props = {
  ideaCategories: Array<string>,
};

function IdeaTypeSelect({ ideaCategories = [], ...rest }: Props) {
  return <CheckboxGroup options={ideaCategories} {...rest} />;
}

const IdeaTypeSelectQuery = gql`
  query IdeaSelectQuery {
    IDEA_CATEGORY: __type(name: "IdeaCategory") {
      name
      enumValues {
        name
      }
    }
  }
`;

const DATA = {
  IDEA_CATEGORY: {
    enumValues: [
      {
        name: 'GENERAL',
      },
      {
        name: 'B2B',
      },
      {
        name: 'B2C',
      },
      {
        name: 'DEGREE',
      },
    ],
  },
};
export default compose(
  graphql(IdeaTypeSelectQuery),
  withProps(() => ({
    ideaCategories: DATA.IDEA_CATEGORY.enumValues.map(item => item.name),
  })),
  withHandlers({}),
)(IdeaTypeSelect);
