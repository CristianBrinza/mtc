import os

# Determine the directory of the current script
current_script_dir = os.path.dirname(os.path.abspath(__file__))



#landing
landing= 'esim'
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
    "assets/"+landing+"/images/" : "https://moldtelecom.md/new/images/landings/personal/"+landing+"/"
}

# Output directory, adjusted to be relative to the current script's directory
output_dir = os.path.join(current_script_dir, 'production')

# Create the output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

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
