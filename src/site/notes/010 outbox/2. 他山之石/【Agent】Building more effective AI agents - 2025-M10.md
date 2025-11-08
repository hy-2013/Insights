---
{"dg-publish":true,"permalink":"/010-outbox/2/agent-building-more-effective-ai-agents-2025-m10/","tags":["#LLM/Agent"]}
---


## 封面
- 标题：Building more effective AI agents
- 链接：https://www.youtube.com/watch?v=uhJJgc-0iTQ
- 发布日期：2025-10-17
- 总字数：1031
- 预估阅读时长：约 4 分钟
- 生成时间：2025-11-02 16:26:15
- 覆盖时长：00:03:09
- 识别说话人：A, B, C

## 摘要
- Eric强调：**multi-agent 作为 test time compute** 能显著提升答案质量，多个 Claude 协作往往优于单一实例。
- 团队通过开放式任务与大量 RL 训练，让 Claude“练习做 agent”，不仅在 coding 强，还能把能力外溢到 search、规划等广泛场景；**“先在最难的 coding 上练到极致，其他任务就会变得更容易。”**
- 实践表明：**用代码去生成 artifact（如 SVG、excel sheet）通常比直接产出更高效且可控**；Claude.ai 已支持通过写脚本在本地/云端生成真实文件，这预示了“会行动的 agent”的产品方向。

## 全文
### multi-agent 作为 test time compute 的潜力（00:00:00 - 00:00:13）
Eric：我觉得把 multi-agent 当成一种 test time compute 有很多值得探索的地方。简单说，让多个 Claude 协作解决同一个问题，往往能得到比单个 Claude 更好的最终答案。**多个实例的思维多样性与并行搜索，能当作“测试时的额外算力”来用。**

### 嘉宾介绍与话题开场（00:00:18 - 00:00:32）
Alex：嗨，我是 Alex，在 Anthropic 负责 cloud relations（原文如是）。今天我们聊“如何打造更有效的 agent”。我请到我的同事。
Eric：我是 Eric，我在 Anthropic 做 multi-agent 研究。
Alex：先抛个总问：为什么 Claude 在 agent 任务上特别强？

### 训练方式：让 Claude 在开放式任务中“练习做 agent”（00:00:33 - 00:00:52）
Eric：我们在训练时就让 Claude 反复“练习做 agent”。我们给它开放式的问题，让它可以分多步行动、用工具、探索上下文与目标，再给出最终答案。通过大量这样的练习，Claude 在 agent 型任务上就会变得很强。

### RL 与多场景练习：在 coding、search 等环境中强化（00:00:52 - 00:01:16）
Alex：也就是说，这些是长流程、跨领域的任务，通过 RL 等训练机制，Claude 在缺少明确逐步指导时也能自己摸索出“该怎么做”的目标与策略？
Eric：没错。我们在 coding 任务、search 任务等上做了大量 RL，让 Claude 在不同环境里都能练习“当一个 agent”。

### 关于“只擅长 code”的看法（00:01:16 - 00:01:25）
Alex：外界常说 Claude 在 code 上很强，但未必能迁移到别的领域；或者 coding 是个相对独立的能力。你怎么看？

### coding 的“溢出效应”：先练最难，其它变容易（00:01:26 - 00:01:57）
Eric：coding 是我们首先聚焦的任务。但当你拥有一个很强的 coding agent，它就能做很多别的工作：要做 search，可以通过 APIs 做 web search；要规划周末行程，就能生成可执行的日程表。我们认为 coding 是 agent 的非常基础且通用的核心技能，**“先训练最难的事，其他就会变简单”**，会产生很强的溢出效应，让 Claude 在各种任务上受益。

### Claude.ai 新特性与未来：写脚本直接产出文件（00:01:57 - 00:02:25）
Alex：我们最近在 Claude.ai（Web）上线了一个能力：Claude 通过写代码来创建真实文件。比如它写了一个 Python 脚本，运行后就生成了一张 excel sheet。你觉得这是不是未来的方向——Claude 写脚本、在电脑上采取行动，来创建文件或完成传统上不被视为“写代码”的任务？

### 用代码生成 artifact 往往优于直接产出（00:02:26 - 00:03:09）
Eric：我觉得这是非常有效的路径。前几天 Claude 帮我做演示用的图，它能直接写出 SVG 文件。但当我想要一个更复杂、需要大量重复与引用的图时，Claude 改为先写代码来生成 SVG，运行速度比直接让 Claude 逐字输出那个高度重复的图快得多。**在许多场景里，用代码去生成 artifact 比“直接生成成品”更好**，尤其是复杂、重复度高的难例。这是应对更难任务的一条有效方法。Alex：对，code 提供了一种……（未完）

## 欢迎交流与合作
目前主要兴趣是让agent在实际生活中落地，想进一步交流可加我微信（微信号：cleezhang）。一些[自我介绍](https://lee-agi.github.io/Insights/16695c5e82/)。
