// @flow
import React from 'react';

import {
  branch,
  compose,
  renderComponent,
  setDisplayName,
  setPropTypes,
  renderNothing,
  withProps,
} from 'recompose';

type Props = {
  data: {
    loading: boolean,
    error: any,
  },
  dataFieldName: ?string,
};
function Loading() {
  return <h2>Loading</h2>;
}

function Error() {
  return <h2>Error loading the data</h2>;
}

function LoadingOrError({ data, data: { loading, error }, dataFieldName }: Props) {
  if (loading) return <Loading />;
  if (error) return <Error />;
  if (dataFieldName && !data[dataFieldName]) {
    return <span className="text-danger">{`Failed to load ${dataFieldName}`}</span>;
  }
}

export const withLoadingPlaceholder = PlaceholderComponent => Component =>
  compose(
    branch(
      props => (props.data && props.data.loading) || props.loading,
      renderComponent(PlaceholderComponent),
      renderComponent(Component),
    ),
    setDisplayName(`withLoadingPlaceholder(${Component.displayName || Component.name})`),
  )(Component);

export const withLoading = Component =>
  compose(
    branch(
      props => props.isLoading || (props.data && props.data.loading),
      renderComponent(Loading),
      renderComponent(Component),
    ),
    setDisplayName(`withLoading(${Component.displayName || Component.name})`),
  )(Component);

export const withGQLLoadingOrError = (BranchedComponent = LoadingOrError) => Component =>
  compose(
    branch(
      props =>
        (props.data && props.data.loading) ||
        props.data.error ||
        (props.dataFieldName && !props.data[props.dataFieldName]),
      renderComponent(BranchedComponent),
      renderComponent(Component),
    ),
    setDisplayName(`withLoading(${Component.displayName || Component.name})`),
  )(Component);
