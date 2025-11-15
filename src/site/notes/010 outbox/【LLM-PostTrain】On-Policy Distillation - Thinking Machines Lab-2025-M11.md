---
{"dg-publish":true,"permalink":"/010-outbox/llm-post-train-on-policy-distillation-thinking-machines-lab-2025-m11/"}
---


## 封面
- 标题：On-Policy Distillation - Thinking Machines Lab
- 链接：https://thinkingmachines.ai/blog/on-policy-distillation/
- 发布日期：未知日期
- 总字数：7886
- 预估阅读时长：约 27 分钟
- 生成时间：2025-11-15 10:12:46
- 覆盖时长：00:01:36

## 总结
- 文章提出并系统化一种在后训练阶段将“on-policy”的相关性与“distillation”的稠密监督结合的方法：on-policy distillation，用以让小模型在特定任务中达到专家级表现，且以远低于 RL 的成本实现类似或更好的效果。
- 核心做法是：==从学生模型自行采样的轨迹上，用高性能老师模型对每一步token进行评分，以每token的 reverse KL 为目标，鼓励学生在自己所到达的状态中逼近老师的分布，从而获得稠密、稳定且“不可被投机取巧”的学习信号==。
- 在数学推理（AIME’24）和企业内助理（知识+行为）的实验中，on-policy distillation相较纯SFT或RL在训练效率、计算开销、遗忘恢复与持续学习方面都显示出显著优势。
- 作者强调，reverse KL 的“mode-seeking”与降低“exposure bias”的特性，与RL目标具有自然协同；而on-policy distillation“始终在线策略内”避免了off-policy数据引发的累积误差。
- 结论是：on-policy distillation能以很小的成本，提供接近前沿高算力RL的后训练收益，尤其在个性化与持续学习中，可作为一种强有力、可复用的工具。

## 要点
- 背景与训练分层
  - LLM能力可分三阶段获得：pre-training（语言/常识/广泛推理）、mid-training（领域知识，如code/医疗/公司文档）、post-training（行为特化，如instruction following、数学推理、chat）。
  - 小模型若在后期训练更强，往往在其专长领域优于大通用模型；且具隐私本地部署、易于持续更新、推理成本低等优势。
- Post-training的两大范式
  - on-policy（RL）：在学生自身轨迹上给定稀疏回报（如只基于最终答案对错），相关性强但反馈稀疏、信用分配困难、效率低。
  - off-policy（SFT/Distillation）：学习老师给出的目标输出与过程轨迹，信号稠密、易实施，但因“分布偏移”与“累积误差”对长序列鲁棒性差，且常学到老师的风格/自信而非事实正确性。
- 提出：on-policy distillation
  - 思想：采样学生轨迹，用老师逐token打分；以每token reverse KL(student||teacher)最小化作为奖励。
  - 目标：结合on-policy的相关性与distillation的稠密反馈，既学会如何从自身错误中恢复，又更高效。
  - 与相关工作：受DAGGER、process reward modeling启发；扩展了Agarwal、Gu、Qwen3等的先行工作，并用Tinker API复现Qwen3的相关结论。
- 核心技术与性质
  - 以每token reverse KL为损失，折扣系数取0，只优化“下一token”的匹配；reverse KL与RL的序列级目标天然协同。
  - reverse KL“mode-seeking”、可降低“exposure bias”，且“不可被投机取巧”（低KL对应老师眼中的高可取行为概率）。
  - 计算优势：无需等完整rollout即可给奖励，可用短/部分轨迹；老师只需一次前向计算log-probs；不需要额外reward/labeling model。
