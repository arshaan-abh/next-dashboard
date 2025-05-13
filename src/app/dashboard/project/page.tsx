"use client";

import { Stepper } from "@/components/commons/stepper";
import { DashboardPageLayout } from "@/components/pages/dashboard/dashboard-page-layout";

export default function Project() {
  return (
    <DashboardPageLayout title="Define Your Project" className="px-0">
      <Stepper
        steps={[
          {
            title: "Step one",
            description: "Step one description",
            content: "Step one content",
          },
          {
            title: "Step two",
            description: "Step two description",
            content: "Step two content",
          },
          {
            title: "Step three",
            description: "Step three description",
            content: "Step three content",
          },
          {
            title: "Step four",
            description: "Step four description",
            content: "Step four content",
          },
        ]}
      />
    </DashboardPageLayout>
  );
}
