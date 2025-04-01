import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Image src="/images/logo-dark.svg" alt="Conduit AI" width={60} height={60} priority />
          <h1 className="mt-4 text-2xl font-medium">Create your workspace</h1>
        </div>

        <div className="rounded-lg bg-card p-12">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Workspace
              </label>
              <Input
                id="workspace"
                name="workspace"
                type="text"
                placeholder="Your workspace name"
                required
                className="w-full rounded bg-input px-4 py-2"
              />
            </div>

            <Button type="submit" className="w-full bg-[#542CDE] text-white hover:bg-[#542CDE]/90">
              Create Workspace
            </Button>
          </form>
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
