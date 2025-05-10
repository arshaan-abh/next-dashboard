import { useEffect, useState } from "react";

/**
 * A custom hook that debounces a state after a specified delay.
 * Returns the debounced state and an `isPending` state to indicate if the state is about to change.
 *
 * @param state - The state to debounce.
 * @param delay - The delay in milliseconds.
 * @returns An object containing the debounced state and the `isPending` state.
 */
export const useDebounce = <T>(
  state: T,
  delay: number,
): { debouncedState: T; isPending: boolean } => {
  const [debouncedState, setDebouncedState] = useState<T>(state);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    setIsPending(true);

    const handler = setTimeout(() => {
      setDebouncedState(state);
      setIsPending(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [state, delay]);

  return { debouncedState, isPending };
};
