// @flow
import React from 'react';
import { CenterBox } from '@coursera/coursera-ui';

type Props = {
  data: {
    loading: boolean,
    error: any,
  },
  minHeight: string | number,
};

export default function FullpageLoading({ data, minHeight = '90vh' }: Props) {
  return (
    <CenterBox rootClassName="FullpageLoading p-y-1 w-100 h-100" style={{ minHeight }}>
      {data && data.loading && <h2>Loading</h2>}
      {data && data.error && <h2 className="text-danger">Error loading the data {data.error}</h2>}
    </CenterBox>
  );
}
