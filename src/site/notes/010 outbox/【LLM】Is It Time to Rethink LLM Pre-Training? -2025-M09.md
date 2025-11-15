---
{"dg-publish":true,"permalink":"/010-outbox/llm-is-it-time-to-rethink-llm-pre-training-2025-m09/"}
---


## 封面
- 标题：Is It Time to Rethink LLM Pre-Training? [Aditi Raghunathan] - 747
- 链接：https://www.youtube.com/watch?v=_Iit9as9hFA
- 发布日期：2025-09-16
- 总字数：2902
- 预估阅读时长：约 10 分钟
- 生成时间：2025-11-15 10:50:25
- 覆盖时长：00:48:20

## 摘要总结
- 这期 Twin Wall AI 对话聚焦三条主线：distribution shift 与基准失真、过度训练对后期 fine-tuning/量化的反直觉伤害、以及 unlearning 与创造力的新训练与采样范式。
- 作者给出强实证：**用更多高质量数据和算力把小模型“喂满”，会让它在后续 fine-tuning 更难适应，甚至更差**；量化场景还出现稳定的 U 形曲线，关键控制变量与 token-to-parameter ratio 强相关。
- 现有 unlearning 依赖“知识可局部化（localized）”假设并不成立。**以 memorization sinks 在训练期显式鼓励“可分离”的记忆位点，更有可能让模型在不破坏共享能力的前提下实现可删可忘**。
- 对“创造性”的建议是：**在思路层面先“掷骰子”采样前缀再一路低温生成，而不是单纯拉高 temperature 逐 token 扰动——既保留结构，又获得多样性**。

## 全文
### 引子：基准之外的真实考验（00:00:00 - 00:00:30）
**Aditi Raghunathan**：你知道，我们在一个 benchmark 上量性能，如果只关心它，看起来会做得很好；因为你收集和目标相似的数据、再扔大量算力，表现就会很好。但这真的“解决了任务”吗？只要我们用一种部署上也有意义、但稍微不同的方式测试，模型何时会崩、为何会崩？训练动态或数据筛选的哪些环节影响了这些行为？以及干预它们、让问题消失的正确方式是什么？

### 节目开场与嘉宾介绍（00:00:44 - 00:01:10）
**Sam Charrington**：欢迎来到 Twin Wall AI。我是主持人 Sam Charrington。今天的嘉宾是 Carnegie Mellon University 计算机系助理教授 Aditi Ragunathan（应为 Aditi Raghunathan）。开始前，别忘了订阅。欢迎你，Aditi。
**Aditi Raghunathan**：谢谢邀请，我很期待这次对话。

### 论文与研究版图概览（00:01:10 - 00:01:28）
**Sam Charrington**：我们会聊你的一篇论文，获 ==ICML 2025 outstanding paper：Roll the Dice and Look Before You Leap, going beyond the creative limits of next token prediction==。更广泛地，你的实验室在挖掘当前 LLM 架构的局限与机会，帮助我们更好地理解与使用 AI 模型。

### 学术背景与研究动机（00:01:55 - 00:03:40）
**Aditi Raghunathan**：本科我喜欢复杂性理论（complexity theory），思考“可能与不可能”的优雅抽象；也想做更有即刻影响、实践性的东西。2015-2016 正值深度学习起飞、ImageNet 之后，我自然被吸引。在 Stanford 听到 adversarial examples（对抗样本）让我震撼：强模型会以“惊人且近乎愚蠢”的方式失败，并带来现实中的安全与可靠性问题。这和我对复杂性/抽象的“痒”契合：很多现象不是一个基准数值能捕捉的，得想清楚模型学了什么、何时有效、何时失败。领域在快速变化，能力飙升，但一些根本性失败依旧。我们推高了能力，却没等比例推高可靠性；问题未变，但语境在变。

### 能力惊人与“魔法感”的并存（00:03:48 - 00:03:57）
**Sam Charrington**：模型很强，但我们仍不理解它们如何工作，像魔法。
**Aditi Raghunathan**：是的，完全同意。

