# SYSOP 明道云 Agent 工作区

这个仓库现在用于维护一个明道云自然语言操作 agent：用户可以在 Codex 或 Claude Code 里用自然语言查询、维护、更新、排查和搭建明道云能力。

SOP 帮助中心文件仍保留在仓库里，作为历史流程资料和业务参考；但本工作区的默认目标不再是发布 SOP 页面。Agent 进入本目录时应先读 `AGENTS.md`。

## Agent 入口

- `AGENTS.md`：唯一权威工作契约。
- `CODEX.md`：Codex 薄指针。
- `CLAUDE.md`：Claude Code 薄指针。
- `项目记忆_SYSOP明道云Agent.md`：项目定位和当前记忆。
- `明道云操作边界.md`：哪些动作可直接做、哪些必须确认。
- `明道云应用索引.md`：应用、工作表、视图、字段 ID 索引。
- `操作日志.md`：重要操作和结论沉淀。

## 历史 SOP 资料

以下内容是历史 SOP 帮助中心构建资料，仍可作为业务流程参考：

维护方式不是手改整份 HTML，也不是把长正文塞进明道云字段，而是：

```text
content/**/*.md 章节源文件
-> data/sop-docs.json 构建快照
-> templates/*.html 样式模板
-> 生成最终 HTML
```

## 当前结论

- 正文源文件在 `content/`。
- 每个 SOP 章节对应一个 `.md` 文件。
- `data/sop-docs.json` 是构建产物，不是人工维护源。
- 明道云《流程中枢》保留为字段视图映射、截图状态、风险动作确认和版本核实台账，不再作为正文维护源。

## 目录

```text
.
├── index.html
├── 订单全流程SOP.html
├── 售后标准工作流程.html
├── templates/
│   ├── order.html
│   └── aftersales.html
├── content/
│   ├── sop-docs.meta.json
│   ├── order/
│   │   ├── 01-intro.md
│   │   └── ...
│   └── aftersales/
│       ├── 01-overview.md
│       └── ...
├── data/
│   └── sop-docs.json
├── images/
├── scripts/
│   ├── check-docs.mjs
│   ├── build-content-json.mjs
│   ├── render-sop-html.mjs
│   └── extract-content-from-snapshot.mjs
└── package.json
```

## 日常维护流程

1. 编辑 `content/order/*.md` 或 `content/aftersales/*.md`。
2. 图片放到 `images/`，在章节正文中使用相对路径引用，例如 `images/order/example.png`。
3. 从 Markdown 生成构建快照：

```bash
npm run build:content
```

4. 从快照生成最终 HTML 页面：

```bash
npm run render:html
```

5. 检查导航和页面是否一致：

```bash
npm run check
```

也可以直接运行完整构建：

```bash
npm run build
```

生成完整 Markdown 工作流程文档：

```bash
npm run render:md
```

输出文件为 `完整工作流程文档.md`。

## 明道云路径链接

明道云工作表和视图链接集中维护在 `content/sop-links.json`，构建时会自动把正文里的路径 chip 转成可点击链接：

```html
<span class="chip chip--sheet">商品出库单明细</span>
<span class="chip chip--view">🔍 尺码审核</span>
```

不要在每个章节里重复手写同一个明道云 URL。新增或修正路径时，优先用 HAP MCP 核实工作表 / 视图 ID，再更新 `content/sop-links.json`，最后运行 `npm run build`。

## 章节文件格式

每个章节文件都有 frontmatter：

```md
---
id: "review"
title: "二、订单审核"
sort: 40
status: "active"
---

章节正文写在这里。
```

当前正文为了保留原页面效果，仍允许使用 HTML 片段，例如 `.op-unit`、`.flow-canvas`、`.chip`、`.tbl`、`.screenshot`。后续可以逐章把普通段落改成更接近 Markdown 的写法，但不要破坏这些样式类。

## 本地预览

```bash
npx serve .
```

预览地址通常是 `http://localhost:3000` 或命令输出的端口。

## 历史 SOP 维护边界

- 不要直接编辑旧的整页 HTML。
- 不要直接编辑 `data/sop-docs.json`，它由 `content/**/*.md` 生成。
- 不要改掉 `templates/` 里的核心 CSS/JS，除非目标就是调整最终视觉样式。
- 这些规则只适用于旧 SOP 资料；明道云真实系统操作以 `AGENTS.md` 和 `明道云操作边界.md` 为准。
