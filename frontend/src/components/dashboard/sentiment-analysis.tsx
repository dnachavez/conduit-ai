"use client"

import * as React from "react"
import { ThumbsUp, CircleDashed, ThumbsDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SentimentAnalysisCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    positive: number
    neutral: number
    negative: number
  }
}

export function SentimentAnalysisCard({
  className,
  data = {
    positive: 65,
    neutral: 25,
    negative: 10
  },
  ...props
}: SentimentAnalysisCardProps) {
  return (
    <Card className={cn("bg-muted/50 border-0", className)} {...props}>
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sentiment Analysis</CardTitle>
        <CardDescription className="text-xs">
          Customer emotion tracking and satisfaction metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Positive Sentiment */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="size-3.5 text-green-500" />
              <span className="text-xs text-green-500">Positive</span>
            </div>
            <span className="text-xs font-medium">{data.positive}%</span>
          </div>
          <Progress 
            value={data.positive} 
            className="h-1 [&>[data-slot=progress-indicator]]:bg-green-500"
          />
        </div>
        
        {/* Neutral Sentiment */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <CircleDashed className="size-3.5 text-blue-500" />
              <span className="text-xs text-blue-500">Neutral</span>
            </div>
            <span className="text-xs font-medium">{data.neutral}%</span>
          </div>
          <Progress 
            value={data.neutral} 
            className="h-1 [&>[data-slot=progress-indicator]]:bg-blue-500"
          />
        </div>
        
        {/* Negative Sentiment */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <ThumbsDown className="size-3.5 text-red-500" />
              <span className="text-xs text-red-500">Negative</span>
            </div>
            <span className="text-xs font-medium">{data.negative}%</span>
          </div>
          <Progress 
            value={data.negative} 
            className="h-1 [&>[data-slot=progress-indicator]]:bg-red-500"
          />
        </div>
      </CardContent>
    </Card>
  )
} 