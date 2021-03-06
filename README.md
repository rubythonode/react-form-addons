#<img src="https://yeojz.github.io/react-form-addons/react-form-addons-with-text.svg" alt="react-form-addons" height="100" />

[![Build Status][build-badge]][build-link]
[![npm package][npm-badge]][npm-link]
[![PRs Welcome][pr-welcome-badge]][pr-welcome-badge]

## About

`react-form-addons` provides a set of methods and components for composing forms in React. Conceptually it adopts the style of `decorators` / `higher-order components`, allowing you to keep your actual declaration of forms as Functional Components.

## Motivation

During the course of my work which involves building an internal admin panel, the amount of forms that have to be built is not small. Every single form has it's own set of rules and side-effects, which may be nested or have a dependency in other form.

This project is an exploration of possible ways of splitting responsibility during a form lifecycle to make it more maintainable.

## Links

#### Showcase

 - [Documentation Site][doc-link]
 - [Documentation Source](https://github.com/yeojz/react-form-addons/tree/master/site)

#### Core Methods

 - [compose](https://yeojz.github.io/react-form-addons#compose)
 - [withProps](https://yeojz.github.io/react-form-addons#withProps)
 - [withState](https://yeojz.github.io/react-form-addons#withState)
 - [withSideEffects](https://yeojz.github.io/react-form-addons#withSideEffects)
 - [withValidation](https://yeojz.github.io/react-form-addons#withValidation)
 - [branch](https://yeojz.github.io/react-form-addons#branch) (for nested forms)
 - [collection](https://yeojz.github.io/react-form-addons#collection)

#### Extensions

 - [withReduxState](https://yeojz.github.io/react-form-addons#withReduxState) (Redux)

## Installation

Install the library:

```
npm install react-form-addons --save

// or

yarn add react-form-addons
```

## Quick Look

```js
import React from 'react';
import {compose, withProps, withState} from 'react-form-addons';

const Form = (props) => (
  <div>
    <input
      name='input1'
      onChange={props.onChange}
      value={props.getFormData('input1')}
    />
    // ...other inputs
  </div>
);

export default compose(
  withState(),
  withProps()
)(Form);
```

For more examples, check out the [documentation site][doc-link]

## v2 Upgrade

This library has been totally reworked for v2. As such there are some breaking changes in the way the higher-order components (hoc) work. The biggest change is that Component properties are now decoupled to a `withProps` hoc and `withState` only handles keeping of state and not any of the state manipulations.

**The following are temporarily deprecated.**

It may make a comeback in a future release.

 - createField
 - createForm

**Method renames:**

 -  what used to be `collection()` is now `branch()`
 -  what used to be `connect()` is now `collection()`

Checkout the [v2.0.0 release notes](https://github.com/yeojz/react-form-addons/releases/tag/v2.0.0)


## Form Event Normalization

Your event handlers will be passed instances of [SyntheticFormEvent](https://yeojz.github.io/react-form-addons#SyntheticFormEvent) when it's piped through `withProps` onChange handler.

It inherits `target.name`, `target.value`, `stopPropagation()` and `preventDefault()` from React's Event System and adds on 2 sub-properties `formData` and `formMeta`.

The 2 sub-properties are heavily used to calculate and update the current state of the form within the compose pipeline.

## Extending Usage

While the focus on v2 rewrite still hinges on Component State, we can easily extend this to other state management utilities.

For example, in it's simplest form:

```js
export default compose(
  withState(),
  withProps()
)(Form);
```

can become

```js
export default compose(
  withLocalStorage(),
  withProps()
)(Form);
```

### Redux Support

This library also provides a component for handling state in [redux](https://github.com/reactjs/redux). You'll need to install `react-redux` as well as `redux` for it to work.

*Note:* Redux components are not under default library export. As such, you'll have to import from a sub folder. i.e.

```js
import {withReduxState, formReducer} from 'react-form-addons/lib/redux';

// Creating stores
const reducers = combineReducers({
  forms: formReducer
});

const store = createStore(reducers);

// During form composition
const Form = compose(
  withReduxState(),
  withProps()
)(FormInputs);

// Usage (note: prop "name" is required)
<Form name='example' />
```

There is a [live example](https://yeojz.github.io/react-form-addons#withReduxState) in the documentation site.

## Prior Art

The implementation of a `compose` methodology was highly inspired by [react-reformed](https://github.com/davezuko/react-reformed).


## License

`react-form-addons` is [MIT licensed](./LICENSE)

[doc-link]: https://yeojz.github.io/react-form-addons

[npm-badge]: https://img.shields.io/npm/v/react-form-addons.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/react-form-addons

[build-badge]: https://img.shields.io/circleci/project/github/yeojz/react-form-addons.svg?style=flat-square
[build-link]: https://circleci.com/gh/yeojz/react-form-addons.svg

[pr-welcome-badge]: https://img.shields.io/badge/PRs-Welcome-ff69b4.svg?style=flat-square
[pr-welcome-link]: https://github.com/yeojz/redux-intl-connect/blob/master/CONTRIBUTING.md
