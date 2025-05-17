import { AppSidebar } from "@/components/pages/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("eco-connect:sidebar:open")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
