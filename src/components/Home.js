// @flow
import React from 'react';
import { Container } from '@coursera/coursera-ui';
// import styled from 'styled-components';

import PopularIdeas from 'src/components/PopularIdeas';
import BannerStatic from 'src/components/BannerStatic';
import LearnMakeTeach from 'src/components/LearnMakeTeach';
import JoinDiscussion from 'src/components/JoinDiscussion';
import AboutMakeAThon from 'src/components/AboutMakeAThon';
import GallerySection from 'src/components/GallerySection';

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
  isLoggedout: boolean,
};

export default function Home({ isSuperuser, userId, isLoggedout }: Props) {
  return (
    <div>
      <div className="Home bg-primary text-xs-center header-margin-offset">
        <BannerStatic isLoggedout={isLoggedout} />
      </div>
      <LearnMakeTeach />
      {/* <Button>Normal</Button>
      <Button primary>Primary</Button> */}
      <div className="bg-light p-y-3">
        <Container>
          {!isLoggedout && <PopularIdeas isSuperuser={isSuperuser} userId={userId} />}
        </Container>
      </div>
      {!isLoggedout && <GallerySection />}
      <AboutMakeAThon />
      <JoinDiscussion />
    </div>
  );
}
