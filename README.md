# Digital Obsidian Garden
This is the template to be used together with the [Digital Garden Obsidian Plugin](https://github.com/oleeskild/Obsidian-Digital-Garden). 
See the README in the plugin repo for information on how to set it up.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/oleeskild/digitalgarden)

---
## Docs
Docs are available at [dg-docs.ole.dev](https://dg-docs.ole.dev/)

# Index
[Home](https://github.com/hy-2013/Insights)

## Contributing
请在提交变更前阅读仓库根目录的 `AGENTS.md`，其中包含项目结构、构建命令、编码规范、测试要求与 PR 审查要点。

## 布局与样式
- 主页与笔记页面共享新的三列网格骨架（`.page-layout__grid`），左侧为导航/文档树，中间承载正文，右侧用于目录等辅助信息。整体视觉参考 [动手学深度学习](https://zh.d2l.ai/chapter_preface/index.html) 的阅读体验，背景色与卡片阴影均在 `src/site/styles/custom-style.scss` 中维护。
- 顶部头部由 `.site-header` 负责呈现站点名称与全局搜索入口；侧边导航若未启用文件树，会回退到 `.nav-panel` 渲染的概览卡片。
- 外层 `.page-layout` 左、右与顶部全部为 0 padding/0 margin，仅保留底部 padding；若需额外留白请使用局部容器控制，避免改动外层布局。
- 为减少空白，中栏宽度已提升至 960px，列间距缩小至 1.1rem–1.6rem，并拉伸整体容器至 `min(1380px, 100% - 40px)`；如需再次调优可直接修改 `.page-layout` 与 `.content` 相关样式。
- 默认不再渲染 `Connected Pages` 与 `Pages mentioning this page` 卡片，可在 `sidebar.njk` 中重新启用或改造；侧栏仅保留 `Table Of Contents` 模块。
- 若需新增卡片或调整布局，请同步修改 `src/site/_includes/layouts/index.njk`、`src/site/_includes/layouts/note.njk` 与配套的 `custom-style.scss`，并保证 `.page-layout__nav`、`.page-layout__content` 与 `.page-layout__aside` 三个区域仍保持顺序。
- 更新布局后请执行 `pytest test/test_layout_structure.py` 验证首页结构，确保导航、正文与侧栏均被渲染。

## GitHub Pages
- 在仓库 `Settings > Pages` 中选择 **GitHub Actions** 作为构建来源，工作流文件位于 `.github/workflows/pages.yml`。
- 推送到 `main` 分支会触发构建，首次成功后即可通过 `https://<GitHub 用户名>.github.io/Insights/` 访问站点。
- 若需自定义域名或改用 HTTPS 以外的前缀，请同步更新 `.env` 中的 `SITE_BASE_URL` 并在 Pages 设置里配置 DNS。
- 如果仓库被 fork 到其他命名空间，可在运行工作流前覆写 `PATH_PREFIX` 环境变量，以匹配新的仓库名称。
- 已发布笔记的 URL 统一为 `/<article_id>/`（10 位 SHA-256 十六进制片段），来源于笔记在 `src/site/notes/` 下的相对路径；首页（`gardenEntry`）仍占用根路径 `/`。
