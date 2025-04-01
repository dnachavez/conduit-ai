import { AppSidebar } from "@/components/app-sidebar"
import { CallAnalytics } from "@/components/dashboard/call-analytics"
import { CallTopics } from "@/components/dashboard/call-topics"
import { KnowledgeArticles } from "@/components/dashboard/knowledge-articles"
import { PeakHours } from "@/components/dashboard/peak-hours"
import { ResolutionAnalytics } from "@/components/dashboard/resolution-analytics"
import { SentimentAnalysisCard } from "@/components/dashboard/sentiment-analysis"
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
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
}

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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <CallAnalytics
              averageWaitTime="1m 20s"
              callCounts={{
                total: 42,
                aiHandled: 36,
                humanHandled: 6
              }}
            />
            <ResolutionAnalytics 
              aiResolutionRate={85}
              escalationRate={15}
            />
            <SentimentAnalysisCard 
              data={{
                positive: 65,
                neutral: 25,
                negative: 10
              }}
            />
          </div>
          <PeakHours />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CallTopics />
            <KnowledgeArticles />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}