"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MapPin, MessageCircle, LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();

  const navLinks = [
    { label: "Map", href: "/map" },
    { label: "Posts", href: "/posts" },
    { label: "Events", href: "/events" },
    { label: "Hosting", href: "/hosting" },
    { label: "Forums", href: "/forums" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-accent">
            <MapPin className="w-6 h-6" />
            Sprinter Society
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/messages" className="p-2 hover:bg-card rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </Link>
                <Link href="/profile" className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                  {user.full_name || "Profile"}
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                  Join
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 hover:bg-card rounded-lg transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t border-border py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-accent hover:bg-card rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border pt-4 flex gap-2">
              {user ? (
                <button className="flex-1 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Sign Out
                </button>
              ) : (
                <>
                  <Link href="/auth/login" className="flex-1 px-4 py-2 rounded-lg border border-border text-center font-medium hover:bg-card transition-colors">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="flex-1 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-center font-medium hover:opacity-90 transition-opacity">
                    Join
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
