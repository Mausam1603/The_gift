from flask import Flask, render_template, jsonify, request, send_from_directory
import random
import os
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 50 Reasons Why I Love You - from your heart to his 💕
LOVE_REASONS = [
    "Your smile brightens my darkest days",
    "The way you laugh makes my heart skip a beat", 
    "You understand me like no one else does",
    "Your kindness towards others inspires me",
    "The way you look at me makes me feel special",
    "You always know how to make me feel better",
    "Your passion for life is contagious",
    "The sound of your voice soothes my soul",
    "You accept me for exactly who I am",
    "Your hugs are my favorite place to be",
    "You make every day feel like an adventure",
    "The way you care for me shows true love",
    "Your intelligence and wisdom amaze me",
    "You always put my happiness first",
    "The way you handle challenges with grace",
    "Your sense of humor brightens my world",
    "You make me feel safe and protected",
    "Your dreams and goals inspire me",
    "The way you remember little details about us",
    "You always know the right thing to say",
    "Your strength gives me strength",
    "The way you love my family and friends",
    "You make me want to be a better person",
    "Your patience with me is endless",
    "The way you dance with me in the kitchen",
    "You always believe in me when I don't",
    "Your cooking (or attempts) make me smile",
    "The way you hold my hand in public",
    "You make every moment feel magical",
    "Your morning messages start my day right",
    "The way you look when you're focused",
    "You always know when I need a hug",
    "Your random acts of kindness melt my heart",
    "The way you sing along to our songs",
    "You make me feel beautiful inside and out",
    "Your determination to succeed motivates me",
    "The way you comfort me when I'm sad",
    "You always make time for us",
    "Your silly faces make me laugh",
    "The way you protect and defend me",
    "You make every day feel like Valentine's Day",
    "Your love for animals shows your gentle heart",
    "The way you plan surprises for me",
    "You always know how to cheer me up",
    "Your confidence in us gives me confidence",
    "The way you look at me when I'm talking",
    "You make me feel like the most important person",
    "Your love makes me believe in love",
    "The way you say my name makes my heart flutter",
    "You are my best friend and my soulmate"
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/memory-box')
def memory_box():
    # Get list of uploaded photos
    photos = []
    if os.path.exists(app.config['UPLOAD_FOLDER']):
        for filename in os.listdir(app.config['UPLOAD_FOLDER']):
            if allowed_file(filename):
                photos.append(filename)
    
    return render_template('memory_box.html', photos=photos)

@app.route('/scratch-cards')
def scratch_cards():
    return render_template('scratch_cards.html')

@app.route('/upload', methods=['POST'])
def upload_photo():
    if 'photo' not in request.files:
        return jsonify({'error': 'No file selected'}), 400
    
    files = request.files.getlist('photo')
    uploaded_files = []
    
    for file in files:
        if file.filename == '':
            continue
            
        if file and allowed_file(file.filename):
            # Create unique filename
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            unique_id = str(uuid.uuid4())[:8]
            filename = secure_filename(file.filename)
            name, ext = os.path.splitext(filename)
            new_filename = f"{name}_{timestamp}_{unique_id}{ext}"
            
            # Save file
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
            file.save(file_path)
            uploaded_files.append(new_filename)
    
    return jsonify({
        'success': True,
        'message': f'Successfully uploaded {len(uploaded_files)} photo(s)',
        'files': uploaded_files
    })

@app.route('/delete-photo/<filename>', methods=['DELETE'])
def delete_photo(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({'success': True, 'message': 'Photo deleted successfully'})
    return jsonify({'error': 'File not found'}), 404

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/reasons')
def get_reasons():
    # Shuffle reasons for variety
    shuffled_reasons = LOVE_REASONS.copy()
    random.shuffle(shuffled_reasons)
    return jsonify({'reasons': shuffled_reasons})

if __name__ == '__main__':
    # Get port from environment variable (for production) or use 5000
    port = int(os.environ.get('PORT', 5000))
    # Use 0.0.0.0 to allow external connections
    app.run(host='0.0.0.0', port=port, debug=False) 