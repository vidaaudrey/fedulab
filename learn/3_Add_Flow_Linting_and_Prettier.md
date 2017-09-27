
# Add Flow, Linting and Prettier 
[Commit](https://github.com/vidaaudrey/fedulab/commit/b45965fd5e938f0e60f275e7c49b0cb25282b65e)
## Add Flow
Follow the Create React App [Flow Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-flow) and add flow support to the rep. 

I recommended that you set up VSCode for Flow. To set up, install following extensions: 
- Flow Lanaguage Support 
- vscode-flow-ide 

Add following config to user settings:
```json
  "flow.useNPMPackagedFlow": true,
  "flow.showStatus": true,
  "flow.enabled": true,
```

## Set up prettier 
It's also a good idea to install Prettier-Javascript formatter and add the following setting to speed up the dev process:
```json
  // Life saver
  "editor.formatOnSave": true,
  // Turn off javascript validation since it conflicts with Flow
  "javascript.validate.enable": false,
  // Enable/disable default JavaScript formatter (For Prettier)
  "javascript.format.enable": false,

  "prettier.eslintIntegration": true,
  "prettier.parser": "flow",
  "prettier.jsonEnable": [],
```

## Add eslint and format all files 
Add some common eslint and formatting related packages and settings. For details check commit. 

Recommended reading: [Airbnb React/JSX Style Guide] (https://github.com/airbnb/javascript/tree/master/react)

Checkout some common React related eslint rules at [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react). 

To understand more how we automatically lint and fix some common errors before commit, check out [link-staged](https://github.com/okonet/lint-staged);

*Note it's common to override some React eslint rules using .exlintrc file at the root directory  if it make sense. *


## Additional Setups
At the bare minimum, it's nice to have GraphQL syntax highlighting. Install GraphQL for VSCode extension, and add following config to user settings:
```json
  "files.associations": {
    "*.graphcool": "graphql"
  }
``` 