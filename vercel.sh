#!/bin/bash

# Print environment information
echo "Python version:"
python --version

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements-vercel.txt

# List installed packages
echo "Installed packages:"
pip list

# Print directory structure
echo "Directory structure:"
ls -la

echo "Static directory:"
ls -la static

echo "Templates directory:"
ls -la templates

echo "Setup complete"