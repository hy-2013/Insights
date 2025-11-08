---
{"dg-publish":true,"permalink":"/010-outbox/2/ai-andrej-karpathy-we-re-summoning-ghosts-not-building-animals-2025-m10/","tags":["#LLM"]}
---


## 封面
- 标题：Andrej Karpathy — “We’re summoning ghosts, not building animals”
- 链接：https://www.youtube.com/watch?v=lXUZvyajciY
- 发布日期：2025-10-17
- 总字数：4893
- 预估阅读时长：约 17 分钟
- 生成时间：2025-11-02 12:00:07
- 覆盖时长：02:26:06
- 识别说话人：A, B, C, D, E, F

## 摘要：
- Andrej Karpathy认为**“agents”的成熟将是一个十年的工程而非一年的冲刺**，关键欠缺在于**continual learning、长时记忆蒸馏、真正的多模态与可靠的电脑使用**等能力。
- 他主张预训练更像“crappy evolution”（实用但粗糙的演化）：先用互联网模仿把智能“引导”起来，再逐步去除记忆，保留“**cognitive core**”。
- 他对RL持批判态度，称其在复杂任务上是“高方差、吸管监督”；更看好过程监督、反思与合成数据，以及多智能体的文化与自博弈。
- 自我定位为工程务实派：反对过度预测与“筹资叙事”，强调**“build the code”的学习方法与教育**愿景（Eureka，“Starfleet Academy”）。
- 非共识亮点：
  - **“Reinforcement learning is terrible”**且目前的RL“sucks supervision through a straw”。
  - **我们不是在造动物，我们在造‘ghosts’**（纯数字、模仿人类的智能）。
  - **去知识化以保留‘cognitive core’**可能让agents更能离开互联网数据流形去探索。
  - **智能爆炸是“business as usual”**：几十年来递归自我改进持续发生，GDP中不易分辨AI拐点。
  - **产品化是“march of nines”**：每多一个9都是恒定工作量，**demo不等于产品**。

## 全文
### 开场与直观点（00:00:00 - 00:00:47）
Andrej Karpathy：我直说，“Reinforcement learning is terrible”（强化学习很糟），只是此前一切更糟。我其实很乐观，觉得问题是可解且可行。我听起来悲观，是因为Twitter时间线里很多让我不懂的东西，很多是为了fundraising。我们不是在造动物，我们在造“ghosts”（完全数字、模仿人类的智能）。我们早已处于智能爆炸，几百年持续自动化。别写博文和做PPT，**build the code**、把它跑起来，不然就缺知识。有完美AI导师，你会走很远；我觉得今天的天才只是刚刚触到人类心智潜力的表面。

### 主持介绍与“agents的十年”（00:00:48 - 00:01:45）
Dwarkesh Patel：今天我和Andrej Karpathy聊天。Andrej，为什么是agents的“十年”，不是“今年”？
Andrej Karpathy：谢谢邀请。“It's the decade of agents”是对“the year of agents”的反应。我被这种过度预测触发了。早期agents已经很厉害，我每天用Claude和Codex，但仍有大量工作；我们会与之共事数十年，它们会越来越好。我只是对时间线在作反应。

### Agents的瓶颈与时间尺度（00:01:46 - 00:03:46）
Andrej Karpathy：把agent当成员工或实习生。你何时愿意让Claude/Codex做员工工作？今天不做，因为它们“just don't work”：智能不足、非真正multimodal、不会电脑使用、没有continual learning、不能记住、认知能力不够。**要十年来补齐这些栈的缺口**。时间预测靠我15年的经验直觉：问题可解但难，平均下来就是十年。

### AI“地震式”转向（00:03:47 - 00:07:39）
Andrej Karpathy：我经历了几次“seismic shift”。起点是多伦多在Jeff Hinton旁，**AlexNet**让大家转向训练神经网络，但早期都按任务训练（图像分类、机器翻译）。随后大家想要“agents”，2013年的Atari深度RL是尝试：不仅感知，还行动与奖励。但我认为这是误步，包括早期OpenAI（Atari、游戏）。我当时怀疑游戏能否导向AGI，更想做“accountant式”的现实知识工作，于是做了Universe里键鼠操作网页的agent——结果太早，reward过稀，烧算力学不到东西。今天做“computer use”的人是**先有LLM再做agent**：先拿到representation，再叠agent。

