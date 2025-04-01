"use client"

import * as React from "react"
import { ThumbsUp, CircleDashed, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActiveCallsProps extends React.HTMLAttributes<HTMLDivElement> {}

type CallStatus = "ongoing" | "escalated" | "transferred" | "ended"
type SentimentType = "positive" | "negative" | "neutral"

interface CallEntry {
  id: string
  caller: string
  callerPhone: string
  agentType: string
  duration: string
  status: CallStatus
  sentiment: SentimentType
  topics: string
  articles: string[]
}

export function ActiveCalls({
  className,
  ...props
}: ActiveCallsProps) {
  // Example data based on the updated requirements
  const activeCalls: CallEntry[] = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      caller: "Maria Santos",
      callerPhone: "+63 917 123 4567",
      agentType: "AI Agent",
      duration: "04:32",
      status: "ongoing",
      sentiment: "positive",
      topics: "Account Verification, Password Reset",
      articles: ["How to Verify Account", "Password Recovery Process"]
    },
    {
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      caller: "Juan Dela Cruz",
      callerPhone: "+63 918 765 4321",
      agentType: "John Doe",
      duration: "12:15",
      status: "escalated",
      sentiment: "negative",
      topics: "Billing Issue, Service Interruption",
      articles: ["Billing Dispute Resolution", "Service Outage Policies"]
    },
    {
      id: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
      caller: "Ana Reyes",
      callerPhone: "+63 929 999 8888",
      agentType: "AI Agent",
      duration: "01:45",
      status: "transferred",
      sentiment: "neutral",
      topics: "Account Settings, Subscription Plans",
      articles: ["Managing Account Preferences", "Premium Plans Comparison"]
    },
    {
      id: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
      caller: "Jose Rizal",
      callerPhone: "+63 999 444 3333",
      agentType: "Jane Doe",
      duration: "00:52",
      status: "ended",
      sentiment: "neutral",
      topics: "Technical Support, Device Connectivity",
      articles: ["Troubleshooting Connection Issues", "Device Setup Guide"]
    }
  ]

  // Function to get appropriate status badge styling
  const getStatusBadge = (status: CallStatus) => {
    switch (status) {
      case "ongoing":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">Ongoing</Badge>
      case "escalated":
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs">Escalated</Badge>
      case "transferred":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs">Transferred</Badge>
      case "ended":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs">Ended</Badge>
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>
    }
  }

  // Function to get sentiment indicator
  const getSentimentIndicator = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="size-3.5 text-green-500" />
      case "negative":
        return <ThumbsDown className="size-3.5 text-red-500" />
      case "neutral":
        return <CircleDashed className="size-3.5 text-blue-500" />
      default:
        return null
    }
  }

  // Function to format call ID with ellipsis
  const formatCallId = (id: string) => {
    if (id.length <= 10) return id;
    
    const firstPart = id.substring(0, 6);
    const lastPart = id.substring(id.length - 4);
    
    return `${firstPart} ... ${lastPart}`;
  }

  return (
    <Card className={cn("border-0", className)} {...props}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
        <CardDescription className="text-xs">
          Real-time monitoring of current calls in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Call ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Caller</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Agent</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Duration</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Sentiment</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Topics</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Articles</th>
              </tr>
            </thead>
            <tbody>
              {activeCalls.map((call) => (
                <tr key={call.id} className="border-b border-border/50">
                  <td className="px-4 py-3 text-xs font-mono">{formatCallId(call.id)}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium">{call.caller}</div>
                    <div className="text-xs text-muted-foreground">{call.callerPhone}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">{call.agentType}</td>
                  <td className="px-4 py-3 text-xs">{call.duration}</td>
                  <td className="px-4 py-3">{getStatusBadge(call.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {getSentimentIndicator(call.sentiment)}
                      <span className="text-xs capitalize">{call.sentiment}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-muted-foreground">
                      {call.topics.split(',').map((topic, index) => (
                        <React.Fragment key={index}>
                          <span>{topic.trim()}</span>
                          {index < call.topics.split(',').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-muted-foreground">
                      {call.articles.map((article, index) => (
                        <React.Fragment key={index}>
                          <span>{article}</span>
                          {index < call.articles.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
} 