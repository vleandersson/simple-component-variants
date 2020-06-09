import {
  DefaultTheme,
  ThemedStyledProps,
  Interpolation,
  ThemeProps,
} from "styled-components";

export type Variants<F extends Function> = F extends (arg1: infer U) => unknown
  ? Omit<U, "theme">
  : never;

type ComponentVariantsReturn<P, D extends DefaultTheme> = (
  props: P
) => Interpolation<ThemeProps<D>>[];

type ObjectKeysAsStringUnion<T> = {
  [P in keyof T]: StringTrueFalseToBoolean<keyof T[P]>;
};

type StringTrueFalseToBoolean<V> = V extends "true" | "false"
  ? boolean
  : V extends number | string
  ? V
  : never;

// TODO: Would be nice to export this one, but so far it only works when using the extend keyword
// When exporting and using ComponentVariantsStylingObject we are loosing some typings and opening up a gap
// in our types. Especially when it comes to working with ReactText that needs strings as keys.
interface ComponentVariantsStylingObject<D extends DefaultTheme> {
  [k: string]: {
    [k: string]: Interpolation<ThemeProps<D>>;
  };
}

export function componentVariants<
  T extends ComponentVariantsStylingObject<D>,
  D extends DefaultTheme = DefaultTheme,
  P = ThemedStyledProps<ObjectKeysAsStringUnion<T>, D>
>(stylingObject: T): ComponentVariantsReturn<P, D> {
  const options = Object.keys(stylingObject);

  return (props: P) => {
    const interpolations: Interpolation<ThemeProps<D>>[] = [];

    options.forEach((option) => {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const variant = ((props as unknown) as {
        [k: string]: string | boolean | number;
      })[option];

      let interpolation: Interpolation<ThemeProps<D>>;
      if (typeof variant === "boolean") {
        interpolation = stylingObject[option][variant ? "true" : "false"];
      } else {
        interpolation = stylingObject[option][variant];
      }

      interpolations.push(interpolation);
    });

    return interpolations;
  };
}
