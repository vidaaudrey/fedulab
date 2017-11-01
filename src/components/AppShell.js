// @flow
import * as React from 'react';
import { Box } from '@coursera/coursera-ui';

import Logo from 'src/assets/logo_light.svg';

type Props = {
  children: React.Node,
};

export default function AppShell({ children }: Props) {
  return (
    <Box
      rootClassName="AppShell bg-white"
      style={{ width: '100vw', height: '100vh' }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img src={Logo} alt="fedulab" />
      {children}
    </Box>
  );
}
