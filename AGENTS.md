# Repository Guidelines

## Project Structure & Module Organization
- `src/site/` 按 Eleventy 约定组织页面、数据与样式，`_data/` 管理站点级数据，`_includes/` 存放 Nunjucks 片段，`notes/` 负责主体内容，`styles/` 输出 Sass 源码。
- `src/helpers/` 收录构建与内容处理的 Node 脚本，请保持模块纯净，并为复杂逻辑补充文档或示例。
- 构建产物写入 `dist/`（或由托管平台生成），勿提交至版本库；部署配置集中在 `netlify.toml`、`vercel.json` 与 `plugin-info.json`。

## Build, Test, and Development Commands
- `npm install`：安装 Eleventy、Sass 及辅助依赖，提交构建前务必执行。
- `npm run start`：并行拉取主题、编译 Sass，并以开发模式启动 Eleventy 本地预览。
- `npm run build`：串行执行 `get-theme` 与所有 `build:*` 任务，生成用于发布的静态资源。
- `npm run build:eleventy` / `npm run build:sass`：单独触发模板或样式构建，便于逐步排查问题。
- `npm run get-theme`：基于 `.env` 中的 `THEME` URL 更新主题文件，若远程不可达请回退至最近可用快照。

## Deployment & Hosting
- GitHub Pages 部署使用 `.github/workflows/pages.yml`，默认推送 `main` 分支即触发；必要时可通过传入 `PATH_PREFIX` 自定义仓库子路径，默认值为 `/Insights`。
- 若需同时保留 Vercel/Netlify 流程，可在对应平台设置 `PATH_PREFIX=/` 保持兼容，并在 `.env` 中的 `SITE_BASE_URL` 指向最终访问域名。
- 调整部署策略时，请更新本文件与 `README.md`，并记录依赖的环境变量或 Secrets。

## Coding Style & Naming Conventions
- JavaScript/Node 代码遵从 Google Style：两空格缩进、尾随逗号最小化、`camelCase` 函数与常量、`PascalCase` 构造器、`kebab-case` 文件夹与 Sass 部件。
- Nunjucks 模板保持语义化标签与 2 空格缩进；Sass 使用 BEM 类命名，变量与 mixin 以 `kebab-case` 表示。
- 配置文件与脚本需说明关键环境变量，示例放在 `.env.example`。

## Content Linking & URLs
- 所有笔记的公开链接格式为 `/<article_id>/`，其中 `article_id` 为笔记在 `src/site/notes/` 内相对路径的 SHA-256 前 10 位十六进制字符串；仅 `gardenEntry` 或 `dg-home` 标签的页面保留 `/` 根路径。
- 内部引用（如 `[[...]]`、文件树、图谱、搜索）依赖 `src/helpers/articleId.js` 注册的映射，请勿手动填写长路径或硬编码旧的 `/notes/...` 链接。
- 若新增构建脚本或数据处理流程，需确保调用 `registerFromData`（或等效逻辑）以同步更新文章映射，避免链接失效。

## Testing Guidelines
- 尚无预置测试框架；新增功能或修复缺陷时，请先于仓库根目录创建/扩展 `test/`，编写可复现问题的回归测试（推荐 `pytest` 处理数据校验，或 Node 驱动的集成测试）。
- 命名规则：`test_<feature>_<scenario>.py` 或等价的 JS 测试文件；测试前运行 `npm run build` 以生成真实输入。
- CI 前至少确保新增测试通过并覆盖关键路径，必要时在 PR 描述中附上覆盖率或验证命令。

## Commit & Pull Request Guidelines
- 观察现有历史，提交信息以祈使句开头（如 `Add content …`、`Update content …`），首字母大写并保持 72 字符内。
- 每个 PR 需包含：变更概述、动机、测试说明（含命令与结果）、受影响页面或资产清单，若涉及 UI 需附预览截图或链接。
- 链接相关 Issue 或讨论，确保分支与目标环境同步最新 `main`。

## Security & Configuration Tips
- `.env` 中的密钥仅用于本地开发，勿提交。需在 Vercel/Netlify 控制台同步变量，并记录在团队内部密码库。
- 处理外部请求时使用 `axios` 超时与错误处理，避免因第三方异常阻塞构建；涉及用户生成内容时请保持 Markdown 解析白名单。
