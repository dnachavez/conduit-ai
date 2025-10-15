"use client"

import * as React from "react"
import {
  CalendarClock,
  Check,
  ChevronsUpDown,
  Download,
  Eye,
  Files,
  Layers,
  MoreVertical,
  Phone,
  Server,
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

const summaryIcons = {
  total: Files,
  agent: Users,
  call: Phone,
  system: Server,
}

const summaryIconTone: Record<keyof typeof summaryIcons, string> = {
  total: "text-primary",
  agent: "text-blue-500",
  call: "text-emerald-500",
  system: "text-purple-500",
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
    "Entire report ready. Adjust filters and generate when you're ready."
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

  const handleGenerateClick = React.useCallback(() => {
    setStatusCopy(
      `Queued ${filteredReports.length || "no"} ${scope === "entire" ? "entire" : "detailed"} ${(category === "all" ? "report sets" : `${categoryCopy[category]} reports`).toLowerCase()} for export.`
    )
  }, [category, filteredReports.length, scope])

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {([
          {
            key: "total",
            label: "Ready to Generate",
            value: filteredReports.length,
            hint: "Matching current filters",
            iconTone: summaryIconTone.total,
          },
          {
            key: "agent",
            label: "Agent Reports",
            value: totalReportsByCategory.agent,
            hint: "Each & entire coverage",
            iconTone: summaryIconTone.agent,
          },
          {
            key: "call",
            label: "Call Reports",
            value: totalReportsByCategory.call,
            hint: "Outcomes & transcripts",
            iconTone: summaryIconTone.call,
          },
          {
            key: "system",
            label: "System Reports",
            value: totalReportsByCategory.system,
            hint: "Health & audit events",
            iconTone: summaryIconTone.system,
          },
        ] as const).map((metric) => {
          const Icon = summaryIcons[metric.key as keyof typeof summaryIcons]
          return (
            <Card key={metric.key} className="bg-muted/50 border-0 shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <Icon className={cn("size-4", metric.iconTone)} />
              </CardHeader>
              <CardContent className="space-y-1 pt-0">
                <div className="text-xl font-semibold text-foreground">
                  {metric.value}
                </div>
                <CardDescription className="text-xs">{metric.hint}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-muted/50 border-0 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Report Builder</CardTitle>
          <CardDescription className="text-xs">
            Choose the report category, scope, and output preferences before generating an export.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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
          <div className="flex flex-col gap-2 rounded-lg border border-dashed border-border/60 bg-background/60 p-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-foreground">
                {scopeCopy[scope]} report selection
              </p>
              <p className="text-[11px]">{summaryCopy[scope]}</p>
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
            {filteredReports.length
              ? `Showing ${filteredReports.length} result${filteredReports.length === 1 ? "" : "s"} that match your filters.`
              : "No reports match these filters. Adjust the scope or timeframe to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Report ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Report
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Scope
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Timeframe
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-border/50 last:border-b-0">
                    <td className="px-4 py-4 align-top">
                      <CopyButton
                        value={report.id}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 rounded-full font-mono text-[11px]"
                      >
                        {formatReportId(report.id)}
                      </CopyButton>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">
                          {report.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {report.description}
                        </p>
                        <p className="text-[11px] text-muted-foreground/75">
                          Last generated · {report.lastGenerated}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      {renderCategoryBadge(report.category)}
                    </td>
                    <td className="px-4 py-4 align-top">
                      {renderScopeBadge(report.scope)}
                    </td>
                    <td className="px-4 py-4 align-top">
                      {renderTimeframeBadge(
                        report.timeframeKey,
                        report.timeframeLabel
                      )}
                    </td>
                    <td className="px-4 py-4 align-top">
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
