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

When initializing state in class components, you don't have to call the constructor and assign a value to `this.state`. Instead you can just say `state = {}` at the top level of the class. That is because state is already bound to the class so declaring it outside of constructor still allows you to reference this.state from any class method.

## Form onSubmit vs Child Button onClick

When creating a form in React, the form component has a prop onSubmit that takes a method for handling the form submittal.

You could instead pass the handleSubmit method to the button (or input of type "submit"). However, only the form onSubmit will associate the enter button on the keyboard with form submittal.

When using the onSubmit prop in form component, the method passed to the prop must call event.preventDefault() first, then include the handling code. Otherwise, submitting the form will reload the page. You don't have to do this step if the handleSubmit method is called from the submit button's onClick prop.

## PropTypes

Import PropTypes from the prop-types library.

After the component definition and before the component is exported, define the propTypes property on the component as an object where the props are the field names and the values are `PropTypes.` followed by the field type and optionally followed by `.isRequired`.

Example

```javascript
CoursesPage.PropTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
```

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

mapStateToProps has an optional second parameter "ownProps" which are the props for the component that are not in Redux state. Use ownProps when props from other sources affect the Redux state mapped to props.

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

It is helpful to add a suffix to async actions such as SUCCESS and ERROR so that you can call one action for successful API call and the other for handling an error with the same API call. The base part of the action name would represent the particular API called.

Redux-Thunk is easy to learn, but once you get the hang of it, consider learning a more complex (and more powerful) async library such as Redux-Saga. Saga is very complicated to learn but makes other development tasks easier such as testing.

## Initial State

Instead of declaring the initial state of a reducer in each reducer, consider combining the shape of the initial state into a single file in the reducers folder called initialState.js. Then you can import this file into each reducer and use it to set that reducer's slice of initial state.

Creating a centralized intial state provides a referenced point of data shape that helps new developers on a project find where the data comes from. Since every reducer would reference it, it's easy to find.

## Redux component boilerplate

1. Imports
2. Component
3. PropTypes
4. Redux mapping
   - mapStateToProps
   - mapDispatchToProps
5. Export component wrapped in Redux connect function.

## mapDispatchToProps

There are several ways to create mapDispatchToProps. Redux offers a lot of automation for injecting dispatch.

### Function form of mapDispatchToProps

The most concise way to define mapDispatchToProps as a function is to set dispatch as the parameter and use the Redux function `bindActionCreators` to bind action creator functions to dispatch.

Create a file to hold all the action creator functions for a slice of Redux state. This file will export each action creator and have no default export. In the component that uses the action creators, import all the action creators and rename after the file it came from. For example, courseActions.js contains all course action creators. CoursesPage component will import those using the wildcard import format.

`import * as courseActions from '../../redux/actions/courseActions';`

This creates an object with each of the action creator functions as a property of the object.

Also import `bindActionCreators`:

`import { bindActionCreators } from 'redux';`

In mapStateToDispatch, `bindActionCreators` may be used to bind all of the action creators in the imported actions object or a single action creator in the actions object.

#### Bind all action creators

```javascript
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
};
```

#### Bind individual action creators

```javascript
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    },
  };
};
```

### Object form of mapDispatchToProps

If you declare mapDispatchToProps as an object instead of a function, each property will automatically be bound to dispatch.

This removes a level of object nesting so you will need to update your component props references and PropTypes definition. You also won't need `bindActionCreators`.

The action creators are defined and imported just as in the function form described above.

```javascript
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
};
```

If you use named imports to import only the action creators that you need, and they are named the same as the prop you define for your component, you can shorten this further.

There is another tweak that allows this mapDispatchToProps format even more concise, but it has a few prerequisites:

- Use named imports instead of wildcard to import only the action creators that you need.
- The imported action creators are named the same as the props used in the component.
- None of the imported action creators have the same name as action creators imported from other files. You can override this limitation with the `as` keyword to rename specific imports for the component.

```javascript
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
};
```

## Hooks

Hooks allow you to handle state and side effects (think lifecycle methods) in function components.

