import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "data", "sop-docs.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const templates = {
  order: path.join(root, "templates", "order.html"),
  aftersales: path.join(root, "templates", "aftersales.html"),
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitTemplate(html) {
  const bodyIndex = html.indexOf("<body>");
  if (bodyIndex === -1) throw new Error("Template missing <body>");

  const scriptIndex = html.lastIndexOf("\n<script>");
  if (scriptIndex === -1) throw new Error("Template missing final <script>");

  return {
    headHtml: html.slice(0, bodyIndex),
    footerHtml: html.slice(scriptIndex),
  };
}

function replaceTitle(headHtml, title) {
  return headHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
}

function normalizeDocs(snapshot) {
  if (Array.isArray(snapshot.docs)) return snapshot.docs;
  throw new Error("data/sop-docs.json missing docs array");
}

function inferTocGroups(doc) {
  if (Array.isArray(doc.tocGroups) && doc.tocGroups.length) return doc.tocGroups;
  const links = (doc.sections || []).map((section) => ({
    id: section.id,
    label: section.title || section.section_title || section.id,
    sub: false,
  }));
  return [{ title: "", links }];
}

function renderToc(doc) {
  return inferTocGroups(doc)
    .map((group, index) => {
      const links = (group.links || [])
        .map((link) => {
          const className = link.sub ? ' class="sub"' : "";
          return `          <a href="#${escapeHtml(link.id)}"${className}>${escapeHtml(link.label)}</a>`;
        })
        .join("\n");

      if (index === 0 && !group.title) return links;
      return `        <div class="toc-group">\n${links}\n        </div>`;
    })
    .join("\n\n");
}

function renderHeader(doc) {
  const title = doc.h1 || doc.title || doc.label;
  const lede = doc.lede ? `\n        <p class="lede">${escapeHtml(doc.lede)}</p>` : "";
  return `      <header class="doc-header">
        <div class="eyebrow">${escapeHtml(doc.eyebrow || "")}</div>
        <h1>${escapeHtml(title)}</h1>${lede}
      </header>`;
}

function sectionStatus(section) {
  return section.status || section.publishStatus || section.publish_status || "";
}

function sectionBody(section) {
  return String(section.bodyHtml || section.body_html || "").trim();
}

function renderSections(doc) {
  return (doc.sections || [])
    .filter((section) => sectionStatus(section) !== "archived")
    .map((section) => {
      return `      <section id="${escapeHtml(section.id)}">\n${sectionBody(section)}\n      </section>`;
    })
    .join("\n\n");
}

function renderBody(doc) {
  return `<body>

<nav class="global-nav">
  <button class="nav-toggle" id="navToggle" aria-label="目录" aria-controls="sidebar" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <span class="global-nav-brand">${escapeHtml(doc.globalNavBrand || doc.global_nav_brand || "")}</span>
</nav>

<div class="nav-overlay" id="navOverlay"></div>

<div class="doc">

  <aside class="sidebar" id="sidebar">
    <div class="sidebar-inner">
      <div class="doc-brand">${escapeHtml(doc.docBrand || doc.doc_brand || doc.label || "")}</div>
      <div class="doc-version">${escapeHtml(doc.version || "")}</div>

      <nav class="toc">
${renderToc(doc)}
      </nav>
    </div>
  </aside>

  <main class="content">
    <div class="content-inner">

${renderHeader(doc)}

${renderSections(doc)}

    </div>
  </main>
</div>
`;
}

for (const doc of normalizeDocs(data)) {
  const templatePath = templates[doc.id];
  if (!templatePath) continue;

  const template = splitTemplate(fs.readFileSync(templatePath, "utf8"));
  const outputPath = path.join(root, doc.outputFile || `${doc.id}.html`);
  const html = `${replaceTitle(template.headHtml, doc.title || doc.label)}${renderBody(doc)}${template.footerHtml}`;

  fs.writeFileSync(outputPath, html);
  console.log(`Rendered ${path.relative(root, outputPath)}`);
}
