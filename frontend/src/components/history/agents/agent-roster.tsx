"use client"

import * as React from "react"
import { Activity, AlertTriangle, Coffee, Headset, MoreVertical, Phone, TimerReset, UserCheck } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CopyButton } from "@/components/dashboard/monitoring/copy-button"

type AgentStatus = "on-call" | "available" | "wrap-up" | "break" | "offline"

interface AgentInteraction {
  customer: string
  channel: "Voice" | "Email" | "Chat"
  callId: string
  durationMinutes: number
  sentiment: "Positive" | "Neutral" | "At Risk"
  topic: string
}

interface AgentRecord {
  id: string
  name: string
  avatar?: string
  role: string
  team: string
  site: string
  status: AgentStatus
  timeInStatusMinutes: number
  callsHandled: number
  ahtSeconds: number
  occupancy: number
  adherence: number
  csatScore: number
  escalationsToday: number
  lastBreakMinutesAgo: number
  currentInteraction?: AgentInteraction
  notes?: string
  scheduleBlock: string
}

const statusConfig: Record<
  AgentStatus,
  {
    label: string
    tone: string
    icon: React.ElementType
    description: string
  }
> = {
  "on-call": {
    label: "On Call",
    tone: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: Headset,
    description: "Currently connected with a customer.",
  },
  available: {
    label: "Available",
    tone: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    icon: UserCheck,
    description: "Ready to receive the next interaction.",
  },
  "wrap-up": {
    label: "After Call Work",
    tone: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: TimerReset,
    description: "Finishing documentation for the last call.",
  },
  break: {
    label: "On Break",
    tone: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    icon: Coffee,
    description: "Scheduled pause from the queue.",
  },
  offline: {
    label: "Offline",
    tone: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    icon: Activity,
    description: "Not logged in to the contact platform.",
  },
}

