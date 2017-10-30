// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';

import SuperuserOp from 'src/components/SuperuserOp';

type Props = {
  isSuperuser: boolean,
  userId: string,
};

export default function Superuser({ isSuperuser, userId }: Props) {
  if (!isSuperuser) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <div className="Superuser p-y-0">
      <div className="bg-white p-a-2 m-x-auto min-vh">
        <h2 className="font-xl font-weight-200 text-xs-center m-b-1"> Superuser Operations</h2>
        <SuperuserOp userId={userId} />
      </div>
    </div>
  );
}
