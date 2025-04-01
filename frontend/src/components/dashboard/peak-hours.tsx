"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

// Data representing peak hours (calls by hour of day) - updated to 24-hour format
const peakHoursData = [
  { hour: "00:00", calls: 12 },
  { hour: "01:00", calls: 8 },
  { hour: "02:00", calls: 5 },
  { hour: "03:00", calls: 3 },
  { hour: "04:00", calls: 2 },
  { hour: "05:00", calls: 4 },
  { hour: "06:00", calls: 7 },
  { hour: "07:00", calls: 15 },
  { hour: "08:00", calls: 32 },
  { hour: "09:00", calls: 56 },
  { hour: "10:00", calls: 78 },
  { hour: "11:00", calls: 95 },
  { hour: "12:00", calls: 102 },
  { hour: "13:00", calls: 120 },
  { hour: "14:00", calls: 118 },
  { hour: "15:00", calls: 110 },
  { hour: "16:00", calls: 95 },
  { hour: "17:00", calls: 82 },
  { hour: "18:00", calls: 68 },
  { hour: "19:00", calls: 55 },
  { hour: "20:00", calls: 40 },
  { hour: "21:00", calls: 28 },
  { hour: "22:00", calls: 20 },
  { hour: "23:00", calls: 15 },
]

const chartConfig = {
  calls: {
    label: "Calls",
    color: "#542CDE",
  },
} satisfies ChartConfig

interface PeakHoursProps extends React.HTMLAttributes<HTMLDivElement> {
  timeframe?: "daily" | "weekly" | "monthly"
}

export function PeakHours({
  className,
  timeframe = "daily",
  ...props
}: PeakHoursProps) {
  const isMobile = useIsMobile()
  const [selectedTimeframe, setSelectedTimeframe] = React.useState(timeframe)

  // For demonstration purposes - would be replaced with actual filtering logic
  const filteredData = React.useMemo(() => {
    return peakHoursData
  }, [selectedTimeframe])

  return (
    <Card className={cn("bg-muted/50 border-0 @container/card", className)} {...props}>
      <CardHeader className="relative space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
        <CardDescription className="text-xs">
          Busiest times of day based on call volume
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={selectedTimeframe}
            onValueChange={(value) => value && setSelectedTimeframe(value as "daily" | "weekly" | "monthly")}
            className="@[767px]/card:flex hidden rounded-[7px] bg-dark-10 p-1 shadow-mini-inset dark:bg-background dark:border dark:border-neutral-600/30"
          >
            <ToggleGroupItem 
              value="daily" 
              className="h-8 rounded-[7px] bg-transparent px-3 text-xs font-semibold leading-[0.01em] transition-all hover:bg-transparent hover:text-inherit data-[state=on]:bg-white data-[state=on]:shadow-mini dark:data-[state=on]:bg-muted"
            >
              Daily
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="weekly" 
              className="h-8 rounded-[7px] bg-transparent px-3 text-xs font-semibold leading-[0.01em] transition-all hover:bg-transparent hover:text-inherit data-[state=on]:bg-white data-[state=on]:shadow-mini dark:data-[state=on]:bg-muted"
            >
              Weekly
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="monthly" 
              className="h-8 rounded-[7px] bg-transparent px-3 text-xs font-semibold leading-[0.01em] transition-all hover:bg-transparent hover:text-inherit data-[state=on]:bg-white data-[state=on]:shadow-mini dark:data-[state=on]:bg-muted"
            >
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>
          <Select 
            value={selectedTimeframe} 
            onValueChange={(value) => setSelectedTimeframe(value as "daily" | "weekly" | "monthly")}
          >
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a timeframe"
            >
              <SelectValue placeholder="Daily" className="text-xs" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="daily" className="rounded-lg text-xs">
                Daily
              </SelectItem>
              <SelectItem value="weekly" className="rounded-lg text-xs">
                Weekly
              </SelectItem>
              <SelectItem value="monthly" className="rounded-lg text-xs">
                Monthly
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCalls" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#542CDE"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#542CDE"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={isMobile ? 80 : 32}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="calls"
              type="monotone"
              fill="url(#fillCalls)"
              stroke="#542CDE"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 