- 实验一：Distillation for reasoning（AIME’24）
  - 设置：学生Qwen3-8B-Base，老师Qwen3-32B；先以off-policy（OpenThoughts-3 SFT 40万条）达AIME’24=60%。
  - 对比提升至70%：
    - 继续SFT（off-policy）需约200万条（乐观外推）。
    - RL（Qwen3报告）约17,920 GPU小时达67.6%，成本与约200万条SFT相当量级。
    - on-policy distillation从40万SFT checkpoint出发，约150步即达70%。
  - 计算成本比较（以FLOPs计）：在SFT数据已给或可摊销场景下，on-policy distillation相对SFT约9x节省（GPU小时约18x）；若包含老师采样成本，综合节省约30x。
- 实验二：个性化/企业助理（知识+行为）
  - 目标：既要内部文档知识（internal QA eval）又要instruction following（IF-eval）。
  - 问题：直接在文档上mid-train会遗忘post-training行为（RL训练的行为子网络易脆弱）；混入chat背景数据能缓解但难完全保留；LoRA也不足。
  - 做法：mid-training阶段用Qwen3-8B在Tulu3上采样“on-policy”背景数据作forwards KL正则以保留原行为；之后再对混合文档+chat微调后的模型，用早期版本Qwen3-8B做老师执行on-policy distillation，仅为恢复instruction following。
  - 结果：几乎完全恢复IF-eval且不丢失新知识，甚至对internal QA有正迁移；说明可交替进行“增量知识微调—行为恢复蒸馏”的持续学习。
- RL vs Distillation的效率
  - 信息论视角：RL每episode只传O(1) bits；distillation传O(N) bits（N为token数），使训练效率数量级提升。
  - 对照实验：先对Qwen3-8B-Base做RL（DeepMath，LoRA rank=128），再将该RL老师distill回base；蒸馏7-10x更快达老师水平，累计算力50-100x节省。
  - 原因：蒸馏可用短上下文、较小batch仍稳定；dense reward降低梯度噪声；过程监督进一步提升效率。
- 复用少量/单一提示
  - RL多epoch会记答案；on-policy distillation拟合老师的全分布，不止记单一答案；在单一数学prompt上多步训练也能逼近老师表现。
- 持续学习与自蒸馏
  - 单纯SFT（即便在老师采样的“KL=0”数据上）也会因有限批次采样偏差而逐步偏离原策略，导致IF-eval退化。
  - on-policy distillation老师固定、始终on-policy，可稳定收敛到老师行为，不会像SFT那样在自蒸馏中退化，更适合持续学习。
- 实践实现
  - 在Tinker RL脚本上“一行改动”即可：初始化老师client；按RL采样学生轨迹并保留学生log-probs；向老师请求compute_logprobs；以负reverse KL作per-token advantage，调用RL的重要性采样损失更新学生。
  - 通常应先有mid-training以确保学生在老师分布上有支持，再用reverse KL进行“mode seeking”。

## 翻译要求
- 关键信息和术语保留英文原文，不做或尽量少做翻译，例如：on-policy distillation、off-policy distillation、reverse KL、SFT、RL、LoRA、log-probs、teacher/student、AIME’24、Qwen3、Tinker等。
- 如需中译关键表达，会在中文后括注原始英文表达，确保语义准确。
- 不删减原文信息，仅去除口头赘语；数值、结论、对比与引用均尽量保留。
- 对我认为特别重要、洞见性强、非共识的结论，会适度加粗提示，但加粗不宜过多。

## 翻译
LLMs 在聚焦领域内可以达到专家级表现，这得益于多种能力的叠加：对输入的感知（perception of input）、知识检索（knowledge retrieval）、方案选择（plan selection）以及可靠执行（reliable execution）。要实现这些，需要一整套训练方法，我们可以将其划分为三个阶段：pre-training 教会模型语言使用、广泛推理与世界知识；mid-training 赋予领域知识（如代码、医疗数据库或公司内文档）；post-training 引出目标行为（如 instruction following、数学题推理或聊天）。

体量更小但训练更“强”的模型，常在其专长领域优于更大、更通用的模型。小模型的益处很多：可本地部署以满足隐私/安全；易于持续训练与更新；推理更省钱。要充分受益，需要为后续训练阶段选对方法。

