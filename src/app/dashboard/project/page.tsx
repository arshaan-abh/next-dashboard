"use client";

import { ControlledCheckbox } from "@/components/commons/controlled-checkbox";
import { ControlledSlider } from "@/components/commons/controlled-slider";
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

const StructureProjectSchema = z
  .object({
    address: z.string().min(1),
    postalCode: z.string().min(1),
    city: z.string().min(1),

    serviceOne: z.boolean(),
    serviceTwo: z.boolean(),
    serviceThree: z.boolean(),

    lifespan: z.number().positive(),
  })
  .refine((data) => data.serviceOne || data.serviceTwo || data.serviceThree, {
    message: "At least one service must be selected",
    path: ["serviceOne"],
  });
type StructureProjectRequest = z.infer<typeof StructureProjectSchema>;

export default function StructureProject() {
  return (
    <Form<StructureProjectRequest>
      zodSchema={StructureProjectSchema}
      defaultValues={{
        address: "",
        postalCode: "",
        city: "",

        serviceOne: false,
        serviceTwo: false,
        serviceThree: false,

        lifespan: 0,
      }}
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
              content: <FunctionsSelectionStep />,
            },
            {
              title: "Lifespan Definition",
              description: "Third step",
              content: <LifespanDefinitionStep />,
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

// Second step
const FunctionsSelectionStep = () => {
  return (
    <StepperContentCard
      cardTitle="Functions Selection"
      cardDescription="Choose which house-building services apply to my project."
      fieldNames={["serviceOne", "serviceTwo", "serviceThree"]}
    >
      <ControlledCheckbox<StructureProjectRequest>
        name="serviceOne"
        label="Service One"
        description="Description of service one"
      />
      <ControlledCheckbox<StructureProjectRequest>
        name="serviceTwo"
        label="Service Two"
        description="Description of service two"
      />
      <ControlledCheckbox<StructureProjectRequest>
        name="serviceThree"
        label="Service Three"
        description="Description of service three"
      />
    </StepperContentCard>
  );
};

// Third step
const LifespanDefinitionStep = () => {
  return (
    <StepperContentCard
      cardTitle="Lifespan Definition"
      cardDescription="Define the expected lifespan of my building."
      fieldNames={["lifespan"]}
    >
      <ControlledSlider<StructureProjectRequest>
        name="lifespan"
        unit="Years"
        min={0}
        step={1}
        max={100}
        saveAsNumber
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
