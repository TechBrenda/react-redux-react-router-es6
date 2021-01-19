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
