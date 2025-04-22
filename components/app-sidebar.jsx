"use client"

import * as React from "react"
import {
  Clock,
  Command,
  ShieldQuestion,
  PieChart,
  ChartNoAxesCombined,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavAnalytics } from "@/components/nav-analytics"
import { Button } from "./ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Display users",
          url: "/admin/users",
        },
        {
          title: "Create user",
          url: "/admin/create-user",
        },
        {
          title: "Remove user",
          url: "/admin/remove-user",
        },
        {
          title: "Ban user",
          url: "/admin/ban-user",
        },
      ],
    },
    {
      title: "Sessions",
      url: "#",
      icon: Clock,
      items: [
        {
          title: "Display sessions",
          url: "/admin/sessions",
        },
        {
          title: "Revoke user session",
          url: "/admin/remove-user-sessions",
        },
      ],
    },
  ],
  stats: [
    {
      name: "User growth",
      url: "#",
      icon: ChartNoAxesCombined,
    },
    {
      name: "Active users",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Roles distribution",
      url: "#",
      icon: ShieldQuestion,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Ticket System</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAnalytics stats={data.stats} />
      </SidebarContent>
      <SidebarFooter className="items-center">
        <Link href="/dashboard">
          <Button className="mt-12" variant={"secondary"} size={"lg"}>
            Exit
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
