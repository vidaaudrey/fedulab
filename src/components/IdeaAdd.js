// @flow
import React from 'react';
import IdeaAddEditForm from 'src/components/IdeaAddEditForm';

export default function IdeaAdd({ ...rest }) {
  return (
    <div className="IdeaAdd m-t-3 p-y-1">
      <div className="max-text-width bg-white p-a-2 m-x-auto">
        <IdeaAddEditForm {...rest} />
      </div>
    </div>
  );
}
