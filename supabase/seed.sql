-- Seed Seattle van owners and community data
-- Note: Replace auth.uid() with actual user IDs after auth setup

-- Sample Seattle locations (PostGIS format: POINT(longitude latitude))
-- Seattle coordinates: 47.6062° N, 122.3321° W

-- Insert sample users (these would be created via auth in production)
INSERT INTO public.users (id, email, full_name, bio, van_type, verified) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'alex@example.com', 'Alex & Kim', 'Exploring the Pacific Northwest', '2024 Sprinter 170 4x4', TRUE),
  ('550e8400-e29b-41d4-a716-446655440002', 'jordan@example.com', 'Jordan M.', 'Digital nomad from Seattle', '2022 Transit 250 HR', TRUE),
  ('550e8400-e29b-41d4-a716-446655440003', 'sarah@example.com', 'Sarah W.', 'Van life enthusiast', '1987 VW Vanagon', TRUE),
  ('550e8400-e29b-41d4-a716-446655440004', 'tom@example.com', 'Tom & Sarah', 'Traveling with our dogs', '2023 Revel 44E', TRUE),
  ('550e8400-e29b-41d4-a716-446655440005', 'mike@example.com', 'Mike T.', 'Mechanical engineer, van builder', '2020 Ford Transit Custom', TRUE),
  ('550e8400-e29b-41d4-a716-446655440006', 'emma@example.com', 'Emma L.', 'Photographer on the road', '2019 Sprinter 144', TRUE),
  ('550e8400-e29b-41d4-a716-446655440007', 'chris@example.com', 'Chris P.', 'Software dev, remote work', '2021 Mercedes Sprinter', TRUE),
  ('550e8400-e29b-41d4-a716-446655440008', 'lisa@example.com', 'Lisa & Mark', 'Retired travelers', '2022 Winnebago Revel', TRUE),
  ('550e8400-e29b-41d4-a716-446655440009', 'david@example.com', 'David R.', 'Adventure seeker', '2023 Ford Transit', TRUE),
  ('550e8400-e29b-41d4-a716-446655440010', 'rachel@example.com', 'Rachel K.', 'Yoga instructor, van life', '2020 Sprinter 170', TRUE),
  ('550e8400-e29b-41d4-a716-446655440011', 'james@example.com', 'James M.', 'Musician traveling', '2018 ProMaster', TRUE),
  ('550e8400-e29b-41d4-a716-446655440012', 'nina@example.com', 'Nina S.', 'Content creator', '2022 Sprinter 144', TRUE),
  ('550e8400-e29b-41d4-a716-446655440013', 'kevin@example.com', 'Kevin H.', 'Van maintenance expert', '2019 Transit 250', TRUE),
  ('550e8400-e29b-41d4-a716-446655440014', 'jessica@example.com', 'Jessica T.', 'Travel blogger', '2021 Revel', TRUE),
  ('550e8400-e29b-41d4-a716-446655440015', 'ryan@example.com', 'Ryan B.', 'Photographer & filmmaker', '2020 Sprinter 170 4x4', TRUE),
  ('550e8400-e29b-41d4-a716-446655440016', 'megan@example.com', 'Megan W.', 'Outdoor enthusiast', '2023 Transit Custom', TRUE),
  ('550e8400-e29b-41d4-a716-446655440017', 'andrew@example.com', 'Andrew L.', 'Van builder', '2022 Sprinter 144', TRUE),
  ('550e8400-e29b-41d4-a716-446655440018', 'sophia@example.com', 'Sophia P.', 'Digital marketer', '2021 Sprinter 170', TRUE),
  ('550e8400-e29b-41d4-a716-446655440019', 'daniel@example.com', 'Daniel C.', 'Mechanical engineer', '2020 Transit 250 HR', TRUE),
  ('550e8400-e29b-41d4-a716-446655440020', 'olivia@example.com', 'Olivia R.', 'Yoga & wellness coach', '2022 Revel 44E', TRUE);