### 安全对齐与脆弱 guardrails（00:03:58 - 00:04:30）
**Aditi Raghunathan**：令人担忧的是，这种不理解在安全上变成真问题：不输出 toxic 内容、不释放危险信息、不操纵用户等。我们如今的 guardrails 很脆，我们也没有更好的办法，因为我们并不理解系统。我想用“理解”去塑形，让这些模型在各种情境下更可靠。

### 研究议程：Distribution Shift 与基准的局限（00:04:30 - 00:05:41）
**Aditi Raghunathan**：我一直关注 distribution shift（分布偏移）。我们在 benchmark 上最小化损失、收集“道德上相似”的数据、堆算力，就能把分数堆起来。但这能告诉我们，遇到稍异却应当表现良好的情境时，模型会怎样吗？我们追问：这些设置如何在“部署相关”的测试下失效？训练动态/数据筛选的哪些方面导致它？如何正确干预让问题消失？

### 基准-体验鸿沟与 GPT-5（00:05:42 - 00:06:17）
**Sam Charrington**：benchmark 与真实使用体验的“鸿沟”在扩大，尤其最近 GPT-5——基准最强，但很多人的使用体验却不佳，这正说明今天的基准不足。
**Aditi Raghunathan**：是的。

### 适应性：fine-tuning 能力不是“越大越好”（00:06:18 - 00:07:39）
**Aditi Raghunathan**：很多场景会把基础模型作为起点做 fine-tuning（含安全 alignment、专有数据、个性化、世界变化等）。我们缺少衡量“适应性”的好方法。Graham Neubig 问：如果要在自有数据上 fine-tune，起点该选零样本（zero-shot）更强的模型吗？我们发现：不一定。总体上，更多数据训练会让很多数字（含鲁棒性）一起变好，但“易适应性”这个维度在某点之后反转。

### “更多算力反更差”的 U 型现象与量化（00:07:40 - 00:10:15）
**Aditi Raghunathan**：小模型若被喂入更多数据继续训练，最终会在作为 fine-tuning 起点时比早期 checkpoint 更差。这是我们首次在“现实且非人造”环境下看到：用高质量数据与算力，模型不只饱和，**下游反而更差**。量化（quantization）中也见 U 曲线：先更好，某点后，更多数据反让量化后更差。结论是：==只优化预训练这一步，并不意味着 post-training/fine-tuning 会好。社区里有人发现 **Llama 3 比 Llama 2 更难 fine-tune**；我们在 Olmo checkpoints 上也看到：1B 模型训练 3T tokens 的 checkpoint，经过现实基准的 post-training 后，竟然不如更早、喂更少 token 的 checkpoint。我们需要重新思考：如何拿到一个“更适合后续 fine-tuning”的起点。==（PostTrain的能力被前置了）

### token-to-parameter ratio 与模型规模（00:10:15 - 00:11:07）
**Sam Charrington**：你们发现==“tokens/parameters”的比值与调优表现成反比==吗？
**Aditi Raghunathan**：在“精度/量化（precision/quantization）”实验里，确实如此，而且指数基本一致，几乎就是这个 ratio。在 fine-tuning 上不做精确曲线，因为依赖目标分布；一般而言，大模型能“吸收”更多 token，但指数可能不同。

### 学习动力学：由简入繁与“纸牌屋”脆性（00:11:09 - 00:12:33）
**Sam Charrington**：直觉上 ==ratio 大了更过拟合，后续难以“忘旧学新”。==
**Aditi Raghunathan**：我们观察到模型“先学简单，再学复杂”。像用纸牌搭楼：底层稳固，再加复杂结构，但整体变脆。你试图沿某方向更新几步梯度，就会引入大量噪声，导致遗忘（forgetting）甚至“塌楼”。==量化也可视为往权重里加噪声==；**越被逼迫学复杂细节的模型，越吸收不了这类扰动**。

### “距离”与学习率（learning rate）作为代理（00:12:33 - 00:14:12）
**Sam Charrington**：ratio 很粗；若能知道训练分布与目标分布的相对位置，也许小而弱的模型反而更容易调？
**Aditi Raghunathan**：有两维：一是模型本身的“可移动稳定性”（与 token-to-parameter 相关）；二是“需要移动的距离”。我们用学习率（learning rate）作“需要移动多少”的代理：小 LR 也能达好效果，说明分布更近。若 fine-tuning 分布很近，就不太见“越多越差”的效应；越远，效应越明显。可惜很难直接度量“分布距离”，所以用 LR 作为可操作代理。

