// @flow
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  loading: boolean,
  error: any,
  idea: Object,
  slug: string,
};

export default function IdeaLoadPreCheck({ loading, error, idea, slug, data }: Props) {
  const isLoading = loading || data.loading;
  const hasError = error || data.error;
  return (
    <div>
      {isLoading && <h2>Loading</h2>}
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
    </div>
  );
}