-- Insert profiles with Seattle locations
INSERT INTO public.profiles (user_id, location, location_visible, hosting_available, hosting_capacity, badges) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', ST_SetSRID(ST_MakePoint(-122.3321, 47.6062), 4326), TRUE, TRUE, 2, ARRAY['verified', 'host', 'mechanic']),
  ('550e8400-e29b-41d4-a716-446655440002', ST_SetSRID(ST_MakePoint(-122.3400, 47.6100), 4326), TRUE, FALSE, NULL, ARRAY['verified', 'digital_nomad']),
  ('550e8400-e29b-41d4-a716-446655440003', ST_SetSRID(ST_MakePoint(-122.3250, 47.6150), 4326), TRUE, TRUE, 1, ARRAY['verified', 'host']),
  ('550e8400-e29b-41d4-a716-446655440004', ST_SetSRID(ST_MakePoint(-122.3500, 47.6000), 4326), TRUE, TRUE, 3, ARRAY['verified', 'host', 'family']),
  ('550e8400-e29b-41d4-a716-446655440005', ST_SetSRID(ST_MakePoint(-122.3350, 47.6080), 4326), TRUE, TRUE, 2, ARRAY['verified', 'host', 'mechanic', 'builder']),
  ('550e8400-e29b-41d4-a716-446655440006', ST_SetSRID(ST_MakePoint(-122.3300, 47.6120), 4326), TRUE, FALSE, NULL, ARRAY['verified', 'content_creator']),
  ('550e8400-e29b-41d4-a716-446655440007', ST_SetSRID(ST_MakePoint(-122.3450, 47.6050), 4326), TRUE, TRUE, 1, ARRAY['verified', 'host']),
  ('550e8400-e29b-41d4-a716-446655440008', ST_SetSRID(ST_MakePoint(-122.3200, 47.6180), 4326), TRUE, TRUE, 4, ARRAY['verified', 'host', 'senior']),
  ('550e8400-e29b-41d4-a716-446655440009', ST_SetSRID(ST_MakePoint(-122.3380, 47.6090), 4326), TRUE, FALSE, NULL, ARRAY['verified']),
  ('550e8400-e29b-41d4-a716-446655440010', ST_SetSRID(ST_MakePoint(-122.3320, 47.6110), 4326), TRUE, TRUE, 2, ARRAY['verified', 'host', 'wellness']),
  ('550e8400-e29b-41d4-a716-446655440011', ST_SetSRID(ST_MakePoint(-122.3400, 47.6070), 4326), TRUE, FALSE, NULL, ARRAY['verified', 'artist']),
  ('550e8400-e29b-41d4-a716-446655440012', ST_SetSRID(ST_MakePoint(-122.3280, 47.6140), 4326), TRUE, TRUE, 1, ARRAY['verified', 'host', 'content_creator']),
  ('550e8400-e29b-41d4-a716-446655440013', ST_SetSRID(ST_MakePoint(-122.3360, 47.6100), 4326), TRUE, TRUE, 2, ARRAY['verified', 'host', 'mechanic', 'expert']),
  ('550e8400-e29b-41d4-a716-446655440014', ST_SetSRID(ST_MakePoint(-122.3310, 47.6130), 4326), TRUE, FALSE, NULL, ARRAY['verified', 'content_creator']),
  ('550e8400-e29b-41d4-a716-446655440015', ST_SetSRID(ST_MakePoint(-122.3420, 47.6060), 4326), TRUE, TRUE, 2, ARRAY['verified', 'host', 'photographer']),
  ('550e8400-e29b-41d4-a716-446655440016', ST_SetSRID(ST_MakePoint(-122.3290, 47.6150), 4326), TRUE, FALSE, NULL, ARRAY['verified', 'outdoor_enthusiast']),
  ('550e8400-e29b-41d4-a716-446655440017', ST_SetSRID(ST_MakePoint(-122.3370, 47.6085), 4326), TRUE, TRUE, 1, ARRAY['verified', 'host', 'builder']),
  ('550e8400-e29b-41d4-a716-446655440018', ST_SetSRID(ST_MakePoint(-122.3330, 47.6125), 4326), TRUE, TRUE, 2, ARRAY['verified', 'host']),
  ('550e8400-e29b-41d4-a716-446655440019', ST_SetSRID(ST_MakePoint(-122.3390, 47.6095), 4326), TRUE, TRUE, 1, ARRAY['verified', 'host', 'mechanic']),
  ('550e8400-e29b-41d4-a716-446655440020', ST_SetSRID(ST_MakePoint(-122.3310, 47.6160), 4326), TRUE, TRUE, 2, ARRAY['verified', 'host', 'wellness']);

