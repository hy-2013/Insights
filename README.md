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

## GitHub Pages
- 在仓库 `Settings > Pages` 中选择 **GitHub Actions** 作为构建来源，工作流文件位于 `.github/workflows/pages.yml`。
- 推送到 `main` 分支会触发构建，首次成功后即可通过 `https://<GitHub 用户名>.github.io/Insights/` 访问站点。
- 若需自定义域名或改用 HTTPS 以外的前缀，请同步更新 `.env` 中的 `SITE_BASE_URL` 并在 Pages 设置里配置 DNS。
- 如果仓库被 fork 到其他命名空间，可在运行工作流前覆写 `PATH_PREFIX` 环境变量，以匹配新的仓库名称。
- 已发布笔记的 URL 统一为 `/<article_id>/`（10 位 SHA-256 十六进制片段），来源于笔记在 `src/site/notes/` 下的相对路径；首页（`gardenEntry`）仍占用根路径 `/`。
