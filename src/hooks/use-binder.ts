import { useEffect } from "react";

export interface BinderProps {
  id: string;
}

export const useBinder = ({
  id,
  onBind,
  onBindCleanup,
}: {
  onBind: (theElement: HTMLElement | null) => void;
  onBindCleanup?: (theElement: HTMLElement | null) => void;
} & BinderProps) =>
  useEffect(() => {
    const theElement = document.getElementById(id);
    onBind(theElement);
    return () => onBindCleanup?.(theElement);
  }, [id, onBind, onBindCleanup]);
