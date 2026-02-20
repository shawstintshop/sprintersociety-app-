"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-accent mb-4">
              <MapPin className="w-6 h-6" />
              Sprinter Society
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting van owners worldwide. Find your people on the road.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              {["Map", "Posts", "Events", "Hosting", "Forums"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="text-muted-foreground hover:text-accent transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {["YouTube", "Brands", "Help", "Safety"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="text-muted-foreground hover:text-accent transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {["About", "Contact", "Privacy", "Terms"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="text-muted-foreground hover:text-accent transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Sprinter Society. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            v1.0.0 · Built for the road
          </p>
        </div>
      </div>
    </footer>
  );
}
