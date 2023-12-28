const cors = require("cors");
const express = require("express");
const { generatefile } = require("./generatefile");
const { executefile } = require("./executefile");
const { executefilepy } = require("./executefilepy");
const { executefilejava } = require("./executefilejava")
const { generateJavaFileName } = require("./javafilenamer");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
 app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ hello: "world" });
});

app.post("/run", async (req, res) => {
    try {
        const { language = "cpp", code } = req.body;
        console.log(language , code.length)
        if (!code) {
            return res.status(400).json({ success: false, error: "Code can't be empty or null" });
        }

        // Create a C file from the provided content
        const filepath = await generatefile(language, code);
        let output;

        
    if (language === "cpp") {
        output = await executefile(filepath);
      } else if (language === "java") {
        const javaFileName = generateJavaFileName(code); // Get the Java file name
        if (javaFileName) {
          const javaFilePath = `./path/to/java/files/${javaFileName}`;
          output = await executefilejava(javaFilePath);
        } else {
          return res.status(400).json({ success: false, error: "Invalid Java code format" });
        }
      } else {
        output = await executefilepy(filepath);
      }
        // Send the filepath and output as response
        return res.json({output });
    } catch (err) {
        return res.status(500).json({err});
    }
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});