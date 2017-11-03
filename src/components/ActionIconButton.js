// @flow
import React from 'react';
import Button from 'react-toolbox/lib/button/Button';

type Props = {
  minWidth: number,
  style: Object,
  inverse: boolean,
};

export default function ActionIconButton({ inverse, style = {}, minWidth = 32, ...rest }: Props) {
  return (
    <Button
      style={{
        ...style,
        minWidth,
        color: inverse ? 'white' : 'default',
        background: inverse ? 'rgba(0, 0, 0, 0.13)' : 'transparent',
        ...style,
      }}
      {...rest}
    />
  );
}
