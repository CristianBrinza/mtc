import os
import sys
import shutil

# Function to delete folder and handle potential errors
def delete_folder(folder_path):
    try:
        shutil.rmtree(folder_path)
        return True
    except Exception as e:
        print(f"Error deleting folder {folder_path}: {e}")
        return False

# Determine the directory of the current script
current_script_dir = os.path.dirname(os.path.abspath(__file__))

# Check if an argument was provided
if len(sys.argv) < 2:
    print("Usage: python3 script.py <landing>")
    sys.exit(1)

# Use the provided argument as the landing
landing = sys.argv[1]

# List of files to process with your preferred declaration
files = ['../webkit/mtc_webkit_v2.css', 
         '../webkit/mtc_webkit_v2.js',
         "../landings/"+landing+".html"]

# Strings to find and their replacements
replacements = {
    "../webkit/new/html/": "/new/html/",
    "../webkit/fonts/": "/fonts/",
    "../webkit/mtc_webkit_v2.css" : "https://moldtelecom.md/new/js/mtc_webkit_v2.css",
    "../webkit/mtc_webkit_v2.js" : "https://moldtelecom.md/new/js/mtc_webkit_v2.js",
    "assets/"+landing+"/images/" : "https://moldtelecom.md/new/images/landings/personal/"+landing+"/",
    "assets/esim/files/": "https://moldtelecom.md/new/files/",
}

# Output directory, adjusted to be relative to the current script's directory
output_dir = os.path.join(current_script_dir, landing)

# If the output directory already exists, prompt the user for action
if os.path.exists(output_dir):
    user_choice = input(f"The folder {output_dir} already exists. Do you want to change it? [y/n]: ").strip().lower()
    if user_choice == 'y':
        if delete_folder(output_dir):
            print(f"Folder {output_dir} deleted successfully.")
        else:
            print("Failed to delete the existing folder. Exiting...")
            sys.exit(1)
    else:
        print("User opted not to change the existing folder. Exiting...")
        sys.exit(1)

# Recreate the output directory
os.makedirs(output_dir, exist_ok=True)

# Source and destination directories for copying
source_dir = os.path.join(current_script_dir, f'../landings/assets/{landing}')
dest_dir = os.path.join(output_dir, 'assets')

# Copy the entire directory
if os.path.exists(source_dir) and not os.path.exists(dest_dir):
    shutil.copytree(source_dir, dest_dir)
else:
    print(f"Source directory does not exist or destination already exists: {source_dir}")

# Process each file
for relative_path in files:
    try:
        # Construct the absolute file path
        file_path = os.path.join(current_script_dir, relative_path)

        # Open the current file for reading
        with open(file_path, 'r') as file:
            file_contents = file.read()

        # Perform the replacements
        for find, replace in replacements.items():
            file_contents = file_contents.replace(find, replace)

        # Extract the base filename
        base_filename = os.path.basename(file_path)

        # Construct the output file path
        output_file_path = os.path.join(output_dir, base_filename)

        # Write the modified content to the new file in the output directory
        with open(output_file_path, 'w') as file:
            file.write(file_contents)

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        continue

# Indicate completion
print("done")