import React from 'react';
import ReactDOM from 'react-dom';
import 'src/index.css';
import App from 'src/App';
import registerServiceWorker from 'src/registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import { API_END_POINT, AUTH_KEY } from 'src/constants/config';

const networkInterface = createNetworkInterface({
  uri: API_END_POINT,
});

const client = new ApolloClient({ networkInterface });

// use the auth0IdToken in localStorage for authorized requests
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      // get the authentication token from local storage if it exists
      if (localStorage.getItem(AUTH_KEY)) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem(AUTH_KEY)}`;
      }
      next();
    },
  },
]);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
