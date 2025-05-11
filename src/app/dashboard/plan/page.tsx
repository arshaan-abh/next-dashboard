"use client";

import { plans } from "@/app/consts/plans";
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
import { cn } from "@/utils/cn";
import {
  useState,
  ComponentProps,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

export default function Plan() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0]>();

  return (
    <DashboardPageLayout
      title="Plan"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
    >
      {plans.map((plan) => (
        <CustomCard
          key={plan.title}
          title={plan.title}
          description={`${plan.price}€`}
          footer={
            <Button
              className="w-full"
              onClick={() => setSelectedPlan(plan)}
              disabled={plan.title === selectedPlan?.title}
            >
              Choose
            </Button>
          }
          label={plan.recommended ? "Recommended!" : undefined}
          isActive={plan.title === selectedPlan?.title}
        >
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </CustomCard>
      ))}

      <CustomPlan
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />

      <CustomCard className="col-span-1 max-w-full sm:col-span-2 xl:col-span-4" />
    </DashboardPageLayout>
  );
}

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

interface CustomPlanProps {
  selectedPlan: (typeof plans)[0] | undefined;
  setSelectedPlan: Dispatch<SetStateAction<(typeof plans)[0] | undefined>>;
}

export const CustomPlan: FC<CustomPlanProps> = ({
  selectedPlan,
  setSelectedPlan,
}) => {
  return (
    <CustomCard
      title="Custom"
      description="Create a custom plan based on my usage so I can pay exactly for what I need."
      footer={
        <Button
          className="w-full"
          onClick={() =>
            setSelectedPlan({ title: "Custom", price: 0, features: [] })
          }
          disabled={"Custom" === selectedPlan?.title}
        >
          Choose
        </Button>
      }
      isActive={"Custom" === selectedPlan?.title}
    />
  );
};
