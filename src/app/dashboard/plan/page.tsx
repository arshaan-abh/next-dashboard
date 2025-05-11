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
import { PlanSchema, plans } from "@/consts/plans";
import { cn } from "@/utils/cn";
import { ComponentProps, ReactNode, FC } from "react";
import { Form } from "@/components/commons/form";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const SelectPlanRequestSchema = z.object({
  selectedPlan: PlanSchema,
});
type SelectPlanRequest = z.infer<typeof SelectPlanRequestSchema>;

export default function SelectPlan() {
  return (
    <Form<SelectPlanRequest>
      zodSchema={SelectPlanRequestSchema}
      defaultValues={{ selectedPlan: plans[0] }}
      onSubmit={async (data) =>
        console.log({
          selectedPlansTitle: data.selectedPlan.title,
          selectedPlansPrice: data.selectedPlan.price,
        })
      }
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
  return (
    <Plan
      plan={{ title: "Custom", price: 0, features: [] }}
      description="Create a custom plan based on my usage so I can pay exactly for what I need."
    />
  );
};

const Checkout = () => {
  const { watch } = useFormContext<SelectPlanRequest>();

  return (
    <CustomCard
      title="Checkout"
      description="You can pay for the plan you selected above."
      footer={
        <Submit className="ml-auto">Pay {watch("selectedPlan").price}€</Submit>
      }
      className="col-span-1 mt-6 max-w-full sm:col-span-2 xl:col-span-4"
    >
      You have selected the "{watch("selectedPlan").title}" plan.
    </CustomCard>
  );
};

interface PlanProps extends Pick<CustomCardProps, "description" | "children"> {
  plan: (typeof plans)[0];
}

const Plan: FC<PlanProps> = ({ plan, description, children }) => {
  const { title } = plan;
  const { watch, setValue } = useFormContext<SelectPlanRequest>();
  const isSelected = title === watch("selectedPlan").title;

  return (
    <CustomCard
      title={title}
      description={description}
      footer={
        <Button
          onClick={() => setValue("selectedPlan", plan)}
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
