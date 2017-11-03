// @flow
import React from 'react';
import { Container } from '@coursera/coursera-ui';
// import styled from 'styled-components';

import PopularIdeas from 'src/components/PopularIdeas';
import BannerStatic from 'src/components/BannerStatic';
import CountdownTimer from 'src/components/CountdownTimer';
import LearnMakeTeach from 'src/components/LearnMakeTeach';
import JoinDiscussion from 'src/components/JoinDiscussion';
import AboutMakeAThon from 'src/components/AboutMakeAThon';
import PastIdeas from 'src/components/PastIdeas';
import PhotoGallerySection from 'src/components/PhotoGallerySection';

import { MAKEATHON_TIMES, DEMO_COUNTDOWN } from 'src/constants/appConstants';

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
      <div className="Home text-xs-center header-margin-offset">
        <BannerStatic isLoggedout={isLoggedout} />
      </div>
      {!isLoggedout &&
        <div className="bg-light p-y-3">
          <Container>
            <PopularIdeas isSuperuser={isSuperuser} userId={userId} />
          </Container>
        </div>
      }
      <CountdownTimer
        startTime={MAKEATHON_TIMES.start}
        endTime={MAKEATHON_TIMES.end}
        description={DEMO_COUNTDOWN}
      />
      <PhotoGallerySection />
      <LearnMakeTeach />
      {!isLoggedout && <PastIdeas />}
      <AboutMakeAThon />
      <JoinDiscussion />
    </div>
  );
}
