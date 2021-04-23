import type { Elements } from "./types";
import { Fragment } from "react";

export function If(props: {condition: boolean, children: Elements}) {
  return props.condition ? <>props.children</> : null;
}

export function IfElse(props: {condition: boolean, children: [If: JSX.Element, Else: JSX.Element]}) {
  return props.condition ? props.children[0] : props.children[1];
}

export function While(props: {condition(): boolean, children: Elements}) {
  const fields: JSX.Element[] = [];
  let i = 0;
  while (props.condition())
    fields.push(<Fragment key={i++}>{props.children}</Fragment>);
  return <>{fields}</>;
}

export function ForEach<T>(props: {for: Iterable<T>, key?(value: T): number, each(value: T): JSX.Element | null}) {
  const fields: JSX.Element[] = [];
  if (props.key) for (const value of props.for) {
    fields.push(<Fragment key={props.key(value)}>{props.each(value)}</Fragment>);
  } else {
    let i = 0;
    for (const value of props.for)
      fields.push(<Fragment key={i++}>{props.each(value)}</Fragment>);
  }
  return <>{fields}</>;
}

export function ForRange(props: {range: [min: number, max: number, incr?: number], each(i: number): JSX.Element | null}) {
  const fields: JSX.Element[] = [];
  for (let i = props.range[0]; i < props.range[1]; i += props.range[2] ?? 1)
    fields.push(<Fragment key={i}>{props.each(i)}</Fragment>);
  return <>{fields}</>;
}

export function Repeat(props: {for: number, children: Elements}) {
  const fields: JSX.Element[] = [];
  for (let i = 0; i < props.for; i++)
    fields.push(<Fragment key={i}>{props.children}</Fragment>);
  return <>{fields}</>;
}