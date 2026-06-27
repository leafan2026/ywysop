import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "data", "sop-docs.json");
const outputPath = path.join(root, "完整工作流程文档.md");
const snapshot = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function decodeHtml(value = "") {
  return String(value)
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("｜", "|");
}

function parseAttrs(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([a-zA-Z_:.-]+)\s*=\s*"([^"]*)"/g)) {
    attrs[match[1]] = decodeHtml(match[2]);
  }
  return attrs;
}

function cleanInline(value = "") {
  return decodeHtml(value)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function normalizeBlankLines(value = "") {
  return value
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s+|\s+$/g, "");
}

function renderMarkdownTable(rows) {
  const cleaned = rows
    .map((row) => row.map((cell) => cleanInline(cell).replace(/\n+/g, "<br>")))
    .filter((row) => row.some(Boolean));
  if (!cleaned.length) return "";

  const columnCount = Math.max(...cleaned.map((row) => row.length));
  const padded = cleaned.map((row) => {
    const next = [...row];
    while (next.length < columnCount) next.push("");
    return next;
  });

  const header = padded[0];
  const separator = Array.from({ length: columnCount }, () => "---");
  const body = padded.slice(1);
  return [
    `| ${header.join(" | ")} |`,
    `| ${separator.join(" | ")} |`,
    ...body.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function stripTags(value = "") {
  return cleanInline(
    String(value)
      .replace(/<span class="arrow">[\s\S]*?<\/span>/g, " → ")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<[^>]+>/g, " ")
  );
}

function escapeMermaidLabel(value = "") {
  return stripTags(value).replaceAll('"', '\\"');
}

function findBalancedDivEnd(html, startIndex) {
  const tokenRe = /<\/?div\b[^>]*>/gi;
  tokenRe.lastIndex = startIndex;
  let depth = 0;
  let match;
  while ((match = tokenRe.exec(html))) {
    const isClosing = /^<\//.test(match[0]);
    depth += isClosing ? -1 : 1;
    if (depth === 0) return tokenRe.lastIndex;
  }
  return -1;
}

function replaceBalancedDivs(html, className, renderBlock) {
  let result = "";
  let cursor = 0;
  const startRe = new RegExp(`<div\\b(?=[^>]*class="[^"]*${className}[^"]*")[^>]*>`, "gi");
  let match;
  while ((match = startRe.exec(html))) {
    const start = match.index;
    const end = findBalancedDivEnd(html, start);
    if (end === -1) break;
    result += html.slice(cursor, start);
    result += renderBlock(html.slice(start, end));
    cursor = end;
    startRe.lastIndex = end;
  }
  return result + html.slice(cursor);
}

function extractElementsByClass(html, classPattern) {
  const elements = [];
  const tagRe = /<([a-zA-Z0-9-]+)\b([^>]*)>/g;
  let match;
  while ((match = tagRe.exec(html))) {
    const [raw, tagName, attrs] = match;
    const classValue = (attrs.match(/class="([^"]*)"/) || [])[1] || "";
    if (!classPattern.test(classValue)) continue;
    const close = new RegExp(`</${tagName}>`, "i");
    close.lastIndex = tagRe.lastIndex;
    const rest = html.slice(tagRe.lastIndex);
    const closeMatch = close.exec(rest);
    if (!closeMatch) continue;
    const inner = rest.slice(0, closeMatch.index);
    elements.push(stripTags(inner));
  }
  return elements.filter(Boolean);
}

function renderFlowCanvas(block) {
  const hasBranches = /class="[^"]*\bpaths\b/.test(block);
  const start = extractElementsByClass(block, /\bstep--decision\b/)[0];

  if (hasBranches && start) {
    const branches = [];
    const branchRe = /<div\b(?=[^>]*class="[^"]*\bpath\b[^"]*")[^>]*>/gi;
    let match;
    while ((match = branchRe.exec(block))) {
      const end = findBalancedDivEnd(block, match.index);
      if (end === -1) break;
      const branch = block.slice(match.index, end);
      const labels = extractElementsByClass(branch, /\b(path-tag|step)\b/);
      if (labels.length) branches.push(labels);
      branchRe.lastIndex = end;
    }

    if (branches.length) {
      const lines = ["```mermaid", "flowchart LR", `  start["${escapeMermaidLabel(start)}"]`];
      branches.forEach((labels, branchIndex) => {
        let previous = "start";
        labels.forEach((label, labelIndex) => {
          const id = `b${branchIndex}_${labelIndex}`;
          lines.push(`  ${previous} --> ${id}["${escapeMermaidLabel(label)}"]`);
          previous = id;
        });
      });
      lines.push("```");
      return lines.join("\n");
    }
  }

  const labels = extractElementsByClass(block, /\bstep\b/);
  if (labels.length >= 2) {
    const lines = ["```mermaid", "flowchart LR"];
    labels.forEach((label, index) => {
      lines.push(`  n${index + 1}["${escapeMermaidLabel(label)}"]`);
      if (index > 0) lines.push(`  n${index} --> n${index + 1}`);
    });
    lines.push("```");
    return lines.join("\n");
  }

  return `> 流程：${stripTags(block)}`;
}

