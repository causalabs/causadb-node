const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "../docs/classes/Model.md");
const outputDirectory = path.join(__dirname, "../docs/final/model");

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
}

// Read the original Markdown file
fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Split on \n## Methods
    const sections = data.split("\n## Methods");

    // Split the methods section into individual methods. Use \n### to split
    const methods = sections[1].split("\n### ");

    // Loop through each method and print the name
    methods.forEach((method, index) => {
        // Get name (e.g. ### setNodeTypes becomes setNodeTypes)
        const name = method.split("\n")[0].replace("### ", "");
        // Check if the name is not empty
        if (name) {
            // Add # prepended to the content and drop header level by 2
            const content = `# ${method}`.replace(/###/g, "#");

            // Write the method to a file
            fs.writeFile(
                path.join(outputDirectory, `${name}.md`),
                content,
                (err) => {
                    if (err) {
                        console.error("Error writing file:", err);
                        return;
                    }
                }
            );
        }
    });
});
