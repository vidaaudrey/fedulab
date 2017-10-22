// @flow
import React from 'react';
import Avatar from 'react-toolbox/lib/avatar';

export default function UserAvatar({ user: { displayName, picture }, size = 44 }) {
  return <Avatar title={displayName} image={picture} />;
}
