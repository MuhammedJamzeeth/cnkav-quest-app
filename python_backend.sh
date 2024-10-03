# #!/bin/bash

# # Define the necessary directories
# CLONE_DIR="/www/wwwroot/cnkav"  # Temporary directory for cloning
# TARGET_DIR="/www/wwwroot/cnkav-all"  # Final directory where files will be moved
# REPO_URL="git@github.com:cenklkavsut/cnkav.git"  # Repository URL
# BACKUP_DIR="/www/wwwroot/backupdata"  # Directory containing backup files

# # Remove the existing clone directory if it exists
# if [ -d "$CLONE_DIR" ]; then
#     echo "Removing existing clone directory: $CLONE_DIR"
#     rm -rf "$CLONE_DIR"
# fi

# # Create the necessary directories
# if [ ! -d "$CLONE_DIR" ]; then
#     echo "Creating temporary clone directory: $CLONE_DIR"
#     mkdir -p "$CLONE_DIR"
# fi

# if [ ! -d "$TARGET_DIR" ]; then
#     echo "Creating target directory: $TARGET_DIR"
#     mkdir -p "$TARGET_DIR"
# fi

# # Navigate to the clone directory
# cd "$CLONE_DIR" || { echo "Failed to navigate to $CLONE_DIR"; exit 1; }

# # Clean up any previous content in the clone directory
# echo "Cleaning up any old content in $CLONE_DIR"
# rm -rf "$CLONE_DIR"/*

# # Clone the repository
# echo "Cloning repository $REPO_URL"
# git clone "$REPO_URL" .

# # Check if cloning was successful
# if [ $? -ne 0 ]; then
#     echo "Failed to clone repository."
#     exit 1
# fi

# # Move the contents to the target directory
# echo "Moving contents to $TARGET_DIR"
# mv * "$TARGET_DIR"/

# # Copy the .env file from backupdata to python_backend directory
# echo "Copying .env file from $BACKUP_DIR to $TARGET_DIR/python_backend"
# cp "$BACKUP_DIR/.env" "$TARGET_DIR/python_backend/"

# # Navigate to the python_backend directory and activate virtual environment
# cd "$TARGET_DIR/python_backend" || { echo "Failed to navigate to python_backend"; exit 1; }

# # Stop any running Uvicorn server
# echo "Stopping any running Uvicorn server"
# pkill -f "uvicorn main:app"

# # Activate virtual environment
# echo "Activating virtual environment"
# source "$TARGET_DIR/python_backend/venv/bin/activate"

# # Install the required Python packages
# echo "Installing Python dependencies from requirements.txt"
# pip install -r requirements.txt

# # Start Uvicorn server in the background
# echo "Starting Uvicorn server"
# uvicorn main:app --host 0.0.0.0 --port 8000 &
# UVICORN_PID=$!

# # Disown the Uvicorn process and exit the script
# disown $UVICORN_PID
# exit 0


#!/bin/bash

# # Define the necessary directories
# CLONE_DIR="/www/wwwroot/cnkav"  # Temporary directory for cloning
# TARGET_DIR="/www/wwwroot/cnkav-all"  # Final directory where files will be moved
# REPO_URL="git@github.com:cenklkavsut/cnkav.git"  # Repository URL
# BACKUP_DIR="/www/wwwroot/backupdata"  # Directory containing backup files

# # Remove the existing clone directory if it exists
# if [ -d "$CLONE_DIR" ]; then
#     echo "Removing existing clone directory: $CLONE_DIR"
#     rm -rf "$CLONE_DIR"
# fi

# # Create the necessary directories
# mkdir -p "$CLONE_DIR" "$TARGET_DIR"

# # Navigate to the clone directory
# cd "$CLONE_DIR" || { echo "Failed to navigate to $CLONE_DIR"; exit 1; }

# # Clone the repository
# echo "Cloning repository $REPO_URL"
# git clone "$REPO_URL" .

# # Check if cloning was successful
# if [ $? -ne 0 ]; then
#     echo "Failed to clone repository."
#     exit 1
# fi

