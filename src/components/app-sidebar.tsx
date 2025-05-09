import { sidebarMenuItems } from "@/app/consts/sidebar-menu-items";
import Link from "next/link";
import { Frame, ChevronsLeftRight } from "lucide-react";
import { LoadingIndicator } from "./loading-indicator";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarTriggerBinder,
  SidebarFooter,
} from "./shadcn/sidebar";
import { SidebarUser } from "./sidebar-user";
import { useId } from "react";

export const AppSidebar = () => {
  const sidebarMenuButtonId = useId();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="cursor-default" isActive>
              <Frame />
              <span>Eco Connect</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                      <LoadingIndicator className="ml-auto" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton id={sidebarMenuButtonId} disabled>
                  <SidebarTriggerBinder id={sidebarMenuButtonId} />
                  <ChevronsLeftRight />
                  <span>Expand / Collapse</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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

// TODO there is no sidebar trigger in small screens
