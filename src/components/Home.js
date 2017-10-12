// @flow
import React from 'react';
import styled from 'styled-components';

import IdeaList from 'src/components/IdeaList';
import Banner from 'src/components/Banner';

const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default function Home({ match }: MatchProps) {
  return (
    <div>
      <div className="bg-primary text-xs-center">
        <Banner />
      </div>
      {/* <Button>Normal</Button>
      <Button primary>Primary</Button> */}
      <IdeaList />
    </div>
  );
}