function renderDecisionTree(block) {
  const question = stripTags((block.match(/<div class="dtree-q">([\s\S]*?)<\/div>/) || [])[1] || "决策");
  const branches = [];
  const branchRe = /<div\b(?=[^>]*class="[^"]*\bdtree-branch\b[^"]*")[^>]*>/gi;
  let match;
  while ((match = branchRe.exec(block))) {
    const end = findBalancedDivEnd(block, match.index);
    if (end === -1) break;
    const branch = block.slice(match.index, end);
    const tag = stripTags((branch.match(/<span class="[^"]*\bdtree-tag\b[^"]*">([\s\S]*?)<\/span>/) || [])[1] || "分支");
    const body = htmlToMarkdown((branch.match(/<div class="dtree-body">([\s\S]*?)<\/div>/) || [])[1] || "");
    branches.push({ tag, body });
    branchRe.lastIndex = end;
  }

  if (!branches.length) return `**${question}**\n\n${stripTags(block)}`;

  return `**${question}**\n\n${branches
    .map((branch) => `- **${branch.tag}**：${branch.body.replace(/\n/g, "\n  ")}`)
    .join("\n")}`;
}

function protectMarkdownBlock(blocks, content) {
  const index = blocks.push(content) - 1;
  return `\n\n@@MDBLOCK${index}@@\n\n`;
}

function preprocessHtml(html, protectedBlocks) {
  let next = html;
  next = replaceBalancedDivs(next, "flow-canvas", (block) => protectMarkdownBlock(protectedBlocks, renderFlowCanvas(block)));
  next = replaceBalancedDivs(next, "dtree", (block) => protectMarkdownBlock(protectedBlocks, renderDecisionTree(block)));
  return next;
}

