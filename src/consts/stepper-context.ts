import { createContext } from "react";

interface StepperContextType {
  next: () => void;
  prev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export const initialStepperContext: StepperContextType = {
  next: () => {},
  prev: () => {},
  canGoNext: true,
  canGoPrev: false,
};

export const StepperContext = createContext<StepperContextType>(
  initialStepperContext,
);
