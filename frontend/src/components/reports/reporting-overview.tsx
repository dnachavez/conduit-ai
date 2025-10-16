"use client"

import * as React from "react"
import {
  AlertTriangle,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronsUpDown,
  Clock3,
  Download,
  Eye,
  Gauge,
  Layers,
  MoreVertical,
  Phone,
  Server,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  UserCircle,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/dashboard/monitoring/copy-button"
import { Progress } from "@/components/ui/progress"

type ReportCategory = "agent" | "call" | "system"
type ReportScope = "entire" | "each"
type TimeframeKey = "all" | "24h" | "7d" | "30d" | "quarter"
type FormatOption = "CSV" | "PDF" | "Spreadsheet" | "JSON"

interface ReportDescriptor {
  id: string
  name: string
  category: ReportCategory
  scope: ReportScope
  description: string
  timeframeKey: Exclude<TimeframeKey, "all">
  timeframeLabel: string
  lastGenerated: string
  status: "Ready" | "Scheduled" | "Draft"
  supportedFormats: FormatOption[]
}

const reports: ReportDescriptor[] = [
  {
    id: "7f2b5c0f-0b42-4251-86eb-017a6f55b3ac",
    name: "Agent Performance Summary",
    category: "agent",
    scope: "entire",
    description: "Roll-up metrics for all human agents including productivity, quality, and adherence KPIs.",
    timeframeKey: "7d",
    timeframeLabel: "Last 7 Days",
    lastGenerated: "Mar 26, 2024 · 09:12",
    status: "Ready",
    supportedFormats: ["CSV", "PDF", "Spreadsheet"],
  },
  {
    id: "4ef9a8b3-2dd9-4ac8-96ae-77c0a210fcb0",
    name: "Agent Detail Timeline",
    category: "agent",
    scope: "each",
    description: "Per-agent interaction history with sentiment, handle time, and coaching annotations.",
    timeframeKey: "24h",
    timeframeLabel: "Past 24 Hours",
    lastGenerated: "Mar 26, 2024 · 07:45",
    status: "Ready",
    supportedFormats: ["CSV", "Spreadsheet"],
  },
  {
    id: "aa3dd7af-8ad0-4a1d-bf41-8e9c14623540",
    name: "Call Volume & Outcomes",
    category: "call",
    scope: "entire",
    description: "Aggregated call journey metrics, transfer rates, and resolution outcomes.",
    timeframeKey: "30d",
    timeframeLabel: "Last 30 Days",
    lastGenerated: "Mar 25, 2024 · 21:03",
    status: "Scheduled",
    supportedFormats: ["CSV", "JSON"],
  },
  {
    id: "d3727f28-3f6f-4b36-a0ec-a87fcb6d1748",
    name: "Call Transcript Archive",
    category: "call",
    scope: "each",
    description: "Full transcripts with AI summaries for each call, grouped by disposition.",
    timeframeKey: "7d",
    timeframeLabel: "Last 7 Days",
    lastGenerated: "Mar 24, 2024 · 23:22",
    status: "Ready",
    supportedFormats: ["PDF", "JSON"],
  },
  {
    id: "5d2955b8-7afc-4a87-90b6-13a8cdc7cb10",
    name: "System Health Overview",
    category: "system",
    scope: "entire",
    description: "Platform uptime, latency, and integration health for all voice and AI services.",
    timeframeKey: "24h",
    timeframeLabel: "Past 24 Hours",
    lastGenerated: "Mar 26, 2024 · 06:15",
    status: "Ready",
    supportedFormats: ["CSV", "JSON"],
  },
  {
    id: "7dd0d16b-3f91-4a40-9646-0dea94fbdf0c",
    name: "System Change Audit Trail",
    category: "system",
    scope: "each",
    description: "Configuration adjustments per agent assist skill, including approver and change notes.",
    timeframeKey: "quarter",
    timeframeLabel: "Current Quarter",
    lastGenerated: "Mar 20, 2024 · 18:45",
    status: "Draft",
    supportedFormats: ["CSV", "PDF"],
  },
]

interface LeadershipSummaryMetric {
  label: string
  value: string
  trend: string
  icon: React.ElementType
  tone: string
}

const leadershipSummaryMetrics: LeadershipSummaryMetric[] = [
  {
    label: "Service Level (30s)",
    value: "87%",
    trend: "Up 3 pts vs yesterday",
    icon: Gauge,
    tone: "text-emerald-500",
  },
  {
    label: "Average Handle Time",
    value: "6m 12s",
    trend: "Goal 6m · Balanced staffing",
    icon: Clock3,
    tone: "text-sky-500",
  },
  {
    label: "First Contact Resolution",
    value: "78%",
    trend: "Down 2 pts vs last week",
    icon: CheckCircle2,
    tone: "text-amber-500",
  },
  {
    label: "QA Pass Rate",
    value: "92%",
    trend: "3 coaching items due today",
    icon: ShieldCheck,
    tone: "text-purple-500",
  },
]

interface OperationsPulseMetric {
  label: string
  value: string
  target: string
  progress: number
  delta: string
  deltaTone: string
}

const operationsPulseMetrics: OperationsPulseMetric[] = [
  {
    label: "Average Speed of Answer",
    value: "21s",
    target: "Goal ≤ 30s",
    progress: 70,
    delta: "Within target",
    deltaTone: "text-emerald-500",
  },
  {
    label: "Oldest Call Waiting",
    value: "1m 42s",
    target: "Alert at 2m",
    progress: 58,
    delta: "Monitor premium queue",
    deltaTone: "text-amber-500",
  },
  {
    label: "Live Staffing",
    value: "48 online",
    target: "Need 46",
    progress: 82,
    delta: "SLA protected",
    deltaTone: "text-emerald-500",
  },
]

interface VolumeHighlight {
  label: string
  value: string
  change: string
  icon: React.ElementType
  tone: string
}

const volumeHighlights: VolumeHighlight[] = [
  {
    label: "Calls Answered",
    value: "1,284",
    change: "+6% vs last week",
    icon: TrendingUp,
    tone: "text-primary",
  },
  {
    label: "AI Deflected",
    value: "312",
    change: "24% deflection rate",
    icon: Server,
    tone: "text-sky-500",
  },
  {
    label: "Abandon Rate",
    value: "3.1%",
    change: "-0.8 pts vs goal",
    icon: TrendingDown,
    tone: "text-emerald-500",
  },
  {
    label: "Escalations",
    value: "18",
    change: "2 urgent pending",
    icon: AlertTriangle,
    tone: "text-amber-500",
  },
]

interface QualityInsight {
  label: string
  value: string
  context: string
  tone?: string
}

const qualityInsights: QualityInsight[] = [
  {
    label: "QA Reviews Completed",
    value: "57 / 64",
    context: "11 remaining to hit weekly goal",
  },
  {
    label: "CSAT (Last 7 Days)",
    value: "4.5 / 5",
    context: "Top drivers · Billing clarity, empathy",
  },
  {
    label: "Detractor Alerts",
    value: "5 follow-ups",
    context: "2 require supervisor callbacks",
    tone: "text-amber-500",
  },
  {
    label: "Coaching Actions",
    value: "9 in progress",
    context: "3 due today · Keep notes updated",
    tone: "text-purple-500",
  },
]

interface TeamPerformanceRow {
  team: string
  supervisor: string
  serviceLevel: number
  aht: string
  csat: number
  fcr: number
  occupancy: number
  escalations: number
}

const teamPerformance: TeamPerformanceRow[] = [
  {
    team: "Billing L1",
    supervisor: "Angela Reyes",
    serviceLevel: 91,
    aht: "5m 58s",
    csat: 4.7,
    fcr: 81,
    occupancy: 88,
    escalations: 1,
  },
  {
    team: "General Support",
    supervisor: "Miguel Santos",
    serviceLevel: 84,
    aht: "6m 20s",
    csat: 4.5,
    fcr: 76,
    occupancy: 90,
    escalations: 3,
  },
  {
    team: "Retention Specialists",
    supervisor: "Bianca Cruz",
    serviceLevel: 79,
    aht: "6m 55s",
    csat: 4.2,
    fcr: 71,
    occupancy: 94,
    escalations: 5,
  },
  {
    team: "Enterprise Escalations",
    supervisor: "Jerome dela Torre",
    serviceLevel: 86,
    aht: "7m 45s",
    csat: 4.6,
    fcr: 74,
    occupancy: 92,
    escalations: 4,
  },
]

const categoryCopy: Record<ReportCategory, string> = {
  agent: "Agent",
  call: "Call",
  system: "System",
}

const categoryBadgeConfig: Record<
  ReportCategory,
  {
    icon: React.ElementType
    tone: string
  }
> = {
  agent: {
    icon: Users,
    tone: "bg-blue-500/10 text-blue-500",
  },
  call: {
    icon: Phone,
    tone: "bg-emerald-500/10 text-emerald-500",
  },
  system: {
    icon: Server,
    tone: "bg-purple-500/10 text-purple-500",
  },
}

const scopeCopy: Record<ReportScope, string> = {
  entire: "Entire",
  each: "Each",
}

const scopeBadgeConfig: Record<
  ReportScope,
  {
    label: string
    tone: string
    icon: React.ElementType
  }
> = {
  entire: {
    label: "Entire coverage",
    tone: "bg-primary/10 text-primary border-primary/20",
    icon: Layers,
  },
  each: {
    label: "Per agent & call",
    tone: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: UserCircle,
  },
}

const timeframeTone: Record<Exclude<TimeframeKey, "all">, string> = {
  "24h": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "7d": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "30d": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  quarter: "bg-teal-500/10 text-teal-500 border-teal-500/20",
}

const summaryCopy: Record<ReportScope, string> = {
  entire: "Showing all roll-up reports across agents, calls, and systems.",
  each: "Showing per-agent, per-call, and per-system detail exports.",
}

const allFormats: FormatOption[] = ["CSV", "PDF", "Spreadsheet", "JSON"]

const categoryFilterOptions: Array<{
  value: ReportCategory | "all"
  label: string
  description: string
}> = [
  {
    value: "all",
    label: "All report types",
    description: "Show agent, call, and system reporting definitions.",
  },
  {
    value: "agent",
    label: "Agent reports",
    description: "Human agent productivity, quality, and staffing views.",
  },
  {
    value: "call",
    label: "Call reports",
    description: "Interaction outcomes, transcripts, and routing metrics.",
  },
  {
    value: "system",
    label: "System reports",
    description: "Platform health, audits, and integration telemetry.",
  },
]

const scopeFilterOptions: Array<{
  value: ReportScope
  label: string
  description: string
}> = [
  {
    value: "entire",
    label: "Entire coverage",
    description: "Aggregate rollups across your full workspace.",
  },
  {
    value: "each",
    label: "Per agent & call",
    description: "Detailed exports for individual agents or calls.",
  },
]

const timeframeFilterOptions: Array<{
  value: TimeframeKey
  label: string
  description: string
}> = [
  {
    value: "all",
    label: "All timeframes",
    description: "Include every available reporting window.",
  },
  {
    value: "24h",
    label: "Past 24 Hours",
    description: "Focus on the most recent day of operations.",
  },
  {
    value: "7d",
    label: "Last 7 Days",
    description: "Compare this week’s performance and trends.",
  },
  {
    value: "30d",
    label: "Last 30 Days",
    description: "Monthly snapshot with wider context.",
  },
  {
    value: "quarter",
    label: "Current Quarter",
    description: "Quarter-to-date metrics for leadership views.",
  },
]

interface FilterOption<T extends string> {
  value: T
  label: string
  description?: string
}

interface SearchableSelectProps<T extends string> {
  value: T
  onValueChange: (value: T) => void
  options: FilterOption<T>[]
  placeholder: string
  searchPlaceholder: string
  emptyText: string
}

function SearchableSelect<T extends string>({
  value,
  onValueChange,
  options,
  placeholder,
  searchPlaceholder,
  emptyText,
}: SearchableSelectProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  )

  const filteredOptions = React.useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    if (!normalizedSearch) {
      return options
    }
    return options.filter((option) => {
      const labelMatch = option.label.toLowerCase().includes(normalizedSearch)
      const descriptionMatch = option.description
        ?.toLowerCase()
        .includes(normalizedSearch)
      return labelMatch || descriptionMatch
    })
  }, [options, searchTerm])

  const handleSelect = (nextValue: T) => {
    onValueChange(nextValue)
    setOpen(false)
    setSearchTerm("")
  }

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          setSearchTerm("")
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-full justify-between border border-input bg-background px-3 text-left text-xs font-medium"
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 size-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[260px] p-2"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <div className="flex flex-col gap-2">
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-8 text-xs focus-visible:border-border focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length ? (
              filteredOptions.map((option) => {
                const isActive = option.value === value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted focus:outline-none",
                      isActive && "bg-muted text-foreground"
                    )}
                  >
                    <div className="flex-1 space-y-0.5">
                      <p className="font-medium">{option.label}</p>
                      {option.description ? (
                        <p className="text-[11px] text-muted-foreground">
                          {option.description}
                        </p>
                      ) : null}
                    </div>
                    <Check
                      className={cn(
                        "mt-0.5 size-3",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </button>
                )
              })
            ) : (
              <p className="px-2 py-4 text-center text-[11px] text-muted-foreground">
                {emptyText}
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const renderCategoryBadge = (category: ReportCategory) => {
  const config = categoryBadgeConfig[category]
  const Icon = config.icon
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1 rounded-md border-transparent px-2 py-1 text-[11px] font-medium capitalize",
        config.tone
      )}
    >
      <Icon className="size-3" />
      {categoryCopy[category]}
    </Badge>
  )
}

