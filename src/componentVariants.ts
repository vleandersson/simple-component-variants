import {
  DefaultTheme,
  Interpolation,
  ThemeProps,
  ThemedStyledProps,
} from "styled-components";

export type Variants<F extends Function> = F extends (arg1: infer U) => unknown
  ? Omit<U, "theme">
  : never;

type ComponentVariantsReturn<P, D extends DefaultTheme> = (
  props: P
) => Interpolation<ThemeProps<D>>[];

type ObjectKeysAsStringUnion<T> = {
  [P in keyof T]: NarrowString<keyof T[P]>;
};

type NarrowString<V> = V extends "true" | "false"
  ? boolean
  : AssureIndexType<V>;

type AssureIndexType<T> = T extends number | string ? T : never;

// TODO: Would be nice to export this one, but so far it only works when using the extend keyword
// When exporting and using ComponentVariantsStylingObject we are loosing some typings and opening up a gap
// in our types. Especially when it comes to working with ReactText that needs strings as keys.
interface ComponentVariantsStylingObject<D extends DefaultTheme> {
  [k: string]: {
    [k: string]: Interpolation<ThemeProps<D>>;
  };
}

export function componentVariants<
  D extends DefaultTheme,
  T extends ComponentVariantsStylingObject<D>,
  P = ThemedStyledProps<ObjectKeysAsStringUnion<T>, D>
>(stylingObject: T): ComponentVariantsReturn<P, D> {
  return (props: P) => {
    return Object.keys(stylingObject).map(
      (option: keyof typeof stylingObject) => {
        const optionVariants = stylingObject[option] as {
          [k: string]: Interpolation<ThemeProps<D>>;
        };

        const variant = ((props as unknown) as {
          [k: string]: string | boolean | number;
        })[(option as unknown) as string];

        if (typeof variant === "boolean") {
          return optionVariants[variant ? "true" : "false"];
        } else if (variant !== undefined) {
          return optionVariants[variant];
        }
      }
    );
  };
}