### 动物 vs “ghosts”与演化类比（00:07:51 - 00:10:40）
Dwarkesh Patel：Sutton会说动物能“从感知出发”从零学。为何不直接那样做？
Andrej Karpathy：动物来自不同优化过程（演化），硬件被“烘焙”在DNA里——斑马出生几分钟能跑不是RL，是内置。**我们不是在造动物，我们在造“ghosts”**：用互联网人类数据的模仿来训练，与演化完全不同。但我们可以逐步让它们更“animal-like”。我也怀疑人类在“智能任务”上是否真的用RL，人类的RL更多像motor tasks而非问题求解。

### 进化=算法 vs 预训练=知识？（00:11:09 - 00:14:38）
Dwarkesh Patel：演化更像找到算法，终身学习不必是RL。预训练更像给知识，不像找到算法？
Andrej Karpathy：预训练做两件事：1）捡知识；2）变聪明，**从互联网的算法模式里“自举”出电路**（如in-context learning）。我甚至觉得知识可能在拖后腿：agents难以离开互联网分布。我想往前走要**去除部分知识，只保留“cognitive core”**——剥离记忆，保留智能的算法与魔法。

### In-context learning与梯度下降（00:14:40 - 00:17:29）
Dwarkesh Patel：in-context的智能不是训练时的梯度下降。
Andrej Karpathy：可能不是显式的GD，但机制上**可能在层内跑“小型GD环”**。有论文展示**线性回归的in-context**，且通过注意力等硬编码出GD样式的权重更新。我们不完全知道机制，但它可能类GD。

### KV cache vs weights（00:17:29 - 00:20:06）
Dwarkesh Patel：KV cache每token的信息远超预训练。
Andrej Karpathy：训练阶段的知识是**“hazy recollection”**（朦胧回忆），因15T token压缩到几十亿参数。上下文窗口的KV cache是**working memory**，直接可访问。例如问书籍，给整章再问会更好，因为工作记忆里了。

### Transformer=皮层，比喻未齐全的脑区（00:20:08 - 00:22:03）
Andrej Karpathy：Transformer像“**cortical tissue**”，塑性强，能学多模态。思考链与planning像**prefrontal cortex**。我们还未仿真许多脑核团（hippocampus、amygdala等），因此**认知缺陷明显**，还不够像“可雇用的实习生”。

### Continual learning与“睡眠蒸馏”缺失（00:22:04 - 00:24:43）
Andrej Karpathy：模型会“从零窗口”启动，不会跨session持续。人类睡眠像**把白天上下文蒸馏进权重**。我们没有这一相当于“睡眠”的蒸馏。还有**sparse attention**（DeepSeek v3.2）的长上下文，是在重现进化的“认知技巧”。

### 十年后的架构与并进改进（00:24:50 - 00:27:31）
Andrej Karpathy：十年前是convnet与ResNet，如今Transformer。**十年后仍是巨型网络+gradient descent**，但更大更改良。复现Yann LeCun 1989的convnet时，我半个学习率就能“穿越33年”减半错误；再降错须**10×数据、更多正则与更久训练**。数据、硬件、软件内核、算法都要**同时进步**，没有哪一项独占。

### Nanachat与“build the code”的学习法（00:27:31 - 00:30:32）
Andrej Karpathy：Nanachat是最简完整管线，教你从零做ChatGPT克隆。最好是**右屏参考，左屏从零重写**，不抄，只参考。代码是从“块”生长的，后续我会补做“如何生长块”的视频。**别写blog或slides，build the code**，否则你以为懂，其实缺微观安排的真实理解。

### 代码模型的用武之地与局限（00:30:32 - 00:37:38）
Andrej Karpathy：我用三种：1）拒绝LLM（不再适用）；2）我写骨架，**autocomplete**补齐（甜点区）；3）**vibe coding**（“请实现X”）=agents。agents适合**boilerplate**；Nanachat不适合，因为结构独特且智力密集，模型会误解、**喜欢DDP**而我用自定义梯度同步；它们**过度防御**、滥try-catch、用**deprecated API**，**bloat**代码。Rust改tokenizer时因我不熟语言，能“vibe”+有Python参照与测试，安全。复杂架构问题我会把repo贴给**GPT-5 Pro**当oracle，已显著改善，但**行业在把“slop”说成“amazing”**，为筹资等。现阶段autocomplete最香。

