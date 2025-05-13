import { createContext } from "react";

interface StepperContextType {
  next: () => void;
  prev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isTheLastStep: boolean;
}

export const initialStepperContext: StepperContextType = {
  next: () => {},
  prev: () => {},
  canGoNext: true,
  canGoPrev: false,
  isTheLastStep: false,
};

export const StepperContext = createContext<StepperContextType>(
  initialStepperContext,
);
