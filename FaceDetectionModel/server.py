from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import subprocess
import os
import signal
import logging
from dotenv import load_dotenv
import sys
print(sys.executable)

load_dotenv()
# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# MongoDB connection
DATABASE_URL = os.getenv('DATABASE_URL')
PORT = os.getenv('PORT') or 4001
# DATABASE_URL = "mongodb+srv://ajitpatil7805:QdpB2XTMg2Rle5FR@project-0.hdzh7.mongodb.net/MyDatabase"
client = MongoClient(DATABASE_URL)
db = client['MyDatabase']
collection = db['results']
collection = db['count']

# Store the reference to the proctoring process
proctoring_process = None

@app.route('/api/start_proctoring', methods=['POST'])
def start_proctoring():
    global proctoring_process
    try:
        # Start the proctoring script
        proctoring_process = subprocess.Popen(['python', 'main.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return jsonify({"status": "success", "message": "Proctoring started!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
# @app.route('/api/start_proctoring', methods=['POST'])
# def start_proctoring():
#     global proctoring_process
#     try:
#         # Start the proctoring script
#         proctoring_process = subprocess.Popen(
#             ['python', './main.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
#         )
#         stdout, stderr = proctoring_process.communicate()
        
#         if stdout:
#             logging.info(f"Proctoring started successfully: {stdout.decode()}")
#         if stderr:
#             logging.error(f"Proctoring error: {stderr.decode()}")
        
#         return jsonify({"status": "success", "message": "Proctoring started!"}), 200
#     except Exception as e:
#         return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/api/stop_proctoring', methods=['POST'])
def stop_proctoring():
    global proctoring_process
    try:
        if proctoring_process and proctoring_process.poll() is None:
            os.kill(proctoring_process.pid, signal.SIGTERM)  # Send SIGTERM to the process
            proctoring_process = None  # Reset the process reference
            return jsonify({"status": "success", "message": "Proctoring stopped!"}), 200
        else:
            return jsonify({"status": "error", "message": "No active proctoring process."}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/send_results', methods=['POST'])
def send_results():
    data = request.get_json()

    if data:
        if isinstance(data, list):
            try:
                result = collection.insert_many(data)
                return jsonify({'status': 'success', 'inserted_ids': [str(id) for id in result.inserted_ids]}), 200
            except Exception as e:
                return jsonify({'status': 'error', 'message': str(e)}), 500
        elif isinstance(data, dict):
            try:
                result = collection.insert_one(data)
                return jsonify({'status': 'success', 'inserted_id': str(result.inserted_id)}), 200
            except Exception as e:
                return jsonify({'status': 'error', 'message': str(e)}), 500
        else:
            return jsonify({'status': 'error', 'message': 'Data must be a list or dictionary'}), 400
    else:
        return jsonify({'status': 'error', 'message': 'No data received'}), 400

@app.route('/api/tab_switch_count', methods=['POST'])
def tab_switch_count():
    # Attempt to get the JSON data from the request
    data = request.get_json()

    if data:
        if isinstance(data, list):
            try:
                result = collection.insert_many(data)
                return jsonify({'status': 'success', 'inserted_ids': [str(id) for id in result.inserted_ids]}), 200
            except Exception as e:
                return jsonify({'status': 'error', 'message': str(e)}), 500
        elif isinstance(data, dict):
            try:
                result = collection.insert_one(data)
                return jsonify({'status': 'success', 'inserted_id': str(result.inserted_id)}), 200
            except Exception as e:
                return jsonify({'status': 'error', 'message': str(e)}), 500
        else:
            return jsonify({'status': 'error', 'message': 'Data must be a list or dictionary'}), 400
    else:
        return jsonify({'status': 'error', 'message': 'No data received'}), 400
@app.route('/')
def home():
    return "Hello, World!"  
    
if __name__ == '__main__':
    app.run(port=PORT)  # Set the port to 4000

