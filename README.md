# Fedulab FE Learning
 Preview [Fedulab](http://fedulab.com)
## Getting Started
Install these global dependencies: `yarn global add lighthouse serve storybook`
Clone the repo and run `yarn start`.

Run tests with jest: `yarn test`
Run tests and get coverage : `yarn test:cover`

## Deploying the Site
If you are a project collaborator, you can deploy your local version of the site.

### Set up Firebase
Install the Firebase CLI: `npm install -g firebase-tools`
Run `firebase login` and login to your Coursera account
Run `firebase init` and select `Hosting: Configure and deploy Firebase Hosting sites`
Run `firebase use --add`, select `fedulab9`, and give it an alias, i.e. `default`

### Deploy
After completing the above steps, run `yarn run` to build and deploy the site.
Note that this will deploy all of your local changes.

## TODOS
- [x] 1. [Introduction](learn/1_Introduction.md)
- [x] 2. [Schema Design](learn/2_Schema_Design.md)
- [x] 3. [Add Flow, Linting and Prettier](learn/3_Add_Flow_Linting_and_Prettier.md)
- [x] 4. [Test Setup](learn/4_Test_Setup.md)
- [x] 5. [PWA Demo](learn/5_PWA_DEMO.md)
- [x] 6. [Setup Apollo and Auth0](learn/6_SETUP_APOLLO_AND_ADD_AUTH0.md)
- [ ] 7. Add UI dependencies (coursera-ui)
- [ ] Hover edit
- [ ] Static Deploy
- [ ] Setup Subscription
- [ ] Commitizen
- [ ] Storybook
- [ ] Setup CI
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]



## Feature TODO
- [x] Idea Detail page
- [x] Consolidate Loading
- [ ] Use the makeathon arts  
- [ ] Improve loading (use a new loading pattern?)
- [ ] Handle long string
- [ ] Screen jump  
- [ ] Improving loading patter (use placeholder components)
- [ ] Add animation
- [ ] Dashboard
- [ ] Liked Ideas
- [ ] About
- [ ] Slider ??
- [ ] Placeholder for preventing page jump
- [ ] Presentation view
- [ ] Sort by likes
- [ ] Delete likes when deleting ideas
