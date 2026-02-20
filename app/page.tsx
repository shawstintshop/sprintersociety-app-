'use client';
import Link from "next/link";
import { MapPin, Users, MessageCircle, Calendar, Home as HomeIcon, Zap } from "lucide-react";

export default function HomePage() {
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Where the <span className="text-accent">Open Road</span> Meets Your Tribe
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with 12,400+ verified van owners worldwide. Find your people, share the road, and never travel alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/map" className="px-8 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity">
              Explore the Map
            </Link>
            <Link href="/auth/signup" className="px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-card transition-colors">
              Join the Society
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-b border-border">
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">12,400+</div>
            <div className="text-sm text-muted-foreground mt-2">Verified Members</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">48</div>
            <div className="text-sm text-muted-foreground mt-2">Countries</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">2,300+</div>
            <div className="text-sm text-muted-foreground mt-2">Meetups Hosted</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: "Live Map", desc: "See verified members in real-time." },
            { icon: MessageCircle, title: "Connect", desc: "Message nearby van owners." },
            { icon: Calendar, title: "Events", desc: "Oil Change Saturdays & meetups." },
            { icon: Home, title: "Hosting", desc: "Stay at member properties." },
            { icon: Users, title: "Community", desc: "Forums and feeds." },
            { icon: Zap, title: "AI-Powered", desc: "Smart recommendations." },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-lg border border-border hover:bg-card transition-colors">
              <feature.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Join?</h2>
        <Link href="/auth/signup" className="px-8 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity inline-block">
          Get Started Today
        </Link>
      </section>
    </div>
  );
}
