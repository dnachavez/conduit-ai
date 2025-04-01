"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef, useState, type KeyboardEvent, type ChangeEvent, useEffect } from "react"
import type React from "react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Image src="/images/logo-dark.svg" alt="Conduit AI" width={60} height={60} priority />
          <h1 className="mt-4 text-2xl font-medium">Sign in to your workspace</h1>
        </div>

        <div className="rounded-lg bg-card p-12">
          <form className="space-y-6">
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                An email has been sent to <span className="underline">your email</span> with a six-digit code
                to verify your workspace email address. Enter the verification code below to continue.
              </p>
              <OtpInput />
            </div>

            <Button type="submit" className="w-full bg-[#542CDE] text-white hover:bg-[#542CDE]/90">
              Continue
            </Button>

            <div className="mt-4 text-center">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
                Back to Login
              </Link>
            </div>
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

function OtpInput() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus the first input on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only allow digits
    if (!/^\d*$/.test(value)) return

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)

      // Focus the last input
      inputRefs.current[5]?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="h-12 w-12 rounded border border-input bg-input text-center text-lg font-medium focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          aria-label={`Digit ${index + 1} of OTP`}
        />
      ))}
    </div>
  )
}
