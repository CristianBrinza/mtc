import os
import sys
import shutil

# Determine the directory of the current script
current_script_dir = os.path.dirname(os.path.abspath(__file__))

# Check if an argument was provided
if len(sys.argv) < 2:
    print("Usage: python3 script.py <directmail>")
    sys.exit(1)

# Use the provided argument as the directmail
directmail = sys.argv[1]


# List of files to process with your preferred declaration
files = ["../directmail/"+directmail+".html"]

# Strings to find and their replacements
replacements = {
    "../directmail/assets/images/"+directmail+"/": "https://moldtelecom.md/new/images/directmail/"+directmail+"/",
     "../webkit/fonts/": "/fonts/"
}

# Output directory, adjusted to be relative to the current script's directory
output_dir = os.path.join(current_script_dir, 'production')

# Source and destination directories for copying
source_dir = os.path.join(current_script_dir, f'../directmail/assets/images/{directmail}')
dest_dir = os.path.join(output_dir, 'images')

# Create the output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

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