### 递归自我改进是连续体（00:38:14 - 00:39:59）
Andrej Karpathy：AI是计算的延续：从编辑器/语法高亮到搜索引擎与编译器，本质是**“autonomy slider”逐步上推**，自动化更多底层事，人类抽象层上移。

### 广告：LabelBox（00:39:59 - 00:40:54）
Dwarkesh Patel：介绍LabelBox如何为RL稀疏反馈丰富监督（IDE增强轨迹、维度评分、可读性/性能、思考过程记录），生成高质量训练数据。详见labelbox.com/duarkesh。

### RL为何“terrible”（吸管监督与过程监督）（00:40:54 - 00:46:12）
Andrej Karpathy：RL解一道题会并行尝试百条轨迹，末端只比较**答案对不对**，然后把整条“对的”轨迹的每一步都**upweight**。这就是**高方差/噪声**：错路也被奖励。我称之为**“sucking supervision through a straw”**（用吸管吸监督），十分钟工作只回传一个bit。人类不会这样；人类会**review/reflect**：哪些做得好/不好。目前LLM没有等价机制。InstructGPT让我大开眼界：只靠模仿就能把“autocomplete”风格转成“assistant”风格并保留知识；随后RL能爬reward、发现人类没想到的解，**但仍很愚蠢**，我们需要“反思/过程监督”等新算法，已有一些早期论文。

### 过程监督与LLM judge对抗样本（00:46:13 - 00:49:52）
Andrej Karpathy：过程监督难在**自动化的部分信用分配**。很多lab用**LLM judge**判局部步骤，但**易被攻破**：我们遇到过生成“da-da-da-da-da”的胡言乱语却获judge 100%分，因为这是judge的**out-of-sample对抗样本**。你能把“da-da-da”加入负例训练，但**对抗样本无限**。像GAN地推稳也难保彻底鲁棒，我们还需要别的主意。

### 合成数据、反思与坍塌/熵（00:49:49 - 00:55:13）
Andrej Karpathy：希望模型在预训练中“**思考与和已有知识和解**”，像读书会。但直接用模型生成的“反思文本”训练会越训越差，因为**模型采样的分布“默默坍塌”**，熵很低：比如**讲笑话**只会那几条套路。人类噪声更大但**不偏**、熵高。要想让**synthetic generation**工作，就要**维持熵、避免坍塌**。也许**dreaming**在防过拟合：把你放进怪异分布以增熵。总之，要**seek entropy**，人与模型都如此。

### 儿童学习 vs LLM记忆（00:55:14 - 00:57:04）
Andrej Karpathy：孩子**不擅长记忆**但**擅长抽象模式**，这是好事，**逼你找一般化**。LLM则记忆超强，易被预训练记忆分散注意力。我要的“**cognitive core**”是**少记忆多算法**，需要查的就查。

### 模型坍塌与应用价值（00:57:30 - 00:59:08）
Andrej Karpathy：你可以正则熵让分布更“宽”，但会偏离训练语料，造稀有词与自造语言。现实里**绝大多数应用不需要多样性**，评估也更难，所以frontier labs未强推熵——但这**伤害了合成生成**时的分布质量，是“自己打自己”。

### 认知核大小与参数（00:59:49 - 01:03:21）
Andrej Karpathy：我猜**cognitive core ~ 1B参数**也能“像人”地对话与思考；事实性要查。之所以还这么大，是因为**互联网很“脏”**，预训练需要记忆大量垃圾，导致参数多是**记忆而非认知**。解决之道：用更智能的数据筛选，**删掉记忆、保留认知**，再做**distillation**。你说或许能更小，我承认可能，但**某个规模以下就不够表达算法**。也需保留**基础知识课程**，不可能啥都查。

### 模型规模趋势与低垂果实（01:03:58 - 01:06:01）
Andrej Karpathy：lab很实际，有flops与成本预算，**把预算从预训练转到RL/中期训练**。我预期各项并进，每项+20%，没有单一dominant。

### 广告：Mercury（01:06:01 - 01:07:16）
Dwarkesh Patel 与Max：分享用Mercury跑播客业务的体验。详情 mercury.com；银行服务由合作银行提供，FDIC成员。

