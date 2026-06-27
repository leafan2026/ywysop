# Agent Instructions

本仓库是 SOP 帮助中心发布仓库。默认目标是把 `content/**/*.md` 中的 SOP 章节内容构建为可预览、可发布、可审校的 HTML 帮助中心。

最终视觉效果以 `templates/order.html` 和 `templates/aftersales.html` 为准，不要用 Mintlify、VitePress 或普通 Markdown 站替换这套样式。

## 工作原则

- `content/**/*.md` 是内容源，本仓库直接从这些章节文件生成发布页。
- `content/**/*.md` 是正文源；`data/sop-docs.json` 是构建产物。
- 明道云只作为核实台账，不作为 SOP 正文源。
- 修改文档结构前先看 `README.md`、`content/sop-docs.meta.json`、`scripts/build-content-json.mjs`、`scripts/render-sop-html.mjs` 和 `templates/`。
- 更新 SOP 正文时，编辑对应章节 `.md`，不要手改生成页。
- 添加图片时放入 `images/`，在章节正文中使用相对路径，例如 `images/order/name.png`。
- 发布前必须运行 `npm run build`。

## HAP 只读边界

需要核实时允许读取：

- 应用结构
- 工作表结构
- 帮助中心文档和章节记录
- SOP 相关字段、视图、记录样例

禁止自动执行：

- 删除记录
- 修改订单状态
- 审批通过或驳回
- 释放库存
- 生成退款单
- 生成虚拟移仓单
- 批量导入或批量修改业务数据