后训练“学生（student）”模型的方法有两类：
- on-policy：从学生自身采样的rollout上学习，并为其分配某种reward；
- off-policy：依赖外部来源的目标输出，让学生去模仿。

例如，我们想训练一个紧凑模型来解数学题。可以用强化学习（RL）做on-policy训练：根据每个学生rollout是否解对题来打分。打分者可以是人类，也可以是能可靠得出正确答案的“老师（teacher）”模型。

on-policy 的强项是：因为直接在自身样本上训练，学生会更直接地学会如何避免错误。但RL的主要缺点是反馈稀疏：无论用了多少token，一次训练episode传递的有效信息量近似固定。在上面的例子里，学生知道“21”是错的，会更新以避免产生相同rollout；但它并不知道错误发生在何处——是运算顺序不对，还是算术本身出错。稀疏反馈让RL在许多场景中效率低。

off-policy 常用的做法是 supervised fine-tuning（SFT）：在精心挑选的、任务特定的标注样本上训练。标注样本可以来自在该任务上表现很好的老师模型。

我们可以使用 distillation：让学生去匹配老师模型的输出分布。训练数据是老师的完整轨迹（teacher trajectories）：包括生成的中间思考步骤在内的token序列。可以使用老师在每个步骤的完整 next-token 分布（常称“logit distillation”），或只在给定序列上采样。在实践中，对序列进行采样能对老师分布提供无偏估计，并收敛到相同目标。学生会按自己生成该token的不大可能性（自身概率越低、颜色越深）来向该token更新。

来自大型老师模型的 distillation 已在以下方面被证明有效：训练小模型做 instruction following（Alpaca: A Strong, Replicable Instruction-Following Model, Taori et al, 2021）、在数学与科学上进行推理（OpenThoughts: Data Recipes for Reasoning Models, Guha et al, 2025）、从医疗笔记中抽取临床信息（Distilling Large Language Models for Efficient Clinical Information Extraction, Vedula et al, 2025）、进行多轮对话（Enhancing Chat Language Models by Scaling High-quality Instructional Conversations, Ding et al, 2023）。这些与其它应用所用的蒸馏数据集通常都会开源发布。

off-policy 的缺点在于：学生是在老师常去的上下文里学习，而非学生自己经常会到达的上下文。这会导致误差累积：如果学生一开始犯了老师从不犯的错，它就会越来越偏离自己在训练中见过的状态。对于关心长序列表现的场景，这个问题尤为严重。要避免这种发散，学生必须学会从自身错误中恢复。

off-policy 蒸馏的另一个问题是：学生可能学到老师的风格与自信，却未必学到其事实正确性（The False Promise of Imitating Proprietary LLMs, Gudibande et al, 2023）。

打个比方：学下棋时，on-policy RL就像在没有教练的情况下自己下；胜负反馈直接与自己的走棋相关，但每局只得到一次反馈，且不知道哪些步骤更关键。off-policy distillation则像观看特级大师对局——你能看到非常强的棋步，但这些棋步发生在新手很少会见到的棋局态势里。

我们希望结合RL的on-policy相关性与distillation的稠密奖励。对于下棋，这就像一个老师对你每一步从“blunder（大漏着）”到“brilliant（妙手）”评分。对应到LLM后训练，就是 on-policy distillation。

on-policy distillation 的核心思想是：对学生模型进行轨迹采样，再用高性能老师对轨迹中每个token进行评分。回到前面的数学例子，on-policy distillation 会对解题的每一步打分，惩罚导致学生走向错误答案的步骤，同时强化执行正确的步骤。

