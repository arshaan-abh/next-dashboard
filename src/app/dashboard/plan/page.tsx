"use client";

import { ControlledTextField } from "@/components/commons/controlled-text-field";
import { Form } from "@/components/commons/form";
import { Submit } from "@/components/commons/submit";
import { DashboardPageLayout } from "@/components/pages/dashboard/dashboard-page-layout";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { plans } from "@/consts/plans";
import { cn } from "@/utils/cn";
import { ComponentProps, FC, ReactNode, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";

const unitPriceInEuros = 1;

const SelectPlanRequestSchema = z.object({
  customMaterialsAmount: z.number().positive().optional(),
  customReportsAmount: z.number().positive().optional(),
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
      {watch("selectedPlansTitle") === "Custom" && (
        <div className="flex flex-col gap-6">
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
      )}
    </Plan>
  );
};

const Checkout = () => {
  const { control, watch, setValue } = useFormContext<SelectPlanRequest>();
  const [
    watchedSelectedPlansTitle,
    watchedCustomMaterialsAmount,
    watchedCustomReportsAmount,
  ] = useWatch({
    control,
    name: [
      "selectedPlansTitle",
      "customMaterialsAmount",
      "customReportsAmount",
    ],
  });

  useEffect(() => {
    if ("Custom" === watch("selectedPlansTitle"))
      setValue(
        "selectedPlansPrice",
        10 +
          (watch("customMaterialsAmount") ?? 0) * unitPriceInEuros +
          (watch("customReportsAmount") ?? 0) * unitPriceInEuros,
      );
  }, [
    watchedSelectedPlansTitle,
    watchedCustomMaterialsAmount,
    watchedCustomReportsAmount,
    setValue,
  ]);

  useEffect(() => {
    if ("Custom" === watch("selectedPlansTitle")) {
      setValue("customMaterialsAmount", 0);
      setValue("customReportsAmount", 0);
    } else {
      setValue("customMaterialsAmount", undefined);
      setValue("customReportsAmount", undefined);
    }
  }, [watchedSelectedPlansTitle, setValue]);

  return (
    <CustomCard
      title="Checkout"
      description="You can pay for the plan you selected above."
      footer={
        <Submit className="ml-auto">Pay {watch("selectedPlansPrice")}€</Submit>
      }
      className="col-span-1 mt-6 max-w-full sm:col-span-2 xl:col-span-4"
    >
      You have selected the &quot;{watch("selectedPlansTitle")}&quot; plan.
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