const agents: AgentRecord[] = [
  {
    id: "agt-001",
    name: "Angela Reyes",
    role: "Senior Support Specialist",
    avatar: "",
    team: "Billing L1",
    site: "Manila · Wave 3",
    status: "on-call",
    timeInStatusMinutes: 6,
    callsHandled: 18,
    ahtSeconds: 385,
    occupancy: 93,
    adherence: 97,
    csatScore: 4.7,
    escalationsToday: 0,
    lastBreakMinutesAgo: 54,
    scheduleBlock: "09:00 - 18:00 PH",
    notes: "Billing SME · Mentor for new hires",
    currentInteraction: {
      customer: "Luis Navarro",
      channel: "Voice",
      callId: "550e8400-e29b-41d4-a716-446655440045",
      durationMinutes: 12,
      sentiment: "At Risk",
      topic: "Refund status follow-up",
    },
  },
  {
    id: "agt-002",
    name: "Miguel Santos",
    avatar: "",
    role: "Customer Care Specialist",
    team: "General Support",
    site: "Cebu · Shift B",
    status: "available",
    timeInStatusMinutes: 3,
    callsHandled: 15,
    ahtSeconds: 420,
    occupancy: 88,
    adherence: 99,
    csatScore: 4.5,
    escalationsToday: 1,
    lastBreakMinutesAgo: 35,
    scheduleBlock: "08:00 - 17:00 PH",
    notes: "Certified in premium product line",
  },
  {
    id: "agt-003",
    name: "Sophia Dela Cruz",
    avatar: "",
    role: "Quality Champion",
    team: "Loyalty Desk",
    site: "Manila · Shift A",
    status: "wrap-up",
    timeInStatusMinutes: 2,
    callsHandled: 20,
    ahtSeconds: 360,
    occupancy: 95,
    adherence: 96,
    csatScore: 4.9,
    escalationsToday: 0,
    lastBreakMinutesAgo: 62,
    scheduleBlock: "07:00 - 16:00 PH",
    notes: "Assigned to high-value customers",
    currentInteraction: {
      customer: "Eloisa Mercado",
      channel: "Voice",
      callId: "6ba7b811-9dad-11d1-80b4-00c04fd430d1",
      durationMinutes: 9,
      sentiment: "Positive",
      topic: "Loyalty tier upgrade",
    },
  },
  {
    id: "agt-004",
    name: "Joshua Lim",
    avatar: "",
    role: "Technical Support",
    team: "Tech Support L2",
    site: "Clark · Shift C",
    status: "on-call",
    timeInStatusMinutes: 16,
    callsHandled: 12,
    ahtSeconds: 540,
    occupancy: 86,
    adherence: 92,
    csatScore: 4.1,
    escalationsToday: 2,
    lastBreakMinutesAgo: 78,
    scheduleBlock: "10:00 - 19:00 PH",
    notes: "Monitoring a priority outage",
    currentInteraction: {
      customer: "Tech Ops - APAC",
      channel: "Voice",
      callId: "6ba7b812-9dad-11d1-80b4-00c04fd430d2",
      durationMinutes: 27,
      sentiment: "Neutral",
      topic: "Major incident bridge",
    },
  },
  {
    id: "agt-005",
    name: "Patricia Gomez",
    avatar: "",
    role: "Customer Success Associate",
    team: "Upsell Pod",
    site: "Manila · Shift B",
    status: "break",
    timeInStatusMinutes: 8,
    callsHandled: 11,
    ahtSeconds: 310,
    occupancy: 82,
    adherence: 94,
    csatScore: 4.8,
    escalationsToday: 0,
    lastBreakMinutesAgo: 8,
    scheduleBlock: "12:00 - 21:00 PH",
    notes: "Mid-shift meal break",
  },
  {
    id: "agt-006",
    name: "Kevin Flores",
    avatar: "",
    role: "Customer Care Specialist",
    team: "General Support",
    site: "Davao · Shift A",
    status: "on-call",
    timeInStatusMinutes: 4,
    callsHandled: 14,
    ahtSeconds: 405,
    occupancy: 90,
    adherence: 95,
    csatScore: 4.6,
    escalationsToday: 1,
    lastBreakMinutesAgo: 41,
    scheduleBlock: "06:00 - 15:00 PH",
    currentInteraction: {
      customer: "Katrina Uy",
      channel: "Chat",
      callId: "7ca7b813-9dad-11d1-80b4-00c04fd430d3",
      durationMinutes: 7,
      sentiment: "Positive",
      topic: "Delivery ETA confirmation",
    },
  },
  {
    id: "agt-007",
    name: "Janine Cortez",
    avatar: "",
    role: "Escalation Specialist",
    team: "Priority Care",
    site: "Manila · Shift C",
    status: "available",
    timeInStatusMinutes: 11,
    callsHandled: 9,
    ahtSeconds: 615,
    occupancy: 79,
    adherence: 93,
    csatScore: 4.4,
    escalationsToday: 3,
    lastBreakMinutesAgo: 25,
    scheduleBlock: "14:00 - 23:00 PH",
    notes: "On standby for executive escalations",
  },
  {
    id: "agt-008",
    name: "Marco Villanueva",
    avatar: "",
    role: "Senior Support Specialist",
    team: "Billing L1",
    site: "Iloilo · Shift B",
    status: "offline",
    timeInStatusMinutes: 45,
    callsHandled: 0,
    ahtSeconds: 0,
    occupancy: 0,
    adherence: 0,
    csatScore: 0,
    escalationsToday: 0,
    lastBreakMinutesAgo: 0,
    scheduleBlock: "Scheduled: 22:00 - 07:00 PH",
    notes: "Scheduled for night shift · Not yet logged in",
  },
]

const sentimentTone: Record<AgentInteraction["sentiment"], string> = {
  Positive: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Neutral: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  "At Risk": "bg-rose-500/10 text-rose-500 border-rose-500/20",
}

const channelTone: Record<AgentInteraction["channel"], string> = {
  Voice: "bg-primary/10 text-primary border-primary/20",
  Email: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Chat: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const formatMinutes = (minutes: number) => {
  if (minutes < 1) return "<1m"
  if (minutes === 60) return "1h"
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60)
    const remainder = minutes % 60
    return remainder ? `${hours}h ${remainder}m` : `${hours}h`
  }
  return `${minutes}m`
}

