"use client";

import { StepperContext } from "@/consts/stepper-context";
import { useListRefs } from "@/hooks/use-list-refs";
import { cn } from "@/utils/cn";
import { ChevronRight, Circle, CircleCheckBig } from "lucide-react";
import {
  ComponentProps,
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../shadcn/card";
import { ScrollArea, ScrollBar } from "../shadcn/scroll-area";

interface Step {
  title: ReactNode;
  description: ReactNode;
  content: ReactNode;
}

interface StepperProps extends ComponentProps<"div"> {
  steps: Step[];
}

export const Stepper: FC<StepperProps> = ({
  steps,
  className,
  ...otherDivProps
}) => {
  const indexedSteps = useMemo(
    () => steps.map((step, index) => ({ ...step, index })),
    [steps],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const canGoNext = useMemo(
    () => currentIndex < indexedSteps.length,
    [currentIndex, indexedSteps.length],
  );

  const canGoPrev = useMemo(() => currentIndex > 0, [currentIndex]);

  const listRefs = useListRefs<HTMLDivElement>(indexedSteps.length);

  const next = useCallback(
    () =>
      setCurrentIndex((index) => {
        if (canGoNext) {
          listRefs[index + 1]?.current.scrollIntoView({
            inline: "start",
            behavior: "smooth",
          });
          return index + 1;
        }
        return index;
      }),
    [canGoNext, listRefs],
  );

  const isTheLastStep = useMemo(
    () => currentIndex >= indexedSteps.length - 1,
    [currentIndex, indexedSteps.length],
  );

  const prev = useCallback(
    () =>
      setCurrentIndex((index) => {
        const diff = isTheLastStep ? 2 : 1;
        if (canGoPrev) {
          listRefs[index - diff].current.scrollIntoView({
            inline: "start",
            behavior: "smooth",
          });
          return index - diff;
        }
        return index;
      }),
    [isTheLastStep, canGoPrev, listRefs],
  );

  return (
    <StepperContext.Provider
      value={{ next, prev, canGoNext, canGoPrev, isTheLastStep }}
    >
      <div className={cn("flex flex-col", className)} {...otherDivProps}>
        <ScrollArea
          className="pb-2 [&_[data-slot=scroll-area-viewport]]:snap-x [&_[data-slot=scroll-area-viewport]]:snap-mandatory [&_[data-slot=scroll-area-viewport]]:scroll-px-6"
          fadeEdges
        >
          <ScrollBar
            orientation="horizontal"
            className="h-1 border-none px-6 py-0"
          />
          <div className="flex gap-4">
            {indexedSteps.map(({ index, title, description }) => (
              <Fragment key={index}>
                <Card
                  className={cn(
                    "min-w-64 grow snap-start justify-center py-4",
                    index === currentIndex && "border-primary",
                    index > currentIndex && "opacity-50",
                    index === 0 && "ml-6",
                    index === indexedSteps.length - 1 && "mr-6",
                  )}
                  ref={listRefs[index]}
                >
                  <CardHeader className="flex items-center gap-3">
                    {index < currentIndex ? (
                      <CircleCheckBig size={32} className="shrink-0" />
                    ) : (
                      <Circle size={32} className="shrink-0" />
                    )}
                    <div className="flex flex-col gap-1.5">
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>

                {index !== indexedSteps.length - 1 && (
                  <ChevronRight
                    className={cn(
                      "my-auto translate-x-px",
                      index > currentIndex && "opacity-50",
                    )}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </ScrollArea>

        {indexedSteps[currentIndex]?.content ??
          indexedSteps[indexedSteps.length - 1].content}
      </div>
    </StepperContext.Provider>
  );
};
