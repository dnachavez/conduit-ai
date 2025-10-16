"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  History,
  GalleryVerticalEnd,
  LifeBuoy,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Determine which sections should be active based on current path
  const isOverviewActive = pathname.startsWith('/dashboard')
  const isHistoryActive = pathname.startsWith('/history')
  const isReportsActive = pathname.startsWith('/reports')

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Overview",
        url: "#",
        icon: SquareTerminal,
        isActive: isOverviewActive,
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
          },
          {
            title: "Monitoring",
            url: "/dashboard/monitoring",
          },
          {
            title: "Logs",
            url: "/dashboard/logs",
          },
        ],
      },
      {
        title: "History",
        url: "#",
        icon: History,
        isActive: isHistoryActive,
        items: [
          {
            title: "Calls",
            url: "/history/calls",
          },
          {
            title: "Agents",
            url: "/history/agents",
          },
        ],
      },
      {
        title: "Reports",
        url: "#",
        icon: BarChart3,
        isActive: isReportsActive,
        items: [
          {
            title: "Reports",
            url: "/reports/reporting",
          },
        ],
      },
      {
        title: "Workspace",
        url: "#",
        icon: GalleryVerticalEnd,
        items: [
          {
            title: "Members",
            url: "workspace/members",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "settings/general",
          },
          {
            title: "Integrations",
            url: "settings/integrations",
          },
          {
            title: "Knowledgebase",
            url: "settings/knowledgebase",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "support",
        icon: LifeBuoy,
      },
      {
        title: "Documentation",
        url: "docs",
        icon: BookOpen,
      },
    ],
  }

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