function htmlToMarkdown(html, options = {}) {
  const protectedBlocks = options.protectedBlocks || [];
  if (!options.preprocessed) html = preprocessHtml(html, protectedBlocks);
  let output = "";
  const links = [];
  const lists = [];
  const tables = [];
  const elements = [];
  let skipTagDepth = 0;
  let codeDepth = 0;

  const append = (value) => {
    if (!value || skipTagDepth) return;
    const currentTable = tables[tables.length - 1];
    if (currentTable?.currentCell !== undefined) {
      currentTable.currentCell += value;
      return;
    }
    output += value;
  };

  const newline = (count = 1) => {
    if (skipTagDepth) return;
    const currentTable = tables[tables.length - 1];
    if (currentTable?.currentCell !== undefined) {
      currentTable.currentCell += " ";
      return;
    }
    const wanted = "\n".repeat(count);
    output = output.replace(/[ \t]+$/g, "");
    if (!output.endsWith(wanted)) output += wanted;
  };

  const tokenRe = /<!--[\s\S]*?-->|<![^>]*>|<\/?[^>]+>|[^<]+/g;
  for (const token of html.match(tokenRe) || []) {
    if (token.startsWith("<!--") || token.startsWith("<!")) continue;

    if (!token.startsWith("<")) {
      const text = decodeHtml(token).replace(/\s+/g, " ");
      append(codeDepth ? text : text);
      continue;
    }

    const isClosing = /^<\//.test(token);
    const tagName = (token.match(/^<\/?\s*([a-zA-Z0-9-]+)/) || [])[1]?.toLowerCase();
    if (!tagName) continue;
    const closingElement = isClosing
      ? (() => {
          const index = elements.map((entry) => entry.tagName).lastIndexOf(tagName);
          if (index === -1) return { tagName, className: "" };
          const [entry] = elements.splice(index, elements.length - index);
          return entry;
        })()
      : null;

    if (skipTagDepth) {
      if (!isClosing && ["script", "style", "svg"].includes(tagName)) skipTagDepth += 1;
      if (isClosing && ["script", "style", "svg"].includes(tagName)) skipTagDepth -= 1;
      continue;
    }

    if (!isClosing && ["script", "style", "svg"].includes(tagName)) {
      skipTagDepth = 1;
      continue;
    }

    const attrs = isClosing ? {} : parseAttrs(token);
    const className = attrs.class || "";

    if (!isClosing && tagName === "span" && className.includes("loc-pin")) continue;
    if (!isClosing && tagName !== "br" && tagName !== "img" && !token.endsWith("/>")) {
      elements.push({ tagName, className });
    }

    if (!isClosing) {
      if (/^h[1-6]$/.test(tagName)) {
        const level = Math.min(Number(tagName.slice(1)) + 1, 6);
        newline(2);
        append(`${"#".repeat(level)} `);
        continue;
      }
      if (tagName === "p") {
        newline(2);
        continue;
      }
      if (tagName === "br") {
        newline(1);
        continue;
      }
      if (["section", "article", "div"].includes(tagName)) {
        if (className.includes("notice")) {
          newline(2);
          append("> ");
        } else if (className.includes("op-row")) {
          newline(1);
        } else if (className.includes("op-unit") || className.includes("case-card")) {
          newline(2);
        }
        continue;
      }
      if (tagName === "span" && className.includes("op-label")) {
        newline(1);
        append("- **");
        continue;
      }
      if (tagName === "table") {
        tables.push({ rows: [], currentRow: null, currentCell: undefined });
        continue;
      }
      if (tagName === "tr") {
        const currentTable = tables[tables.length - 1];
        if (currentTable) currentTable.currentRow = [];
        continue;
      }
      if (tagName === "td" || tagName === "th") {
        const currentTable = tables[tables.length - 1];
        if (currentTable) currentTable.currentCell = "";
        continue;
      }
      if (tagName === "ul" || tagName === "ol") {
        lists.push({ type: tagName, index: 0 });
        newline(1);
        continue;
      }
      if (tagName === "li") {
        const list = lists[lists.length - 1] || { type: "ul", index: 0 };
        list.index += 1;
        newline(1);
        append(`${"  ".repeat(Math.max(lists.length - 1, 0))}${list.type === "ol" ? `${list.index}.` : "-"} `);
        continue;
      }
      if (tagName === "a") {
        links.push(attrs.href || "");
        append("[");
        continue;
      }
      if (tagName === "img") {
        const alt = attrs.alt || "图片";
        const src = attrs.src || "";
        newline(2);
        append(`![${alt}](${src})`);
        newline(2);
        continue;
      }
      if (tagName === "strong" || tagName === "b") {
        append("**");
        continue;
      }
      if (tagName === "em" || tagName === "i") {
        append("*");
        continue;
      }
      if (tagName === "code") {
        codeDepth += 1;
        append("`");
        continue;
      }
      continue;
    }

    if (/^h[1-6]$/.test(tagName) || tagName === "p") {
      newline(2);
      continue;
    }
    if (tagName === "span" && closingElement.className.includes("op-label")) {
      append("**：");
      continue;
    }
    if (["section", "article", "div"].includes(tagName)) {
      newline(1);
      continue;
    }
    if (tagName === "td" || tagName === "th") {
      const currentTable = tables[tables.length - 1];
      if (currentTable && currentTable.currentCell !== undefined) {
        currentTable.currentRow.push(currentTable.currentCell);
        currentTable.currentCell = undefined;
      }
      continue;
    }
    if (tagName === "tr") {
      const currentTable = tables[tables.length - 1];
      if (currentTable?.currentRow) {
        currentTable.rows.push(currentTable.currentRow);
        currentTable.currentRow = null;
      }
      continue;
    }
    if (tagName === "table") {
      const table = tables.pop();
      newline(2);
      append(renderMarkdownTable(table?.rows || []));
      newline(2);
      continue;
    }
    if (tagName === "ul" || tagName === "ol") {
      lists.pop();
      newline(1);
      continue;
    }
    if (tagName === "li") {
      newline(1);
      continue;
    }
    if (tagName === "a") {
      const href = links.pop();
      append(href ? `](${href})` : "]");
      continue;
    }
    if (tagName === "strong" || tagName === "b") {
      append("**");
      continue;
    }
    if (tagName === "em" || tagName === "i") {
      append("*");
      continue;
    }
    if (tagName === "code") {
      codeDepth = Math.max(codeDepth - 1, 0);
      append("`");
    }
  }

  return normalizeBlankLines(output)
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/@@MDBLOCK(\d+)@@/g, (_, index) => `\n\n${protectedBlocks[Number(index)] || ""}\n\n`);
}

function renderToc(doc) {
  const links = (doc.tocGroups || [])
    .flatMap((group) => group.links || [])
    .map((link) => `${link.sub ? "  - " : "- "}[${link.label}](#${link.id})`);
  return links.length ? `## 目录\n\n${links.join("\n")}\n` : "";
}

function renderDoc(doc) {
  const title = doc.h1 || doc.title || doc.label;
  const sections = (doc.sections || [])
    .filter((section) => (section.status || "") !== "archived")
    .map((section) => {
      const protectedBlocks = [];
      const html = preprocessHtml(section.bodyHtml || section.body_html || "", protectedBlocks);
      const body = htmlToMarkdown(html, { preprocessed: true, protectedBlocks });
      return `<a id="${section.id}"></a>\n\n${body}`;
    })
    .join("\n\n---\n\n");

  return normalizeBlankLines(`# ${title}

> ${[doc.label, doc.version].filter(Boolean).join(" · ")}

${doc.lede || ""}

${renderToc(doc)}

${sections}`);
}

const docs = Array.isArray(snapshot.docs) ? snapshot.docs : [];
const output = `${docs.map(renderDoc).join("\n\n---\n\n")}\n`;

fs.writeFileSync(outputPath, output);
console.log(`Rendered ${path.relative(root, outputPath)}`);
