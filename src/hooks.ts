import { useCallback, useEffect, useState, useMemo } from "react";
import type { EffectCallback, DependencyList } from "react";

export function useForceUpdate() {
  const setValue = useState({})[1];
  return useCallback(() => setValue({}), []);
}

export function useTimeout(handler: TimerHandler, timeout?: number, deps?: DependencyList) {
  return useEffect(() => {
    const handle = setTimeout(handler, timeout);
    return () => clearTimeout(handle);
  }, deps);
}

export function useInterval(handler: TimerHandler, timeout?: number, deps?: DependencyList) {
  return useEffect(() => {
    const handle = setInterval(handler, timeout);
    return () => clearInterval(handle);
  }, deps);
}

export function useEphemeral(duration: number, effect: EffectCallback, deps?: DependencyList) {
  return useEffect(() => {
    if (duration < 0) return effect();
    else {
      let destroyed = false;
      const destroy = effect();
      function disable() {
        if (!destroy || destroyed) return;
        destroyed = true;
        destroy();
      }
      const timeout = setTimeout(disable, duration);
      return () => {
        clearTimeout(timeout);
        disable();
      }
    }
  }, deps);
}

export function usePromise<T>(fn: () => Promise<T>) {
  const [value, setValue] = useState<usePromise.State<T>>({state: "pending"});
  useEffect(() => {
    let destroyed = false;
    fn().then(value => {
      if (!destroyed) setValue({state: "resolved", value});
    }, error => {
      if (!destroyed) setValue({state: "rejected", error});
    });
    return () => void (destroyed = true);
  }, []);
  return value;
}
export namespace usePromise {
  export type Pending = {state: "pending"};
  export type Resolved<T> = {state: "resolved", value: T};
  export type Rejected = {state: "rejected", error: unknown};
  export type State<T> = Pending | Resolved<T> | Rejected;
}

export function useIterator<T, Y>(iterator: Iterator<T, Y, void>): [value: T | Y, next: () => void] {
  const [value, setValue] = useState(useMemo(() => iterator.next().value, []));
  return [value, useCallback(() => void setValue(iterator.next().value), [])];
}

export function useIterable<T>(iterable: Iterable<T>) {
  return useIterator<T, void>(useMemo(() => iterable[Symbol.iterator](), []));
}

export function useGenerator<T, Y>(generator: () => Generator<T, Y>) {
  return useIterator(useMemo(() => generator(), []));
}