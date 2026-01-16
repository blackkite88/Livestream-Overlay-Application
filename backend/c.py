from supabase import create_client

url = "https://pslsobrxebybykmwitvi.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzbHNvYnJ4ZWJ5YnlrbXdpdHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzOTQzNTIsImV4cCI6MjA4Mzk3MDM1Mn0.6dpWeC7xQ__sBMn9oBEZ6MBUqKo8KqcZywv3lCfyytI"

supabase = create_client(url, key)

print("connected")
