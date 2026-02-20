import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          van_type: string | null;
          verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["users"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["users"]["Row"]>;
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          location: { type: "Point"; coordinates: [number, number] } | null;
          location_visible: boolean;
          last_gps_update: string | null;
          hosting_available: boolean;
          hosting_capacity: number | null;
          badges: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          image_url: string | null;
          location: { type: "Point"; coordinates: [number, number] } | null;
          likes_count: number;
          comments_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["posts"]["Row"], "id" | "likes_count" | "comments_count" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["posts"]["Row"]>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          event_type: "oil_change" | "meetup" | "workshop" | "caravan" | "rally" | "expo";
          location: { type: "Point"; coordinates: [number, number] };
          location_name: string;
          start_date: string;
          end_date: string;
          max_attendees: number | null;
          attendees_count: number;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["events"]["Row"], "id" | "attendees_count" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["events"]["Row"]>;
      };
      gps_shares: {
        Row: {
          id: string;
          user_id: string;
          location: { type: "Point"; coordinates: [number, number] };
          location_name: string | null;
          timestamp: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["gps_shares"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["gps_shares"]["Row"]>;
      };
    };
  };
};