const formatSeconds = (seconds: number) => {
  if (!seconds) return "—"
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs.toString().padStart(2, "0")}s`
}

const formatCsat = (score: number) => {
  if (!score) return "—"
  return `${score.toFixed(1)} / 5`
}

const formatCallId = (id: string) => (id.length <= 6 ? id : `${id.slice(0, 6)}...`)

const renderStatusBadge = (status: AgentStatus) => {
  const config = statusConfig[status]
  const Icon = config.icon
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className={cn("inline-flex items-center gap-1.5 text-xs", config.tone)}
        >
          <Icon className="size-3.5" />
          {config.label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent className="max-w-[220px] text-xs">
        {config.description}
      </TooltipContent>
    </Tooltip>
  )
}

const renderProgress = (value: number, tone: string) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span>Target</span>
      <span className="font-medium text-foreground">{value}%</span>
    </div>
    <Progress
      value={value}
      className={cn(
        "h-1.5 bg-muted-foreground/10 [&>div]:bg-muted-foreground/60",
        tone
      )}
    />
  </div>
)

export function AgentRoster({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={cn(
        "bg-muted/50 border-0 shadow-none",
        className
      )}
      {...props}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Agents</CardTitle>
        <CardDescription className="text-xs">
          Real-time view of all human agents with live productivity and service-quality indicators.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Agent
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Assignment
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Current Interaction
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Productivity
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Quality
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr
                  key={agent.id}
                  className="border-b border-border/50 last:border-b-0"
                >
                  <td className="px-4 py-4 align-top">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-9 w-9 border border-border/50">
                        {agent.avatar ? (
                          <AvatarImage src={agent.avatar} alt={agent.name} />
                        ) : (
                          <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
                        )}
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">
                            {agent.name}
                          </p>
                          {agent.escalationsToday >= 2 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge
                                  variant="outline"
                                  className="inline-flex items-center gap-1 text-[10px] bg-rose-500/10 text-rose-500 border-rose-500/20"
                                >
                                  <AlertTriangle className="size-3" />
                                  Watch
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[200px] text-xs">
                                High escalation volume today. Consider coaching support.
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {agent.role}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {agent.site}
                        </p>
                        {agent.notes && (
                          <p className="text-[11px] text-muted-foreground/80">
                            {agent.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-xs text-muted-foreground">
                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className="inline-flex items-center gap-1 text-[11px] border-border/60"
                      >
                        <Phone className="size-3" />
                        {agent.team}
                      </Badge>
                      <p>{agent.scheduleBlock}</p>
                      <p className="text-[11px]">
                        Last break{" "}
                        {agent.lastBreakMinutesAgo
                          ? `${formatMinutes(agent.lastBreakMinutesAgo)} ago`
                          : "—"}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-xs">
                    <div className="space-y-2">
                      {renderStatusBadge(agent.status)}
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <TimerReset className="size-3" />
                        <span>In state {formatMinutes(agent.timeInStatusMinutes)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-xs text-muted-foreground">
                    {agent.currentInteraction ? (
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              "inline-flex items-center gap-1 text-[11px]",
                              channelTone[agent.currentInteraction.channel]
                            )}
                          >
                            {agent.currentInteraction.channel}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={cn(
                              "inline-flex items-center gap-1 text-[11px]",
                              sentimentTone[agent.currentInteraction.sentiment]
                            )}
                          >
                            {agent.currentInteraction.sentiment}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-foreground">
                          <p className="text-xs font-medium">
                            {agent.currentInteraction.customer}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {agent.currentInteraction.topic}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                          <div className="inline-flex font-mono text-xs whitespace-nowrap">
                            <CopyButton
                              value={agent.currentInteraction.callId}
                              withButton={false}
                            >
                              {formatCallId(agent.currentInteraction.callId)}
                            </CopyButton>
                          </div>
                          <span>{agent.currentInteraction.durationMinutes}m</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-muted-foreground">
                        No live interaction
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4 align-top text-xs text-muted-foreground">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide">
                          Calls Today
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {agent.callsHandled}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide">
                          Avg Handle Time
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatSeconds(agent.ahtSeconds)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide">
                          Occupancy
                        </p>
                        {renderProgress(
                          agent.occupancy,
                          "bg-emerald-500/10 [&>div]:bg-emerald-500"
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-xs text-muted-foreground">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide">
                          CSAT
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatCsat(agent.csatScore)}
                        </p>
                        {agent.csatScore ? (
                          <Progress
                            value={Math.min(100, (agent.csatScore / 5) * 100)}
                            className="mt-1 h-1.5 bg-muted-foreground/15 [&>div]:bg-primary"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide">
                          Adherence
                        </p>
                        {renderProgress(
                          agent.adherence,
                          "bg-sky-500/10 [&>div]:bg-sky-500"
                        )}
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide">
                          Escalations
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {agent.escalationsToday}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreVertical className="size-3.5" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuLabel className="text-xs">
                            Supervisor Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-xs">
                            View timeline & adherence
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">
                            Whisper / barge request
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">
                            Send coaching note
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-xs">
                            Mark for QA review
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
