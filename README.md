# Component Variants

## Why this package?

To style different variants of a single component has so far been a hassle. This package greatly simplifies the way you define and type your variants of a component, while it keeps you in the same control as you have with _styled components_. Just a simple addon to _styled-components_.

## Installation

With yarn

```bash
yarn add component-variants
```

or with NPM

```bash
npm i component-variants
```

## Usage

We will assume the following imports

```typescript
import React from "react";
import styled, { css } from "styled-components";
import { componentVariants, Variants } from "component-variants";
```

To express our variants on a certain option, we create a nested _styling object_ where the first level is the _option_ (`size`) and its children is the _variants_ (`small`, `medium`, `large`).

```typescript
const variants = componentVariants({
  size: {
    small: css`
      padding: 0;
    `,
    medium: css`
      padding: 2px;
    `,
    large: css`
      padding: 10px;
    `,
  },
});
```

To extract the typings required by the mixin, we utilize the provided typings helper, `Variants`.

```typescript
type ButtonProps = Variants<typeof variants>;
```

We can then use this _styling object_ (`variants`) as a mixin in our _styled-component_ (`MyStyledButton`). Not that we've added `ButtonProps` to our styled button, to allow the usage to pass in the required props.

```typescript
const StyledButton = styled.button<ButtonProps>`
  ${variants}
`;

interface Props extends ButtonProps {}

export const Button: React.FC<Props> = ({ size }) => {
  return <StyledButton size={size} />;
};
```

### Variants
Variants can be described with `string`, `enum`, `number` or a string-represented `boolean`.

#### String

```typescript
{
  size: {
    small: css``;
  }
}
```

#### Enums

```typescript
{
  size: {
    [MyEnum.Small]: css``
  }
}
```

#### Numbers

```typescript
{
  size: {
    0: css``
  }
}
```

#### String-represented `boolean`

```typescript
{
  size: {
    false: css``,
    true: css``
  }
}
```

### Theme

You can still utilize _theme_ the same way as you are used to.

```typescript
{
  size: {
    small: css`
      background-color: ${props => props.theme.colors.white};
    `,
  }
}
```

If you have not set up theme yet, please follow the instructions by (_styled-components_)[https://styled-components.com/docs/advanced].

## Syntax

> componentVariants(styledObject)

### Parameters

> styledObject | required

```Typescript
{
  option: {
    variant: Interpolation
  }
}
```

_option_ is a string that describes the option you want to style. For example `size`

_variant_ can be either a `string`, `enum`, `number` or a string-represented `boolean`.

_Interpolation_ is the _styled-components_ interpolation type that supports all styling you are used to do within your _styled components_