Once you introduce Hooks to your development, you will prefer functional components over classes. Functions with Hooks are easier to declare and maintain.

## useEffect

The Hook `useEffect` replaces both `componentDidMount` and `componentDidUpdate`.

The first parameter is the function that does the work. This function would be the body of the class componentDid- Mount and Update methods.

The second parameter of useEffect is an array of variables expected to change within that function. An empty array for the second parameter means the effect will run once when the component mounts.

When useEffect replaces both componentDidMount and componentDidUpdate, it's up to you to put in the logic to distinguish when code executes. When the second parameter array is empty, the first parameter function only runs when the component mounts. When the array contains variables, the function is going to run every time those variables update.

## Form data belongs in local state

Avoid using Redux for all state. Use plain React state for data only one container component will use (such as form state). Form data is contained to one place like a local scratch pad until it is saved.

Form components send event to onChange prop functions. The event always sends values as strings so if you need the value to be a number, use the appropriate JavaScript method to parse the value before setting it to local state.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat

Handler functions should destructure properties from event.target for use in setState functions which are asynchronous. The event object cannot be accessed from an async function scope. Without this destructuring, you would see an error, "This synthetic event is reused for performance reasons." Also, destructuring properties that are three levels deep enhances readability of code (it's prettier).

## Scope

Code will try to access same named variables in roughly this order:

1. Local
2. Local (non-Redux) state
3. Component prop (including Redux mapped state and dispatch)
4. Component import

This is not an exhaustive list as there are many factors that affect scope, and several ways JavaScript offers to change scope (like a local copy).

If you need a state variable to be named the same as an incoming prop and you are destructuring most of your props, you can use the rest operator to bundle the prop under `props`. At the end of the destructured props list, add `...props`. Any props that you did not destructure will be available in dot format after `props`.

By destructuring variables from props, they become locally scoped variables to the component function/class.

## Redirect with React Router

There are two ways to redirect with React Router.

In the render method, use a boolean value followed by && (JavaScript logical AND) followed by `<Redirect to='/path' />`.

In the history method, call `history.push('/path')`. React Router sends history as a prop so `history` needs to be destructured in props for this to work. Also define prop type as `PropTypes.object.isRequired`. Any component loaded via `<Route>` gets history passed in on props automatically.

## Selectors

Redux calls a function that searches state to find something a "selector". A good place to declare selectors is in the file with the corresponding reducer.

Selectors should be pure functions and can be memoized.

## Reducers and Actions: Many to Many

Reducers may handle multiple actions. This is typical Redux usage.

Also, actions may be handled by multiple reducers.

Because of the possible many-to-many relationship of actions and reducers, actions and reducers should not be grouped by feature. By having an actions folder and a reducers folder, each reducer only has to go up and down one folder level to get to any action that it needs.

If you instead organize by feature, then you have to root around in each folder to find the actions file that a reducer needs and go through at least one more folder level if not more, depending on how your feature folders would be organized. Trying to segment state by feature is a sign that the feature's data does not belong in the Redux **global** store. Such data may be better organized on the component state level.

## Reducer convention

Define a function that tests a condition about the action type. Then use that function to wrap the action.type to update state for a multitude of action types instead of repeated code for each one.

## Optimistic Update

An optimistic update is when you update the UI before the API call is complete. This can be done for creates, updates, and deletes.

The optimistic delete does not call the beginApiCall or apiCallError action creators because it calls the API directly to handle the delete. Because the delete is optimistic, it removes the course in the UI and assumes that the delete will work correctly in the API. That means there will be no spinner or error message in the UI.

### Optimistic Tradeoff

Pro: Better user experience when call succeeds
Con: Confusing user experience if call fails

## Predicate

A predicate is a function that returns true or false. Predicates are used in JavaScript array functions like filter where the first parameter of array.filter is a function that returns true if the array element should be in the result array, and returns false if the array element should not be in the result array.

## Toast

Toast may be configured globally. Import `ToastContainer` and include it within your top level component. Pass configurations as props.

```javascript
<ToastContainer autoClose={3000} hideProgressBar />
```

Toast methods have an optional second parameter that allows you to pass it a config object.

If you need a single toast popup to stay open, pass this for the second parameter:

```javascript
{
  autoClose: false;
}
```

## Async / Await

Async/Await uses promises behind the scenes, so it can easily interact with promise-based code. One benefit of this convention is that functions containing asynchronous code are clearly marked. The async/await convention is syntactic sugar designed to make code easier to read.

Use `await` keyword before calls to asynchronous functions. The function will pause execution and continue when the async call completes. A single function may have multiple awaits. You can save the result of an awaited async request in a variable and then return it.

Any function that uses `await` keyword within must have `async` in its signature. In other words, you **decorate** the function with the `async` keyword. Since await/async uses promises behind the scenes, returning the result of an awaited async call will return a promise.

Because await turns asynchronous calls into synchronous code, you may use try-catch for error handling instead of .then().catch(). The code in the `then` callback becomes the code in the `try` block and the parameter of the `then` callback function is returned to a local variable. The code in the `catch` callback becomes the code in the `catch` block, and the parameter from the `catch` callback parameter becomes the parameter for the catch in the try-catch.

```javascript
// Without async/await
const handleSaveCourse = (course) => {
  saveCourse(course)
    .then((courseId) => {
      return courseId;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Classic function signature
async function handleSaveCourse(course) {
  try {
    const courseId = await saveCourse(course);
    return courseId; // Returns a promise
  } catch (error) {
    console.log(error);
  }
}

// Arrow function signature
const handleSaveCourse = async (course) => {
  // ...same function content as above
};
```

## Testing Frameworks and Libraries

There are several JavaScript testing frameworks that let you test your React code and components. Only Jest is covered here. Others are Mocha, Jasmine, Tape, and AVA. All of these frameworks can be used for React, but they can be used for any JavaScript. Each varies on levels of simplicity, configuraton, and footprint.

There are also helper libraries. These libraries can't do the testing on their own, and need a testing framework to use them. Enzyme and React Testing Library are two examples of testing libraries. Both use React Test Utils behind the scenes. React Test Utils is built for React, is low level, and has a verbose API.

### Jest

Jest is Facebook's React testing framework. It is easy to setup and very popular. Jest comes bundled with create-react-app.

Jest has snapshots that lets you create serialized snapshots to protect you from regressions.

### Enzyme

Enzyme is a testing library that uses React Test Utils behind the scenes. It uses JSDOM which is in-memory DOM so it can render coponents without a browser.

Enzyme uses CSS style selectors thanks to Cheerio library which makes use of fast CSS/jQuery style selectors.

CSS style selectors let you select based on HTML element type, HTML class, and HTML id. jQuery uses this style too for its selectors.

### React Testing Library

React Testing Library is similar to Enzyme but has a much smaller API and smaller footprint.

The primary guiding principle for react-testing-library:

> The more your tests resemble the way your software is used, the more confidence they can give you.

## Jest Testing

Add script to package.json.

```json
"scripts": {
  "test": "jest"
}
```

Name files after the JavaScript file that will be tested. For example, the test for index.js would be index.test.js. Jest automatically finds tests in files that end in .test.js or .spec.js.

`it` takes two parameters: a description of the test, and the callback function that will be the body of the test.

`expect` takes a value then chains other methods such as `toEqual` which take a value. In this way, `expect` can be used to test that values are what you expect. If not, the test fails.

`jest.fn()` creates an empty mock function.

Run the tests with the test script: `npm test`. Passing tests will be green. Failed tests will be red and show the segment of test code that failed.

### Watch Mode

Adding `--watch` to the Jest script will keep Jest running and re-run tests at every save.

> **macOS Note**
> Watchman must be installed for Jest to work on macOS. Jest uses watchman by default for file watching.
> `brew install watchmen`

### Boolean Props in JavaScript

In vanilla JavaScript (not TypeScript), the existence of a boolean prop infers truthiness so just listing the name of the prop sets that prop to true.

## Snapshot Test

Snapshots protect from making accidental changes to component output.

In a Jest test, create a component tree with `renderer.create` from react-test-renderer library. Then expect the tree to match snapshot. This creates a snapshot of the component tree you created. When you run jest test, it passes if the result matches your snapshot and fails if it does not match your snapshot. On failed snapshot tests, you have the option to update your snapshot to the one created by the current test. This can be handy if the change was intentional.

## Enzyme

Create a JavaScript file for configuring Enzyme and reference it in package.json under jest.setupFiles which is an array of file locations.

There are two ways to render a React component for testing with Enzyme:

- `shallow` - Renders single component in isolation. No DOM is created. No child components are rendered. Fast and lightweight.
- `mount` - Renders component with children. DOM is created in memory via JSDOM, and it can use refs. More realistic test than `shallow`, but requires more mocking to work.

For convenience, you can use the Factory Pattern. Create a factory function at the top of a test file to create the tested component with default props. The function sets a set of default props, and takes an args parameter to allow overriding those props. Then the function calls the tested component with the resulting props and wraps that component in the Enzyme shallow method.

The Factory Pattern can be used anywhere, and it makes the test code short and simple.

Enzyme's find function accepts CSS selectors. When using selectors for Enzyme `shallow`, they can be React components, not just HTML elements. However, with Enzyme `mount`, the selectors must be HTML elements because the mount is rendered to a DOM so the final result is HTML elements.

Enzyme allows you to target specific components to test so you don't have to rely on snapshot tests for those differences.

Enzyme has a debug function in the return value from shallow function. By calling `debug()` in a console log, you can output the contents of the tested component to the console.

## React Testing Library

Tests are based on what the user sees. This leads to tests that are less brittle than Enzyme's tests. This library was written with accessibility in mind.

The same factory function used in Enzyme `shallow` example can be used in React Testing Library, but instead of `shallow`, use `render`.

The `render` function returns an object with several functions. Reference the [React Testing Library documentation](https://testing-library.com/docs/react-testing-library/api) to find all of these. Use destructuring to get only the functions you need in your test.

There are ways to select components, but you don't need to. React Testing Library functions are designed to test by what the user sees.

React Testing Library has no shallow rendering. Components are always mounted.

Unlike Enzyme, you don't need to call `expect`. With React Testing Library, the assertion is part of your query.

To debug in React Testing Library, destructure the debug function from render and call `debug()` without wrapping in console.log. The output formatting is much nicer than Enzyme: color coding and better line breaks.

## Testing Redux

Test for these using Jest.

- connected components
- action creators
- thunks
- reducers
- store

Testing the store can also be considered an integration test.

Two goals when testing Redux:

- test markup
- test behavior

Container components will have minimal markup testing for Redux. Markup testing will focus on presentation components. Markup in container components should be limited to references to child components. Redux testing for container components will focus on behavior.

### connect

Testing container components with Redux can be a challenge due to it being wrapped in the call to connect. The connect function runs within the Redux Provider. Container components export the component wrapped with connect. There are two options to handle this:

1. Wrap with `<Provider>`

Reference the store and pass it the Provider to compose your component under the test. The advantage of this approach is that you can create a custom store for the test. This approach is useful if you want to test the Redux related portions of your component.

2. Add named export for unconnected component.

This is simpler and recommended by the course instructor. Use this approach if you just want to test your component's rendering and local state related behaviors.

When exporting the component as a named export, you will have to import it inside curly braces to use the named export instead of the default export. However, eslint does not like named exports being named the same as default exports (because it's confusing!) so you'll need this next to any line where the default import is used:

```javascript
// esline-disable-line import/no-named-as-default
```

A better way to handle the same name issue would be to separate the component file from the call to the connect function. Instead of calling connect in the component file, create a separate container file (named after the component with `.container.js` at the end of the file name). Then create an index.js file in the component folder to import the connected component from the container file and export for other containers to import. This allows you to use the connected component in your app and test the unconnected component in your tests.

https://gist.github.com/TechBrenda/0674be6731b1ca0c02b904056efac79b
