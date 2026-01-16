from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = Flask(__name__)

CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True
)

supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_ANON_KEY')
supabase = create_client(supabase_url, supabase_key)

@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    try:
        response = supabase.table('overlays').select('*').order('created_at').execute()
        return jsonify({
            'success': True,
            'data': response.data
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/overlays', methods=['POST'])
def create_overlay():
    try:
        data = request.get_json()

        overlay = {
            'type': data.get('type'),
            'content': data.get('content'),
            'position_x': data.get('position_x', 50),
            'position_y': data.get('position_y', 50),
            'width': data.get('width', 200),
            'height': data.get('height', 100),
            'font_size': data.get('font_size', 24),
            'color': data.get('color', '#FFFFFF')
        }

        response = supabase.table('overlays').insert(overlay).execute()

        return jsonify({
            'success': True,
            'data': response.data[0] if response.data else None
        }), 201
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/overlays/<overlay_id>', methods=['GET'])
def get_overlay(overlay_id):
    try:
        response = supabase.table('overlays').select('*').eq('id', overlay_id).execute()

        if not response.data:
            return jsonify({
                'success': False,
                'error': 'Overlay not found'
            }), 404

        return jsonify({
            'success': True,
            'data': response.data[0]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/overlays/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    try:
        data = request.get_json()

        update_data = {}
        if 'type' in data:
            update_data['type'] = data['type']
        if 'content' in data:
            update_data['content'] = data['content']
        if 'position_x' in data:
            update_data['position_x'] = data['position_x']
        if 'position_y' in data:
            update_data['position_y'] = data['position_y']
        if 'width' in data:
            update_data['width'] = data['width']
        if 'height' in data:
            update_data['height'] = data['height']
        if 'font_size' in data:
            update_data['font_size'] = data['font_size']
        if 'color' in data:
            update_data['color'] = data['color']

        update_data['updated_at'] = 'now()'

        response = supabase.table('overlays').update(update_data).eq('id', overlay_id).execute()

        if not response.data:
            return jsonify({
                'success': False,
                'error': 'Overlay not found'
            }), 404

        return jsonify({
            'success': True,
            'data': response.data[0]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/overlays/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    try:
        response = supabase.table('overlays').delete().eq('id', overlay_id).execute()

        return jsonify({
            'success': True,
            'message': 'Overlay deleted successfully'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'success': True,
        'message': 'API is running'
    }), 200

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8000, debug=True)

