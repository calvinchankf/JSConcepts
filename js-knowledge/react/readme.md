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
