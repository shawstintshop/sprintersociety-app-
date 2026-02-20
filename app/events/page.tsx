"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, Users, Check } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  location_name: string;
  start_date: string;
  end_date: string | null;
  max_attendees: number | null;
  attendees_count: number;
  created_by: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [rsvped, setRsvped] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: true })
        .limit(20);

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.user) return;

      const event = events.find((e) => e.id === eventId);
      if (!event) return;

      // Update attendees count
      const { error } = await supabase
        .from("events")
        .update({ attendees_count: event.attendees_count + 1 })
        .eq("id", eventId);

      if (error) throw error;

      setRsvped((prev) => new Set([...prev, eventId]));
      fetchEvents();
    } catch (err) {
      console.error("Failed to RSVP:", err);
    }
  };

  const getEventColor = (type: string) => {
    const colors: Record<string, string> = {
      oil_change: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      meetup: "bg-green-500/10 border-green-500/20 text-green-400",
      workshop: "bg-purple-500/10 border-purple-500/20 text-purple-400",
      caravan: "bg-orange-500/10 border-orange-500/20 text-orange-400",
      rally: "bg-red-500/10 border-red-500/20 text-red-400",
      expo: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    };
    return colors[type] || "bg-accent/10 border-accent/20 text-accent";
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Events
        </h1>
        <p className="text-muted-foreground mb-8">
          Discover meetups, workshops, and caravans happening worldwide
        </p>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-border border-t-accent rounded-full"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No events scheduled yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    {/* Event Type Badge */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${getEventColor(event.event_type)}`}>
                      {event.event_type.replace("_", " ").toUpperCase()}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                      {event.title}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4">{event.description}</p>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.start_date).toLocaleDateString()} at{" "}
                        {new Date(event.start_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {event.location_name}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {event.attendees_count}{" "}
                        {event.max_attendees ? `/ ${event.max_attendees}` : ""} attending
                      </div>
                    </div>
                  </div>

                  {/* RSVP Button */}
                  <button
                    onClick={() => handleRSVP(event.id)}
                    disabled={rsvped.has(event.id)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
                      rsvped.has(event.id)
                        ? "bg-green-500/20 text-green-400 border border-green-500/20"
                        : "bg-accent text-accent-foreground hover:opacity-90"
                    }`}
                  >
                    {rsvped.has(event.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        Going
                      </>
                    ) : (
                      "RSVP"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