-- Insert events
INSERT INTO public.events (title, description, event_type, location, location_name, start_date, end_date, max_attendees, created_by) VALUES
  ('Oil Change Saturday', 'Community oil change workshop. Bring your van!', 'oil_change', ST_SetSRID(ST_MakePoint(-122.3321, 47.6062), 4326), 'Green Lake, Seattle', NOW() + INTERVAL '3 days', NULL, 20, '550e8400-e29b-41d4-a716-446655440005'),
  ('Seattle Van Meetup', 'Monthly gathering for van owners', 'meetup', ST_SetSRID(ST_MakePoint(-122.3300, 47.6150), 4326), 'Discovery Park, Seattle', NOW() + INTERVAL '7 days', NULL, 50, '550e8400-e29b-41d4-a716-446655440001'),
  ('Electrical Systems Workshop', 'Learn about 12V electrical systems', 'workshop', ST_SetSRID(ST_MakePoint(-122.3350, 47.6080), 4326), 'Georgetown, Seattle', NOW() + INTERVAL '10 days', NULL, 15, '550e8400-e29b-41d4-a716-446655440013'),
  ('Pacific Coast Caravan', 'Multi-day caravan down the coast', 'caravan', ST_SetSRID(ST_MakePoint(-122.3400, 47.6100), 4326), 'Seattle to Portland', NOW() + INTERVAL '14 days', NOW() + INTERVAL '21 days', 30, '550e8400-e29b-41d4-a716-446655440001'),
  ('Van Life Rally', 'Annual celebration of van life', 'rally', ST_SetSRID(ST_MakePoint(-122.3250, 47.6200), 4326), 'Rattlesnake Lake, North Bend', NOW() + INTERVAL '30 days', NOW() + INTERVAL '32 days', 100, '550e8400-e29b-41d4-a716-446655440008');

-- Insert GPS shares (recent locations)
INSERT INTO public.gps_shares (user_id, location, location_name, timestamp) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', ST_SetSRID(ST_MakePoint(-122.3321, 47.6062), 4326), 'Green Lake', NOW() - INTERVAL '5 minutes'),
  ('550e8400-e29b-41d4-a716-446655440002', ST_SetSRID(ST_MakePoint(-122.3400, 47.6100), 4326), 'Capitol Hill', NOW() - INTERVAL '10 minutes'),
  ('550e8400-e29b-41d4-a716-446655440003', ST_SetSRID(ST_MakePoint(-122.3250, 47.6150), 4326), 'Fremont', NOW() - INTERVAL '15 minutes'),
  ('550e8400-e29b-41d4-a716-446655440004', ST_SetSRID(ST_MakePoint(-122.3500, 47.6000), 4326), 'Ballard', NOW() - INTERVAL '20 minutes'),
  ('550e8400-e29b-41d4-a716-446655440005', ST_SetSRID(ST_MakePoint(-122.3350, 47.6080), 4326), 'University District', NOW() - INTERVAL '2 minutes'),
  ('550e8400-e29b-41d4-a716-446655440006', ST_SetSRID(ST_MakePoint(-122.3300, 47.6120), 4326), 'Queen Anne', NOW() - INTERVAL '30 minutes'),
  ('550e8400-e29b-41d4-a716-446655440007', ST_SetSRID(ST_MakePoint(-122.3450, 47.6050), 4326), 'Wallingford', NOW() - INTERVAL '45 minutes'),
  ('550e8400-e29b-41d4-a716-446655440008', ST_SetSRID(ST_MakePoint(-122.3200, 47.6180), 4326), 'Beacon Hill', NOW() - INTERVAL '1 hour'),
  ('550e8400-e29b-41d4-a716-446655440009', ST_SetSRID(ST_MakePoint(-122.3380, 47.6090), 4326), 'Eastlake', NOW() - INTERVAL '1 hour 30 minutes'),
  ('550e8400-e29b-41d4-a716-446655440010', ST_SetSRID(ST_MakePoint(-122.3320, 47.6110), 4326), 'Magnolia', NOW() - INTERVAL '2 hours');
