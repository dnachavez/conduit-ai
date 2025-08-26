"use client"

import * as React from "react"
import { ThumbsUp, CircleDashed, ThumbsDown, FileIcon, MessageSquare, InfoIcon, MoreVertical, Eye, Copy, PhoneOff, Download, FileEdit, Flag, Sparkles, User, AlertTriangle, CheckCircle, Clock, CalendarDays, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/dashboard/monitoring/copy-button"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CallHistoryProps extends React.HTMLAttributes<HTMLDivElement> {}

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
  startTime: string
  endTime?: string
  resolution?: string
  notes?: string
  flagged?: boolean
}

export function CallHistory({
  className,
  ...props
}: CallHistoryProps) {
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [sentimentFilter, setSentimentFilter] = React.useState<string>("all")
  const [agentFilter, setAgentFilter] = React.useState<string>("all")

  // Extended example data for call history
  const callHistory: CallEntry[] = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      caller: "Maria Santos",
      callerPhone: "+63 917 123 4567",
      agentType: "AI Agent",
      duration: "04:32",
      status: "ongoing",
      sentiment: "positive",
      topics: "Account Verification, Password Reset",
      articles: ["How to Verify Account", "Password Recovery Process"],
      startTime: "2024-01-15T14:30:00Z",
      resolution: "In progress - customer authentication successful"
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
      articles: ["Billing Dispute Resolution", "Service Outage Policies"],
      startTime: "2024-01-15T13:45:00Z",
      resolution: "Escalated to billing specialist",
      notes: "Complex billing dispute requiring management approval",
      flagged: true
    },
    {
      id: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
      caller: "Ana Reyes",
      callerPhone: "+63 929 999 8888",
      agentType: "Jane Doe",
      duration: "01:45",
      status: "transferred",
      sentiment: "neutral",
      topics: "Account Settings, Subscription Plans",
      articles: ["Managing Account Preferences", "Premium Plans Comparison"],
      startTime: "2024-01-15T13:20:00Z",
      endTime: "2024-01-15T13:22:00Z",
      resolution: "Transferred to sales team for upgrade assistance"
    },
    {
      id: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
      caller: "Jose Rizal",
      callerPhone: "+63 999 444 3333",
      agentType: "AI Agent",
      duration: "00:52",
      status: "ended",
      sentiment: "positive",
      topics: "Technical Support, Device Connectivity",
      articles: ["Troubleshooting Connection Issues", "Device Setup Guide"],
      startTime: "2024-01-15T13:10:00Z",
      endTime: "2024-01-15T13:11:00Z",
      resolution: "Issue resolved - device reconnected successfully"
    },
    {
      id: "7ca7b813-9dad-11d1-80b4-00c04fd430c9",
      caller: "Rosa Martinez",
      callerPhone: "+63 917 555 1234",
      agentType: "AI Agent",
      duration: "03:20",
      status: "ended",
      sentiment: "positive",
      topics: "General Inquiry, Product Information",
      articles: ["Product Features Overview", "Getting Started Guide"],
      startTime: "2024-01-15T12:45:00Z",
      endTime: "2024-01-15T12:48:00Z",
      resolution: "Information provided - customer satisfied"
    },
    {
      id: "8da7b814-9dad-11d1-80b4-00c04fd430d0",
      caller: "Carlos Mendoza",
      callerPhone: "+63 918 444 5678",
      agentType: "Mike Johnson",
      duration: "18:45",
      status: "ended",
      sentiment: "negative",
      topics: "Service Complaint, Refund Request",
      articles: ["Refund Policy", "Service Level Agreements"],
      startTime: "2024-01-15T11:30:00Z",
      endTime: "2024-01-15T11:49:00Z",
      resolution: "Partial refund approved, account credited",
      notes: "Customer initially upset but satisfied with resolution",
      flagged: true
    },
    {
      id: "9ea7b815-9dad-11d1-80b4-00c04fd430e1",
      caller: "Isabella Garcia",
      callerPhone: "+63 929 777 9999",
      agentType: "AI Agent",
      duration: "02:15",
      status: "ended",
      sentiment: "neutral",
      topics: "Account Update, Contact Information",
      articles: ["Account Management", "Profile Settings"],
      startTime: "2024-01-15T11:15:00Z",
      endTime: "2024-01-15T11:17:00Z",
      resolution: "Contact information updated successfully"
    },
    {
      id: "0fa7b816-9dad-11d1-80b4-00c04fd430f2",
      caller: "Roberto Silva",
      callerPhone: "+63 917 888 0000",
      agentType: "Sarah Chen",
      duration: "08:30",
      status: "ended",
      sentiment: "positive",
      topics: "Technical Support, Software Installation",
      articles: ["Software Installation Guide", "System Requirements"],
      startTime: "2024-01-15T10:45:00Z",
      endTime: "2024-01-15T10:54:00Z",
      resolution: "Software installed and configured successfully"
    }
  ]

  // Filter the calls based on selected filters
  const filteredCalls = React.useMemo(() => {
    return callHistory.filter(call => {
      if (statusFilter !== "all" && call.status !== statusFilter) return false
      if (sentimentFilter !== "all" && call.sentiment !== sentimentFilter) return false
      if (agentFilter !== "all") {
        if (agentFilter === "ai" && call.agentType !== "AI Agent") return false
        if (agentFilter === "human" && call.agentType === "AI Agent") return false
      }
      return true
    })
  }, [statusFilter, sentimentFilter, agentFilter, callHistory])

  // Function to get appropriate status badge styling
  const getStatusBadge = (status: CallStatus, agentType: string) => {
    const isHumanAgent = agentType !== "AI Agent";
    
    switch (status) {
      case "ongoing":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">Ongoing</Badge>
      case "escalated":
        return (
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs">Escalated</Badge>
            {isHumanAgent && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertTriangle className="size-3.5 text-orange-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Escalated to human agent (negative indicator)</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        );
      case "transferred":
        return (
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs">Transferred</Badge>
            {isHumanAgent && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <CheckCircle className="size-3.5 text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Transferred to human agent (positive indicator)</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        );
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
        return (
          <>
            <ThumbsUp className="size-3.5 text-green-500" />
            <span className="text-xs text-green-500 capitalize">{sentiment}</span>
          </>
        )
      case "negative":
        return (
          <>
            <ThumbsDown className="size-3.5 text-red-500" />
            <span className="text-xs text-red-500 capitalize">{sentiment}</span>
          </>
        )
      case "neutral":
        return (
          <>
            <CircleDashed className="size-3.5 text-blue-500" />
            <span className="text-xs text-blue-500 capitalize">{sentiment}</span>
          </>
        )
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

  // Function to render agent type with special styling for AI agents
  const renderAgentType = (agentType: string) => {
    if (agentType === "AI Agent") {
      return (
        <div className="flex items-center gap-1.5">
          <style jsx global>{`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.8; }
              100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes shimmer {
              0% { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
            
            .sparkle-icon {
              animation: pulse 2s infinite ease-in-out;
            }
            
            .gradient-text {
              background: linear-gradient(to right, #a99cf2, #8de3f4, #a99cf2);
              background-size: 200% auto;
              animation: shimmer 3s infinite linear;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }

            .gradient-bg {
              background: linear-gradient(to right, rgba(84, 44, 222, 0.55), rgba(15, 174, 216, 0.55), rgba(84, 44, 222, 0.55));
              background-size: 200% auto;
              animation: shimmer 3s infinite linear;
              border: none;
            }
          `}</style>
          <Badge variant="outline" className="gradient-bg text-white border-transparent text-xs inline-flex items-center gap-1">
            <Sparkles className="size-3.5 sparkle-icon text-[#8de3f4]" />
            <span className="capitalize gradient-text">{agentType}</span>
          </Badge>
        </div>
      );
    }
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-transparent text-xs inline-flex items-center gap-1">
            <User className="size-3.5" />
            <span className="capitalize">{agentType}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Human Agent</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  // Function to format and style duration
  const formatDuration = (durationStr: string) => {
    // Parse the duration string (format: mm:ss)
    const [minutes, seconds] = durationStr.split(':').map(Number);
    const totalMinutes = minutes + (seconds / 60);
    
    // Format based on duration length
    let formattedText = '';
    let colorClass = '';
    
    if (totalMinutes < 1) {
      formattedText = `<1m`;
      colorClass = 'text-green-500';
    } else if (totalMinutes < 5) {
      formattedText = `${Math.floor(totalMinutes)}m`;
      colorClass = 'text-green-500';
    } else if (totalMinutes < 10) {
      formattedText = `${Math.floor(totalMinutes)}m`;
      colorClass = 'text-blue-500';
    } else if (totalMinutes < 15) {
      formattedText = `${Math.floor(totalMinutes)}m`;
      colorClass = 'text-yellow-500';
    } else {
      formattedText = `${Math.floor(totalMinutes)}m`;
      colorClass = 'text-orange-500';
    }
    
    return (
      <div className="flex items-center gap-1.5">
        <Clock className={`size-3.5 ${colorClass}`} />
        <span className={`text-xs font-medium ${colorClass}`}>
          {formattedText}
        </span>
      </div>
    );
  }

  // Function to format start time
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  const handleRowClick = (callId: string) => {
    console.log(`Call ${callId} details requested`);
  }
  
  const handleCopyId = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(id);
      console.log("Call ID copied to clipboard:", id);
    } catch (error) {
      console.error("Failed to copy call ID:", error);
    }
  }
  
  const handleViewDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Viewing details for call:", id);
  }
  
  const handleDownloadTranscript = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Downloading transcript for call:", id);
  }
  
  const handleAddNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Adding note to call:", id);
  }
  
  const handleFlagCall = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Flagging call for review:", id);
  }

  return (
    <Card className={cn("bg-muted/50 border-0", className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium">Call History</CardTitle>
            <CardDescription className="text-xs">
              Complete history of all calls in the system - ongoing, escalated, transferred, and ended.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
                <SelectItem value="transferred">Transferred</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue placeholder="Sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiment</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="ai">AI Agent</SelectItem>
                <SelectItem value="human">Human Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Started</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Sentiment</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Context</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call) => (
                <tr 
                  key={call.id} 
                  className="border-b border-border/50 hover:bg-accent/5 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(call.id)}
                >
                  <td className="px-4 py-3 text-xs font-mono">
                    <CopyButton 
                      value={call.id} 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 rounded-full"
                    >
                      {formatCallId(call.id)}
                    </CopyButton>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium">{call.caller}</div>
                    <div className="text-xs text-muted-foreground">{call.callerPhone}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">{renderAgentType(call.agentType)}</td>
                  <td className="px-4 py-3 text-xs">{formatDuration(call.duration)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(call.startTime)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(call.status, call.agentType)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {getSentimentIndicator(call.sentiment)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <MessageSquare className="size-3.5" />
                            <span className="text-xs">Topics</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3" align="start">
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold">Conversation Topics</h4>
                            <div className="text-xs text-muted-foreground space-y-1">
                              {call.topics.split(',').map((topic, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-secondary/50 text-secondary-foreground text-xs">
                                    {topic.trim()}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                            {call.resolution && (
                              <div className="mt-3 pt-2 border-t border-border/50">
                                <h5 className="text-xs font-semibold mb-1">Resolution</h5>
                                <p className="text-xs text-muted-foreground">{call.resolution}</p>
                              </div>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <FileIcon className="size-3.5" />
                            <span className="text-xs">Articles</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3" align="start">
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold">Referenced Articles</h4>
                            <ul className="text-xs text-muted-foreground space-y-1.5">
                              {call.articles.map((article, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <InfoIcon className="size-3 text-primary" />
                                  <span className="hover:text-primary hover:underline cursor-pointer">
                                    {article}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <DropdownMenu>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={(e) => e.stopPropagation()}>
                                <MoreVertical className="size-3.5" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>More actions</p>
                          </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuLabel className="text-xs font-semibold">Call Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => handleViewDetails(call.id, e)} className="text-xs">
                            <Eye className="mr-2 size-3.5" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => handleDownloadTranscript(call.id, e)} className="text-xs">
                            <Download className="mr-2 size-3.5" />
                            <span>Download Transcript</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleAddNote(call.id, e)} className="text-xs">
                            <FileEdit className="mr-2 size-3.5" />
                            <span>Add Note</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleFlagCall(call.id, e)} className="text-xs">
                            <Flag className="mr-2 size-3.5" />
                            <span>Flag for Review</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCalls.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No calls found matching the selected filters.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
