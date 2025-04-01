"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ResolutionAnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
  aiResolutionRate: number
  escalationRate: number
}

export function ResolutionAnalytics({
  className,
  aiResolutionRate = 85,
  escalationRate = 15,
  ...props
}: ResolutionAnalyticsProps) {
  return (
    <Card className={cn("bg-muted/50 border-0", className)} {...props}>
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Resolution Analytics</CardTitle>
        <CardDescription className="text-xs">
          Real-time metrics showing how effectively AI handles customer inquiries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AI Resolution Rate Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground">AI Resolution Rate</h3>
            <div className="flex items-end justify-between">
              <div className="text-xl font-bold">{aiResolutionRate}%</div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-green-500">Fully Automated</span>
                <span className="text-xs text-muted-foreground">No human intervention</span>
              </div>
            </div>
            <div className="space-y-1">
              <Progress 
                value={aiResolutionRate} 
                className="h-1 [&>[data-slot=progress-indicator]]:bg-green-500" 
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Escalation Rate Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground">Escalation Rate</h3>
            <div className="flex items-end justify-between">
              <div className="text-xl font-bold">{escalationRate}%</div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-orange-400">Human Assistance</span>
                <span className="text-xs text-muted-foreground">Transferred calls</span>
              </div>
            </div>
            <div className="space-y-1">
              <Progress 
                value={escalationRate} 
                className={cn(
                  "h-1",
                  escalationRate <= 20 
                    ? "[&>[data-slot=progress-indicator]]:bg-green-500" 
                    : escalationRate <= 40 
                      ? "[&>[data-slot=progress-indicator]]:bg-orange-500" 
                      : "[&>[data-slot=progress-indicator]]:bg-red-500"
                )}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 