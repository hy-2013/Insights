---
{"dg-publish":true,"permalink":"/010-outbox/ai-designing-claude-code-2025-m09/"}
---


## 封面
- 标题：Designing Claude Code
- 链接：https://www.youtube.com/watch?v=vLIDHi-1PVU
- 发布日期：2025-09-26
- 总字数：2123
- 预估阅读时长：约 8 分钟
- 生成时间：2025-11-15 06:27:25
- 覆盖时长：00:11:53

## 摘要总结
- Claude Code 选择 Terminal/CLI 作为形态，是因为它与 LLM 的“文本输入输出”天然契合，且无缝嵌入开发者现有工作流。开发从行级/函数级，正被推升到 PR 级，未来将迈向项目级与更高自治的 agent 编排。
- 团队在 CLI 中发明了“prompting in Terminal”的新范式，并以 prompting、slash commands、settings.json/cloud.md 清晰分层，形成与软件开发天然契合的“极薄外壳”。
- 设计原则：保持 CLI 干净聚焦、让模型发光；很多时候不必过度设计，交给模型即可。
- 对非技术人，真正的解锁不只是“快速原型”，而是“我能把代码推到生产”，还能完成发布前后的“最后 2%”打磨，并显著促进与工程师的协作。
- 非共识洞见：Terminal 并非“过时”，而是 LLM 时代的完美 form factor；未来可能“长出 CLI”，但开发者将运行在更高阶的工作流抽象上。

## 全文
### 开场与人物介绍（00:00:05 - 00:00:16）
**Alex**：大家好，我是 Alex，我在 Anthropic 负责 cloud relations。今天我们聊 Claude Code（原文 Cloud Code/Claude code）的设计，我的同事 Megan 也在。
**Megan**：大家好，我是 Megan，我是 Claude Code 的设计负责人。

### 为什么把 Claude Code 做在 Terminal 里（00:00:16 - 00:01:18）
**Alex**：Claude Code 的 form factor 很独特：我们做了一个 coding 产品，而且它“活在” Terminal 里。我们为什么走到这一步？
**Megan**：Claude Code 起初是几位同事的点子，大家都热爱 Claude 解决编码问题、帮助开发者的潜力。选择 CLI，是因为这种形态便于快速构建与迭代。后来它“越长越好”：Terminal 几乎在每个开发者的工作流里，不管主力是 IDE 还是 Vim，都会用 Terminal，这让我们能直接嵌入他们现有的工作方式，几乎不需要他们去“换工具”。

### Terminal 的历史与 LLM 的“回环”（00:01:18 - 00:02:44）
**Alex**：Terminal 一直是开发的基石，把下一代 coding 产品装进去很自然。但 Claude Code 在 Terminal 里做了我以为不可能的事。能谈谈 Terminal 产品的历史，以及它如何进化到今天吗？
**Megan**：Terminal 是最早的 UI：纯文本、靠命令，但它是“超级工具”。后来我们进入丰富的 Web UI 时代，有 Tailwind、CSS、JavaScript，界面更美、动画更好。LLM 出来后，我们又回到“和计算机聊天”。所以，**Terminal 反而是 LLM 的完美 form factor：输入是文本、输出也是文本**，和命令行的心智模型天然契合，形成一次“漂亮的结合”。而且开发者本来就长期在 Terminal 里。
**Alex**：像是“走了一圈”，模型能力让我们不再依赖很多既有 UI 抽象。
**Megan**：是的。Claude Code 成功的另一原因是，**它把体验原生带到代码所在的环境里**，不必在 Web UI 和本地文件之间复制粘贴。我自己用 Claude.ai（原文 Claude.ai/Cloud AI）也常这么折腾。当然，CLI 的交互面不算“丰富”，也带来挑战。

### 从“复制粘贴”到“直改文件”，以及未来工作流（00:02:44 - 00:05:04）
**Alex**：我过去在 Claude.ai 上提示、贴文件，拿到代码后再复制回本地改。现在我们直接从 prompt 改本地文件，把那步拿掉了。未来的 dev workflow/dev loop 会如何演化？
**Megan**：一开始我们在词/函数/行级写代码。第一波 AI 能力是 tab to autocomplete，但仍是行级。到了 Claude Code 第一代，我们**把粒度提升到“整文件/整任务”，接近 PR 级别**。随着模型更聪明、能力更强，我们会从“具体任务”进一步到“项目级”，需要编排来自多个地方的多个 clouds（原文 clouds），去完成更长时长、更自治的任务。**未来某个时点我们可能会“长出 CLI”**，但开发者操作的抽象层级也会水涨船高。