### AGI进度衡量与知识工作份额（01:07:16 - 01:11:51）
Andrej Karpathy：我喜欢经典AGI定义：能做**任何经济有价值任务**，人类水平或更好。现实大家先把**物理工作**剔除，聚焦**知识工作**（我估10–20%经济体量）。看**call center**：任务**重复、闭环、纯数字**，更易自动化。但也应采用**autonomy slider**：AI做80%量，20%人类兜底，人管五个AI。**Radiology**不是好例子，工作面复杂，早先预测错了。

### LLM价值的“编码偏向”与文本/幻灯片差异（01:11:53 - 01:16:36）
Andrej Karpathy：**coding是LLM完美首用场景**：一切皆文本、数据量大、IDE与diff等**基础设施成熟**。如改slides：是图形与空间布局，没有“diff”的生态，难很多。即使语言入语言出任务（如卡片生成），也常难做到“满意”，这不是纯文本就简单的。

### 超智能=自动化延续与失控担忧（01:18:30 - 01:22:19）
Andrej Karpathy：我把superintelligence视为**自动化的延续**，更快更广。担忧是**逐步失去理解与控制**：多实体自治，部分**rogue**，彼此博弈，人类在外看不懂。

### 智能爆炸是“business as usual”（01:22:49 - 01:26:28）
Andrej Karpathy：所谓“intelligence explosion”是**business as usual**：工业革命、编译器、搜索引擎到LLM，递归自我改进已持续数十年。GDP曲线是**平滑指数**，新技术扩散慢、平均化，难看到AI的单点拐。

### 是否增长率跃迁（01:25:20 - 01:31:02）
Dwarkesh Patel：我预期增长率会跃迁（像工业革命）。
Andrej Karpathy：我怀疑有“**离散跳**”的先验，这历史上难证。即使有过一次“神奇事件”，也别假定AI再来一次；更可能还是**渐进扩散**。

### 广告：Google V0 3.1演示（01:32:31 - 01:33:37）
团队：展示V0 3.1相较V0 3的音频一致性与质量提升。可在Gemini App/Gemini API/Google Flow试用。

### 进化史与智能稀有性（01:33:38 - 01:36:19）
Andrej Karpathy：从Nick Lane出发，我直觉**可扩展智能是稀有事件**：**细菌**两十亿年多样但不进化到动物；**动物**数亿年后出现文化与知识积累，仍令人惊奇。

### 松鼠→AGI与算法简单性可能（01:36:01 - 01:36:22）
Andrej Karpathy：若动物算法可一旦有氧与真核就迅速涌现，也许**核心算法简单**；但证据难定。

### 鸟类与人类可扩展算法与生态位（01:37:21 - 01:38:39）
Andrej/Dwarkesh：鸟类可能也有**可扩展算法**但生态位不奖励更大脑（会坠机）；人类有手、能外部消化转更多能量给脑，形成飞轮。

### 文化作为爆发前脚手架与LLM文化缺席（01:39:44 - 01:41:19）
Andrej Karpathy：人类经历**文化脚手架**的百代积累。LLM今天**没有文化**：为何不让LLM**给LLM写书**？用共享scratchpad记录“群体知识与灵感”。

### 多智能体：自博弈与文化（01:41:20 - 01:43:32）
Andrej Karpathy：两大未充分探索方向：1）**文化**（LLM群体的持续知识库）；2）**self-play**（像AlphaGo），一个LLM出题，另一个变强，难度持续上调。尚无人把这两者在LLM领域**“拿下”**。

### 瓶颈：模型仍像“小学生”（01:43:53 - 01:44:42）
Andrej Karpathy：许多小/中模型的**认知像小学生/小学**，虽能做博士题却**不真正“会”**；因此现在还造不出文化。

### 自动驾驶的“九个9”与产品化鸿沟（01:44:43 - 01:47:15）
Andrej Karpathy：自驾从80年代起就有demo，但**demo→产品有巨大鸿沟**，尤其**高失败成本领域**。产品化是**“march of nines”**：每加一个9都是恒定工作量。我在Tesla五年可能推进两三个9，**仍未完结**。软件工程同样应谨慎。

### 自驾尚未规模化与遥操作、人力成本（01:49:38 - 01:51:00）
Andrej Karpathy：Waymo等部署量仍少，**经济性**（capex/opex）尚未完全跑通。还有**teleoperation**的隐形人类在环，我们未真正“把人移除”，只是搬到后台。

