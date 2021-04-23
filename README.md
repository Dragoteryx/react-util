# React Util <!-- omit in toc -->

A few useful React hooks and components.

## Contents <!-- omit in toc -->

- [Components](#components)
  - [`<If>`](#if)
  - [`<IfElse>`](#ifelse)
  - [`<While>`](#while)
  - [`<ForEach>`](#foreach)
  - [`<ForRange>`](#forrange)
  - [`<Repeat>`](#repeat)
- [Hooks](#hooks)
  - [`useForceUpdate`](#useforceupdate)
  - [`useTimeout`](#usetimeout)
  - [`useInterval`](#useinterval)
  - [`useEphemeral`](#useephemeral)
  - [`usePromise`](#usepromise)
  - [`useIterator`](#useiterator)
  - [`useIterable`](#useiterable)
  - [`useGenerator`](#usegenerator)

## Components

### `<If>`

Only displays the children if the condition is true.
```jsx
<If condition={boolean}>
  <span>Hello!</span>
  <span>The condition is true</span>
</If>
```

### `<IfElse>`

Displays the first child if the condition is true, otherwise displays the second one.
```jsx
<IfElse condition={boolean}>
  <>
    <span>Hello!</span>
    <span>The condition is true</span>
  </>
  <>
    <span>Goodbye!</span>
    <span>The condition is false</span>
  </>
</IfElse>
```

### `<While>`

Repeats the children until the condition is false.
```jsx
<While condition={() => Math.random() > 0.5}>
  <span>Hello</span>
  <span>World!</span>
</While>
```

### `<ForEach>`

Maps each value in an iterable to an element.
```jsx
<ForEach for={users} key={user => user.id} each={user => <span>{user.name}</span>} />
```

### `<ForRange>`

Emulates a numeric for loop.
```jsx
<ForRange range={[0, 10]} each={i => <span>{i}</span>} />
```

### `<Repeat>`

Repeats the children a set amount of times.
```jsx
<Repeat for={5}>
  <span>This text will be rendered 5 times.</span>
  <span>This one too</span>
</Repeat>
```

## Hooks

### `useForceUpdate`

Forces the component to update.
```ts
const forceUpdate = useForceUpdate();
forceUpdate();
```

### `useTimeout`

Creates a timeout that is cancelled when the component is unmounted.\
3rd arg is the dependency list.
```ts
useTimeout(() => {
  console.log("1 second timeout");
}, 1000, []);
```

### `useInterval`

Works the same way as [`useTimeout`](#usetimeout), but using an interval instead.
```ts
useInterval(() => {
  console.log("1 second interval");
}, 1000, []);
```

### `useEphemeral`

Creates an effect that is disabled after the specified duration.\
Using a negative duration never disables the effect.
```ts
useEphemeral(10000, () => {
  // this effect will be disabled after 10 seconds
  return () => {};
}, []);
```

### `usePromise`

Rerenders the component once the promise has been resolved/rejected.
```ts
const res = usePromise(() => fetch(url).then(res => res.json()));
if (res.state == "resolved") {
  const value = res.value;
} else if (res.state == "rejected") {
  const error = res.error;
} else if (res.state == "pending") {
  
}
```

### `useIterator`

Returns the current value and a next function.\
Calling the next function triggers a rerender.
```ts
const [value, next] = useIterator(function*() {
  yield 1;
  yield 2;
  yield 3;
}());
```

### `useIterable`

Alias for `useIterator(iterable[Symbol.iterator]())`.
```ts
const [value, next] = useIterable([1, 2, 3]);
```

### `useGenerator`

Alias for `useIterator(generator())`.
```ts
const [value, next] = useGenerator(function*() {
  yield 1;
  yield 2;
  yield 3;
});
```

