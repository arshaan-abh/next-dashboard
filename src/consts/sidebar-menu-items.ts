import { Building2, CalendarDays, Frame, SquareUser } from "lucide-react";

export const sidebarMenuItems = [
  {
    title: "Eco Connect",
    icon: Frame,
    href: "/dashboard",
  },
  {
    title: "Profile",
    icon: SquareUser,
    href: "/dashboard/profile",
  },
  {
    title: "Project",
    icon: Building2,
    href: "/dashboard/project",
  },
  {
    title: "Plan",
    icon: CalendarDays,
    href: "/dashboard/plan",
  },
];
