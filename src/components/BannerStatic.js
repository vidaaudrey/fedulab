// @flow
import React from 'react';
import { StyleSheet, Box } from '@coursera/coursera-ui';
import Button from 'react-toolbox/lib/button/Button';
import { Link } from 'react-router-dom';

import BANNER_BG from 'src/assets/imgs/banner.jpg';
import { BUTTON_LG_HEIGHT } from 'src/constants/theme';

const styles = StyleSheet.create({
  banner: {
    minHeight: 600,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${BANNER_BG})`,
  },
});

export default function BannerStatic({ match }: MatchProps) {
  return (
    <Box
      rootClassName={styles.banner}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <div className="p-a-1 m-t-3">
        <h1 className="color-white font-weight-900" style={{ fontSize: '4.8rem' }}>
          Welcome to the 9th Make-A-Thon
        </h1>
        <h2 className="m-b-1 color-white">Learn-Make-Teach</h2>
        <Link to="/add-idea">
          <Button
            style={{ height: BUTTON_LG_HEIGHT, width: 184 }}
            icon="arrow_forward"
            label="Add My Idea"
            raised
            primary
          />
        </Link>
      </div>
    </Box>
  );
}
