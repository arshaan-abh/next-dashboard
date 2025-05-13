"use client";

import { ControlledTextField } from "@/components/commons/controlled-text-field";
import { Form } from "@/components/commons/form";
import { Stepper } from "@/components/commons/stepper";
import { DashboardPageLayout } from "@/components/pages/dashboard/dashboard-page-layout";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";
import { StepperContext } from "@/consts/stepper-context";
import { cn } from "@/utils/cn";
import { ComponentProps, FC, ReactNode, useContext } from "react";
import { Path, useFormContext } from "react-hook-form";
import { z } from "zod";

const StructureProjectSchema = z.object({
  address: z.string().min(1),
  postalCode: z.string().min(1),
  city: z.string().min(1),
});
type StructureProjectRequest = z.infer<typeof StructureProjectSchema>;

export default function StructureProject() {
  return (
    <Form<StructureProjectRequest>
      zodSchema={StructureProjectSchema}
      defaultValues={{ address: "", postalCode: "", city: "" }}
      onSubmit={async (data) => console.log(data)}
      showUnsavedChangesWarning
    >
      <DashboardPageLayout title="Structure Your Project" className="px-0">
        <Stepper
          steps={[
            {
              title: "Location",
              description: "First step",
              content: <LocationStep />,
            },
            {
              title: "Functions Selection",
              description: "Second step",
              content: <StepperContentCard fieldNames={[]} />,
            },
            {
              title: "Lifespan Definition",
              description: "Third step",
              content: <StepperContentCard fieldNames={[]} />,
            },
            {
              title: "Project Details",
              description: "Fourth step",
              content: <StepperContentCard fieldNames={[]} />,
            },
            {
              title: "Material Selection",
              description: "Fifth step",
              content: <StepperContentCard fieldNames={[]} />,
            },
            {
              title: "Budget Management and Summary",
              description: "Sixth step",
              content: <StepperContentCard fieldNames={[]} />,
            },
          ]}
        />
      </DashboardPageLayout>
    </Form>
  );
}

// First step
const LocationStep = () => {
  return (
    <StepperContentCard
      cardTitle="Location"
      cardDescription="Enter location details of my building so that the system can register where the project is based."
      fieldNames={["address", "postalCode", "city"]}
    >
      <ControlledTextField<StructureProjectRequest>
        name="address"
        label="Address"
        placeholder="Street and building"
      />
      <ControlledTextField<StructureProjectRequest>
        name="postalCode"
        label="Postal code"
        placeholder="10115 etc."
      />
      <ControlledTextField<StructureProjectRequest>
        name="city"
        label="City"
        placeholder="Berlin etc."
      />
    </StepperContentCard>
  );
};

interface StepperContentCardProps extends ComponentProps<typeof Card> {
  fieldNames: Path<StructureProjectRequest>[];
  cardTitle?: ReactNode;
  cardDescription?: ReactNode;
}

const StepperContentCard: FC<StepperContentCardProps> = ({
  fieldNames,
  cardTitle,
  cardDescription,
  className,
  children,
  ...otherProps
}) => {
  const { next, prev, canGoNext, canGoPrev, isTheLastStep } =
    useContext(StepperContext);
  const { trigger } = useFormContext<StructureProjectRequest>();

  return (
    <Card className={cn("mx-6 mt-4", className)} {...otherProps}>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription className="md:w-full lg:w-1/2 xl:w-1/3">
          {cardDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
        <CardAction className="flex items-center gap-3">
          {canGoPrev && (
            <Button type="button" onClick={prev} variant="secondary">
              Prev
            </Button>
          )}
          <Button
            {...(canGoNext
              ? {
                  type: "button",
                  onClick: () =>
                    trigger(fieldNames).then((isValid) => {
                      if (isValid) next();
                    }),
                }
              : {
                  type: "submit",
                  onClick: next,
                })}
          >
            {isTheLastStep ? "Submit" : "Next"}
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
};
