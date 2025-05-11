import { SidebarTrigger } from "@/components/shadcn/sidebar";
import { Separator } from "@/components/shadcn/separator";
import { ReactNode, FC } from "react";

interface DashboardPageLayoutProps {
  title: string;
  children?: ReactNode;
}

export const DashboardPageLayout: FC<DashboardPageLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">{title}</h1>
        </div>
      </header>
      <div className="p-6">{children}</div>
    </>
  );
};
