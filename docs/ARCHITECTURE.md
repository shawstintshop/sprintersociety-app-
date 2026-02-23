# Vanciety Architecture

## Core Modules

- Authentication (Supabase)
- Profiles
- Map / Locations
- Posts / Feed
- Events + RSVP
- Hosting (future)

## Development Rules

1. All database changes must include migration in /database
2. All new features must include:
   - UI
   - API route or server action
   - DB contract
   - RLS policy
3. No direct DB access from client
