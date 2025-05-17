import { sidebarMenuItems } from "@/consts/sidebar-menu-items";
import Link from "next/link";
import { FC } from "react";
import { LinkStatus } from "../../commons/link-status";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../shadcn/sidebar";
import { SidebarUser } from "./sidebar-user";

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
          <LinkStatus className="ml-auto" />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