### sub-agent、/commands 与“在 Terminal 里 Prompting”的新范式（00:05:04 - 00:06:43）
**Alex**：我们最近发布了 sub-agent。像 slash commands、sub-agent workflows，以及其他底层能力，是怎么串起来的？
**Megan**：Terminal 原生就有一套控制界面的方式：启动用 flags，内部用命令。我们引入了一个新范式——**在 Terminal 里 prompting**。这点争论很多。我和 Boris 还写过文档，坚称不能在 CLI 里放 outline（输入框的描边），因为窗口缩放会错位；我过去做 CLI 设计时都极度回避 outline。后来 Boris 有远见，我们找到了很棒的库和交互，团队也把它做到了可用。于是我们把“和模型对话的 prompting”、工具层（我们的 slash commands）、以及配置层（settings.json、cloud.md）清晰分离。**这种分层既支撑了 Claude Code，也与软件开发的常规架构（如 README）天然契合。**

### 设计流程与设计原则（00:06:44 - 00:08:09）
**Alex**：像 outline box 或视觉风格这类新东西，我们怎么设计？有没有遵循的原则？
**Megan**：在 Anthropic，人人都是发明者。==通常是一两位工程师提出想法、打原型，然后在内部大规模试用；几乎所有同事都在用 Claude Code，反馈源源不断。形态定型后，我们会做一轮 UX polish==。比如 subagents 从想法到落地很快，随后补上“如何区分 subagent 与 Claude、如何配置”的打磨；MCP 也类似。我的两条原则：
- CLI 受限，要尽量干净聚焦、避免信息过载；
- **让模型发光。CLI 应该是 the thinnest wrapper around our models**，用户能直面 Claude 的原始能力，而这正是 Claude Code 的力量源泉。

### 我最爱的细节与“克制设计”（00:08:09 - 00:09:06）
**Alex**：有没有你喜欢的小打磨？
**Megan**：我喜欢 ASCII 的 articulating 和 thinking，这给 Claude 一点人格化气质。我也喜欢模式区分：thinking mode、planning mode、auto accept mode，它们把复杂状态表达得清晰。
**Alex**：这些“个性触点”很棒。编码常像机械劳动，但用 Claude Code 的体验不同，情绪也不同。
**Megan**：Terminal 能做的事其实很多，**但我们经常要克制：不必过度设计，交给模型就好**，它真的很擅长。

### 给非技术/设计师的使用建议（1）：新技能树与日常用法（00:09:07 - 00:10:48）
**Alex**：作为设计师而非传统技术人，你如何高效用 Claude Code？
**Megan**：我是产品设计师，说实话我不该写代码，我写的基本是 vibe coded（凭感觉写的），要被 review。但 Claude Code 这类 coding agent **为非技术人解锁了“新技能树”**。以往我得排工程师时间，或因为优先级不够而放弃；现在很多事我能自己做。日常里：
- 设计新功能时，我会先和 Claude Code 头脑风暴：常见用例、边界状态、甚至“你会如何设计”；然后我做几轮迭代。
- 我也会把设计稿（拖拽为图片）给 Claude 估工期，这样我能和工程师“友好论证”并达成折中。

### 给非技术/设计师的使用建议（2）：真正的“解锁”与最后 2%（00:10:49 - 00:11:13）
**Megan**：大家常说“点子成本为零，可以很快做原型”，这固然好，**但对我更重要的解锁是：我能把代码推到生产**，直接在 live codebase 里做我想要的改动。发布新产品时常常有“最后 2% 的设计打磨”做不到，如今我可以在发布前一天或发布后几天把那些我很在意、但被标为 P2 的细节清理干净。

### 设计与工程的趋同与更强协作（00:11:15 - 00:11:54）
**Alex**：像是设计师与工程师的边界在收敛，Claude Code 让“==设计工程师==”成为可能。
**Megan**：是的。它也**让我和工程师的合作变得更紧密**。很多事我一个人仍做不完，但**当我先做出第一次尝试，再和工程师讨论，协作会更顺畅**。这不仅是“给了我新技能”，也在提升协作质量，这是我们正在构建的循环中很重要的一环。
**Alex**：同感，太棒了。

### 收尾（00:11:56 - 00:11:59）
**Alex**：Megan，今天聊得很开心，非常感谢。

## 欢迎交流与合作
目前主要兴趣是探索agent的落地，想进一步交流可加微信（cleezhang），一些[自我介绍](https://lee-agi.github.io/85ed64eda0/)。

> 本文发表于 2025-11-15_周六。
