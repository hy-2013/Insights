---
{"dg-publish":true,"permalink":"/010 outbox/他山之石/【Agent】Context Engineering for AI Agents with LangChain and Manus-2025-M10/","tags":["#LLM/Agent"]}
---


## 封面
- 标题：Context Engineering for AI Agents with LangChain and Manus
- 链接：https://www.youtube.com/watch?v=6_BcCthVvb8
- 发布日期：2025-10-14
- 总字数：4613
- 预估阅读时长：约 16 分钟
- 生成时间：2025-10-30 18:23:19
- 覆盖时长：01:00:39
- 识别说话人：A, B, C

## 摘要
这是一场由 LangChain 的 Lance 与 Manus 的 Pete 共同主持的 webinar，主题聚焦在 context engineering 的最新实战与非共识经验。核心张力在于：agent 因工具调用带来的长上下文增长与模型性能随上下文长度增加而下降的“上下文悖论”。Manus 的实践提出“**可逆压缩(compaction)优先、结构化不可逆摘要(summarization)兜底、分层动作空间(offload 工具本身)、多 agent 的通信/共享记忆模式选择**”等系统化方法。最重要的体会是：**最大的跃迁来自简化而非堆叠技巧——build less, understand more**。

## 要点
- Prompt engineering 的热度随 ChatGPT 上升；2024 年进入“agent 年”，context engineering 被 Karpathy 提出并快速走红。
- 上下文悖论：长时运行 agent 工具调用叠加导致消息膨胀；实测显示性能随上下文增长而下降（context drop）。
- 五大主题：offloading（外部化）、reducing（压缩/摘要）、retrieving（检索）、isolating（隔离）、caching（缓存）。
- Manus 的“可逆压缩(compaction)”与“结构化摘要(summarization)”配合使用：先压缩旧消息，可逆外部化；逼近“ROT 阈值”时再做结构化摘要，保留最近工具调用的完整示例。
- 隔离策略两类：by communicating（经典子 agent 只接收指令）、by sharing memory（共享所有历史上下文）；按任务复杂度与延迟/成本选型。
- 工具本身也要 offload：分层动作空间——function calling（少量原子函数）、sandbox utilities（预装命令行工具）、packages/APIs（脚本+API）。
- 评估与演进：**避免过度工程**，模型变强后要持续删除脚手架；利用不同模型切换来提前验证架构的“未来适配性”。
- 模型与成本：**开源并非总更便宜**，分布式 KV cache 与输入侧成本会改变账本；多模型路由与输入缓存至关重要。
- 安全与记忆：sandbox 严格出入控制；长时记忆以“显式确认的 knowledge”为主，探索参数无关的在线学习。

## 全文
### 开场与议程（00:00:06 - 00:01:07）
Lance（LangChain）：大家好，感谢参加。我是 Lance，LangChain 创始工程师之一，今天与 Manus 的 Pete 一起。我先给出我对 context engineering 的快速概览并引用 Manus 的博文，随后由 Pete 展示一些新想法，最后 Q&A。

Pete（Manus）：大家好，我是 Manus 的联合创始人兼首席科学家。我设计了 Manus 的 agent 框架等很多内容，很高兴来到这里。

### Prompt 与 Context 的趋势（00:01:10 - 00:03:10）
Lance：今年初“prompt engineering”随着 ChatGPT（2022 年 12 月）走红，大家关注如何提示 chat models。到了今年 5 月，“context engineering”在 Google 趋势上升，对应“agent 年”。原因：当你构建 agent（LLM 绑定多个工具，可在循环中自主调用），每次 tool call 会产生日志/观察，追加进消息历史，导致上下文持续增长。Manus 文中说典型任务约需 **50 次工具调用**；Anthropic 指出**生产 agent 会有数百轮对话**。Chrome 的报告也显示“context drop”：性能随上下文增长而下降。这形成悖论：agent 需要大量上下文来决策，但上下文越长性能越差。Context engineering 就是不断在每一步把“刚好”的信息装入窗口，抑制**上下文爆炸**。

### 五大方法概览（00:03:45 - 00:10:12）
Lance：
- Offloading：把 token-heavy 内容（如 web 搜索结果）落盘到文件系统/外部状态，仅返回可引用的最小信息（路径、ID）。Metath、Deep Agents、OpenDeep Research 的“agent state”、Claude Code 等都大量使用。
- Reducing：对工具输出做摘要/压缩、剪枝旧工具消息。Plot 4.5（疑似指 Claude 4.5）SDK 已内置 prune；Claude Code 有 compaction；Cognition 提到在 agent-to-agent 的交接做 summarize-programming。
- Retrieving：两类策略争论激烈。Cursor 的 Lee Robinson 介绍 indexing+semantic search；Claude Code 倾向只用文件系统与 Glob/grep。两者都有效，取决于场景与权衡。
- Isolating：多 agent 分割上下文，每个子 agent 有自己的窗口与关注点。Manus 的 wide agents、Deep Agents、OpenDeep Research、Claude 的 multi-agent researcher 都用到。
- Caching：Manus 大量使用上下文缓存（稍后由 Pete 展示）。

