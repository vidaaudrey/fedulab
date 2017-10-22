// flow
import React from 'react';
import { StyleSheet, css, transition } from '@coursera/coursera-ui';
import UserAvatar from 'src/components/UserAvatar';

const AVATAR_SIZE = 80;

const styles = StyleSheet.create({
  ContributorListItem: {},
  AvatarWrapper: {
    display: 'inline-block',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, .8)',
  },
  transition: transition.easeOut(),
});

type Props = {};
export default function ContributorListItem({
  contributor,
  contributor: { id, displayName, picture },
  size = AVATAR_SIZE,
  isCenterAligned,
}: Props) {
  return (
    <div
      {...css(`${isCenterAligned ? 'm-a-1s' : ''}`, styles.ContributorListItem, styles.transition)}
    >
      <div
        {...css(styles.AvatarWrapper)}
        title={displayName}
        style={{ width: size + 4, height: size + 4 }}
      >
        <UserAvatar user={contributor} size={size} />
      </div>
    </div>
  );
}
