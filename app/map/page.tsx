"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import { MapPin, Navigation, Users, AlertCircle } from "lucide-react";
import { useGPSStore } from "@/lib/store";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface Member {
  id: string;
  full_name: string;
  van_type: string;
  avatar_url: string | null;
  location: { latitude: number; longitude: number };
  last_gps_update: string;
}

export default function MapPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tracking, setTracking] = useState(false);
  const { location, setLocation } = useGPSStore();
  const watchIdRef = useRef<number | null>(null);

  // Fetch nearby members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("gps_shares")
          .select(
            `
            user_id,
            location,
            timestamp,
            users:user_id (
              id,
              full_name,
              van_type,
              avatar_url
            )
          `
          )
          .order("timestamp", { ascending: false })
          .limit(50);

        if (fetchError) throw fetchError;

        const formattedMembers = data?.map((item: any) => ({
          id: item.user_id,
          full_name: item.users?.full_name || "Unknown",
          van_type: item.users?.van_type || "Van",
          avatar_url: item.users?.avatar_url,
          location: {
            latitude: item.location.coordinates[1],
            longitude: item.location.coordinates[0],
          },
          last_gps_update: item.timestamp,
        })) || [];

        setMembers(formattedMembers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch members");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();

    // Subscribe to realtime updates
    const subscription = supabase
      .channel("gps_shares")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "gps_shares" },
        () => {
          fetchMembers();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Start GPS tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    setTracking(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        setLocation({
          latitude,
          longitude,
          accuracy,
          timestamp: Date.now(),
        });

        // Share GPS location every 60 seconds
        try {
          const { data: session } = await supabase.auth.getSession();
          if (session?.user) {
            await supabase.from("gps_shares").insert([
              {
                user_id: session.user.id,
                location: `POINT(${longitude} ${latitude})`,
                location_name: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                timestamp: new Date().toISOString(),
              },
            ]);
          }
        } catch (err) {
          console.error("Failed to share GPS:", err);
        }
      },
      (err) => {
        setError(`GPS Error: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60000, // 60 seconds
        timeout: 5000,
      }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setTracking(false);
  };

  const defaultCenter: [number, number] = [47.6062, -122.3321]; // Seattle

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Live Map
          </h1>
          <p className="text-muted-foreground">
            See verified members in real-time. {members.length} members online.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-4 mb-6">
          <button
            onClick={tracking ? stopTracking : startTracking}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              tracking
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-accent text-accent-foreground hover:opacity-90"
            }`}
          >
            <Navigation className="w-4 h-4" />
            {tracking ? "Stop Sharing" : "Share My Location"}
          </button>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Members Online</div>
            <div className="text-2xl font-bold text-accent">{members.length}</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Your Location</div>
            <div className="text-xs text-muted-foreground mt-1">
              {location
                ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                : "Not tracking"}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Status</div>
            <div className={`text-sm font-semibold ${tracking ? "text-green-400" : "text-muted-foreground"}`}>
              {tracking ? "🟢 Live" : "⚪ Offline"}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-border border-t-accent rounded-full"></div>
            <p className="text-muted-foreground mt-4">Loading map...</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ height: "600px" }}>
            <MapContainer center={defaultCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />

              {/* Your location */}
              {location && (
                <Marker position={[location.latitude, location.longitude]}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">Your Location</p>
                      <p className="text-xs text-muted-foreground">
                        Accuracy: {location.accuracy.toFixed(0)}m
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* Member locations */}
              {members.map((member) => (
                <Marker
                  key={member.id}
                  position={[member.location.latitude, member.location.longitude]}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{member.full_name}</p>
                      <p className="text-xs text-muted-foreground">{member.van_type}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(member.last_gps_update).toLocaleTimeString()}
                      </p>
                      <button className="mt-2 px-2 py-1 rounded bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90">
                        Message
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {/* Members List */}
        <div className="mt-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            <Users className="w-6 h-6 inline mr-2" />
            Nearby Members
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {members.slice(0, 8).map((member) => (
              <div
                key={member.id}
                className="bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{member.full_name}</h3>
                    <p className="text-xs text-muted-foreground">{member.van_type}</p>
                  </div>
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {member.location.latitude.toFixed(4)}, {member.location.longitude.toFixed(4)}
                </p>
                <button className="w-full px-3 py-2 rounded-lg bg-accent/10 text-accent font-semibold text-sm hover:bg-accent/20 transition-colors">
                  Message
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