本文探索将 on-policy distillation 应用于数学推理模型的训练，以及具有领域知识与 instruction following 行为的助理模型训练。我们把它用在经过 pre- 与 mid-training 打基础的模型上。我们发现这是一种便宜而强大的后训练方法，结合了on-policy训练的优势与稠密奖励信号的效率。我们的方法受到 DAGGER（A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning, Ross et al, 2010）与 process reward modeling（Let’s Verify Step by Step, Lightman et al, 2023）的启发；并扩展了 Agarwal et al（On-Policy Distillation of Language Models: Learning from Self-Generated Mistakes, 2023）、Gu et al（MiniLLM: Knowledge Distillation of Large Language Models, 2023）与 Qwen3 团队（Qwen3 Technical Report, 2025）的工作。使用 Tinker 训练 API，我们复现了Qwen3：在推理基准上，on-policy distillation 以 RL 一小部分成本达到了等效表现。

可以在 Tinker cookbook 中按步骤复现我们的实现。

on-policy distillation 可以使用多种损失来对学生轨迹打分（详见 Agarwal et al. 对损失选择的分析）。为简化，我们选择 per-token reverse KL——即在相同的历史轨迹条件下，比较学生分布（π_θ）与老师分布（π_teacher）在每个token上的散度。

我们的奖励函数即最小化 reverse KL，它会推动学生在自己到达的每个状态中逼近老师行为。当学生与老师行为一致时，reverse KL为0。为简化，我们使用折扣系数0：在任意时刻，学生只优化“紧接着的下一个token”，不考虑未来token（虽然更严格的做法是>0，但我们未观察到性能提升）。

reverse KL 与 RL 自然协同：RL通常优化由奖励模型诱导的序列级“反向KL”。但不像大多数实践中的奖励模型，reverse KL 在某种意义上“不可被投机取巧（unhackable）”：低KL总对应从老师视角看更高概率的可取行为。reverse KL 的两个有用性质还包括：“mode seeking”（只学一种具体行为——老师的——而不是在多个次优选项间摊薄分布）与降低“exposure bias”（Scheduled Sampling for Sequence Prediction with Recurrent Neural Networks, Bengio et al, 2015；另见 Gu et al.）。

该方法带来显著算力节省：因为无需等待rollout采样完成就能计算奖励，我们可以用更短或部分轨迹训练。向老师查询log-probs只需老师模型单次前向推理，而轨迹生成由更小更便宜的学生执行。此外，我们也不需要单独的reward/labeling模型；当然，未来也许可以把基于蒸馏的per-token奖励与序列级环境奖励结合，这很值得探索。

下面展示一个真实的错误学生轨迹被老师评分的例子，来自 SimpleBench。题目依赖一个关键观察：题设本身很重要；正确答案是“B. 0”，因为冰块在煎锅里会融化。学生（Qwen3-4B-Instruct-2507）错误地将其当作纯数学问题，忽略了物理情境。

图中颜色越深表示被老师（Qwen3-235B-A22B-Instruct-2507）处罚越多。我们看到它更重地惩罚那些将学生引向歧途的起始token，直观上对应指导推理的关键“forking tokens”（参见 Beyond the 80/20 Rule: High-Entropy Minority Tokens Drive Effective Reinforcement Learning for LLM Reasoning, Wang et al, 2025）。最终答案虽然错误，但在此前的完整前提下是“可预测”的，因此不再被额外惩罚。

实现方面：我们在 Tinker 的 RL 脚本上实现 on-policy distillation（RL脚本已有采样、奖励计算与策略梯度式训练）。实际上，对使用KL正则的RL实现，几乎“一行改动”：只需替换正则器模型为老师即可。
- 初始化老师client：Tinker API 便于为不同模型创建client；用sampling client即可，无需对老师传播梯度。
- 采样轨迹：与RL完全一致；采样时RL已计算学生log-probs log π_θ(x)，用于重要性采样损失。
- 计算奖励：对采样的学生轨迹调用老师的 compute_logprobs，得到老师的 log π_teacher(x)，从而计算reverse KL（本文未做logit/top-k蒸馏，后者或可提升算效）。
- 用RL式训练：把每token的 advantage 设为负reverse KL，调用RL的重要性采样损失函数，更新学生。

