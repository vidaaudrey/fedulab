// @flow
import React from 'react';
import { CenterBox } from '@coursera/coursera-ui';
import { Link } from 'react-router-dom';

import Loading from 'src/components/Loading';

type Props = {
  loading: boolean,
  error: any,
  idea: Object,
  slug: string,
  data: Object,
};

export default function IdeaLoadPreCheck({ loading, error, idea, slug, data }: Props) {
  const isLoading = loading || (data && data.loading);
  const hasError = error || (data && data.error);
  return (
    <CenterBox rootClassName="FullpageLoading p-y-1 w-100 h-100" style={{ minHeight: '90vh' }}>
      {isLoading && <Loading />}
      {hasError && <h2>Error loading the data</h2>}
      {isLoading &&
        hasError &&
        !idea && (
          <div className="p-a-1">
            <h2>
              Idea with slug
              <span className="text-danger"> {slug} </span>
              not found
            </h2>
            View <Link to="/ideas"> All Ideas </Link>
          </div>
        )}
    </CenterBox>
  );
}
