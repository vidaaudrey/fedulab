// @flow
import React from 'react';
import { branch, compose, renderComponent, setDisplayName } from 'recompose';

type Props = {
  loading: boolean,
  error: any,
  data: ?{
    loading: boolean,
    error: any,
  },
  dataFieldName: ?string,
  shouldRenderNothing?: boolean,
};
function Loading() {
  return <h2>Loading</h2>;
}

function Error() {
  return <h2>Error loading the data</h2>;
}

function LoadingOrError(props: Props) {
  const { loading, error, data = {}, dataFieldName, shouldRenderNothing } = props;
  if (loading || data.loading) return <Loading />;
  if (error || data.error) return <Error />;
  if (dataFieldName && (!data[dataFieldName] || !props[dataFieldName])) {
    if (shouldRenderNothing) return null;
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
        props.loading ||
        (props.data && props.data.error) ||
        props.error ||
        (props.dataFieldName && props.data && !props.data[props.dataFieldName]) ||
        (props.dataFieldName && !props.data && !props[props.dataFieldName]),
      renderComponent(BranchedComponent),
      renderComponent(Component),
    ),
    setDisplayName(`withLoading(${Component.displayName || Component.name})`),
  )(Component);
