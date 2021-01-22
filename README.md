# Starter Kit for [Building Applications in React and Redux](http://www.pluralsight.com/author/cory-house) on Pluralsight

## Get Started

1. **Install [Node 8](https://nodejs.org)** or newer. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)(https://github.com/coryhouse/pluralsight-redux-starter/archive/master.zip)
2. **Navigate to this project's root directory on the command line.**
3. **Install Node Packages.** - `npm install`
4. **Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** in Chrome.
5. Having issues? See below.

## Having Issues? Try these things first:

1. Run `npm install` - If you forget to do this, you'll get an error when you try to start the app later.
2. Don't run the project from a symbolic link. It will cause issues with file watches.
3. Delete any .eslintrc in your user directory and disable any ESLint plugin / custom rules within your editor since these will conflict with the ESLint rules defined in the course.
4. On Windows? Open your console as an administrator. This will assure the console has the necessary rights to perform installs.
5. Ensure you do not have NODE_ENV=production in your env variables as it will not install the devDependencies. To check run this on the command line: `set NODE_ENV`. If it comes back as production, you need to clear this env variable.
6. Nothing above work? Delete your node_modules folder and re-run npm install.

### Production Dependencies

| **Dependency**   | **Use**                                              |
| ---------------- | ---------------------------------------------------- |
| bootstrap        | CSS Framework                                        |
| immer            | Helper for working with immutable data               |
| prop-types       | Declare types for props passed into React components |
| react            | React library                                        |
| react-dom        | React library for DOM rendering                      |
| react-redux      | Connects React components to Redux                   |
| react-router-dom | React library for routing                            |
| react-toastify   | Display messages to the user                         |
| redux            | Library for unidirectional data flows                |
| redux-thunk      | Async redux library                                  |
| reselect         | Memoize selectors for performance                    |

### Development Dependencies

| **Dependency**                  | **Use**                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| @babel/core                     | Transpiles modern JavaScript so it runs cross-browser            |
| babel-eslint                    | Lint modern JavaScript via ESLint                                |
| babel-loader                    | Add Babel support to Webpack                                     |
| babel-preset-react-app          | Babel preset for working in React. Used by create-react-app too. |
| css-loader                      | Read CSS files via Webpack                                       |
| cssnano                         | Minify CSS                                                       |
| enzyme                          | Simplified JavaScript Testing utilities for React                |
| enzyme-adapter-react-16         | Configure Enzyme to work with React 16                           |
| eslint                          | Lints JavaScript                                                 |
| eslint-loader                   | Run ESLint via Webpack                                           |
| eslint-plugin-import            | Advanced linting of ES6 imports                                  |
| eslint-plugin-react             | Adds additional React-related rules to ESLint                    |
| fetch-mock                      | Mock fetch calls                                                 |
| html-webpack-plugin             | Generate HTML file via webpack                                   |
| http-server                     | Lightweight HTTP server to serve the production build locally    |
| jest                            | Automated testing framework                                      |
| json-server                     | Quickly create mock API that simulates create, update, delete    |
| mini-css-extract-plugin         | Extract imported CSS to a separate file via Webpack              |
| node-fetch                      | Make HTTP calls via fetch using Node - Used by fetch-mock        |
| npm-run-all                     | Display results of multiple commands on single command line      |
| postcss-loader                  | Post-process CSS via Webpack                                     |
| react-test-renderer             | Render React components for testing                              |
| react-testing-library           | Test React components                                            |
| redux-immutable-state-invariant | Warn when Redux state is mutated                                 |
| redux-mock-store                | Mock Redux store for testing                                     |
| rimraf                          | Delete files and folders                                         |
| style-loader                    | Insert imported CSS into app via Webpack                         |
| webpack                         | Bundler with plugin ecosystem and integrated dev server          |
| webpack-bundle-analyzer         | Generate report of what's in the app's production bundle         |
| webpack-cli                     | Run Webpack via the command line                                 |
| webpack-dev-server              | Serve app via Webpack                                            |

# Notes

> When you notice that some components don't use props they receive but merely forward them down...it's a good time to introduce some container components.
>
> -- <cite>Dan Abramov</cite>

## Increasing complexity of state

1. Start with state in a single component.
2. Lift state as needed (lowest common parent).
3. Try Context or Redux when lifting state gets annoying.

## Redux 3 Principles

1. One immutable store.
2. Actions trigger changes.
3. Reducers update state.

Every update replaces state with entirely new state. Clearly define each action to do one thing - no side effects. Reducers are pure functions - it accepts the current state and an action, then returns a new state. A pure function is one that produces the same output every time given the same input.

Data flows down. Actions flow up.

In Redux, state changing logic is handled by reducers. Reducers can be nested via functional composition, the same way that React can nest components. By nesting reducers, Redux keeps a unified state that is the single source of truth (no data duplication).

All reducers are called on each dispatch. That is why each reducer returns state. If the reducer does not handle the action that is dispatched, then it only returns the state parameter. Each reducer is only passed its slice of state.

> Write independent small reducer functions that are each responsible for updates to a specific slice of state. We call this pattern "reducer composition". A given action could be handled by all, some, or none of them."
>
> --<cite>Redux FAQ</cite>

## Shallow Copy versus Deep Clone

Object.assign and spread operator both only copy the reference to the top level of objects and arrays. Merging tools like clonedeep or lodash.merge, or a cheap hack like JSON.parse(JSON.stringify(obj)) will make a complete copy without reusing any references.

However, only the data that changes needs a copy. If you deep clone everything, it would cause unnecessary renders.

Redux state would never need a deep copy of the whole state, only a property that has nested properties that need changing.

## Recommendations to ensure immutability

In development (definitely not in production), use redux-immutable-state-invariant to warn when code is mutating state.

Use librarys such as Immer or Immutable.js to ensure data is always immutable. These libraries will copy references only when the data is unchanged. Otherwise, they will return a new object.

## Forbidden in Reducers

- Mutate arguments
- Perform side effects (such as API call)
- Call non-pure functions

## Memoize

Memoization is like caching for function calls. Because pure functions always return the same value for the same parameters, memoization caches the result of a function's initial execution of a set of parameters. If the parameters don't change, then the cached result may be used instead of running the function again. This is how it optimizes performance of functions with long execution time.

https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19

## Intial Redux Setup

1. Create action
2. Create reducer
3. Create root reducer
4. Configure store
5. Instantiate store
6. Connect component
7. Pass props via connect
8. Dispatch action

### Add feature

1. Create action
2. Enhance reducer
3. Connect component
4. Dispatch action

## Code Saving

When initializing state in class components, you don't have to call the constructor and set this.state. Instead you can just say state = {}. That is because state is already bound to the class so declaring it outside of constructor still allows you to reference this.state.

## Form onSubmit vs Child Button onClick

When creating a form in React, the form component has a prop onSubmit that takes a method for handling the form submittal.

You could instead pass the handleSubmit method to the button (or input of type "submit"). However, only the form onSubmit will associate the enter button on the keyboard with form submittal.

When using the onSubmit prop in form component, the method passed to the prop must call event.preventDefault() first, then include the handling code. Otherwise, submitting the form will reload the page. You don't have to do this step if the handleSubmit method is called from the submit button's onClick prop.

## Normalize Redux State

This looks awesome:

- https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
- https://github.com/paularmstrong/normalizr

## Redux Middleware

Redux middleware is a way to enhance Redux's behavior. Middleware runs between dispatching an action and the action reaching the reducer.

Multiple middleware are combined with the Redux `compose` function.

Middleware is the third parameter of the Redux createStore function. When adding middleware, either single or combined in compose, it must have open and close parenthesis after the middleware function name so that it is instantiated.

- reduxImmutableStateInvariant - warns if code attempts to mutate Redux state

## Connect

When passing Redux state to components with mapStateToProps, only include state that you absolutely need. These values are props of the component so any time any these mapped state values change, the component will render again.

mapStateToProps has an optional second parameter "ownProps" which are the props for the component that are not in Redux state.

mapDispatchToProps determines what actions are available on props for a component. If you omit it, the component gets a dispatch prop injected automatically.

## Mock API

A mock API is great for early UI development. It keeps you from being so dependent on having real data and a functioning API set up during early development.

- Start before the API exists (must first agree on shape of data)
- Independence from API and database development
- Backup plan in case database or network is down
- Ultra-fast
- Test slowness - can use setTimeout to simulate network lag
- Aids testing since only the API address will change, not the code

Point to the real API later and make adjustments as needed. You don't have to wait on the API to be fully implemented to see if you can develop something in the UI. You can set environment variables to switch between real API and mock API for future development.

Using JSON Server as mock API.

### Scripts

The start:api script runs JSON Server. The prestart:api runs the script that loads mockData.js into db.json. Because of the "pre" prefix, prestart:api will automatically run before start:api.

When running custom npm scripts you need the "run" keyword in the command:

`npm run start:api`

Use `run-p` in a script to run multiple npm scripts in parallel. This command comes with npm-run-all package. Rename the existing start script to "start:dev" then create a new "start" script that runs both start:dev and start:api. Since run-p script uses "start", it doesn't need the "run" keyword.

`npm start`

By using run-p, both processes will output to the same console.

## Thunk

Thunk: a function that wraps an expression to delay its evaluation.

A thunk is a function that returns a function. Thunk is a computer science term, and it not limited to Redux or JavaScript.

Anything impure (side effects) is wrapped in a thunk. Later that thunk will be invoked by middleware to cause the effect. By transferring all side effects to running at the same point in the Redux loop, the rest of the app stays relatively pure.

Redux thunks receive dispatch as the first parameter. A second, optional parameter is getState which can provide conditions for performing the dispatch conditionally.

You can handle actions asynchronously without middleware, but Redux-Thunk passes dispatch in for you. If you didn't use middleware, your components would have to know whether an action is synchronous or asynchronous. When using Thunk middleware, your component code does not have to change, and Thunk adds the dispatch for you.
