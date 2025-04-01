import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

export default function WorkspaceSelectPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Image src="/images/logo-dark.svg" alt="Conduit AI" width={60} height={60} priority />
          <h1 className="mt-4 text-2xl font-medium">Select your workspace</h1>
        </div>

        <div className="rounded-lg bg-card p-12">
          <div className="flex flex-col space-y-2 max-h-[216px] overflow-y-auto pr-1">
            <Link href="/workspace/dashboard">
              <div className="flex cursor-pointer items-center justify-between rounded-lg bg-accent p-2 transition-colors hover:bg-accent/80">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#542CDE] text-white">
                    <span className="text-sm font-medium">AX</span>
                  </div>
                  <span className="ml-2 text-sm font-medium">Personal account</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </Link>

            <Link href="/workspace/dashboard">
              <div className="flex cursor-pointer items-center justify-between rounded-lg bg-accent p-2 transition-colors hover:bg-accent/80">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#542CDE] text-white">
                    <span className="text-sm font-medium">TC</span>
                  </div>
                  <span className="ml-2 text-sm font-medium">Team Conduit</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </Link>

            <Link href="/workspace/dashboard">
              <div className="flex cursor-pointer items-center justify-between rounded-lg bg-accent p-2 transition-colors hover:bg-accent/80">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#542CDE] text-white">
                    <span className="text-sm font-medium">AI</span>
                  </div>
                  <span className="ml-2 text-sm font-medium">AI Research Lab</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
