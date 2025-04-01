"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CallAnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
  averageWaitTime: string
  callCounts: {
    total: number
    aiHandled: number
    humanHandled: number
  }
}

export function CallAnalytics({
  className,
  averageWaitTime = "1m 20s",
  callCounts = {
    total: 42,
    aiHandled: 36,
    humanHandled: 6
  },
  ...props
}: CallAnalyticsProps) {
  return (
    <Card className={cn("bg-muted/50 border-0", className)} {...props}>
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Call Analytics</CardTitle>
        <CardDescription className="text-xs">
          Real-time call volume metrics and agent distribution statistics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Average Wait Time */}
          <div className="flex-1 space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground">Average Wait Time</h3>
            <div>
              <div className="text-xl font-semibold">{averageWaitTime}</div>
              <div className="text-xs text-muted-foreground">Before call is handled</div>
            </div>
          </div>
          
          {/* Call Counts */}
          <div className="flex-1 space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground">Active Calls</h3>
            
            <div className="flex">
              {/* Total Active Calls */}
              <div className="mr-4">
                <div className="text-xl font-medium">{callCounts.total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              
              {/* AI and Human Handled as Legend */}
              <div className="mt-2">
                {/* AI Handled */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="text-xs">
                    <span className="font-medium">{callCounts.aiHandled}</span>{" "}
                    <span className="text-muted-foreground">AI</span>
                  </div>
                </div>
                
                {/* Human Handled */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="text-xs">
                    <span className="font-medium">{callCounts.humanHandled}</span>{" "}
                    <span className="text-muted-foreground">Human</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 