# # Synchronize the contents to the target directory (overwrites existing files)
# echo "Syncing contents to $TARGET_DIR"
# rsync -a --delete "$CLONE_DIR/" "$TARGET_DIR/"

# # Copy the .env file from backupdata to python_backend directory
# echo "Copying .env file from $BACKUP_DIR to $TARGET_DIR/python_backend"
# cp "$BACKUP_DIR/.env" "$TARGET_DIR/python_backend/"

# # Navigate to the python_backend directory
# cd "$TARGET_DIR/python_backend" || { echo "Failed to navigate to python_backend"; exit 1; }

# # Stop any running Uvicorn server
# echo "Stopping any running Uvicorn server"
# pkill -f "uvicorn main:app"

# # Check if the virtual environment exists, if not, create it
# if [ ! -d "venv" ]; then
#     echo "Creating Python virtual environment"
#     python3 -m venv venv
# fi

# # Activate the virtual environment
# echo "Activating virtual environment"
# source "venv/bin/activate"

# # Install the required Python packages
# echo "Installing Python dependencies from requirements.txt"
# pip install --upgrade pip  # Make sure pip is up-to-date
# pip install -r requirements.txt



# # # Activate virtual environment
# echo "Activating virtual environment"
# source "$TARGET_DIR/python_backend/venv/bin/activate"


# # Start Uvicorn server in the background
# echo "Starting Uvicorn server"
# uvicorn main:app --host 0.0.0.0 --port 8000 &
# UVICORN_PID=$!

# # Disown the Uvicorn process and exit the script
# disown $UVICORN_PID
# exit 0

#!/bin/bash

# Define the necessary directories
CLONE_DIR="/www/wwwroot/cnkav"  # Temporary directory for cloning
TARGET_DIR="/www/wwwroot/cnkav-all"  # Final directory where files will be moved
REPO_URL="git@github.com:cenklkavsut/cnkav.git"  # Repository URL
BACKUP_DIR="/www/wwwroot/backupdata"  # Directory containing backup files

# Remove the existing clone directory if it exists
if [ -d "$CLONE_DIR" ]; then
    echo "Removing existing clone directory: $CLONE_DIR"
    rm -rf "$CLONE_DIR"
fi

# Create the necessary directories
mkdir -p "$CLONE_DIR" "$TARGET_DIR"

# Navigate to the clone directory
cd "$CLONE_DIR" || { echo "Failed to navigate to $CLONE_DIR"; exit 1; }

# Clone the repository
echo "Cloning repository $REPO_URL"
git clone "$REPO_URL" .

# Check if cloning was successful
if [ $? -ne 0 ]; then
    echo "Failed to clone repository."
    exit 1
fi

# Synchronize the contents to the target directory (overwrites existing files)
echo "Syncing contents to $TARGET_DIR"
rsync -a --delete "$CLONE_DIR/" "$TARGET_DIR/"

# Copy the .env file from backupdata to python_backend directory
echo "Copying .env file from $BACKUP_DIR to $TARGET_DIR/python_backend"
cp "$BACKUP_DIR/.env" "$TARGET_DIR/python_backend/"

# Navigate to the python_backend directory
cd "$TARGET_DIR/python_backend" || { echo "Failed to navigate to python_backend"; exit 1; }

# Stop any running Uvicorn server
echo "Stopping any running Uvicorn server"
pkill -f "uvicorn main:app"

# Check if the virtual environment exists, if not, install necessary packages and create it
if [ ! -d "venv" ]; then
    echo "Installing python3-venv package"
    sudo apt update
    sudo apt install -y python3.12-venv

    # Create Python virtual environment
    echo "Creating Python virtual environment"
    python3 -m venv venv
fi

# Activate the virtual environment
echo "Activating virtual environment"
source "venv/bin/activate"

# Ensure pip is updated and install required Python packages using the --break-system-packages flag
echo "Upgrading pip and installing dependencies"
pip install --upgrade pip
pip install --break-system-packages -r requirements.txt

# Start Uvicorn server in the background
echo "Starting Uvicorn server"
uvicorn main:app --host 0.0.0.0 --port 8000 &
UVICORN_PID=$!

# Disown the Uvicorn process and exit the script
disown $UVICORN_PID
exit 0
