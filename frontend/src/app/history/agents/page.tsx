import { AppSidebar } from "@/components/app-sidebar"
import { AgentRoster } from "@/components/history/agents/agent-roster"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { Coffee, Headset, UserCheck, Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agents",
}

interface AgentSummaryMetric {
  label: string
  value: string
  trend: string
  icon: LucideIcon
  tone: string
}

const agentSummaryMetrics: AgentSummaryMetric[] = [
  {
    label: "Agents Logged In",
    value: "42",
    trend: "Up +5 vs last hour",
    icon: Users,
    tone: "text-primary",
  },
  {
    label: "On Call",
    value: "18",
    trend: "4 interactions at risk",
    icon: Headset,
    tone: "text-emerald-500",
  },
  {
    label: "Available",
    value: "12",
    trend: "Coverage within SLA",
    icon: UserCheck,
    tone: "text-sky-500",
  },
  {
    label: "Break / Offline",
    value: "6",
    trend: "3 on meal break · 3 offline",
    icon: Coffee,
    tone: "text-purple-500",
  },
]

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Conduit
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">History</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Agents</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-3 p-4 pt-0">
          <h1 className="text-2xl font-semibold">Agents</h1>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {agentSummaryMetrics.map((metric) => {
              const Icon = metric.icon
              return (
                <Card
                  key={metric.label}
                  className="bg-muted/50 border-0 shadow-none"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {metric.label}
                    </CardTitle>
                    <Icon className={metric.tone} size={18} />
                  </CardHeader>
                  <CardContent className="space-y-1 pt-0">
                    <div className="text-xl font-semibold text-foreground">{metric.value}</div>
                    <CardDescription className="text-xs">{metric.trend}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <AgentRoster />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
