// @flow
import React from 'react';
// import styled from 'styled-components';

import IdeaList from 'src/components/IdeaList';
import BannerStatic from 'src/components/BannerStatic';

/* Use styled  for styling components 
const Button = styled.button`
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
*/
type Props = {
  userId: string,
  isSuperuser: boolean,
};

export default function Home({ isSuperuser, userId }: Props) {
  return (
    <div>
      <div className="bg-primary text-xs-center">
        <BannerStatic />
      </div>
      {/* <Button>Normal</Button>
      <Button primary>Primary</Button> */}
      <IdeaList isSuperuser={isSuperuser} userId={userId} />
    </div>
  );
}
