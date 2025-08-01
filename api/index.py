from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import random
from datetime import datetime
import sys
import os

# Add parent directory to path so we can import from app.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the Flask app from the parent directory
from app import app as flask_app

# This handler is required for Vercel serverless functions
def handler(request, context):
    return flask_app(request['method'], request['path'], request['headers'], request.get('body', ''))

# For local testing
if __name__ == '__main__':
    flask_app.run(debug=True)