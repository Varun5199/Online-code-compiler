// Updated Testing Script

// Functions for extracting class name and generating Java file name
function extractClassName(javaCode) {
    const publicClassRegex = /public\s+class\s+(\w+)\s*\{/;
    const match = javaCode.match(publicClassRegex);
    return match ? match[1] : null;
}

function generateJavaFileName(javaCode) {
    const className = extractClassName(javaCode);
    return className ? `${className}.java` : null;
}

// Test cases with hardcoded Java code strings
const testCases = [
    `
    public class MyClass {
        // Class content
    }
    `,
    `
    // Some comments
    public class AnotherClass {
        // Class content with multiple spaces
    }
    `,
    `
    public class ClassWithBrackets {
        // Class content with { curly braces }
    }
    `,
    `
    public class NoClassDeclaration {
        // Code without class declaration
    }
    `,
    `
    public class MultiClassDeclaration {
        // Multiple class declarations in one file
    }

    public class SecondClass {
        // Another class
    }
    `
];

// Execute the test cases
testCases.forEach((javaCode, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log("Java Code:\n", javaCode.trim());
    
    const className = extractClassName(javaCode);
    console.log("Extracted Class Name:", className);

    const fileName = generateJavaFileName(javaCode);
    console.log("Generated File Name:", fileName);

    console.log("\n-------------------------------\n");
});
