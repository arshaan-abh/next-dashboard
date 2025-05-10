import { sidebarMenuItems } from "@/app/consts/sidebar-menu-items";
import Link from "next/link";
import { Frame, ChevronsLeftRight } from "lucide-react";
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
  SidebarTriggerBinder,
  SidebarFooter,
} from "../../shadcn/sidebar";
import { SidebarUser } from "./sidebar-user";
import { FC, useId } from "react";

export const AppSidebar = () => {
  const sidebarMenuButtonId = useId();

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
