#!/usr/bin/env node

/**
 * 🧹 Clean Unused Assets Script
 *
 * This script audits the project for unused assets and orphan components.
 * It scans /public for unused files and /components for orphan components.
 *
 * Usage: pnpm clean:assets
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Configuration
const CONFIG = {
  publicDir: path.join(__dirname, "..", "public"),
  srcDir: path.join(__dirname, "..", "src"),
  componentsDir: path.join(__dirname, "..", "src", "components"),

  // File extensions to scan for references
  codeExtensions: [".tsx", ".ts", ".css", ".scss", ".js", ".jsx"],

  // System files to exclude from cleanup
  excludedFiles: [
    "favicon.ico",
    "robots.txt",
    "sitemap.xml",
    ".DS_Store",
    ".gitkeep",
    "manifest.json",
    "apple-touch-icon.png",
    "og-image.png",
    "twitter-image.png",
  ],

  // Directories to exclude
  excludedDirs: [".next", "node_modules", ".git"],
};

// Colors for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

/**
 * Get all files recursively from a directory
 */
function getAllFiles(dir, extensions = null) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!CONFIG.excludedDirs.includes(item)) {
        files.push(...getAllFiles(fullPath, extensions));
      }
    } else {
      if (
        !extensions ||
        extensions.includes(path.extname(item).toLowerCase())
      ) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Get all public assets
 */
function getPublicAssets() {
  const assets = [];
  const files = getAllFiles(CONFIG.publicDir);

  for (const file of files) {
    const relativePath = path.relative(CONFIG.publicDir, file);
    const fileName = path.basename(file);

    if (!CONFIG.excludedFiles.includes(fileName)) {
      assets.push({
        fullPath: file,
        relativePath,
        fileName,
      });
    }
  }

  return assets;
}

/**
 * Get all source code content
 */
function getSourceCodeContent() {
  const codeFiles = getAllFiles(CONFIG.srcDir, CONFIG.codeExtensions);
  let allContent = "";

  for (const file of codeFiles) {
    try {
      allContent += fs.readFileSync(file, "utf-8");
    } catch (err) {
      console.error(`Error reading file: ${file}`);
    }
  }

  return allContent;
}

/**
 * Find unused assets in /public
 */
function findUnusedAssets() {
  console.log(
    `\n${colors.cyan}🔍 Scanning for unused assets...${colors.reset}\n`,
  );

  const assets = getPublicAssets();
  const sourceContent = getSourceCodeContent();
  const unusedAssets = [];

  for (const asset of assets) {
    // Check various ways the asset might be referenced
    const searchPatterns = [
      asset.fileName,
      `/${asset.relativePath}`,
      asset.relativePath.replace(/\\/g, "/"),
    ];

    let isUsed = false;
    for (const pattern of searchPatterns) {
      if (sourceContent.includes(pattern)) {
        isUsed = true;
        break;
      }
    }

    if (!isUsed) {
      unusedAssets.push(asset);
    }
  }

  return unusedAssets;
}

/**
 * Find orphan components (not imported anywhere)
 */
function findOrphanComponents() {
  console.log(
    `${colors.cyan}🔍 Scanning for orphan components...${colors.reset}\n`,
  );

  if (!fs.existsSync(CONFIG.componentsDir)) {
    return [];
  }

  const componentFiles = getAllFiles(CONFIG.componentsDir, [".tsx", ".ts"]);
  const allSourceFiles = getAllFiles(CONFIG.srcDir, CONFIG.codeExtensions);
  const orphanComponents = [];

  for (const componentFile of componentFiles) {
    const componentName = path.basename(
      componentFile,
      path.extname(componentFile),
    );

    // Skip index files and UI barrel exports
    if (componentName === "index" || componentName.startsWith("index.")) {
      continue;
    }

    let importCount = 0;

    for (const sourceFile of allSourceFiles) {
      // Don't count self-imports
      if (sourceFile === componentFile) continue;

      try {
        const content = fs.readFileSync(sourceFile, "utf-8");

        // Check for various import patterns
        const importPatterns = [
          `from "./${componentName}"`,
          `from './${componentName}'`,
          `from "@/components/${componentName}"`,
          `from '@/components/${componentName}'`,
          `import ${componentName}`,
          `{ ${componentName} }`,
          `{ ${componentName},`,
          `, ${componentName} }`,
          `, ${componentName},`,
        ];

        for (const pattern of importPatterns) {
          if (content.includes(pattern) || content.includes(componentName)) {
            importCount++;
            break;
          }
        }
      } catch (err) {
        // Ignore read errors
      }
    }

    // If only imported by index.ts (barrel export), still count as potentially orphan
    if (importCount <= 1) {
      orphanComponents.push({
        fullPath: componentFile,
        componentName,
        relativePath: path.relative(CONFIG.srcDir, componentFile),
      });
    }
  }

  return orphanComponents;
}

/**
 * Calculate total size of files
 */
function calculateTotalSize(files) {
  let totalBytes = 0;

  for (const file of files) {
    try {
      const stat = fs.statSync(file.fullPath);
      totalBytes += stat.size;
    } catch (err) {
      // Ignore errors
    }
  }

  if (totalBytes < 1024) {
    return `${totalBytes} B`;
  } else if (totalBytes < 1024 * 1024) {
    return `${(totalBytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

/**
 * Delete files with confirmation
 */
async function deleteFiles(files, type) {
  if (files.length === 0) {
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      `\n${colors.yellow}Delete ${files.length} unused ${type}? (y/n): ${colors.reset}`,
      (answer) => {
        rl.close();

        if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
          let deleted = 0;
          for (const file of files) {
            try {
              fs.unlinkSync(file.fullPath);
              console.log(
                `${colors.red}  ✗ Deleted: ${file.relativePath || file.fileName}${colors.reset}`,
              );
              deleted++;
            } catch (err) {
              console.error(
                `${colors.red}  Error deleting: ${file.fullPath}${colors.reset}`,
              );
            }
          }
          console.log(
            `\n${colors.green}✓ Successfully deleted ${deleted} files${colors.reset}`,
          );
        } else {
          console.log(`${colors.blue}ℹ Skipped deletion${colors.reset}`);
        }

        resolve();
      },
    );
  });
}

/**
 * Main function
 */
async function main() {
  console.log(
    `\n${colors.bold}${colors.magenta}═══════════════════════════════════════════════${colors.reset}`,
  );
  console.log(
    `${colors.bold}${colors.magenta}   🧹 Project Cleanup - Unused Asset Scanner    ${colors.reset}`,
  );
  console.log(
    `${colors.bold}${colors.magenta}═══════════════════════════════════════════════${colors.reset}`,
  );

  // Scan for unused assets
  const unusedAssets = findUnusedAssets();

  if (unusedAssets.length > 0) {
    console.log(
      `${colors.yellow}Found ${unusedAssets.length} unused assets in /public:${colors.reset}`,
    );
    console.log(
      `${colors.yellow}Total size: ${calculateTotalSize(unusedAssets)}${colors.reset}\n`,
    );

    for (const asset of unusedAssets) {
      console.log(`  ${colors.red}○${colors.reset} ${asset.relativePath}`);
    }

    await deleteFiles(unusedAssets, "assets");
  } else {
    console.log(
      `${colors.green}✓ No unused assets found in /public${colors.reset}`,
    );
  }

  // Scan for orphan components
  const orphanComponents = findOrphanComponents();

  if (orphanComponents.length > 0) {
    console.log(
      `\n${colors.yellow}Found ${orphanComponents.length} potentially orphan components:${colors.reset}\n`,
    );

    for (const component of orphanComponents) {
      console.log(`  ${colors.red}○${colors.reset} ${component.relativePath}`);
    }

    console.log(
      `\n${colors.blue}ℹ Review these components manually - they may be dynamically imported${colors.reset}`,
    );
    await deleteFiles(orphanComponents, "components");
  } else {
    console.log(`\n${colors.green}✓ No orphan components found${colors.reset}`);
  }

  console.log(
    `\n${colors.bold}${colors.magenta}═══════════════════════════════════════════════${colors.reset}`,
  );
  console.log(
    `${colors.green}   ✓ Cleanup scan complete!                    ${colors.reset}`,
  );
  console.log(
    `${colors.bold}${colors.magenta}═══════════════════════════════════════════════${colors.reset}\n`,
  );
}

// Run the script
main().catch(console.error);