### Catastrophic overtraining 的拐点与可预测性（00:14:37 - 00:16:17）
**Sam Charrington**：“catastrophic overtraining”会不会像悬崖一样突然坠落？
**Aditi Raghunathan**：总体呈 U 形：先益后害。转折点取决于 fine-tuning 的数据与设定。量化更易刻画，因为因素少（相当于加噪声）；fine-tuning 更复杂，但若固定分布或固定 LR，拐点也变得可预测。我们没去精确拟合函数形式，留作未来工作。

### 基座模型选择建议（00:16:17 - 00:17:42）
**Sam Charrington**：知道这些后，你如何选 base model？
**Aditi Raghunathan**：若出于效率要用 1B 模型，且它被训练超过约 2–2.5T tokens，除非你很确定不会“改动太多”，否则我会谨慎。其他灰区建议先拿多个 checkpoint 做小试，看看我们处于 U 曲线的哪段，以此定位最优点。

### 论文脉络与转向 unlearning（00:17:42 - 00:18:24）
**Sam Charrington**：这对应你们的 Overtrained Language Models Are Harder to Fine-Tune。你的 ICML 合集博客把“过度训练”列为局限之一，另一个是“unlearning”的挑战。谈谈 unlearning 吧。

### unlearning 的困难：现有假设并不成立（00:18:24 - 00:21:19）
**Aditi Raghunathan**：unlearning 与 fine-tuning 高度相关：很多 post-training/对齐都是安全相关。让我想起我读博时的对抗样本：防御层出、但总被攻破。朴素做法是把“要忘的内容”拉高 loss，但会破坏大量已学知识。于是大家尝试把“知识”定位到特定神经元/子空间并抹除，但两难：先要找得到这些神经元；即便找到了，抹除不伤及他物也很难。核心假设是“知识可局部化（localized）”。我们证明：按现行训练目标与算法，**并没有鼓励这种可分离化**；出现的一点分离也是偶然、不完美，这也是现有 unlearning 效果差的原因。

### Memorization sinks：为“可忘性”而设计的训练（00:21:19 - 00:24:28）
**Aditi Raghunathan**：与其事后苛求一个“未被设计为可分离”的起点，不如在训练时“为可忘性而设”。我们提出 memorization sinks：为每个文档（或主题）分配只在该单元上更新的一组“记忆神经元”，让该单元的特异信息“沉降”于此；同时保留“共享神经元”在所有样本上更新以学习共性。该架构的归纳偏置会把跨文档共享信息放进共享神经元，而把特异信息留在各自的 memorization neurons。实验（小规模，正在扩展）显示：这种分离确实出现；测试时把这些 memorization neurons 丢弃，就相当于“忘掉了”它们承载的内容，同时保留共享能力。**这比事后定位抹除更可控、破坏更小。**

### 训练时的“单元”粒度（00:24:40 - 00:25:26）
**Sam Charrington**：训练时，你要提前标出未来想移除的信息吗？
**Aditi Raghunathan**：我们需要定义可能要移除的“单位”（unit）：可以是文档级，也可以是主题级。做法是把同一 unit 的样本只激活其对应的记忆神经元。也就是说，需要事先知道未来可能要移除的抽象粒度。

### 多样性与创造力：Roll the Dice（00:46:40 - 00:48:20）
**Aditi Raghunathan**：多样化输出目前两招：人为改 prompt 思路，或增大 temperature。但高温往往破坏结构。我们思考“创造力”：应在一开始引入随机性，先采样一个“随机想法/前缀”，再沿着它生成全部 token。也就是“先掷骰子（roll the dice）再一路执行”。测试时要更多样，就多采样不同前缀；训练上我们采取简单手段：给训练数据随机预置前缀，让模型学会“条件于一个随机思路”再稳定展开。这样能在保结构的同时获得多样性，跳出纯 next-token prediction 的创作极限。

## 欢迎交流与合作
目前主要兴趣是探索agent的落地，想进一步交流可加微信（cleezhang），一些[自我介绍](https://lee-agi.github.io/85ed64eda0/)。

> 本文发表于 2025-11-15_周六。