### bits优势与部署（01:52:17 - 01:53:30）
Andrej Karpathy：**bits比atoms容易百万倍**，纯数字知识工作更容易在经济与延迟上规模化。

### 社会/法律/保险与“路锥等价物”（01:54:11 - 01:54:48）
Andrej Karpathy：还需考虑社会接受、法律框架、保险机制，以及**“往Waymo车上放路锥”的等价物**在AI知识工作里的表现。

### 是否过度建设算力与乐观谨慎（01:54:48 - 01:57:10）
Andrej Karpathy：我听起来悲观只是反对**时间线/筹资叙事的过度**。我总体乐观，认为**不会过度建设compute**：Claude Code/Codex一年内诞生，需求巨大。只是要**校准现实**，避免地缘政治与产业误判。

### 教育愿景：Eureka与“Starfleet Academy”（01:57:11 - 02:00:03）
Andrej Karpathy：我更能**独特地贡献在人类赋能**而非lab边际改良。Eureka愿景：打造**Starfleet Academy**——前沿技术的精英学府，实体为主、数字为辅，让人类在AI时代不被边缘化。

### 完美导师的高标准与当前能力缺失（02:00:03 - 02:02:03）
Andrej Karpathy：我学韩语的**一对一导师**能快速建模我的知识状态、精准设定挑战难度，让“我成为唯一瓶颈”。**今天LLM做不到**这一点。AI导师会来，但**现在还早**；先做更“常规”的实体+数字课程。

### 课程建设与AI辅助（02:02:03 - 02:05:54）
Andrej Karpathy：正在做**LLM101N**，capstone是**Nanachat**。AI大幅**加速内容生产**（做枯燥活儿），但**创意架构**仍需人。和当年做**CS231n**相比，如今**LLM助力**显著，但还不能“自己写出Nanachat”。

### 师资与实体学院/数字层（02:05:55 - 02:08:06）
Andrej Karpathy：短期要**聘请faculty**跨学科；部分**TA将被AI替代**（基于课程材料做答疑）。顶级体验在**实体**（全程陪跑确认掌握），数字层次为**次一级**（广泛可及）。

### 后AGI教育=健身房类比（02:08:36 - 02:10:11）
Andrej Karpathy：**Pre-AGI教育是“有用”**，**Post-AGI教育是“有趣”**。像健身：机器替你搬重物，但你仍为健康/美感去练。完美AI导师让学习**轻易且愉悦**，人人可能**会五种语言**、掌握本科通识。教育也会出现“认知举重”的运动。

### 教学建议与物理思维、micrograd（02:15:48 - 02:19:28）
Andrej Karpathy：我强烈推**物理的认知训练**（spherical cow、一阶/二阶项、模型抽象）。我的**micrograd**用100行Python演示**反向传播与链式法则**——这就是**训练的核心**，其余都是**效率工程**（tensor布局、kernel与内存调度）。

### 教学法：先呈痛点再解法、让学生先猜（02:19:28 - 02:21:00）
Andrej Karpathy：**先呈痛点，再给方案**；先让学生**猜**，再揭示答案，最大化每条新事实的增量知识。我的Transformer教程从**bigram lookup**起步，层层动机，引入attention。

### 专家诅咒、用ChatGPT看“笨问题”、午餐解释更好（02:21:13 - 02:23:01）
Andrej Karpathy：**curse of knowledge**真实存在。一个技巧：让ChatGPT在上下文里问“笨问题”，再把对话给作者看，帮助他们面向初学者解释。很多论文**“酒桌三句话”**最能抓住精髓——**“just say the thing”**。

### 学生自学策略：按需/广度交替、讲授即学习（02:23:50 - 02:25:28）
Andrej Karpathy：交替**on-demand深度学习**（为项目目标）与**breadth学习**（1-on-1通识）。另一个大招是**解释给别人**：一解释就暴露你不懂之处，逼你补齐。

### 结束与行动号召（02:25:39 - 02:26:06）
Andrej Karpathy：喜欢本期就分享、评分/留言；赞助见 dworkesh.com/advertise。下一期见。

## 欢迎交流与合作
目前主要兴趣是让agent在实际生活中落地，想进一步交流可加我微信（微信号：cleezhang）。一些[自我介绍](https://lee-agi.github.io/Insights/16695c5e82/)。