在下面实验中，我们一般将 on-policy distillation 用于已做过 mid-training 的模型。mid-training 提升学生在老师分布上的支持概率，但仍远不够复制老师性能（SFT 使用 forwards KL 可引入新token支持；reverse-KL 方法随后在初始化支持内做“mode seeking”）。如我们将在个性化例子中看到的，如果学生缺乏相关领域知识，生成相关token的概率起初可能是0。

我们用 on-policy distillation 做后训练，并与其他后训练方式对比。

Distillation for reasoning（数学推理）：我们用 Qwen3-8B-Base 作学生，用 Qwen3-32B 作老师。两者目前都在 Tinker 上可用，可用 cookbook 复现。所有实验都从 mid-training（off-policy distillation 的 SFT）开始：数学推理的SFT数据为 OpenThoughts-3，由 QwQ-32B（与 Qwen3-32B 类似的推理模型）生成的推理提示与响应集合。

把学生（Qwen3-8B-Base）在40万条提示上做全参数微调，AIME’24 得分可到 60%。也可以用 LoRA，但在大规模数据上落后于全参数微调。总体上，性能增长近似对数线性：早期收益便宜，后期很昂贵。

我们把在40万条上微调得到的模型当作checkpoint，再尝试不同后训练方法，把 AIME’24 从60% 提到 70%。

默认做法是继续更多的off-policy蒸馏（SFT）。外推该对数线性趋势，约需 200万条提示才能到 70%（此外推需假设不“卡壳”；确有大规模off-policy蒸馏把8B模型推到>70%的例子，如 OpenThoughts-3 与 DeepSeek-R1-0528-Qwen3-8B。旧版模型 Qwen2.5-7B 与 2.5-14B 在 80万条 DeepSeek-R1 蒸馏提示上分别到 55.5% 与 69.7%。我们将此视为off-policy蒸馏“成本-性能”的乐观估计）。

Qwen3 技术报告在类似SFT初始化上，用 17,920 GPU小时的 RL 达到 67.6%（与约200万条SFT成本同量级，具体堆栈不同难以精确对比）。参见 Qwen3 Technical Report, Table 21。

Qwen 团队还报告：用 on-policy distillation 以 RL 约1/10成本达到 74.4%，这也启发了我们的工作。我们在基础设置下尝试复现。

作为 off-policy 或 RL 的替代，我们按上文所述跑 on-policy distillation（我们实际上用 Qwen3-8B 做老师，性能略好；但便于计算FLOPs，仍以32B计）。从40万SFT checkpoint 出发，on-policy distillation 约 150 步就把 AIME’24 拉到 70%。——**on-policy distillation 在约150步即达70%**。

跨方法比较算力成本并不容易，因为训练/采样/log-prob计算的成本比例依实现差异很大。我们用 FLOPs 度量（对能有效并行的操作相对“惩罚”，会高估log-probs的实际成本）。

当 SFT 数据已给定或可在多次训练间摊销时，on-policy distillation 相对SFT 的基线成本约可降低 9x（GPU小时更接近 18x）。公式：CE = (Student + Teacher) / (Student)。此时我们对 off-policy 不计老师FLOPs，而 on-policy 必须运行老师算log-probs；考虑到这能高效并行，GPU小时更便宜。——**基线约 9x 成本节省（GPU小时≈18x）**。

而当要在一个没有现成off-policy数据的新任务上训练小模型时，若把老师生成数据的成本也算入 off-policy 蒸馏，则总成本节省约 30x。公式：CE = (Student + Teacher) / (Student + Teacher)。——**综合约 30x 成本节省**。

除了把小模型训到在通用任务上取得高性能，另一个重要用途是个性化（personalization）：比如稳定的对话语气/输出格式、工具使用、费用控制等，且常与新领域知识一起学习。两者同时训练通常困难，轻量微调往往不足，需要更大的mid-train；而把新知识上的后训练行为学好，往往需要复杂的后训练栈（专有数据与奖励模型），对非前沿实验室而言难以复制。

