"use client"

import * as React from "react"
import { ClipboardCheck, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip"

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  showTooltip?: boolean
  children?: React.ReactNode
  withButton?: boolean
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  size = "icon",
  showTooltip = true,
  children,
  withButton = true,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const handleCopy = React.useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // Ensure it doesn't trigger any parent click events
    
    try {
      // Properly await the clipboard API promise
      await navigator.clipboard.writeText(value);
      setHasCopied(true);
      
      // Reset state after 2 seconds
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  }, [value])

  const ButtonComponent = withButton && (
    <Button
      size={size}
      variant={variant}
      className={cn("", className)}
      onClick={handleCopy}
      {...props}
    >
      {hasCopied ? <ClipboardCheck className="size-3.5" /> : <Clipboard className="size-3.5" />}
      <span className="sr-only">Copy</span>
    </Button>
  )

  // If we have children, make them clickable for copy
  if (children) {
    const content = (
      <div className="flex items-center gap-1.5">
        <span
          onClick={handleCopy}
          className="cursor-pointer hover:text-primary transition-colors"
        >
          {children}
        </span>
        {withButton && ButtonComponent}
      </div>
    );

    if (!showTooltip) return content;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{content}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{hasCopied ? "Copied!" : "Click to copy"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Original behavior if no children
  if (!showTooltip) return ButtonComponent;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {ButtonComponent}
        </TooltipTrigger>
        <TooltipContent>
          <p>{hasCopied ? "Copied!" : "Copy"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 