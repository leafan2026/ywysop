import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const snapshotPath = path.join(root, "data", "sop-docs.json");
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));

function slugFileName(index, section) {
  const n = String(index + 1).padStart(2, "0");
  return `${n}-${section.id}.md`;
}

function quote(value = "") {
  return JSON.stringify(String(value));
}

function frontmatter(data) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null || value === "") continue;
    if (typeof value === "number" || typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${quote(value)}`);
    }
  }
  lines.push("---", "");
  return lines.join("\n");
}

const meta = {
  schemaVersion: 1,
  updatedAt: new Date().toISOString(),
  docs: snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      label: doc.label,
      outputFile: doc.outputFile,
      title: doc.title,
      globalNavBrand: doc.globalNavBrand,
      docBrand: doc.docBrand,
      version: doc.version,
      eyebrow: doc.eyebrow,
      h1: doc.h1,
      lede: doc.lede,
      publishStatus: doc.publishStatus,
      publishNote: doc.publishNote,
      tocGroups: doc.tocGroups,
      sections: doc.sections.map((section, index) => ({
        id: section.id,
        file: `${doc.id}/${slugFileName(index, section)}`,
      })),
    };
  }),
};

const contentRoot = path.join(root, "content");
fs.mkdirSync(contentRoot, { recursive: true });
fs.writeFileSync(path.join(contentRoot, "sop-docs.meta.json"), `${JSON.stringify(meta, null, 2)}\n`);

for (const doc of snapshot.docs) {
  const docDir = path.join(contentRoot, doc.id);
  fs.mkdirSync(docDir, { recursive: true });

  doc.sections.forEach((section, index) => {
    const filePath = path.join(docDir, slugFileName(index, section));
    const md = `${frontmatter({
      id: section.id,
      title: section.title || section.section_title || section.id,
      sort: section.sortOrder ?? section.sort_order ?? (index + 1) * 10,
      status: section.status || "active",
      context: section.context,
      screenshotNeed: section.screenshotNeed,
      mcpVerifyStatus: section.mcpVerifyStatus,
      mcpVerifyNote: section.mcpVerifyNote,
    })}${String(section.bodyHtml || section.body_html || "").trim()}\n`;

    fs.writeFileSync(filePath, md);
  });
}

console.log(`Extracted ${snapshot.docs.length} docs to content/`);
