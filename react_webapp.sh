# #!/bin/bash

# # Define the necessary directories
# TARGET_DIR="/www/wwwroot/cnkav-all"  # Final directory where files were moved
# REACT_APP_DIR="$TARGET_DIR/react-webapp"  # React app directory
# DIST_TARGET_DIR="/www/wwwroot/cnkav-website"  # Directory where 'dist' content will be copied
# BACKUP_DIR="/www/wwwroot/backupdata"  # Directory containing backup files

# # Navigate to the React app directory
# cd "$REACT_APP_DIR" || { echo "Failed to navigate to $REACT_APP_DIR"; exit 1; }

# # Remove the node_modules directory to avoid conflicts
# echo "Removing existing node_modules directory"
# rm -rf "$REACT_APP_DIR/node_modules"

# # Remove package-lock.json and yarn.lock if they exist
# echo "Removing package-lock.json and yarn.lock if they exist"
# rm -f "$REACT_APP_DIR/package-lock.json"
# rm -f "$REACT_APP_DIR/yarn.lock"

# # Clear npm cache to avoid potential issues with corrupted cache
# echo "Clearing npm cache"
# npm cache clean --force

# # Install yarn globally if not already installed
# if ! command -v yarn &> /dev/null; then
#     echo "Yarn not found. Installing yarn globally."
#     npm install -g yarn
# fi

# # Install dependencies using yarn
# echo "Running yarn install in $REACT_APP_DIR"
# yarn install

# # Check if yarn install was successful
# if [ $? -ne 0 ]; then
#     echo "yarn install failed."
#     exit 1
# fi

# # Run npm install to ensure all dependencies are installed
# echo "Running npm install in $REACT_APP_DIR"
# npm install

# # Check if npm install was successful
# if [ $? -ne 0 ]; then
#     echo "npm install failed."
#     exit 1
# fi

# # Run build using yarn
# echo "Running yarn build in $REACT_APP_DIR"
# yarn build

# # Check if yarn build was successful
# if [ $? -ne 0 ]; then
#     echo "yarn build failed."
#     exit 1
# fi

# # Ensure the target directory exists
# if [ ! -d "$DIST_TARGET_DIR" ]; then
#     echo "Target directory $DIST_TARGET_DIR does not exist. Creating it."
#     mkdir -p "$DIST_TARGET_DIR"
# fi

# # Copy the contents of the dist folder to the target website directory
# echo "Copying contents of dist folder to $DIST_TARGET_DIR"
# cp -r "$REACT_APP_DIR/dist/"* "$DIST_TARGET_DIR/"

# # Check if copying was successful
# if [ $? -ne 0 ]; then
#     echo "Failed to copy contents of dist folder to $DIST_TARGET_DIR."
#     exit 1
# fi

# # Change ownership of the target directory to www:www
# echo "Changing ownership of $DIST_TARGET_DIR to www:www"
# chown -R www:www "$DIST_TARGET_DIR"

# # Check if ownership change was successful
# if [ $? -ne 0 ]; then
#     echo "Failed to change ownership of $DIST_TARGET_DIR."
#     exit 1
# fi

# echo "React app dependencies installed, project built, dist folder content copied to $DIST_TARGET_DIR, and ownership changed to www:www"


#!/bin/bash

# Define the necessary directories
TARGET_DIR="/www/wwwroot/cnkav-all"  # Final directory where files were moved
REACT_APP_DIR="$TARGET_DIR/react-webapp"  # React app directory
DIST_TARGET_DIR="/www/wwwroot/cnkav-website"  # Directory where 'dist' content will be copied
BACKUP_DIR="/www/wwwroot/backupdata"  # Directory containing backup files
FINAL_DIST_DIR="/www/wwwroot/cnkav.com/dist"  # Final destination for dist content

# Navigate to the React app directory
cd "$REACT_APP_DIR" || { echo "Failed to navigate to $REACT_APP_DIR"; exit 1; }

# Remove the node_modules directory to avoid conflicts
echo "Removing existing node_modules directory"
rm -rf "$REACT_APP_DIR/node_modules"

# Remove package-lock.json and yarn.lock if they exist
echo "Removing package-lock.json and yarn.lock if they exist"
rm -f "$REACT_APP_DIR/package-lock.json"
rm -f "$REACT_APP_DIR/yarn.lock"

# Clear npm cache to avoid potential issues with corrupted cache
echo "Clearing npm cache"
npm cache clean --force

# Install yarn globally if not already installed
if ! command -v yarn &> /dev/null; then
    echo "Yarn not found. Installing yarn globally."
    npm install -g yarn
fi

# Install dependencies using yarn
echo "Running yarn install in $REACT_APP_DIR"
yarn install

# Check if yarn install was successful
if [ $? -ne 0 ]; then
    echo "yarn install failed."
    exit 1
fi

# Run npm install to ensure all dependencies are installed
echo "Running npm install in $REACT_APP_DIR"
npm install

# Check if npm install was successful
if [ $? -ne 0 ]; then
    echo "npm install failed."
    exit 1
fi

# Run build using yarn
echo "Running yarn build in $REACT_APP_DIR"
yarn build

# Check if yarn build was successful
if [ $? -ne 0 ]; then
    echo "yarn build failed."
    exit 1
fi

# Ensure the target directory exists
if [ ! -d "$DIST_TARGET_DIR" ]; then
    echo "Target directory $DIST_TARGET_DIR does not exist. Creating it."
    mkdir -p "$DIST_TARGET_DIR"
fi

# Copy the contents of the dist folder to the target website directory
echo "Copying contents of dist folder to $DIST_TARGET_DIR"
cp -r "$REACT_APP_DIR/dist/"* "$DIST_TARGET_DIR/"

# Check if copying was successful
if [ $? -ne 0 ]; then
    echo "Failed to copy contents of dist folder to $DIST_TARGET_DIR."
    exit 1
fi

# Change ownership of the target directory to www:www
echo "Changing ownership of $DIST_TARGET_DIR to www:www"
chown -R www:www "$DIST_TARGET_DIR"

# Check if ownership change was successful
if [ $? -ne 0 ]; then
    echo "Failed to change ownership of $DIST_TARGET_DIR."
    exit 1
fi

# Copy contents from $DIST_TARGET_DIR to the final destination
echo "Copying contents from $DIST_TARGET_DIR to $FINAL_DIST_DIR"
if [ ! -d "$FINAL_DIST_DIR" ]; then
    echo "Final destination directory $FINAL_DIST_DIR does not exist. Creating it."
    mkdir -p "$FINAL_DIST_DIR"
fi

cp -r "$DIST_TARGET_DIR/"* "$FINAL_DIST_DIR/"

# Check if the final copy was successful
if [ $? -ne 0 ]; then
    echo "Failed to copy contents from $DIST_TARGET_DIR to $FINAL_DIST_DIR."
    exit 1
fi

# Change ownership of the final destination directory to www:www
echo "Changing ownership of $FINAL_DIST_DIR to www:www"
chown -R www:www "$FINAL_DIST_DIR"

# Check if ownership change was successful
if [ $? -ne 0 ]; then
    echo "Failed to change ownership of $FINAL_DIST_DIR."
    exit 1
fi

echo "React app dependencies installed, project built, dist folder content copied to $DIST_TARGET_DIR, and ownership changed to www:www. Final content copied to $FINAL_DIST_DIR."


