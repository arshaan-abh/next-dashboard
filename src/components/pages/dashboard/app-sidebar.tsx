import { sidebarMenuItems } from "@/app/consts/sidebar-menu-items";
import Link from "next/link";
import { LoadingIndicator } from "../../commons/loading-indicator";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../../shadcn/sidebar";
import { SidebarUser } from "./sidebar-user";
import { FC } from "react";

export const AppSidebar = () => {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <CustomSidebarMenuItem {...sidebarMenuItems[0]} isActive />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuItems.slice(1).map((item) => (
                <CustomSidebarMenuItem key={item.title} {...item} />
              ))}
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

const CustomSidebarMenuItem: FC<
  (typeof sidebarMenuItems)[0] & { isActive?: boolean }
> = ({ title, href, icon: Icon, isActive }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link href={href}>
          <Icon />
          <span>{title}</span>
          <LoadingIndicator className="ml-auto" />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

// TODO there is no sidebar trigger in small screens
