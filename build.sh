#!/bin/bash

# Install dependencies
pip install -r requirements.txt

# Print Python version for debugging
python --version

# Print installed packages for debugging
pip list

echo "Build completed successfully"