// @flow
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  loading: boolean,
  error: any,
  idea: Object,
  slug: string,
};

export default function IdeaLoadPreCheck({ loading, error, idea, slug }: Props) {
  return (
    <div>
      {loading && <h2>Loading</h2>}
      {error && <h2>Error loading the data</h2>}
      {!loading &&
        !error &&
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
