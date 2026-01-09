// Source - https://stackoverflow.com/a
// Posted by Matthieu Riegler
// Retrieved 2025-11-22, License - CC BY-SA 4.0
export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S];