本节我们展示 on-policy distillation 在“行为特化”上的有效性，此法同样适用于持续学习或“test-time training”：部署后不断更新而不退化基础性能。我们用一个基于公司内部文档 mid-train 的模型作为应用示例。

一个常见的定制目标是做企业内助理：既要领域知识（公司文档），又要可靠的助理型行为。尤其是这些知识无法仅从pre-training数据习得，或学习它们会干扰行为时，通常需要分别训练并在后训练中兼顾。

我们的例子里，我们有两个愿景：其一，模型要掌握领域知识（internal QA eval）；其二，模型要有很强的 instruction following（IF-eval）。我们从 Qwen3-8B 开始，而不是base；Qwen3-8B 已通过 RL 学到助理所需的 instruction following 与 reasoning。已有研究表明，这类 RL 只微调了原网络的小子网络（Reinforcement Learning Finetunes Small Subnetworks in Large Language Models, Mukherjee et al, 2025），因此在后续大量训练时较脆弱。我们研究遗忘程度与如何恢复目标行为。

为了减少灾难性遗忘，mid-train 常用方法是混入“背景数据”（来自原预训练分布）（Midtraining Bridges Pretraining and Posttraining Distributions, Liu et al, 2025）。我们无法获得 Qwen3 的预训练分布，因此采用更强但更贵的基线：取 Tulu3（一个广泛chat与 instruction-following 数据集）提示，并用 Qwen3-8B 重采样作为chat背景数据。

这个由 Qwen3-8B “on-policy”采样的背景数据相当于 forwards KL 正则器，在mid-train过程中强化模型原有行为。我们发现用 Qwen3-8B 采样比 Qwen3-32B 更有利于保留chat能力，说明数据源的敏感性；类似的on-policy SFT 结论见 Chen et al（Retaining by Doing: The Role of On-Policy Data in Mitigating Forgetting, 2025）。我们猜测，这一做法甚至可能比拥有原始预训练分布更有效，但代价是要采样大规模数据集。

然后我们在不同配比的内部文档与chat数据上微调 Qwen3-8B。提高文档数据比例会直接提升知识，但即便混入≥30%的chat数据，instruction-following 仍难完全保留；甚至在SFT数据 100% 为chat时也无法维持 IF-eval 原始水平（在“持续学习”部分我们会进一步处理）。

在任意给定配比下，我们观察到微调过程中 IF-eval 性能都会下降，限制了我们通过更长训练进一步特化模型的能力。直觉上，我们也许希望过参数化模型只在“对应数据的上下文中”更新；但实践中并非如此：在原始文档数据上训练甚至会让QA上下文中的表现退化。

另一种常见尝试是用 LoRA 约束参数更新，以减少灾难遗忘。但这依旧不足以保留 IF-eval，且 LoRA 学到的内容更少（LoRA Learns Less and Forgets Less, Biderman et al, 2024）。

接下来，我们在完成“内部文档”微调后，恢复 instruction-following 行为。原始行为是用RL训练得来，既贵又易脆弱。我们改为用 on-policy distillation：以早期版本的 Qwen3-8B 为老师，在 Tulu3 提示上对学生进行蒸馏。注意，这一阶段与内部文档无关，仅用于恢复 instruction following。

这种“用模型的早期版本作为老师来唤回被微调弱化的能力”的做法，让 on-policy distillation 在持续学习中非常有潜力。我们可以在“新数据微调—行为蒸馏恢复”的阶段间交替，使模型不断学习、不断更新知识（类似 Cobbe et al 的 Phasic Policy Gradient, 2020）。

