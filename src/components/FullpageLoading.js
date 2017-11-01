// @flow
import React from 'react';
import { CenterBox } from '@coursera/coursera-ui';
import Loading from 'src/components/Loading';

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
      {data && data.loading && <Loading />}
      {data && data.error && <h2 className="text-danger">Error loading the data {data.error}</h2>}
    </CenterBox>
  );
}
