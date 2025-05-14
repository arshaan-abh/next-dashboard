import { useRef, RefObject, createRef } from "react";

export const useListRefs = <T>(count: number): RefObject<T>[] => {
  const refs = useRef<RefObject<T>[]>([]);

  if (refs.current.length !== count) {
    refs.current = Array(count)
      .fill(null)
      .map((_, i) => refs.current[i] || createRef<T>());
  }

  return refs.current;
};