在“文档:chat=70:30”的微调后，on-policy distillation 几乎完全恢复了 IF-eval 性能，同时不丢失任何知识；我们还观察到 chat 能力与 internal QA 之间存在一定的正迁移。——**on-policy distillation 几乎“满血”恢复 IF-eval，且不损失知识**。本质上，我们把语言模型本身当作奖励模型：高概率行为即被“奖励”（Direct Preference Optimization: Your Language Model is Secretly a Reward Model, Rafailov et al, 2023）。这与逆强化学习（inverse RL）相关：高概率行为对应于某个潜在偏好模型中的高优势回报（Algorithms for Inverse Reinforcement Learning, Ng and Russell, 2000）。任何 instruction-tuned 的开源权重模型，只要能提供 compute_logprobs，就可作为这种意义上的奖励模型。

将蒸馏作为“整合行为与知识”的工具，也被用于 hybrid reasoning（Qwen3）与 specialist distillation（DeepSeek-V3.2-Exp: Boosting Long-Context Efficiency with DeepSeek Sparse Attention, DeepSeek-AI Team, 2025）。如本文与 Chen et al 的结论所示，on-policy 学习可能是强化这类“蒸馏式模型合并”的关键工具。

RL 与 on-policy distillation 都通过 reverse KL 学习，本质上在修剪基础策略的行动空间；不同点在奖励密度。在 LoRA Without Regret 一文中我们给出信息论视角：RL 每个episode仅教授 O(1) bits；而 distillation 每个episode教授 O(N) bits（N为token数）。我们能否量化由更稠密奖励带来的训练效率提升？

我们做了一个直接对比实验：
1. 从 Qwen3-8B-Base 开始（无额外SFT）；
2. 在 DeepMath 上跑 RL（按 LoRA Without Regret 的流程，LoRA rank=128）；得到的模型作为老师；
3. 用 on-policy distillation 从该RL老师蒸馏回最初的base学生。

我们看到，蒸馏大约以 7-10x 的速度达到老师性能；reverse KL 迅速降至近零，AIME 分数在不到 10 个梯度步内恢复，而RL需要约70步。——**蒸馏达老师水平 7-10x 更快**。

综合算力下降约 50-100x：一方面，RL需要在接近评测上下文长度下训练以避免格式惩罚，而蒸馏在较短上下文也能学得不错，因为奖励在“完成采样”和“未完成采样”的轨迹间没有突变断点；另一方面，当SFT初始化很强（老师策略在学生策略的支持内）时，on-policy distillation 可以用更小的batch稳定学习，因为每episode提供更多信息、梯度噪声更小（若初始化支持不足，如“Reasoning 蒸馏”，则需显著更大的batch）。

虽然在RL中做过程监督（process supervision）常比较困难，但这些结果显示：作为宏观方向，过程监督与稠密奖励有潜力将学习效率提升一个数量级，这与 Lightman et al 的早先发现一致。

对实践者而言，收集大规模训练提示代价高且费时，我们希望能复用提示。RL 对同一提示多轮训练容易“记住最终答案”（但也有特定设置下的正面结果，见“Reinforcement Learning for Reasoning in Large Language Models with One Training Example”, Wang et al, 2025）。相比之下，on-policy distillation 通过最小化 reverse KL 学习老师的完整分布，而不是记住单一答案，因此可以在同一提示上反复多样采样训练。

我们重复上面的数学训练实验，但只用数据集中随机选择的单一提示：
Prompt: “Evaluate the limit: lim_{x → ∞} √x ( ³√(x+1) − ³√(x−1) )”
在该提示上连续训练20步，每步batch为256个rollouts，总计5120条被评分的序列。虽然这样计算效率较低，且多次在同一提示上训练通常会过拟合，但我们仍然大致达到了老师模型的表现。

