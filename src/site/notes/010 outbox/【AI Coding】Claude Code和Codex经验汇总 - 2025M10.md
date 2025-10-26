---
{"dg-publish":true,"permalink":"/010 outbox/【AI Coding】Claude Code和Codex经验汇总 - 2025M10/"}
---


## CC
### 参考资料
1. 官方：[Quickstart - Claude Docs](https://docs.claude.com/en/docs/claude-code/quickstart)
	1. 常用命令：[CLI reference - Claude Docs](https://docs.claude.com/en/docs/claude-code/cli-reference)
2. https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/
3. [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
4. https://github.com/github/spec-kit

### 1. Prompt技巧：结构化prompt

1. **定义现状 (Context)**：`The current implementation in @module/service.py has a performance bottleneck under concurrent loads.`
2. **定义优化目标 (Goal)**：`Refactor this module to use an asynchronous pattern with a connection pool to handle up to 500 concurrent requests.`
3. **提供示例 (Example)**：比如定义输入和输出。`For instance, a call to process_data(items) should now return a Future object.`
4. **施加约束 (Constraints)**：`Only use libraries present in requirements.txt. The solution must be compatible with Python 3.9+. Maintain the existing public API signature to avoid breaking changes.`
5. **TDD (Methodology)**：`First, write a failing benchmark test that reproduces the bottleneck. Then, implement the async changes. Finally, ensure all existing unit tests and the new benchmark pass.
6. 一些技巧：
	1. 加入 `think`, `think hard`, `think harder`, `ultrathink` 等关键词，可以强制 AI 分配更多资源进行规划
	2.  `Shift + Tab` 切换到计划模式（Plan Mode），强制 AI 在动手前提交一份详细的行动计划。
### 2. 主动上下文管理
1. /clear：清空历史对话。/compact：压缩之前的context，并开启新的context

### 3. 核心素质：定义优化/实现目标的准确度、管理上下文和记忆的精确度、编排人机协作流程的巧度

1. **掌握上下文工程**：精通 `@`文件引用、结构化 Prompt 和 `#` 记忆添加（当AI犯错时）
2. **工程实践**：测试驱动调试（TDD）和 `claude commit`
3. **自定义斜杠command**：~/.claude/commands/
4. **构建团队知识库**：精通 `CLAUDE.md` 的项目级配置，将团队的最佳实践、架构决策和代码规范沉淀下来。
	1. *团队：/etc/claude-code/CLAUDE.md*
	2. 个人：~/.claude/CLAUDE.md
	3. 项目：项目目录的CLAUDE.md
5. **优化团队流程**：全面采用 `Git Worktree` 进行并行开发，并集成 GitHub Actions 实现自动化代码审查和问题修复。
	1.  `Git Worktree`在同一代码库上创建多个物理隔离的工作目录，为每个功能分支或 Bug 修复创建一个 Worktree，相当于对特定branch做了多个副本，而不用将一个repo clone多遍。
6. **设计高级工作流**：创建项目级的子智能体，统一团队处理复杂任务（如发布流程、安全审计）的方式。
	1. `subagent`是专为特定任务配置的 AI 助手，拥有独立的上下文窗口、系统提示和工具集。Claude Code 可以根据任务描述自动委托给合适的子智能体，或者由用户明确调用。你可以通过在 `./.claude/agents/` (项目级) 或 `~/.claude/agents/` (用户级) 目录下创建 Markdown 文件来描述子智能体的功能。
		1. 比如：Code Reviewer, Code Simplifier, Security Reviewer, Tech Lead, or UX Reviewer.
	2. 集成github：cc 中输入 /install-github-app，勾选当前仓库或者所有仓库，勾选支持手动at与自动pr等功能。
	3. Before fulfill a task or refactor some submodules, you should firstly **use N parallel subagents or different aspects/perspectives to brainstorm possible plans**. Compare their trade-offs in terms of performance, scalability, readability and maintainability, security etc. Do not implement any code.
7. **质量与合规**：利用 Hooks 系统，在项目中强制执行代码格式化、安全扫描等质量门禁。
	1. Hooks 是在 Claude Code 生命周期特定事件点（如 `PreToolUse`, `PostToolUse`, `UserPromptSubmit` 等）执行的、用户定义的 Shell 命令。 它们提供了对 AI 行为的确定性控制，能将团队的非功能性需求（如安全、合规、质量）强制注入到 AI 对代码的每一次操作中，实现从“建议”到“规则”的转变。
	2. 例如：**PreToolUse Hook**：在 `git commit` 前，强制运行 linting 和静态分析。**PostToolUse Hook**：在 `Write` 或 `Edit` 工具使用后，自动运行 `prettier` 对 TypeScript 文件进行格式化。**安全**：使用 `PreToolUse` Hook 阻止对 `.env` 或 `package-lock.json` 等敏感文件的修改。
8. **扩展能力边界**：学习和部署 MCP 服务器，将 Claude Code 与公司的监控系统、日志平台、工单系统（Jira, Asana）等进行深度集成。
9. **安全与监控**：精通 IAM[8] 和企业级策略配置，利用 OpenTelemetry[9] 进行全面的使用情况监控、成本分析和安全审计。

### 常用mcp
```shell
claude mcp add --transport http context7 https://mcp.context7.com/mcp

```

## Codex
### 常用命令
```shell
npm install -g @openai/codex@latest

```

| **操作**        | **OpenAI Codex CLI**                                                                                  | **Anthropic Claude Code CLI**                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **启动交互会话**    | 在终端运行 `codex` 启动交互式 TUI，会提示登录 OpenAI 账户或使用 API Key                                                    | 在终端运行 `claude` 启动交互 REPL，会提示登录 Anthropic Claude 账户                                                               |
| **带初始提示启动**   | `codex "<指令>"` 直接以给定提示启动会话。例如：`codex "用Python实现快速排序"`                                                 | `claude "提问或指令"` 以初始问题启动会话。例如：`claude "解释这个项目的作用"`                                                               |
| **单次非交互执行**   | 使用子命令 **exec**：`codex exec "<指令>"` 执行一次性任务并打印结果后退出。可加选项如 `--full-auto` 跳过手动确认。                        | 使用 **打印模式**：`claude -p "<指令>"` 执行指令并直接输出结果后退出交互。                                                                 |
| **通过管道传入文件**  | 支持从管道读取代码作为上下文：例如 `cat script.py \| codex exec "优化上述代码性能"`（CLI 将把 piped 输入内容附加到 prompt）。              | 同样支持管道输入：例如 `cat script.py \| claude -p "解释这段代码功能"`，Claude 会将文件内容纳入提示进行解析。                                       |
| **指定后端模型**    | 使用 **`-m` 参数**选择模型或提供者，例如 `codex -m o3` 切换使用较大模型（o3代表GPT-4 代码版）。也可在配置中预设默认模型。                         | 使用 **`--model` 参数**指定模型版本，例如 `claude --model claude-sonnet-4-5-20250929` 切换到指定的 Claude Code 模型版本。不指定则使用默认最新稳定模型。 |
| **更新 CLI 工具** | Codex CLI 为开源工具，无内置更新命令。可通过包管理器更新（例如 `npm upgrade -g @openai/codex`）或下载新版本二进制。                        | 提供内置更新命令：运行 `claude update` 可自动将 Claude Code CLI 更新到最新版本（需保证网络可连接 Anthropic 更新源）。                                |

| Codex 命令              | Claude Code 等价                       |
| --------------------- | ------------------------------------ |
| `codex resume`        | `claude resume` 或 `claude -c` 打开最近会话 |
| `codex resume --last` | `claude --continue` 恢复最近一次对话         |
| `codex resume <id>`   | `claude -r <id>` 指定会话 ID 继续          |
![Pasted image 20251005193438.png](/img/user/990%20Attachment/Pasted%20image%2020251005193438.png)

