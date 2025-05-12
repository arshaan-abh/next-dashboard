"use client";

import { Submit } from "@/components/commons/submit";
import { DashboardPageLayout } from "@/components/pages/dashboard/dashboard-page-layout";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/shadcn/card";
import { plans } from "@/consts/plans";
import { cn } from "@/utils/cn";
import { ComponentProps, ReactNode, FC, useEffect } from "react";
import { Form } from "@/components/commons/form";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { ControlledTextField } from "@/components/commons/controlled-text-field";

const unitPriceInEuros = 1;

const SelectPlanRequestSchema = z.object({
  customMaterialsAmount: z.number().positive(),
  customReportsAmount: z.number().positive(),
  selectedPlansTitle: z.string(),
  selectedPlansPrice: z.number().positive(),
});
type SelectPlanRequest = z.infer<typeof SelectPlanRequestSchema>;

export default function SelectPlan() {
  return (
    <Form<SelectPlanRequest>
      zodSchema={SelectPlanRequestSchema}
      defaultValues={{
        customMaterialsAmount: 0,
        customReportsAmount: 0,
        selectedPlansTitle: plans[0].title,
        selectedPlansPrice: plans[0].price,
      }}
      omitFields={["customMaterialsAmount", "customReportsAmount"]}
      onSubmit={async (data) => console.log(data)}
    >
      <DashboardPageLayout
        title="Select Your Plan"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <Plans />
        <CustomPlan />
        <Checkout />
      </DashboardPageLayout>
    </Form>
  );
}

const Plans = () => {
  return plans.map((plan) => {
    return (
      <Plan key={plan.title} plan={plan} description={`${plan.price}€`}>
        <ul>
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Plan>
    );
  });
};

const CustomPlan = () => {
  const { watch } = useFormContext<SelectPlanRequest>();

  return (
    <Plan
      plan={{ title: "Custom", price: 0, features: [] }}
      description="Create a custom plan based on my usage so I can pay exactly for what I need."
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          watch("selectedPlansTitle") !== "Custom" && "opacity-0",
        )}
      >
        <ControlledTextField<SelectPlanRequest>
          name="customMaterialsAmount"
          label="Materials amount"
          type="number"
          saveAsNumber
        />
        <ControlledTextField<SelectPlanRequest>
          name="customReportsAmount"
          label="Reports amount"
          type="number"
          saveAsNumber
        />
      </div>
    </Plan>
  );
};

const Checkout = () => {
  const { watch, setValue } = useFormContext<SelectPlanRequest>();

  useEffect(() => {
    if ("Custom" === watch("selectedPlansTitle"))
      setValue(
        "selectedPlansPrice",
        10 +
          watch("customMaterialsAmount") * unitPriceInEuros +
          watch("customReportsAmount") * unitPriceInEuros,
      );
  }, [
    watch("selectedPlansTitle"),
    watch("customMaterialsAmount"),
    watch("customReportsAmount"),
  ]);

  return (
    <CustomCard
      title="Checkout"
      description="You can pay for the plan you selected above."
      footer={
        <Submit className="ml-auto">Pay {watch("selectedPlansPrice")}€</Submit>
      }
      className="col-span-1 mt-6 max-w-full sm:col-span-2 xl:col-span-4"
    >
      You have selected the "{watch("selectedPlansTitle")}" plan.
    </CustomCard>
  );
};

interface PlanProps extends Pick<CustomCardProps, "description" | "children"> {
  plan: (typeof plans)[0];
}

const Plan: FC<PlanProps> = ({ plan, description, children }) => {
  const { title } = plan;
  const { watch, setValue } = useFormContext<SelectPlanRequest>();
  const isSelected = title === watch("selectedPlansTitle");

  return (
    <CustomCard
      title={title}
      description={description}
      footer={
        <Button
          type="button"
          onClick={() => {
            setValue("selectedPlansTitle", plan.title);
            setValue("selectedPlansPrice", plan.price);
          }}
          disabled={isSelected}
          className="w-full"
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      }
      label={plan.recommended ? "Recommended" : undefined}
      isActive={isSelected}
    >
      {children}
    </CustomCard>
  );
};

interface CustomCardProps extends ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  label?: string;
  isActive?: boolean;
}

const CustomCard: FC<CustomCardProps> = ({
  title,
  description,
  children,
  footer,
  label,
  isActive,
  className,
  ...otherProps
}) => {
  return (
    <Card
      className={cn(
        "prose",
        label && "relative overflow-hidden",
        isActive && "border-primary",
        className,
      )}
      {...otherProps}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>

      {label && (
        <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-xl px-2 py-1 text-sm font-medium uppercase">
          {label}
        </div>
      )}
    </Card>
  );
};
