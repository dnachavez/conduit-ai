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

// Sample data for frequently referenced knowledgebase articles
const articlesData = [
  { title: "How to Reset Password", count: 42 },
  { title: "Billing Payment Methods", count: 31 },
  { title: "Account Verification", count: 24 },
  { title: "Subscription Plans", count: 19 },
  { title: "Device Compatibility", count: 14 },
]

// Colors for the pie chart segments - dark blue palette
const COLORS = ["#0C4A6E", "#0369A1", "#0284C7", "#38BDF8", "#7DD3FC"]

const chartConfig = {
  articles: {
    label: "Articles",
    color: "#0C4A6E",
  },
} satisfies ChartConfig

interface KnowledgeArticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Array<{ title: string; count: number }>
}

export function KnowledgeArticles({
  className,
  data = articlesData,
  ...props
}: KnowledgeArticlesProps) {
  return (
    <Card className={cn("bg-muted/50 border-0", className)} {...props}>
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Knowledge Articles</CardTitle>
        <CardDescription className="text-xs">
          Distribution of the most frequently referenced articles
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
                  nameKey="title"
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
                  <span className="text-xs font-medium">{item.title}</span>
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