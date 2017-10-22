import React from 'react';
import { StyleSheet, css, color, spacing, font, Box, CardBlock, Card } from '@coursera/coursera-ui';
import { hoistStatics, setDisplayName, compose } from 'recompose';

const styles = StyleSheet.create({
  Card: {
    minHeight: 400,
  },
  imageBlock: {
    width: '100%',
    height: 160,
  },
  S12nCardWithLayer: {
    marginBottom: spacing.md,
    maxWidth: 560,
    minHeight: 416,
  },
  firstLayer: {
    backgroundColor: color.white,
    borderColor: color.divider,
    borderWidth: '0px 1px 1px 1px',
    borderStyle: 'solid',
    height: 8,
    margin: '0px 10px',
  },
  secondLayer: {
    backgroundColor: color.white,
    borderColor: color.divider,
    borderWidth: '0px 1px 1px 1px',
    borderStyle: 'solid',
    height: 6,
    margin: '0px 20px',
  },
  layers: {
    marginBottom: `-${spacing.md}`,
  },
  cardRibbon: {
    color: color.white,
    fontSize: font.sm,
    width: 100,
    backgroundImage: `linear-gradient(-250deg, ${color.accent} 90%, ${color.white} 90%)`,
    marginLeft: -1,
    height: '2rem',
    lineHeight: '2rem',
    paddingLeft: spacing.sm,
  },
  cardRibbonDisabled: {
    backgroundImage: `linear-gradient(-250deg, ${color.disabled} 90%, ${color.white} 90%)`,
  },
});

export function CourseCardPlaceholder() {
  return (
    <Card rootClassName={styles.Card}>
      <div {...css('block', styles.imageBlock)} />
      <CardBlock>
        <Box flexDirection="column" rootClassName="p-y-3" alignItems="start">
          <h4 className="block d-inline-block">block name</h4>
          <h5 className="block d-inline-block">block partnerName</h5>
        </Box>
      </CardBlock>
    </Card>
  );
}

export function S12nCardPlaceholderBase() {
  return (
    <Card rootClassName={styles.Card}>
      <div {...css('block', styles.imageBlock)} />
      <CardBlock>
        <Box flexDirection="column" rootClassName="p-y-3" alignItems="start">
          <h4 className="block d-inline-block">block name</h4>
          <h5 className="block d-inline-block">block partnerName</h5>
        </Box>
      </CardBlock>
    </Card>
  );
}

const withS12nCardLayer = (Component) => {
  const HOC = props => (
    <div {...css('vertical-box', styles.S12nCardWithLayer)}>
      <Component {...props} />
      <div {...css(styles.layers)}>
        <div {...css(styles.firstLayer)} />
        <div {...css(styles.secondLayer)} />
      </div>
    </div>
  );
  const componentName = Component.displayName || Component.name;
  HOC.displayName = `withS12nCardLayer(${componentName})`;
  hoistStatics(Component, HOC);
  return HOC;
};

export const S12nCardPlaceholder = compose(
  setDisplayName('S12nCardPlaceholder'),
  withS12nCardLayer,
)(S12nCardPlaceholderBase);