随后以 Open Deep Research 的三阶段（scope/research/write）示例演示：在 scope 阶段产出 research plan 并 offload 存储；research 阶段对搜索工具的重 token 输出做摘要；在 multi-agent 架构内做 context isolation。总结即上述五类策略的组合。

### 为什么要做 Context Engineering（00:10:30 - 00:15:00）
Pete：尽管微调/后训练越来越容易（例如 Think Machine 的 Tinker API 设计很漂亮），我还是经历了几个痛点后得出结论：早期创业不要太快做专用模型。之前公司我们从零训练做开放域信息抽取、知识图谱、语义搜索，一个训练评估周期要 1-2 周，还没拿到 PMF 就在优化不一定相关的基准，这是陷阱。后来我们也尝试拿强 base model 微调做专用用例，结果也踩坑——**RL 往往固定 action space、设计 reward 并大量 on-policy rollouts，但 AI/agent 还在早期，基础层会一夜变天。比如 MCP 的发布把 Manus 从“紧凑静态动作空间”彻底变为“无限可扩展”。这种开放域问题很难优化；若大力后训练保证泛化，你几乎是在重造基础模型层，重复造轮子**。我的结论是：明确边界，目前应用与模型之间最清晰、最实用的边界就是 context engineering，信任这个选择。

### Context Reduction：Compaction vs Summarization（00:15:03 - 00:19:19）
Pete：
- Compaction（可逆外部化）：在 Manus，每个工具调用及结果都有 full/compact 两种格式。compact 会剥离可由文件系统/外部状态重建的信息。例如写文件工具的返回只保留 path，去掉冗长的 content，因为文件已落盘，agent 需要时可按 path 读取。可逆性很关键：agent 的后续决策可能突然依赖 10 步前的细节，你无法预知。
- Summarization（不可逆）：当上下文仍然增长到临界，我们在摘要前会先 offload 关键部分，甚至把“预摘要的上下文”整体落盘为日志文件，模型可用 Glob/grep 自检索。区别在于：compaction 可逆、summarization 不可逆；
- 控制阈值：模型的硬上限可能是 1M tokens，但“实效”退化更早，通常 128K~200K 会出现“context rot”（重复、变慢、质量下降）。识别 ROT 阈值并在接近时先触发 compaction，而非直接摘要。同时只压缩“最老 50%”工具消息，保留新鲜 few-shot 示例，避免模型学到“紧凑格式的缺字段”错误。多轮 compaction 增益若很小，再做摘要；摘要时用全量数据而非紧凑数据，并保留“最后几条工具调用与结果的完整细节”，保持风格/语气与任务延续更平滑。
- 生成摘要的提示：不要 free-form，总用结构化 schema（如“修改了哪些文件”“用户目标”“当前进度”），稳定且可迭代。

### Context Isolation：通信 vs 共享记忆（00:19:22 - 00:22:15）
Pete：我同意 Cognition 的警示——多 agent 同步很难。但这不是新问题，早期编程的多进程/线程协调也类似。Go 社区有句名言：不要通过共享内存通信，而要通过通信共享内存（在 agent 领域并非总正确）。翻译成 agent 的语境，有两种模式：
- By communicating（通信）：主 agent 写一条清晰指令给子 agent，子 agent 的上下文仅此指令；如在代码库搜索某段，主 agent 只要最终结果。Claude Code 的 task tool 就是这种委派。
- By sharing memory（共享上下文）：子 agent 能看到完整历史（工具使用史），但有自己的 system prompt 与 action space。比如 deep research 的最终报告依赖大量中间搜索与笔记，强制让子 agent重读文件会浪费延迟与 tokens；此时共享上下文更合理。代价是：每个子 agent 的输入更大，无法复用 KV cache，成本更高。

