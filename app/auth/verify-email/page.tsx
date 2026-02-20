"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-van-black via-background to-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-accent" />
          </div>

          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Check Your Email
            </h1>
            <p className="text-muted-foreground">
              We've sent a confirmation link to your email address. Click it to verify your account and start exploring.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or try signing up again.
            </p>
          </div>

          <Link
            href="/auth/login"
            className="inline-block px-6 py-2 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
