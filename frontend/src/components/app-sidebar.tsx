"use client"

import * as React from "react"
import {
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
      isActive: true,
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
      items: [
        {
          title: "Calls",
          url: "#",
        },
        {
          title: "Agents",
          url: "#",
        },
        {
          title: "Transcripts",
          url: "#",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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