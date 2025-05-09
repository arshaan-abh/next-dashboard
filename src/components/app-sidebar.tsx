import { sidebarMenuItems } from "@/app/consts/sidebar-menu-items";
import Link from "next/link";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { LoadingIndicator } from "./loading-indicator";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarTrigger,
  SidebarFooter,
} from "./shadcn/sidebar";
import { SidebarUser } from "./sidebar-user";

export const AppSidebar = () => {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>Eco Connect</SidebarHeader>
      <SidebarContent>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                        <SidebarMenuAction>
                          <LoadingIndicator />
                        </SidebarMenuAction>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <SidebarTrigger
                      className="justify-start"
                      childrenWhenOpen={
                        <>
                          <ChevronsLeft />
                          <span>Close Sidebar</span>
                        </>
                      }
                      childrenWhenClosed={
                        <>
                          <ChevronsRight />
                          <span>Open Sidebar</span>
                        </>
                      }
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser
          user={{
            name: "arshaan",
            email: "arshaan.abh@gmail.com",
            avatar: "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};
