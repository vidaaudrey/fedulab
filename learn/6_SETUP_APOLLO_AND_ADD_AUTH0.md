
# Setup Apollo and and Auth0
[Commit]()

We're follow [this GraphCool tutorial](https://www.graph.cool/docs/tutorials/react-apollo-auth0-pheiph4ooj/) to add Auth0. If you have any questions on setting up Apollo, please refer [Freecom Tutorial: Apollo Setup & GraphQL Queries/Mutations in React (2/6)](https://www.graph.cool/docs/tutorials/freecom-2-apollo-queries-mutations-oe8ahyo2ei/);

As we want to store the user's picture, name and email address for easy access, we'll update the User schema to store those fields. We'll discuss offline if anyone is interested in knowing more about the Auth process. 

A few notes if you come across any issues:
- Must enable HS256 and disabling OIDC compliance in Auth0 settings [Why](https://github.com/graphcool/graphcool/issues/145#issuecomment-318968578)
- Must specify responseType if you are using the latest auth0-lock package. [Why](https://github.com/auth0/lock/issues/859)
```javascript
this._lock.show({
      closable: true,
      auth: {
        params: {
          responseType: "id_token token"
        }
      }
    });
```

