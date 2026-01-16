# RTSP Livestream Overlay Web Application

A full-stack web application that allows users to play livestream videos and create, manage, and display custom overlays in real-time.

## Features

- RTSP/HLS livestream playback with Play/Pause controls
- Volume control for the video player
- Real-time overlay management (Text and Image overlays)
- Drag-and-drop overlay positioning
- Create, Read, Update, and Delete (CRUD) operations for overlays
- Responsive design for all screen sizes

## Technology Stack

### Frontend
- React (JavaScript only - .js and .jsx files)
- Vite (Development server and build tool)
- CSS3 for styling

### Backend
- Python Flask
- Supabase (PostgreSQL database)
- Flask-CORS for cross-origin requests

### Database
- Supabase PostgreSQL with Row Level Security (RLS)

## Project Structure

```
project/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── requirements.txt       # Python dependencies
│   └── .env.example          # Environment variables template
├── src/
│   ├── components/
│   │   ├── VideoPlayer.jsx   # Video player component
│   │   ├── OverlayForm.jsx   # Overlay creation/editing form
│   │   └── OverlayList.jsx   # List of active overlays
│   ├── services/
│   │   └── api.js            # API service for backend calls
│   ├── styles/
│   │   ├── VideoPlayer.css
│   │   ├── OverlayForm.css
│   │   └── OverlayList.css
│   ├── App.jsx               # Main application component
│   ├── App.css               # Main application styles
│   └── main.jsx              # Application entry point
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- pip (Python package manager)
- Supabase account (for database)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Database Setup (Supabase)

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Project Settings > API
4. The database table is created automatically via migration (see database schema below)

### 3. Backend Setup

```bash
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_project_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Frontend Setup

```bash
# From project root directory
npm install

# Create .env file in root directory
echo "VITE_SUPABASE_URL=your_supabase_project_url" > .env
echo "VITE_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env
```

## Running the Application

### Start the Backend Server

```bash
cd backend
python app.py
```

The Flask API will run on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
npm run dev
```

The React app will run on `http://localhost:5173`

### Access the Application

Open your browser and navigate to `http://localhost:5173`

## Using the Application

### 1. Setting Up a Stream

- Enter a stream URL in the input field
- The application supports:
  - HLS streams (.m3u8 files)
  - MP4 video files
  - RTSP streams (must be converted to HLS using FFmpeg or a conversion service)

**Example Stream URL:**
```
https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8
```

### 2. Playing the Stream

- Click the "Play" button to start the stream
- Use "Pause" to pause playback
- Adjust volume using the slider

### 3. Creating Overlays

**Text Overlay:**
1. Select "Text" as overlay type
2. Enter your text content
3. Adjust font size using the slider
4. Pick a color using the color picker
5. Set position using X and Y sliders
6. Click "Create Overlay"

**Image Overlay:**
1. Select "Image" as overlay type
2. Enter an image URL
3. Adjust width and height
4. Set position using X and Y sliders
5. Click "Create Overlay"

### 4. Managing Overlays

- **Edit:** Click the "Edit" button on any overlay to modify it
- **Delete:** Click the "Delete" button to remove an overlay
- **Drag & Drop:** Drag overlays from the list onto the video to reposition them

### 5. Converting RTSP to HLS

For RTSP streams, you need to convert them to HLS format. Here's how using FFmpeg:

```bash
ffmpeg -i rtsp://your-rtsp-url -c:v libx264 -c:a aac -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments output.m3u8
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Overlays
```
GET /overlays
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "text",
      "content": "Hello World",
      "position_x": 100,
      "position_y": 50,
      "width": 200,
      "height": 100,
      "font_size": 24,
      "color": "#FFFFFF",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### 2. Get Single Overlay
```
GET /overlays/<overlay_id>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "text",
    "content": "Hello World",
    "position_x": 100,
    "position_y": 50,
    "width": 200,
    "height": 100,
    "font_size": 24,
    "color": "#FFFFFF"
  }
}
```

#### 3. Create Overlay
```
POST /overlays
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "text",
  "content": "New Overlay",
  "position_x": 150,
  "position_y": 75,
  "width": 200,
  "height": 100,
  "font_size": 24,
  "color": "#FFFFFF"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "type": "text",
    "content": "New Overlay",
    "position_x": 150,
    "position_y": 75,
    "width": 200,
    "height": 100,
    "font_size": 24,
    "color": "#FFFFFF"
  }
}
```

#### 4. Update Overlay
```
PUT /overlays/<overlay_id>
Content-Type: application/json
```

**Request Body (partial update allowed):**
```json
{
  "content": "Updated Text",
  "position_x": 200,
  "position_y": 100
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "text",
    "content": "Updated Text",
    "position_x": 200,
    "position_y": 100,
    "width": 200,
    "height": 100,
    "font_size": 24,
    "color": "#FFFFFF"
  }
}
```

#### 5. Delete Overlay
```
DELETE /overlays/<overlay_id>
```

**Response:**
```json
{
  "success": true,
  "message": "Overlay deleted successfully"
}
```

## Database Schema

The application uses a single `overlays` table:

```sql
CREATE TABLE overlays (
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
```

## Building for Production

```bash
# Build the frontend
npm run build

# The build output will be in the dist/ directory
# You can serve it using any static file server
```

## Troubleshooting

### CORS Issues
- Make sure the Flask backend is running with CORS enabled
- Check that the API_BASE_URL in `src/services/api.js` matches your backend URL

### Video Not Playing
- Ensure the stream URL is in a browser-compatible format (HLS or MP4)
- Check browser console for errors
- Verify the stream URL is accessible

### Overlays Not Appearing
- Check that the backend server is running
- Verify database connection in backend
- Check browser console for API errors

## Demo Video Guide

To create a demo video, demonstrate:

1. **Starting the Application**
   - Show both frontend and backend running
   - Display the landing page

2. **Playing RTSP/HLS Livestream**
   - Enter a stream URL
   - Click Play button
   - Show video controls working

3. **Creating Text Overlay**
   - Fill out the overlay form with text
   - Adjust font size and color
   - Click Create Overlay
   - Show overlay appearing on video

4. **Creating Image Overlay**
   - Switch to image type
   - Enter an image URL
   - Adjust size and position
   - Show overlay appearing on video

5. **Editing Overlays**
   - Click Edit on an existing overlay
   - Modify properties
   - Show changes reflected in real-time

6. **Drag & Drop Repositioning**
   - Drag an overlay from the list
   - Drop it on the video
   - Show position updated

7. **Deleting Overlays**
   - Click Delete on an overlay
   - Show confirmation dialog
   - Verify overlay removed from video

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
# Livestream-Overlay-Application