### Offloading 的新维度：工具分层动作空间（00:22:18 - 00:29:03）
Pete：当你接入 MCP，光 offload 工作上下文还不够，工具定义本身放在前置上下文会导致“context confusion”（调用错工具或不存在的工具）。动态 RAG 按需加载工具也有问题：每次重置前置工具定义的“前缀上下文”，而且过去调用已移除工具的 few-shot 痕迹仍在，会诱导错误调用。我们在 Manus 做“分层动作空间”：
- Level 1 Function calling：**仅保留少量“原子函数”**（读写文件、执行 shell、文件/互联网搜索、浏览器操作）。schema-safe（约束解码），且可组合复杂工作流；其余能力上移。
- Level 2 Sandbox utilities：每个 Manus 会话在我们自研 Linux 虚机沙盒内运行，模型可用 shell 调用预装的命令行工具（格式转换、语音识别、Manus MCP CLI 等）。我们不把 MCP 工具注入 function calling，而是通过 CLI 访问。大输出写文件或分页返回，配合 grep/cat/less/more 处理。缺点是前端的低延迟交互更难。
- Level 3 Packages/APIs：Manus 可**写 Python 脚本调用预授权 API/包**（3D 设计库、金融 API 等），订阅内含多个预置 API key。非常适合需要大量计算/内存但无需把全部数据塞进模型上下文的任务；例如分析一年的股票数据，脚本计算，模型只接收摘要。参考 CodeAct（论文）里“代码可组合一步串多事”的思路，但直译代码不 schema-safe，需挑场景。
- 界面统一：这三层从模型视角都通过标准 function call 接口（如 shell、file），保持接口简单、cache 友好且正交。
- 五维联动：offload/retrieve 让 reduction 更有效，稳定检索让 isolation 安全；隔离减缓上下文增长且降低 reduction 频率，但也影响缓存效率与输出质量。Context engineering 是在冲突目标间找平衡的“科学+艺术”，很难。
- 最后忠告：**避免 context over-engineering**。过去 6-7 个月最大的飞跃都来自简化与移除不必要的技巧，并更信任模型；越简化越快、越稳、越聪明。目标是让模型的工作更简单而不是更复杂。请记住：**build less, understand more**。

### Q&A：沙盒工具发现与调用（00:30:10 - 00:31:39）
Lance：LLM 如何知道与调用 shell 工具？如何知道有哪些工具？

Pete：我们在 system prompt 提示 Manus：预装的 CLI 工具位于特定目录（类似 Linux 的 /usr/bin）。常用工具会被列出但不教用法，并明确可以安全使用 --help，因为这些工具都由我们开发且有统一格式。

### Q&A：检索与索引（00:31:42 - 00:32:41）
Lance：你们是否会上飞构建向量库？怎么看 indexing？

Pete：没有“对/错”。Manus 的每个沙盒会话都是新环境，用户期待快速交互，没时间现场建索引。我们更像 Claude Code，依赖 grep/glob。但若做长期记忆或企业知识库集成，外部向量索引仍必要。

### Q&A：长时记忆与知识（00:32:44 - 00:34:12）
Lance：跨会话的记忆如何处理？

Pete：我们有“knowledge”（显式记忆）概念：例如“以后都用 Excel 输出”，会弹窗让用户确认“是否记住”，显式存储。也在探索自动化的参数无关在线学习：用户纠错存在“群体共识”（如 CJK 字体渲染问题常需改用 Noto Sans CJK），我们希望聚合这类反馈，让 agent 自我改进。

### Q&A：架构随模型演进的简化（00:34:18 - 00:36:14）
Lance：模型变强后是否定期删脚手架？如何评估？

Pete：我们已重构 Manus 5 次。我们不看静态基准的美学分数，而是固定架构、切换不同强弱模型。若切换到更强模型收益大，说明架构更“未来适配”。我们每 1-2 月做评审与内测，用开源模型与专有模型的早期版本做准备。

### Q&A：文件格式偏好（00:36:34 - 00:37:26）
Lance：偏好 markdown 还是纯文本/日志？

Pete：更偏好“按行”的格式，便于 grep/按行读取。Markdown 有时让模型过度输出列表；因此更多采用纯文本。

### Q&A：摘要提示与可逆压缩细节（00:37:29 - 00:39:30）
Lance：如何做好不可逆摘要？

Pete：用结构化 schema 而非自由文本，稳定可迭代。

Lance：compaction 是否把搜索输出替换成文件名等？

Pete：对，适用于工具调用与结果。几乎所有动作都可 offload 到文件或外部状态，并且都有唯一标识（path、URL、query）。

### Q&A：复杂搜索的 agent-as-tool（00:39:35 - 00:41:32）
Lance：既要让下一步能访问完整信息，又不把大块上下文留在消息历史，如何权衡？

Pete：复杂搜索（多 query、聚合筛选）可用“agent-as-tool”——从模型视角是一个函数（如 advanced_search），内部触发子 agent 的固定输出 schema 工作流，把结构化结果返回主 agent。简单搜索（如单次 Google）则直接写全量结果进上下文，靠 compaction 清理；同时引导模型把关键洞见写入文件，预防提前压缩导致信息丢失。

### Q&A：agent 通信的“模式与契约”（00:41:35 - 00:43:42）
Lance：agent-agent 通信如何避免过/不足传递？

