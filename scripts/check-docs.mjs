import fs from "node:fs";
import path from "node:path";

const snapshot = JSON.parse(fs.readFileSync("data/sop-docs.json", "utf8"));
const emptyDocs = snapshot.docs.filter((doc) => !Array.isArray(doc.sections) || doc.sections.length === 0);
const missingOutputs = snapshot.docs
  .map((doc) => doc.outputFile)
  .filter(Boolean)
  .filter((file) => !fs.existsSync(path.resolve(file)));

if (emptyDocs.length || missingOutputs.length) {
  if (emptyDocs.length) console.error(`Docs without sections:\n${emptyDocs.map((doc) => `- ${doc.id}`).join("\n")}`);
  if (missingOutputs.length) console.error(`Missing rendered HTML:\n${missingOutputs.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

for (const doc of snapshot.docs) {
  if (!doc.outputFile) continue;
  const html = fs.readFileSync(path.resolve(doc.outputFile), "utf8");
  if (!html.includes("class=\"global-nav\"") || !html.includes("class=\"sidebar\"") || !html.includes("class=\"content\"")) {
    console.error(`${doc.outputFile} does not look like the SOP HTML template.`);
    process.exit(1);
  }
}

console.log(`OK: ${snapshot.docs.length} docs, ${missingOutputs.length} missing outputs.`);
