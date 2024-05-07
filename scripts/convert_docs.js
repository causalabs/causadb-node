const fs = require("fs");
const path = require("path");

const inputDirectory = path.join(__dirname, "../docs/classes");
const outputBaseDirectory = path.join(__dirname, "../docs/final");

// Ensure the base output directory exists
if (!fs.existsSync(outputBaseDirectory)) {
    fs.mkdirSync(outputBaseDirectory);
}

// Read all files in the classes directory
fs.readdir(inputDirectory, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    files.forEach((file) => {
        if (file.endsWith(".md")) {
            // Process only markdown files
            const inputFile = path.join(inputDirectory, file);
            const outputDirectory = path.join(
                outputBaseDirectory,
                file.replace(".md", "")
            );

            // Ensure the output directory for this class exists
            if (!fs.existsSync(outputDirectory)) {
                fs.mkdirSync(outputDirectory);
            }

            // Read the Markdown file
            fs.readFile(inputFile, "utf8", (err, data) => {
                if (err) {
                    console.error("Error reading file:", err);
                    return;
                }

                // Split on \n## Methods if it exists
                const sections = data.split("\n## Methods");
                if (sections.length < 2) return; // No methods section, skip this file

                // Split the methods section into individual methods. Use \n### to split
                const methods = sections[1].split("\n### ");

                // Loop through each method
                methods.forEach((method) => {
                    if (method.trim()) {
                        // Ensure method is not empty
                        // Get name (e.g., setNodeTypes)
                        const name = method
                            .split("\n")[0]
                            .replace("### ", "")
                            .trim();
                        // Prepare content, adjusting header levels. Also replace links with only the text [`Data`](Data.md) -> `Data`
                        const content = `# ${name}\n${method
                            .substring(name.length)
                            .replace(/####/g, "##")
                            .replace(/###/g, "#")}`.replace(
                            /\[([^\]]+)\]\(([^)]+)\)/g,
                            "`$1`"
                        );

                        // Write the method to a file
                        fs.writeFile(
                            path.join(outputDirectory, `${name}.md`),
                            content,
                            (err) => {
                                if (err) {
                                    console.error(
                                        "Error writing file for",
                                        name,
                                        ":",
                                        err
                                    );
                                } else {
                                    console.log(`File written for ${name}`);
                                }
                            }
                        );
                    }
                });
            });
        }
    });
});
