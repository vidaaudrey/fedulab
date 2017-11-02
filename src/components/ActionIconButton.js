// @flow
import React from 'react';
import Button from 'react-toolbox/lib/button/Button';

type Props = {
  minWidth: number,
  style: Object,
};

export default function ActionIconButton({ style = {}, minWidth = 32, ...rest }: Props) {
  return (
    <Button
      style={{
        ...style,
        minWidth,
        color: 'white',
        background: 'rgba(0, 0, 0, 0.13)',
        ...style,
      }}
      {...rest}
    />
  );
}
