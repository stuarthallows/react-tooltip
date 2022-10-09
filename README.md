# React Tooltip

A React tooltip component built using [Floating UI](https://floating-ui.com/) primitives.

## Motivation

The popular [React Tooltip](https://github.com/ReactTooltip/react-tooltip) project is no longer under development and 
has [issues with React 18](https://github.com/ReactTooltip/react-tooltip/issues/769). Using Floating UI to manage the
positioning of the popup it is now very simple to build a tooltip.

## Installation

There's no package install for this. To use it, copy the `Tooltip` component into your project and add the following
dependencies, and then customise the tooltip as you see fit.

```bash
npm install @floating-ui/react-dom-interactions react-merge-refs
```

## Usage

```tsx
<Tooltip placement='top' content='Hello tooltip'>
  <button>Hover me</button>
</Tooltip>

<Tooltip placement='right' content={<div>I <em>am</em> a div</div>}>
  <button>And me</button>
</Tooltip>
```

## Notes
- No animations is provided, see [this example](https://codesandbox.io/s/winter-tree-wmmffl?file=/src/AnimatedTooltip.tsx) for adding a [Framer Motion](https://www.framer.com/motion/) animation
- The tooltip is highly customisable, see the [Floating UI docs](https://floating-ui.com/docs) for details

## Output

![Output](https://user-images.githubusercontent.com/1193012/194781736-7ca4f4e1-97bb-417c-a043-23b6c70eb040.jpg)
