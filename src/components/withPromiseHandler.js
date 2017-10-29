import * as React from 'react';
import PropTypes from 'prop-types';
import { action } from '@coursera/coursera-ui';
import { hoistStatics } from 'recompose';

import {
  API_BEFORE_SEND,
  API_IN_PROGRESS,
  API_SUCCESS,
  API_ERROR,
} from 'src/constants/apiNotificationConstants';

/**
 * A HOC to handle common promise related state changes
 * Optionally config whether the apiStatus should reset to API_BEFORE_SEND after the call
 * The apiStatus, response, error will be passed down to the wrapped component
 */

export default function withPromiseHandler({
  shouldResetToDefaultStatus = false,
  apiStatusResetTime = 3000,
}) {
  return (Component) => {
    const componentName = Component.displayName || Component.name;
    class HOC extends React.Component {
      static displayName = `withPromiseHandler(${componentName})`;

      static propTypes = {
        /* eslint-disable react/no-unused-prop-types */
        shouldResetToDefaultStatus: PropTypes.bool,
        apiStatusResetTime: PropTypes.number,
        /* eslint-disable react/no-unused-prop-types */
      };

      constructor(props, context) {
        super(props, context);
        this.state = this.getDefaultComponentState();
      }

      componentDidMount() {
        // When the api call finishes, the component may not be mounted anymore
        // We have to check _isMounted before we use setState
        this._isMounted = true;
      }

      componentWillUpdate(nextProps, { apiStatus }) {
        const resetToDefault =
          'shouldResetToDefaultStatus' in nextProps
            ? nextProps.shouldResetToDefaultStatus
            : shouldResetToDefaultStatus;
        const resetTime =
          'apiStatusResetTime' in nextProps ? nextProps.apiStatusResetTime : apiStatusResetTime;

        if (resetToDefault && (apiStatus === API_SUCCESS || apiStatus === API_ERROR)) {
          setTimeout(() => {
            if (this._isMounted) {
              this.setState(this.getDefaultComponentState);
            }
          }, resetTime);
        }
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

      getDefaultComponentState() {
        return {
          apiStatus: API_BEFORE_SEND,
          error: null,
          response: null,
          apiTag: null,
        };
      }

      handlePromise = ({
        apiPromise: apiPromiseAlt,
        apiPromiseFn,
        refreshDataPromiseFn,
        apiInProgressCallback,
        apiSuccessCallback,
        apiErrorCallback,
        silent,
        apiTag,
      }) => {
        let apiPromise = apiPromiseAlt;
        if (apiPromiseFn) {
          apiPromise = apiPromiseFn();
        }
        // Use silent if we don't want to do anything, just silently invoke the promise
        if (silent) {
          apiPromise.then(() => {}).done();
          return;
        }

        this.setState({
          apiStatus: API_IN_PROGRESS,
          error: null,
          response: null,
          apiTag,
        });

        if (apiInProgressCallback) apiInProgressCallback();

        apiPromise
          .then((response) => {
            if (this._isMounted) {
              this.setState({
                response,
                apiStatus: API_SUCCESS,
                apiTag,
              });
            }
            // Silently refresh data, useful when you want to refresh other resources
            if (refreshDataPromiseFn) refreshDataPromiseFn();
            if (apiSuccessCallback) apiSuccessCallback(response);
          })
          .catch((error) => {
            action('--WithApiHandler--')(error);
            if (this._isMounted) {
              this.setState({
                error,
                apiStatus: API_ERROR,
              });
            }
            if (apiErrorCallback) apiErrorCallback(error);
          });
      };

      render() {
        return <Component {...this.props} {...this.state} handlePromise={this.handlePromise} />;
      }
    }

    hoistStatics(Component, HOC);
    return HOC;
  };
}