Pete：Manus 的 wide research 借鉴 MapReduce。主/子 agent 共用沙盒，文件系统共享，主要传 path 即可。关键是输出的正确性：每次主 agent 派生子 agent，都由主 agent 定义输出 schema；子 agent 用“submit_result”工具并通过约束解码确保返回符合该 schema。总结：用 schema 作为 agent/工具间的“契约”。

### Q&A：模型选择与 KV cache 成本（00:43:53 - 00:45:40）
Lance：是否用开源模型？如何考虑 KV cache 与成本？

Pete：目前不使用开源模型，原因不是质量而是成本结构。真实 agent 的输入远长于输出，KV cache 很关键，分布式 KV cache 用开源自建很难、很贵。前沿提供商（Anthropic 等）有更成熟的全球分布式缓存基础设施，综合下来更省。我们不仅用 Anthropic（agentic 最强），也看到 Gemini、OpenAI 新模型各有优势。应用公司可做任务/子任务级路由，配合输入缓存优化。

### Q&A：工具数量与原子函数（00:46:04 - 00:48:03）
Lance：工具数量多少为宜？如何选择？

Pete：因模型而异，但经验上不要超过 ~30。若构建“通用 agent”，native functions 要足够“原子化”，Manus 只有 10-20 个原子函数，其它都在沙盒层，无需动态拉取工具。

Lance：写脚本并执行可以大幅扩展动作空间？

Pete：是的。我们之所以敢称“通用 agent”，是因为它运行在“图灵完备”的计算机上。用 shell 和文本编辑器，很多能力都可 offload 到沙盒。

### Q&A：Kodak/CodeAct 与混合执行（00:48:10 - 00:49:17）
Lance：是否所有调用都以“生成脚本并运行”的方式？

Pete：我们试过全用 Code 但不行，因为无法约束解码，容易出错。我们采取混合：适合在编译器/解释器 runtime 内处理的大数据计算用 code；其他用 sandbox utilities 或 function calling。

### Q&A：规划从 todo.md 到“planner agent”（00:49:34 - 00:50:53）
Lance：Manus 早期用 to-do.md 规划，如今如何演进？

Pete：to-do.md 浪费大量 tokens（早期日志里约 1/3 动作在更新 to-do）。我们改为结构化规划器，一个“agent-as-tool”的子 agent 管规划；仍支持 to-do.md，但要省 tokens 就用新规划器。

### Q&A：多 agent 的最小集合（00:51:07 - 00:53:02）
Lance：你们如何划分角色？建议几个子 agent？

Pete：我们不按“人类组织架构”分角色（设计/编程/经理），而是极简：一个大“执行器”agent、一个“规划器”agent、一个“知识管理”agent，以及少数“数据 API 注册”agent。通信成本高，尽量把更多子工作做成“agent-as-tool”。

### Q&A：安全与 guardrailing（00:53:30 - 00:55:03）
Lance：如何做安全/护栏？

Pete：sandbox 连接互联网本身就敏感。我们确保信息不外泄：对外流量做检查（避免 token 泄漏），用户若要输出沙盒内容会做脱敏/移除敏感。在浏览器内持久化登录也很棘手，页面可能有 prompt injection。我们与“computer use”类模型提供商（如 Anthropic）紧密合作，每次敏感操作都需用户确认；护栏能力提升后可减少人工接管。

### Q&A：评估（evals）与人类审美（00:55:21 - 00:57:34）
Lance：怎么做 evals？

Pete：最初用公开学术基准（如 Gaia），但与用户喜好严重不对齐。现在三层：
1. 用户打分（1-5 星）是金标准；
2. 自动化可验证测试（我们自建数据集，聚焦执行/交易型任务；多数公开基准偏“只读”），沙盒可复位环境；
3. 大量实习生做人工评估（如网页生成、可视化美观度很难设计 reward）。
综合这三者做真实评估。

### Q&A：RL 与 MCP 的开放动作空间（00:57:37 - 01:00:00）
Lance：怎么看“带可验证奖励的 RL” vs 直接工具调用？你们做 RL 吗？

Pete：我有多年预训练/后训练/RL 经验，但现在不建议投太多精力做 RL。MCP 让动作空间不再固定，奖励与数据分布极难设计与均衡；若要支持 MCP 等价于在自建基础模型。社区的模型公司都在做这件事，我们更关注“参数无关的个性化/在线学习”（如集体反馈）。

Lance：是否复刻 Claude Code 的工具名/描述来“解锁”其 RL 能力？

Pete：我们反而避免“同名”，因为我们的函数可能有不同的参数/要求，同名反而会混淆模型在其后训练数据中的既有偏好。

### 收尾（01:00:05 - 01:00:46）
Lance：时间差不多了，感谢 Pete。我们会提供录音与幻灯片。

Pete：欢迎大家试用 Manus，我们有免费层。谢谢邀请！期待大家的作品。

