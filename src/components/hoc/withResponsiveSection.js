import React, { PropTypes } from 'react';
import {
  StyleSheet,
  css,
  color,
  transition,
  breakPoint,
  Box,
  SvgButton,
} from '@coursera/coursera-ui';
import { SvgChevronRight, SvgChevronDown, SvgChevronUp } from '@coursera/coursera-ui/svg';
import { compose, pure, hoistStatics, withState, withHandlers } from 'recompose';
import _ from 'underscore';

import Measure from 'react-measure';
import withBreakPoint from 'src/components/hoc/withBreakPoint';

const CONFIG = {
  duration: 0.3,
};

const styles = StyleSheet.create({
  transitionContainer: {
    overflow: 'hidden',
    transition: `height ${CONFIG.duration}s ${transition.easeOutFunction}`,
  },
});

function SectionHeader({ title, showMoreLink, moreLink, moreTag = 'a', isThemeDark }) {
  const moreProps = moreTag === 'a' ? { href: moreLink } : { to: moreLink };

  return (
    <Box justifyContent="between" rootClassName="border-bottom m-b-1 p-y-1">
      <h2 className="h4 text-secondary">{title}</h2>
      {showMoreLink &&
        moreLink && (
          <SvgButton
            type="noStyle"
            label="All"
            size="zero"
            isThemeDark={isThemeDark}
            isChildrenOnRight
            svgElement={<SvgChevronRight color={color.secondaryText} />}
            tag={moreTag}
            htmlAttributes={{
              ...moreProps,
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
          />
        )}
    </Box>
  );
}

function SectionFooter({
  showMoreLink,
  moreLink,
  moreTag = 'a',
  isThemeDark,
  expandInline,
  onViewAllClick,
  isExpanded,
}) {
  const moreProps = moreTag === 'a' ? { href: moreLink } : { to: moreLink };
  return (
    <Box justifyContent="end" rootClassName="m-b-1 p-y-1">
      {showMoreLink &&
        moreLink && (
          <SvgButton
            type="secondary"
            size="md"
            label="View All"
            tag={moreTag}
            isThemeDark={isThemeDark}
            isChildrenOnRight
            svgElement={<SvgChevronRight color={color.secondaryText} />}
            htmlAttributes={{
              ...moreProps,
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
          />
        )}
      {expandInline &&
        onViewAllClick && (
          <SvgButton
            type="secondary"
            size="md"
            label={isExpanded ? 'View Less' : 'View All'}
            onClick={onViewAllClick}
            isChildrenOnRight
            isThemeDark={isThemeDark}
            svgElement={
              isExpanded ? (
                <SvgChevronUp color={color.primary} hoverColor={color.white} />
              ) : (
                <SvgChevronDown color={color.primary} hoverColor={color.white} />
              )
            }
          />
        )}
    </Box>
  );
}

// Get the closest breakPoint in the lower bound
function getDisplayCountByBreakpoint(
  {
    xsDisplayCount,
    smDisplayCount,
    mdDisplayCount,
    lgDisplayCount,
    xlDisplayCount,
    xxlDisplayCount,
  },
  breakPoint,
) {
  let displayCount = 0;
  // TODO(Audrey): more it more efficient and use that to optimize withResponsiveConfig
  switch (breakPoint) {
    case 'xs':
      displayCount = xsDisplayCount;
      break;
    case 'sm':
      displayCount = smDisplayCount || xsDisplayCount;
      break;
    case 'md':
      displayCount = mdDisplayCount || smDisplayCount || xsDisplayCount;
      break;
    case 'lg':
      displayCount = lgDisplayCount || mdDisplayCount || smDisplayCount || xsDisplayCount;
      break;
    case 'xl':
      displayCount =
        xlDisplayCount || lgDisplayCount || mdDisplayCount || smDisplayCount || xsDisplayCount;
      break;
    case 'xxl':
      displayCount =
        xxlDisplayCount ||
        xlDisplayCount ||
        lgDisplayCount ||
        mdDisplayCount ||
        smDisplayCount ||
        xsDisplayCount;
      break;
    default:
      displayCount = 0;
  }
  return displayCount;
}

export default function withResponsiveSection(Component) {
  const HOC = ({
    sectionTitle,
    total = 0,
    toggleExpanded,
    expandInline,
    isExpanded,
    contentHeight,
    setContentHeight,
    breakPoint,
    isThemeDark,
    moreLink,
    moreTag = 'a',
    hideSectionHeader,
    showSectionFooter,
    xsDisplayCount = 0,
    smDisplayCount = 0,
    mdDisplayCount = 0,
    lgDisplayCount = 0,
    xlDisplayCount = 0,
    xxlDisplayCount = 0,
    ...rest
  }) => {
    const computedDisplayCount = getDisplayCountByBreakpoint(
      {
        xsDisplayCount,
        smDisplayCount,
        mdDisplayCount,
        lgDisplayCount,
        xlDisplayCount,
        xxlDisplayCount,
      },
      breakPoint,
    );

    const showMoreLink = total > computedDisplayCount;

    const displayCount = total > computedDisplayCount ? computedDisplayCount : total;
    return (
      <Box rootClassName="withResponsiveSection" flexDirection="column">
        {!hideSectionHeader && (
          <SectionHeader
            title={sectionTitle}
            showMoreLink={!expandInline && showMoreLink}
            moreLink={moreLink}
            isThemeDark={isThemeDark}
          />
        )}
        {!expandInline && <Component displayCount={displayCount} {...rest} />}
        {expandInline && (
          <div {...css(styles.transitionContainer)} style={{ height: contentHeight }}>
            <Measure onMeasure={({ height }) => setContentHeight(height)}>
              <Component displayCount={isExpanded ? total : displayCount} {...rest} />
            </Measure>
          </div>
        )}
        {showSectionFooter && (
          <SectionFooter
            expandInline={expandInline}
            isExpanded={isExpanded}
            onViewAllClick={toggleExpanded}
            showMoreLink={showMoreLink}
            moreLink={moreLink}
            isThemeDark={isThemeDark}
          />
        )}
      </Box>
    );
  };

  HOC.propTypes = {
    breakPoint: PropTypes.oneOf(Object.keys(breakPoint)),
    sectionTitle: PropTypes.string,
    total: PropTypes.number.isRequired,
    expandInline: PropTypes.bool,
    moreLink: PropTypes.string,
    moreTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // Pass down the appropriate displayCount to wrapped Component
    xsDisplayCount: PropTypes.number,
    smDisplayCount: PropTypes.number,
    mdDisplayCount: PropTypes.number,
    lgDisplayCount: PropTypes.number,
    xlDisplayCount: PropTypes.number,
    xxlDisplayCount: PropTypes.number,
  };

  const componentName = Component.displayName || Component.name;
  HOC.displayName = `HOC(${componentName})`;
  hoistStatics(Component, HOC);

  return compose(
    withBreakPoint,
    withState('isExpanded', 'setIsExpanded', false),
    withState('contentHeight', 'setContentHeight', 0),
    withHandlers({
      toggleExpanded: ({ setIsExpanded, isExpanded }) => () => {
        setIsExpanded(!isExpanded);
      },
    }),
    pure,
  )(HOC);
}
