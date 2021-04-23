export type List<T> = T | T[];
export type String = List<string | number | boolean>;
export type Elements = List<JSX.Element | null | boolean>;