// @flow
import React from 'react';
import { css, StyleSheet, Box } from '@coursera/coursera-ui';
import Button from 'react-toolbox/lib/button/Button';
import { Link } from 'react-router-dom';

import LoginAuth0 from 'src/components/LoginAuth0';

import BANNER_BG from 'src/assets/imgs/banner.jpg';
import MAKEATHON_LOGO from 'src/assets/makeathon_logos/makeathon.png';
import { BUTTON_LG_HEIGHT } from 'src/constants/theme';
import { CLIENT_ID, DOMAIN } from 'src/constants/config';

const styles = StyleSheet.create({
  banner: {
    minHeight: 800,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${BANNER_BG})`,
  },
  bannerImage: {
    width: '100%',
    marginBottom: '-5%',
  },
});

type Props = {
  isLoggedout: boolean,
};
export default function BannerStatic({ isLoggedout }: Props) {
  return (
    <Box
      rootClassName={styles.banner}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box rootClassName="p-a-1 m-t-3" flexDirection="column" alignItems="center">
        <img src={MAKEATHON_LOGO} {...css(styles.bannerImage)} alt="Makeathon Logo" />
        {isLoggedout && (
          <div className="inverse">
            <LoginAuth0 clientId={CLIENT_ID} domain={DOMAIN} />
          </div>
        )}
        {!isLoggedout && (
          <Link to="/ideas">
            <Button
              style={{ height: BUTTON_LG_HEIGHT, width: 240 }}
              icon="arrow_forward"
              label="Browse All Ideas"
              raised
              primary
            />
          </Link>
        )}
      </Box>
    </Box>
  );
}
