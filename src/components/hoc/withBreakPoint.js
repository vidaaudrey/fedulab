import React from 'react';
import PropTypes from 'prop-types';
import { breakPoint } from '@coursera/coursera-ui';
import { hoistStatics } from 'recompose';
import Media from 'react-media';

/**
 * A HOC to detect the device size and match up with breakPoint,
 * then pass it down to props
 * Sample usage:
 * <DomainSectionS12nList
 *    responsiveConfig={{
 *      xs: {initialS12nCount: 2},
 *      sm: {initialS12nCount: 2},
 *      md: {initialS12nCount: 4},
 *      lg: {initialS12nCount: 6},
 *      xl: {initialS12nCount: 8},
 *      xxl: {initialS12nCount: 8},
 *    }}
 *    ...
 *  />
 * */

function getComponentHtml(Component, props, breakPoint, showBreakPointNumber) {
  const addedProps = { breakPoint };
  if (showBreakPointNumber) {
    addedProps.breakPointNumber = breakPoint[breakPoint];
  }
  return <Component {...props} {...addedProps} />;
}

const withBreakPoint = (Component) => {
  const componentName = Component.displayName || Component.name;
  const HOC = (props) => {
    const showBreakPointNumber = props.showBreakPointNumber;
    return (
      <Media query={{ minWidth: breakPoint.xxl }}>
        {(matchesXxl) => {
          if (matchesXxl) {
            return getComponentHtml(Component, props, 'xxl', showBreakPointNumber);
          }
          return (
            <Media query={{ minWidth: breakPoint.xl }}>
              {(matchesXl) => {
                if (matchesXl) {
                  return getComponentHtml(Component, props, 'xl', showBreakPointNumber);
                }
                return (
                  <Media query={{ minWidth: breakPoint.lg }}>
                    {(matchesLg) => {
                      if (matchesLg) {
                        return getComponentHtml(Component, props, 'lg', showBreakPointNumber);
                      }
                      return (
                        <Media query={{ minWidth: breakPoint.md }}>
                          {(matchesMd) => {
                            if (matchesMd) {
                              return getComponentHtml(Component, props, 'md', showBreakPointNumber);
                            }
                            return (
                              <Media query={{ minWidth: breakPoint.sm }}>
                                {(matchesSm) => {
                                  if (matchesSm) {
                                    return getComponentHtml(
                                      Component,
                                      props,
                                      'sm',
                                      showBreakPointNumber,
                                    );
                                  }
                                  return (
                                    <Media query={{ minWidth: breakPoint.xs }}>
                                      {(matchesXs) => {
                                        if (matchesXs) {
                                          return getComponentHtml(
                                            Component,
                                            props,
                                            'xs',
                                            showBreakPointNumber,
                                          );
                                        }
                                        return getComponentHtml(
                                          Component,
                                          props,
                                          'xxs',
                                          showBreakPointNumber,
                                        );
                                      }}
                                    </Media>
                                  );
                                }}
                              </Media>
                            );
                          }}
                        </Media>
                      );
                    }}
                  </Media>
                );
              }}
            </Media>
          );
        }}
      </Media>
    );
  };

  hoistStatics(Component, HOC);

  HOC.propTypes = {
    showBreakPointNumber: PropTypes.bool,
  };

  HOC.displayName = `withBreakPoint(${componentName})`;

  return HOC;
};

export default withBreakPoint;
