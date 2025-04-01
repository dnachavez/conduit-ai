"use client"

import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Sample data for common call topics
const topicsData = [
  { topic: "Billing Issues", count: 35 },
  { topic: "Technical Support", count: 28 },
  { topic: "Account Access", count: 18 },
  { topic: "Product Information", count: 12 },
  { topic: "Returns & Refunds", count: 7 },
]

// Colors for the pie chart segments
const COLORS = ["#542CDE", "#7454E0", "#9480E7", "#B4ACEF", "#D3D0F5"]

const chartConfig = {
  topics: {
    label: "Topics",
    color: "#542CDE",
  },
} satisfies ChartConfig

interface CallTopicsProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Array<{ topic: string; count: number }>
}

export function CallTopics({
  className,
  data = topicsData,
  ...props
}: CallTopicsProps) {
  return (
    <Card className={cn("bg-muted/50 border-0", className)} {...props}>
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Common Call Topics</CardTitle>
        <CardDescription className="text-xs">
          Distribution of the most frequent conversation topics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pie Chart */}
          <div className="flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="h-[200px] w-[200px]"
            >
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="topic"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => `${value}`}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </div>
          
          {/* Legend and Stats */}
          <div className="flex flex-col justify-center space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-xs font-medium">{item.topic}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">{item.count}</span>
                    <span className="text-xs text-muted-foreground">
                      ({Math.round((item.count / data.reduce((acc, curr) => acc + curr.count, 0)) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 