const renderScopeBadge = (scope: ReportScope) => {
  const config = scopeBadgeConfig[scope]
  const Icon = config.icon
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 border-transparent px-2 py-1 text-[11px] font-medium",
        config.tone
      )}
    >
      <Icon className="size-3" />
      {config.label}
    </Badge>
  )
}

const renderTimeframeBadge = (
  timeframeKey: ReportDescriptor["timeframeKey"],
  label: string
) => {
  const tone = timeframeTone[timeframeKey]
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 border-transparent px-2 py-1 text-[11px] font-medium",
        tone
      )}
    >
      <CalendarClock className="size-3" />
      {label}
    </Badge>
  )
}

const formatReportId = (id: string) => {
  if (id.length <= 10) return id
  const firstPart = id.slice(0, 6)
  const lastPart = id.slice(-4)
  return `${firstPart} ... ${lastPart}`
}

export function ReportingOverview({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [category, setCategory] = React.useState<ReportCategory | "all">("all")
  const [scope, setScope] = React.useState<ReportScope>("entire")
  const [timeframe, setTimeframe] = React.useState<TimeframeKey>("all")
  const [statusCopy, setStatusCopy] = React.useState<string>(
    "Select filters to preview matching report definitions, then queue the exports you need."
  )
  const [openReportPopover, setOpenReportPopover] = React.useState<string | null>(
    null
  )
  const [openDownloadPopover, setOpenDownloadPopover] = React.useState<
    string | null
  >(null)

  const filteredReports = React.useMemo(() => {
    return reports.filter((report) => {
      if (category !== "all" && report.category !== category) return false
      if (scope !== report.scope) return false
      if (timeframe !== "all" && report.timeframeKey !== timeframe) return false
      return true
    })
  }, [category, scope, timeframe])

  const matchingCount = filteredReports.length

  const totalReportsByCategory = React.useMemo(() => {
    return reports.reduce(
      (acc, report) => {
        acc.total += 1
        acc[report.category] += 1
        return acc
      },
      { total: 0, agent: 0, call: 0, system: 0 } as { total: number } & Record<ReportCategory, number>
    )
  }, [])

  const reportStatusSummary = React.useMemo(() => {
    return filteredReports.reduce(
      (acc, report) => {
        acc.total += 1
        const statusKey = report.status.toLowerCase() as "ready" | "scheduled" | "draft"
        acc[statusKey] += 1
        return acc
      },
      { total: 0, ready: 0, scheduled: 0, draft: 0 }
    )
  }, [filteredReports])

  const formatSummary = React.useMemo(() => {
    const formats = new Set<FormatOption>()
    filteredReports.forEach((report) => {
      report.supportedFormats.forEach((format) => formats.add(format))
    })
    return Array.from(formats)
  }, [filteredReports])

  const formatCount = formatSummary.length

  const handleGenerateClick = React.useCallback(() => {
    setStatusCopy(
      `Queued ${matchingCount || "no"} ${scope === "entire" ? "roll-up" : "detail"} ${(category === "all" ? "reports" : `${categoryCopy[category]} reports`).toLowerCase()} across ${formatCount || "no"} format${formatCount === 1 ? "" : "s"}.`
    )
  }, [category, formatCount, matchingCount, scope])

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {leadershipSummaryMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label} className="bg-muted/50 border-0 shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <Icon className={cn("size-4", metric.tone)} />
              </CardHeader>
              <CardContent className="space-y-1 pt-0">
                <div className="text-xl font-semibold text-foreground">
                  {metric.value}
                </div>
                <CardDescription className="text-xs">{metric.trend}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="bg-muted/50 border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Operations Pulse</CardTitle>
            <CardDescription className="text-xs">
              Watch queue health and staffing coverage in real time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {operationsPulseMetrics.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {metric.label}
                  </p>
                  <span className="text-xs font-semibold text-foreground">
                    {metric.value}
                  </span>
                </div>
                <Progress value={metric.progress} className="h-1.5" />
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{metric.target}</span>
                  <span className={cn("font-medium", metric.deltaTone)}>
                    {metric.delta}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Volume & Demand</CardTitle>
            <CardDescription className="text-xs">
              Snapshot of today&apos;s workload across channels.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {volumeHighlights.map((highlight) => {
              const Icon = highlight.icon
              return (
                <div
                  key={highlight.label}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-background/60 p-3"
                >
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {highlight.label}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {highlight.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {highlight.change}
                    </p>
                  </div>
                  <Icon className={cn("size-5", highlight.tone)} />
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Quality & Coaching</CardTitle>
            <CardDescription className="text-xs">
              Pinpoint where supervision and follow-ups are needed.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {qualityInsights.map((insight) => (
              <div
                key={insight.label}
                className="rounded-lg border border-border/60 bg-background/60 p-3"
              >
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {insight.label}
                </p>
                <p className={cn("text-lg font-semibold", insight.tone || "text-foreground")}>
                  {insight.value}
                </p>
                <p className="text-[11px] text-muted-foreground">{insight.context}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50 border-0 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
          <CardDescription className="text-xs">
            Compare queue health across teams to prioritise coaching and staffing moves.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Team
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Supervisor
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Service Level
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    AHT
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    CSAT
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    FCR
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Occupancy
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Escalations
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((row) => (
                  <tr key={row.team} className="border-b border-border/50 last:border-b-0">
                    <td className="px-4 py-3 align-top">
                      <p className="text-sm font-semibold text-foreground">{row.team}</p>
                      <p className="text-[11px] text-muted-foreground">
                        Target coverage · 85% / 30s
                      </p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <p className="text-sm text-foreground">{row.supervisor}</p>
                      <p className="text-[11px] text-muted-foreground">Shift lead</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          row.serviceLevel >= 85
                            ? "text-emerald-500"
                            : row.serviceLevel >= 80
                              ? "text-amber-500"
                              : "text-red-500"
                        )}
                      >
                        {row.serviceLevel}%
                      </span>
                      <p className="text-[11px] text-muted-foreground">Goal ≥ 85%</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="text-sm font-semibold text-foreground">
                        {row.aht}
                      </span>
                      <p className="text-[11px] text-muted-foreground">Goal ≤ 6m 30s</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="text-sm font-semibold text-foreground">
                        {row.csat.toFixed(1)} / 5
                      </span>
                      <p className="text-[11px] text-muted-foreground">Customer rating</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          row.fcr >= 75 ? "text-emerald-500" : "text-amber-500"
                        )}
                      >
                        {row.fcr}%
                      </span>
                      <p className="text-[11px] text-muted-foreground">First contact</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="text-sm font-semibold text-foreground">
                        {row.occupancy}%
                      </span>
                      <p className="text-[11px] text-muted-foreground">Live occupancy</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          row.escalations > 3 ? "text-amber-500" : "text-foreground"
                        )}
                      >
                        {row.escalations}
                      </span>
                      <p className="text-[11px] text-muted-foreground">
                        Cases requiring follow-up
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50 border-0 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Report Builder</CardTitle>
          <CardDescription className="text-xs">
            Filter the catalog, review status, and generate exports for your leads.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-1.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Report Category
              </p>
              <SearchableSelect
                value={category}
                onValueChange={(value) => setCategory(value)}
                options={categoryFilterOptions}
                placeholder="All report types"
                searchPlaceholder="Search report types..."
                emptyText="No report types found."
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Scope
              </p>
              <SearchableSelect
                value={scope}
                onValueChange={(value) => setScope(value)}
                options={scopeFilterOptions}
                placeholder="Entire coverage"
                searchPlaceholder="Search scope options..."
                emptyText="No scope options found."
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Timeframe
              </p>
              <SearchableSelect
                value={timeframe}
                onValueChange={(value) => setTimeframe(value)}
                options={timeframeFilterOptions}
                placeholder="Select timeframe"
                searchPlaceholder="Search timeframes..."
                emptyText="No timeframe matches found."
              />
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border/60 bg-background/60 p-3">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Matching definitions
              </p>
              <p className="text-lg font-semibold text-foreground">{matchingCount}</p>
              <p className="text-[11px] text-muted-foreground">
                {matchingCount
                  ? "Update filters to refine the export scope."
                  : "No matches yet · adjust filters above."}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/60 p-3">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Ready now
              </p>
              <p className="text-lg font-semibold text-foreground">
                {reportStatusSummary.ready}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Ready to generate immediately
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/60 p-3">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Scheduled refreshes
              </p>
              <p className="text-lg font-semibold text-foreground">
                {reportStatusSummary.scheduled}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Auto-generated on cadence
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/60 p-3">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Available formats
              </p>
              <p className="text-lg font-semibold text-foreground">{formatCount}</p>
              <p className="text-[11px] text-muted-foreground">
                {formatSummary.length
                  ? formatSummary.join(" · ")
                  : "Formats appear once reports match."}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span>Draft definitions · {reportStatusSummary.draft}</span>
            <span>
              Catalog coverage · Agent {totalReportsByCategory.agent} · Call {totalReportsByCategory.call} · System {totalReportsByCategory.system}
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-dashed border-border/60 bg-background/60 p-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-foreground">
                {scopeCopy[scope]} report selection
              </p>
              <p className="text-[11px]">
                {matchingCount
                  ? `${matchingCount} definition${matchingCount === 1 ? "" : "s"} aligned to ${scopeCopy[scope].toLowerCase()} filters.`
                  : summaryCopy[scope]}
              </p>
            </div>
            <Button
              size="sm"
              className="h-8 gap-2 px-3 text-xs"
              onClick={handleGenerateClick}
            >
              <Download className="size-3.5" />
              Generate Report
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground/90">{statusCopy}</p>
        </CardContent>
      </Card>

      <Card className="bg-muted/50 border-0 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Report Library</CardTitle>
          <CardDescription className="text-xs">
            {matchingCount
              ? `Showing ${matchingCount} result${matchingCount === 1 ? "" : "s"} that match your filters.`
              : "No reports match these filters. Adjust the scope or timeframe to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                    Report ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                    Report
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                    Scope
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                    Timeframe
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-border/50 last:border-b-0 hover:bg-accent/5 transition-colors"
                  >
                    <td className="px-4 py-3 align-middle text-xs font-mono">
                      <CopyButton
                        value={report.id}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 rounded-full"
                      >
                        {formatReportId(report.id)}
                      </CopyButton>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="space-y-1 text-xs">
                        <p className="font-semibold text-foreground">
                          {report.name}
                        </p>
                        <p className="text-muted-foreground">
                          {report.description}
                        </p>
                        <p className="text-muted-foreground/75">
                          Last generated · {report.lastGenerated}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      {renderCategoryBadge(report.category)}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      {renderScopeBadge(report.scope)}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      {renderTimeframeBadge(
                        report.timeframeKey,
                        report.timeframeLabel
                      )}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center justify-center">
                        <Popover
                          open={openReportPopover === report.id}
                          onOpenChange={(isOpen) => {
                            setOpenReportPopover(isOpen ? report.id : null)
                            if (!isOpen) {
                              setOpenDownloadPopover(null)
                            }
                          }}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  type="button"
                                >
                                  <MoreVertical className="size-3.5" />
                                  <span className="sr-only">Open actions</span>
                                </Button>
                              </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>More actions</p>
                            </TooltipContent>
                          </Tooltip>
                          <PopoverContent
                            align="end"
                            className="w-48 space-y-2 p-2"
                          >
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-foreground hover:bg-muted"
                              onClick={() => {
                                setStatusCopy(
                                  `Opening ${report.name} definition in a new workspace tab.`
                                )
                                setOpenReportPopover(null)
                                setOpenDownloadPopover(null)
                              }}
                            >
                              <Eye className="size-3.5 text-muted-foreground" />
                              View definition
                            </button>
                            <Popover
                              open={openDownloadPopover === report.id}
                              onOpenChange={(isOpen) => {
                                setOpenDownloadPopover(isOpen ? report.id : null)
                              }}
                            >
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-foreground hover:bg-muted"
                                >
                                  <Download className="size-3.5 text-muted-foreground" />
                                  Download
                                </button>
                              </PopoverTrigger>
                              <PopoverContent
                                align="end"
                                className="w-40 space-y-1 p-2"
                              >
                                <p className="text-[11px] font-medium text-muted-foreground">
                                  Select format
                                </p>
                                {allFormats.map((formatOption) => {
                                  const isAvailable = report.supportedFormats.includes(
                                    formatOption
                                  )
                                  return (
                                  <button
                                    type="button"
                                    key={`${report.id}-${formatOption}`}
                                    disabled={!isAvailable}
                                    className={cn(
                                      "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs text-foreground transition-colors",
                                      isAvailable
                                        ? "hover:bg-muted"
                                        : "cursor-not-allowed opacity-60"
                                    )}
                                    onClick={() => {
                                      if (!isAvailable) {
                                        setStatusCopy(
                                          `${formatOption} export is not enabled for ${report.name} yet.`
                                        )
                                        return
                                      }
                                      setStatusCopy(
                                        `Queued ${formatOption} export for ${report.name}.`
                                      )
                                      setOpenDownloadPopover(null)
                                      setOpenReportPopover(null)
                                    }}
                                  >
                                    {formatOption}
                                    <Download className="size-3 text-muted-foreground/80" />
                                  </button>
                                  )
                                })}
                              </PopoverContent>
                            </Popover>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </td>
                  </tr>
                ))}
                {!filteredReports.length && (
                  <tr>
                    <td
                      className="px-4 py-12 text-center text-xs text-muted-foreground"
                      colSpan={6}
                    >
                      No report definitions available for this combination. Try broadening the scope or choosing a different timeframe.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