我们看到，on-policy distillation 能用远少于RL的训练步数复制RL所提供的“学习”。一种解释是：与pre-training不同，RL并不把大量计算花在梯度步上，而是花在“搜索”上——rollout策略并进行信用分配（“The Bitter Lesson”, Rich Sutton）。pre-training 用 SGD 在高维参数空间中探索，所需信息量巨大、难以蒸馏，且参数空间对每个网络都较独特（“The Lottery Ticket Hypothesis”, Frankle and Carbin, 2018），因此梯度步本身极其昂贵。相比之下，应将 RL 看作在“语义策略空间”中探索：每一步是在它已有权重中随机采样、偶然“撞到”新策略。——一旦找到好策略，distillation 就是“学习它的捷径”：on-policy distillation 无需建模RL课程中的中间策略，只需学习最终策略；而在生产中，我们通常只关心最终策略，不必为中间策略花费计算。

一个类比：科研中我们花大量时间与资源去探索和找答案。一旦有了结果，把它用自然语言教给别人其实更容易。与之相对的是直觉型的身体技能（如运动），它们不易传授，因为它们存在于“我们自身才能直观理解的内在语言”（例如肌肉记忆）中，只能通过重复练习获得。

回到个性化蒸馏部分所展示的能力“再引入”，这一思路可以更广泛地用于持续学习：在不损害先验能力的前提下获得新知识。已有研究发现 on-policy 学习（RL）相比 off-policy 更不易遗忘（“RL’s Razor: Why Online Reinforcement Learning Forgets Less”, Shenfeld et al, 2025）。但RL只能“塑造行为”，不擅长教授新知识，因此不足以单独支撑持续学习。

在上文我们看到，SFT（包括off-policy蒸馏）在支撑持续学习方面失败，因为它会损害行为。我们更直接示范这一点：像之前一样，我们用 Tulu3 提示、以 Qwen3-32B 在 temperature=1.0 下采样，不做额外处理，得到一个数据集；该数据集相对 Qwen3-32B 的 KL 为 0（“真正on-policy”的 KL=0 重要性也见我们前文“Defeating Nondeterminism in LLM Inference”）。

在这个“模型自采样”的数据集上做 SFT 会怎样？我们发现，只要学习率大于0（在一切实际可用的范围内），IF-eval 表现就会退化！——**即便在 KL=0 的on-policy自样本上，SFT也会退化**。

一个可能的解释是：虽然期望上的KL为0，但任何有限批次在实践中都会略有分布差异。在这些有限批上训练会产生非零梯度更新，进而把更新后的策略从原策略上“拽走”。这个过程会把“训练自身样本”逐步变成“off-policy 训练”，因而引发与off-policy相同的长序列误差累积与发散。

on-policy distillation 始终保持 on-policy，且老师固定，学生会收敛到老师的可取行为，在自蒸馏设置下不会像 SFT 那样退化。这使 on-policy distillation 成为持续学习的非常有前景的工具。

我们探索了 on-policy distillation 在训练数学推理小模型和持续学习助理上的应用，并与两类后训练方法对比：off-policy distillation 与 on-policy RL。结论是：on-policy distillation 结合了两者所长——on-policy 的可靠性能与稠密监督的成本效率。

后训练（post-training）是实现前沿模型能力的关键环节。通过在学生上on-policy采样、并用老师进行稠密监督，on-policy distillation 以远低于高算力RL的成本达到类似能力。

我们的实现见 Tinker cookbook。本文展示了 on-policy distillation 的简单直观实例，以清楚呈现其优势。我们将继续探索新的蒸馏应用、改进老师监督的方法，以及提升数据效率与持续学习的手段。

在 Thinking Machines，我们的使命是：用兼具前沿性能、适应性与个性化的AI模型赋能人们。on-policy distillation 是实现该使命的一件有力工具。

Please cite this work as:
Or use the BibTeX citation:

## 欢迎交流与合作
目前主要兴趣是探索agent的落地，想进一步交流可加微信（cleezhang），一些[自我介绍](https://lee-agi.github.io/85ed64eda0/)。

> 本文发表于 2025-11-15_周六。
