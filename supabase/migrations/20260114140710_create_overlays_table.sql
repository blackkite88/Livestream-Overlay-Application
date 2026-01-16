/*
  # Create overlays table for RTSP livestream application

  1. New Tables
    - `overlays`
      - `id` (uuid, primary key) - Unique identifier for each overlay
      - `type` (text) - Type of overlay: 'text' or 'image'
      - `content` (text) - Text content or image URL
      - `position_x` (integer) - X coordinate position on video
      - `position_y` (integer) - Y coordinate position on video
      - `width` (integer) - Width of the overlay
      - `height` (integer) - Height of the overlay
      - `font_size` (integer) - Font size for text overlays (optional)
      - `color` (text) - Color for text overlays (optional)
      - `created_at` (timestamp) - Creation timestamp
      - `updated_at` (timestamp) - Last update timestamp

  2. Security
    - Enable RLS on `overlays` table
    - Add policy for public access (since this is a demo app)
*/

CREATE TABLE IF NOT EXISTS overlays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('text', 'image')),
  content text NOT NULL,
  position_x integer DEFAULT 50,
  position_y integer DEFAULT 50,
  width integer DEFAULT 200,
  height integer DEFAULT 100,
  font_size integer DEFAULT 24,
  color text DEFAULT '#FFFFFF',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE overlays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to overlays"
  ON overlays
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access to overlays"
  ON overlays
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access to overlays"
  ON overlays
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to overlays"
  ON overlays
  FOR DELETE
  TO anon
  USING (true);