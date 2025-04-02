"use client"

import * as React from "react"
import { Eye, MoreVertical, Download, FileEdit, Shield, Activity, Clock, User, FileText, Settings, Server, Info, AlertCircle, CheckCircle, XCircle } from "lucide-react"
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

interface SystemLogsProps extends React.HTMLAttributes<HTMLDivElement> {}

type LogStatus = "successful" | "failed" | "pending"
type EventType = "login" | "logout" | "add" | "update" | "delete" | "settings_change" | "access"
type UserRole = "agent" | "admin" | "supervisor" | "system"

interface LogEntry {
  id: string
  timestamp: string
  user: string
  role: UserRole
  eventType: EventType
  module: string
  description: string
  status: LogStatus
  ipAddress: string
}

export function SystemLogs({
  className,
  ...props
}: SystemLogsProps) {
  // Example data for system logs
  const systemLogs: LogEntry[] = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      timestamp: "2024-05-25T14:32:15",
      user: "Maria Santos",
      role: "admin",
      eventType: "settings_change",
      module: "General Settings",
      description: "Updated security preferences: Enabled 2FA for all administrators",
      status: "successful",
      ipAddress: "192.168.1.5"
    },
    {
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      timestamp: "2024-05-25T12:15:00",
      user: "Juan Dela Cruz",
      role: "agent",
      eventType: "login",
      module: "Authentication",
      description: "User login from new device",
      status: "successful",
      ipAddress: "42.118.65.123"
    },
    {
      id: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
      timestamp: "2024-05-25T11:45:22",
      user: "Ana Reyes",
      role: "supervisor",
      eventType: "update",
      module: "Knowledgebase",
      description: "Updated article 'Troubleshooting Guide' with new information",
      status: "successful",
      ipAddress: "103.86.42.10"
    },
    {
      id: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
      timestamp: "2024-05-25T10:52:36",
      user: "System",
      role: "system",
      eventType: "access",
      module: "API",
      description: "Failed API authentication attempt from unrecognized source",
      status: "failed",
      ipAddress: "185.143.223.45"
    },
    {
      id: "6ba7b813-9dad-11d1-80b4-00c04fd430c8",
      timestamp: "2024-05-25T09:30:12",
      user: "Jose Rizal",
      role: "admin",
      eventType: "add",
      module: "Workspace Members",
      description: "Added new agent user: 'Carlo Aquino'",
      status: "successful",
      ipAddress: "112.203.148.67"
    },
    {
      id: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
      timestamp: "2024-05-25T08:15:45",
      user: "Andres Bonifacio",
      role: "supervisor",
      eventType: "delete",
      module: "Integrations",
      description: "Removed unused Slack integration",
      status: "successful",
      ipAddress: "175.176.94.57"
    }
  ]

  // Function to get appropriate status badge styling
  const getStatusBadge = (status: LogStatus) => {
    switch (status) {
      case "successful":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">Successful</Badge>
      case "failed":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-xs">Failed</Badge>
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs">Pending</Badge>
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>
    }
  }

  // Function to get event type icon
  const getEventTypeIcon = (eventType: EventType) => {
    switch (eventType) {
      case "login":
        return <Shield className="size-3.5 text-blue-500" />
      case "logout":
        return <Shield className="size-3.5 text-gray-500" />
      case "add":
        return <CheckCircle className="size-3.5 text-green-500" />
      case "update":
        return <Activity className="size-3.5 text-yellow-500" />
      case "delete":
        return <XCircle className="size-3.5 text-red-500" />
      case "settings_change":
        return <Settings className="size-3.5 text-purple-500" />
      case "access":
        return <Server className="size-3.5 text-orange-500" />
      default:
        return <Info className="size-3.5 text-gray-500" />
    }
  }

  // Function to format log ID with ellipsis
  const formatLogId = (id: string) => {
    if (id.length <= 10) return id;
    
    const firstPart = id.substring(0, 6);
    const lastPart = id.substring(id.length - 4);
    
    return `${firstPart} ... ${lastPart}`;
  }

  // Function to render user role with appropriate styling
  const renderUserRole = (role: UserRole) => {
    let icon;
    let bgClass;
    let textClass;
    
    switch (role) {
      case "admin":
        icon = <Shield className="size-3.5" />;
        bgClass = "bg-red-500/10";
        textClass = "text-red-500";
        break;
      case "supervisor":
        icon = <Eye className="size-3.5" />;
        bgClass = "bg-yellow-500/10";
        textClass = "text-yellow-500";
        break;
      case "agent":
        icon = <User className="size-3.5" />;
        bgClass = "bg-blue-500/10";
        textClass = "text-blue-500";
        break;
      case "system":
        icon = <Server className="size-3.5" />;
        bgClass = "bg-purple-500/10";
        textClass = "text-purple-500";
        break;
      default:
        icon = <User className="size-3.5" />;
        bgClass = "bg-gray-500/10";
        textClass = "text-gray-500";
    }
    
    return (
      <Badge variant="outline" className={`${bgClass} ${textClass} border-transparent text-xs inline-flex items-center gap-1`}>
        {icon}
        <span className="capitalize">{role}</span>
      </Badge>
    );
  }

  // Function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return (
      <div className="flex items-center gap-1.5">
        <Clock className="size-3.5 text-muted-foreground" />
        <div>
          <div className="text-xs">{date.toLocaleDateString()}</div>
          <div className="text-xs text-muted-foreground">{date.toLocaleTimeString()}</div>
        </div>
      </div>
    );
  }

  const handleRowClick = (logId: string) => {
    // Implementation for when a row is clicked
    console.log(`Log ${logId} details requested`);
  }
  
  const handleViewDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Viewing details for log:", id);
    // Implementation for viewing log details
  }
  
  const handleDownloadLog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Downloading log:", id);
    // Implementation for downloading log
  }
  
  const handleAddNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Adding note to log:", id);
    // Implementation for adding a note
  }

  return (
    <Card className={cn("bg-muted/50 border-0", className)} {...props}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">System Logs</CardTitle>
        <CardDescription className="text-xs">
          Audit trail of all system activities and events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Log ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Timestamp</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">User/Actor</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Role</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Event Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Module</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">IP Address</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {systemLogs.map((log) => (
                <tr 
                  key={log.id} 
                  className="border-b border-border/50 hover:bg-accent/5 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(log.id)}
                >
                  <td className="px-4 py-3 text-xs font-mono">
                    <CopyButton 
                      value={log.id} 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 rounded-full"
                    >
                      {formatLogId(log.id)}
                    </CopyButton>
                  </td>
                  <td className="px-4 py-3">{formatTimestamp(log.timestamp)}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium">{log.user}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">{renderUserRole(log.role)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {getEventTypeIcon(log.eventType)}
                      <span className="text-xs capitalize">{log.eventType.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs">{log.module}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-xs max-w-[200px] truncate cursor-help">
                          {log.description}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[300px] p-3">
                        <p className="text-xs">{log.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(log.status)}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-mono">{log.ipAddress}</div>
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
                          <DropdownMenuLabel className="text-xs font-semibold">Log Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => handleViewDetails(log.id, e)} className="text-xs">
                            <Eye className="mr-2 size-3.5" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleDownloadLog(log.id, e)} className="text-xs">
                            <Download className="mr-2 size-3.5" />
                            <span>Download Log</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleAddNote(log.id, e)} className="text-xs">
                            <FileEdit className="mr-2 size-3.5" />
                            <span>Add Note</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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