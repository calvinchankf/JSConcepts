# React Concepts

## Why React

React helps developers to update the DOM based on the props/states, so that we don't have to manually update DOM elements

## Lifecycle

- Mount
- Update
- Unmount

## Purpose of React Hooks

Hooks is the way to manage the states. Developers can extract stateful logic from a component so it can be tested independently and reused. useEffect: manage side effects

## Uncontrolled Components

Some components which you don't want to re-render according to its state/value's change e.g. React Ref

There are a few good use cases for refs:

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

## How to

#### Update the state using previous value

functional update. e.g. `setNews(_news => [..._news, ...data])`

#### Reference a value that’s not needed for rendering

Use useRef

#### Perform actions when user click 'enter'

Use form element + e.preventDefault()

### Why

#### Only Call Hooks at the Top Level

Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple useState and useEffect calls.

#### Only Call Hooks from React Functions

Don’t call Hooks from regular JavaScript functions. Instead, you can:

✅ Call Hooks from React function components.
✅ Call Hooks from custom Hooks (we’ll learn about them on the next page).
By following this rule, you ensure that all stateful logic in a component is clearly visible from its source code.

## React Context vs Redux

### React Context

#### Built into React

React Context is part of the React library, so you don't need to install any additional packages.
Local State Management:

It's well-suited for managing local component state or sharing data between components that are deeply nested in the component tree.

#### Simple API

The Context API provides a simple way to pass data through the component tree without having to pass props manually at every level.

#### Lightweight

If your application is small to medium-sized and doesn't require complex state management, React Context might be sufficient without the need for additional libraries.

#### No Global Store

React Context doesn't inherently provide a global store like Redux. Each context instance is independent and usually used for a specific part of the component tree.

### Redux

#### Global State Management

Redux provides a global state management solution. It's suitable for managing complex state across the entire application.

#### Predictable State Changes

Redux follows a strict unidirectional data flow, making it easier to predict and debug state changes in large applications.

#### Middleware Support

Redux supports middleware, allowing you to add custom functionality such as logging, async operations, etc., to the state management process.

#### DevTools

Redux DevTools offer powerful debugging capabilities, allowing you to inspect and time-travel through state changes.

#### Middleware Support

Redux supports middleware, allowing you to add custom functionality such as logging, async operations, etc., to the state management process.

### When to Choose Which

#### React Context

Use React Context when dealing with simple to moderate state management needs within a localized part of your component tree.
When you prefer a simpler API and don't want the overhead of additional libraries.

#### Redux

Use Redux when you have a large and complex application with shared state that needs to be accessed by multiple components.
When you need a single, predictable state container with a well-defined structure.
If you need features like time-travel debugging and middleware support.
