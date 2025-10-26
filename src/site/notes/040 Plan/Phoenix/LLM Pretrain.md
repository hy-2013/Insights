---
{"dg-publish":true,"permalink":"/040 Plan/Phoenix/LLM Pretrain/","tags":["#LLM/Pretrain"]}
---

思考：
1. LLM主要玩家`3个2`：2（meta、deepmind）+2（qwen+deepseek）+2（openai、anthropic）+其他（nv、allenAI、高校）
	1. 方向或思想：**deepmind**、meta、openai、anthropic、Stanford/CMU/MIT、MSRA、清华
	2. 开源：
		1. 国外：**meta、olmo**（allan ai）、**nv**、gemma、mistral
			1. phi、cohere、AI21 Labs、Apple、NexusFlow
		2. 国内：**qwen、Deepseek**
			1. glm、InternLM
	3. 闭源：
		1. 国外：oai、anthropic、Gemini、grok
			1. Reka AI
		2. 国内：字节、百度、快手、六小龙、腾讯
2. 如何做知识注入？
	1. Richard Sutton的online learning，Lecun的world model
3. 如何系统提高reason、math和Planning的能力？
	1. 清洗、格式化、生成高质量math和coding数据
	2. 外部系统工具
	3. let verify step by step
4. 为啥比baichuan2差：Token数1.1T:2.6T，中文质量不足，刷分trick。
5. Scaling law预测出loss值后的价值是什么？
	1. 不同N相同loss，task performance也不同（比如34b 5w步和1.5b训完的loss一样，但performance比1.5b差），5w步的34b训练不充分。所以重要性：D>N>超参？
	2. ~~N和D都相同，loss相近，但task performance也差别很大。~~（wsd task62是比task42的task performance更好些）
	3. loss值和task performance的关系不清楚，最多有一定的正相关性
	4. transformer结构：C=6ND
	5. 价值：给定训练时间和训练资源的前提下（deadline），计算最优loss对应的N和D。（但大一点loss的「大D小N」就比小一点loss的「小D大N」下游task performance更差吗？）
6. 大模型的online learning：某个场景给了少量高质量的知识的数据，如何可靠且全自动的将这些知识训入基座。无论是扩增数据还是其他方式。
7. 基于音频的Suno， 基于视频的Sora，基于文字的LLM，基于棋盘的AlphaGO
	1. TB级的高质量标注（包括自监督）数据：本来就有、合成或自迭代交互生成，包括 统一的数据表示方法（tokenizer）
	2. 可scale的模型架构：transformer。任务的组合空间要足够大，拟合的函数要足够复杂
	3. 可scale且明确的优化目标（如PNT，predict next token）
	4. 商业价值足够大 & 为什么是你做？
8. 自研特色：小size（不超过34b）
	1. 助手专用LLM：中文理解、指令遵循和long Context
	2. 出行Planning
	3. 司乘LBS情感陪伴
	4. 专业能力：数学、推理
	5. 多模态：和桔视、无人车等业务结合
9. 关于增加中文token的预训练：
	1. 加中文词表加中文数据比例二阶段训，会比中英合理比例from scratch训差多少？
	2. Llama 3 词表中文token大概3.9k，不考虑推理效率，只考虑最终效果，你们觉得应该加词表吗？
	3. 增量训应该注意哪些问题？
		1. 数据分布的逐步调整、增加中文占比：warmup
		2. replay比例和中英文比例
		3. lr Scheduler
10. 一些原则：Armen Aghajanyan和[Hyung Won Chung](https://x.com/hwchung27/status/1800676312916656592)
	![Pasted image 20240630185731.png](/img/user/990%20Attachment/Pasted%20image%2020240630185731.png)
   ![Pasted image 20240630185639.png](/img/user/990%20Attachment/Pasted%20image%2020240630185639.png)
   ![Pasted image 20240630185828.png](/img/user/990%20Attachment/Pasted%20image%2020240630185828.png)：随着算力增长，需要不断寻找最适合的structure（model和loss），more scalable and simle structure
	1. llm的核心要素：寻找**最适合当前compute和data的end-to-end scalable structure**
		1. compute：GPU和多机多卡（Infra）
		2. data：data infra（全人类数据数字化）和tokenizer
		3. learning objectives：AE到AR（decode-only）。寻找scale更好的loss
		4. architectures：enc-dec -> encoder -> decoder (share params of enc and dec)
11. 多卡超参：
	1. 小参数量model：优先DP和TP，后面调PP，PP容易产生气泡
		1. `--tensor-model-parallel-size 4 --pipeline-model-parallel-size 4 \`
	2. TP精度影响这个是不可避免的，浮点数特性
	3. 显存需要：
		1. 训练：模型size的20倍+
		2. 推理：模型size的两倍+（fp16+kv cache）
12. 知识类需要采购，math和code可以合成
13. 小模型的知识记忆问题可以考RAG或long context来接，专注于优化推理和math即可？
	1. 大模型多出来参数只是用于记忆吗？（显然不是）
14. doremi的问题？
	1. loss导向而不是metrics
	2. 无法区分hard和噪声
	3. 要增加的data类型未必就有
15. 去重的必要性调研：
	1. 算力有限的情况下：本质是多样性更重要还是质量更重要，看目标是什么
	2. 算力充足的情况下：可适当上采样高质或domain数据，提升特定能力
16. 合成数据：600卡L20+96卡H800：每天1B
17. 关于9b-014的训练：
	1. stage1从85w到136w共2T的token，LR从2.85e-4降到了1.32e-4（降1.53），斜率高了。和stage2的1.8T token从1.32e-4降到0.斜率类似，给stage2的LR调整空间小了。
18. 用召回率判断学习区，判断是base模型能力不足还是SFT能力不足。
19. MoE vs Dense一个对比角度：人脑只激活一部分参数。

非舒适区、code、Pretrain数据和long context、语音多模态？
2. 军师做哪些数据的事？工程的事？
### TODO
1. [ ] x
2. [x] code：和qwen相当、long thought code、code Pretrain ✅ 2025-01-17
3. [x] liwu code数据总量（400B左右）？ ✅ 2024-12-06
4. [x] 5.7t的增量数据构建 ✅ 2025-01-13
5. [ ]
6. [ ] Pretrain数据防污染
7. [ ] fine-web-2的多语言、nv Nemotron-CC、清华开源
8. [ ] pdf解析：paddle-detect、got-ocr。图片标题、页眉页脚、公式/表格/图片
9 [ ] 所有数据的领域分类
90 [ ] 文谦的dev技术文档（dev.io）
91 [ ] 5个bert：zh/en common/math bert，小语种bert和code bert
92 [ ] ~~采购电子书英文和小语种；weixin噪声处理；k12修复（本周修复完）~~；~~luban cc bert补数据（还需要去重和12分类，本周处理完）；URL去重合理性（cc数据做实验）；增量数据长bert打标join~~。
93 [x] 除了bert，weixin（7b过滤）、zhidao（阈值确认）和book（段落和句子去重）。liwu code。 ✅ 2024-11-22
94 [x] 合成：lihan knowledge、yubo code ✅ 2024-11-22
95 [x] long context：评估、工程、数据（如何配比）、rope ✅ 2024-11-22
96 [x] weixin的句子去重：句子去重效果迭代。**大模型句子去重** ✅ 2024-11-22
97 [x] 非pdf的book、zhidao和weixin ✅ 2024-11-22
98 [x] html的math抽取 ✅ 2024-10-18
19 [x] 中文bert math/code、math翻译错的、code合成 ✅ 2024-11-29
90 [x] 去重tokenizer的效果 ✅ 2024-10-11
91 [x] 传数据申请a6000 ✅ 2024-10-11
92 [ ]
93 [ ] 刷分经验基于case的总结
94 [ ] cc的优先保留逻辑：dclm和refinweb-edu
95 [ ] 段落去重和句子去重优化
96 [ ] cooper表中的下个星期处理完：新采购的要来
	1. [ ] liwu：阿里云电子书、1.3t问答
	2. [ ] 平行语料数据
9. [ ] bert质检回捞：筛选（drop的取4-5，未drop的取3-5）和去重
10. [ ] book数据：zlib等
	1. [ ] epub，pdf、mobi、fb2格式清洗
	       epub：473w pdf：1072w mobi：118w azw3：60w fb2：80w txt：12w other(lit,rtf,lrf)：27w
	2. [ ] OCR
	3. [ ] 军师发case
11. [ ] liwu的论坛数据、vikp
12. [ ]
13. [ ] cooper的过滤数据统计？阈值逻辑整理和可配置化？
14 [ ] 大模型过滤和分类tag
	1. [x] en和多语言 ✅ 2024-08-16
	2. [ ] 6p cc打tag
14. [ ]
15. [ ] 二阶段long context实验、刷分实验（用trainset和仿写数据）、9b的结构实验
16. [ ]
17. [x] MAP-CC、refine-edu、6P CC数据中/英文、存量20T CC，走流程，打tag和大模型过滤 ✅ 2024-08-23
18. [ ]
19. [ ] llama3 tokenizer跑1.5b task42：怀来
20. [ ] 1.5b测v3.1（**剔除低质古文数据、英文高质过滤数据**）：baichuan2 tokenizer
21. [ ] ct
	1. [ ] 数据：
		1. [ ] **剔除低质古文数据、英文高质过滤数据**、英文垂类数据
		2. [ ] **P0：**llama3召回率低的数据**：25b中文token
		3. [ ] replay中英文比例：多跑一些step看看
		4. [ ] 数学和code的配比提高
		5. [ ] 采购中文数据：百科、知乎、教材
	2. [ ] lr decay：
		1. [ ] **P1：调小 constant**
		2. [ ] 线性decay
	3. [ ] 扩充tokenizer：**TODO：P1：尽快评估出效果**
		1. [ ] Embedding初始化
		2. [ ] 冻结部分层
22. [ ] moe跑llama3 8b
23. [ ] 34b退火
24. [ ]
25. [ ] fp8训练
26. [ ] MLA moe加速
27. [ ] Quiet Attention、BS rampup实验
28. [ ] 加上tb的每层norm监控
29. [ ] 34b中文评估问题
30. [ ] llama3的2t数据是否使用的评估
31. [ ] 业界ct的方案调研
32. [ ]
33. [ ] 数据V3
	1. [ ] 中文：
		1. [ ] 过滤古文
		2. [ ] 过滤政治敏感和色情类
	2. [ ] 英文：
		1. [ ] llama2 7b cc过滤
		2. [ ] math
		3. [ ] code
34. [ ] 中文SFT llama3 8b
35. [ ] 类似stability 1.6b的多epoch实验 🔼 📅 2024-04-23
36. [ ] uP参数迁移理论、cpm的一些超参实验、小参数实验 🔺
37. [ ] 超参优化：
	1. [ ] **LR：更多阶段退火**
		1. [ ] task64 20w步以后 多来几个阶段（就恒定和下降多交替几次），然后是7B的版本实验
		2. [ ] task62的第三阶段让lr一直降
		3. [ ] adam对参数更新的详细逻辑
	2. [x] **deepnorm** ✅ 2024-04-16
		1. [x] 调试alpha、lr等超参 ✅ 2024-04-16
		2. postNorm的gn确实更小了，但效果明显变差，梯度消失？
38. [ ] 模型结构：
	1. [ ] **MOE**
		1. [ ] 1.5b\*8 MOE的param进入稳态，做继续训练
		2. [ ] moe balance、expert等超参实验
		3. [ ] upcycling继续训练
		4. [ ] 7b MOE
	2. [ ] Long Context
		1. [ ] 长文本upsampling
			1. [ ] 长文本构建：
				1. 困惑度差异指标主要计算两段文本之间的条件概率，其中S1是在S2之前的文本，当两个文本强相关时，条件概率值大于单独计算S2的概率，困惑度差异值为负值。（用赵瀚的NSP bert？）
		2. [ ] **dataloader优化**：
			1. [ ] repo等在同一个global batch
		3. [ ] NTK、ROPE类外推实验
	3. [ ] 1.5b宽矮实验
39. [ ] data-centric：
	1. [ ] V3数据构建🔺
		1. [ ] 400M测试
	2. [ ] **采买、合成、改写数据**
		1. [ ] 3.4亿问答，1千6百万文章
	3. [ ] 提升推理和规划能力：
		1. [ ] **math数据清洗和Norm**
	4. [ ] continual Pretrain 多阶段训练
		1. [ ] 13b-task001的推理增强（优先级最高）：数据norm化（code、math） 📅 2024-03-15 🔼
		2. [ ] task42或62的基础上，增量训剩下的1T，积累增量训数据配比的经验
	5. [ ] In Context Pretrain（再跟晋飞看数据）🔺
	6. [ ] 数据配比实验
		1. [ ] **类目tag细分**，Reference model，doremi训练开发 📅 2024-03-15 🔺
			1. [ ] 基于loss：doremi、[ODM（batch-mix+MAB）](https://arxiv.org/pdf/2312.02406.pdf)
			2. [ ] 基于grad
		2. [ ] Latent topic：层次化聚类中心+倒排索引
		3. [ ] 训练加速：sample importance层次化构建
	7. [ ] **Pipeline：语义相似度去重** ⏫ 📅 2025-05-07
	8. [ ] 平行语料：fb无监督翻译论文
	9. [ ] 中文模型的梳理，尤其Pretrain阶段，数据配比如何？
	10. [ ] book等长文本去重问题：基于段落？
		1. [ ] 还是继续minhashLSH来做，压缩比高也行，保证大量重复才会过滤

---
一些结论：
1. 增加egs破坏Embedding层更新节奏，效果负向
2. deepnorm（PostNorm）的gradnorm变小，但效果影响更差
	1. 加shortcut，shortcut下传的梯度一般会比较大

---

### 实验分析：
#### 1. Dense
| 版本                                                                  | 自建eval            |                   | 备注                                                                                                                                    |
| :------------------------------------------------------------------ | ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                     | 中文（top1/5）        | 英文                |                                                                                                                                       |
| Baichuan2 7B（660B）                                                  | 0.6706	**0.4307** | 0.7816	**0.5843** |                                                                                                                                       |
| 复现pythia，验证megatron框架 - task014                                     |                   |                   |                                                                                                                                       |
| 中文v1.1（skypile和wanjuan-web去重）- task016                              | 0.5939	0.368      | 0.7116	0.5039     |                                                                                                                                       |
| - 7b-task000                                                        | 0.6297	0.3986     | 0.7478	0.5433     |                                                                                                                                       |
| Base task016，增加flan_v2和wanjuan exam-cn - task19                     |                   |                   |                                                                                                                                       |
| 中文V2（所有中文过滤和去重）- task23                                             |                   |                   |                                                                                                                                       |
| **中文V2+英文V2**爬虫采样43% - task29                                       | 0.6072	0.3798     | 0.742	0.5377      |                                                                                                                                       |
| 中文v2+英文v2（增加en_wiki/en_flan/垂类数据）爬虫采样43% - **task30**               | 0.6138、0.3883     | 0.7431	0.5432     |                                                                                                                                       |
| 数据同task30 - 7b-**task002**                                          | 0.6553	**0.4202** | 0.7771	**0.5803** |                                                                                                                                       |
| - Base 7b-task002 从gn上涨的6w5开始reshuffle                              |                   |                   | 仍然上涨，说明上涨和数据质量有关，同时上涨本身在后期有合理性                                                                                                        |
| Base task30+继续降低lr数据过两遍 - task32                                    | 0.6151	0.3897     | 0.7456	0.5443     | 相比task30提升0.1pp，**性价比不高**，说明是模型容量受限，ROI有限。一个epoch后的重复和一个epoch内的重复还是略有不同，因为第二个epoch开始效果基本没下降。垂类小模型一般训多个epoch因为更重记忆、轻泛化，而且模型参数相对训练数据更大。 |
| Base task30+新增10%的wiki/QA/baike从跑task30的最后3w步 - task34              | 0.6138	0.3883     | 0.7431	0.5432     | 最后简单增加高质量数据比例，没发挥作用                                                                                                                   |
| 非爬虫中文+英文v2（类似GPT比例） - task35                                        | 0.5411	0.3367     | 0.752	0.5529      | 中文严重下降5.2pp，英文提升1pp，效果一般                                                                                                              |
| 非爬虫中文+英文v2爬虫采样43% - task36                                          | 0.5556	0.3463     | 0.7236	0.5207     | 中文下降4.2pp，英文下降2.3pp，**说明中英文爬虫都需要**                                                                                                    |
| Base task36+增加code比例 - task38                                       |                   |                   | 没跑完。（planning或推理，推理小说、游戏文案等）                                                                                                          |
| 中文v2.2（baichuan2洗数据）+英文v2爬虫采样43% - 7b task006                       | 0.6492  0.4144    |                   | 中文召回率差0.6pp，但AlignBench和体感明显略好                                                                                                        |
| **中文v2.3**（中文书、电信数据等）+**英文v2.1**（增加SE数据量）爬虫采样43%，共1.1T - 7b task007 |                   |                   | 只跑了11w步左右                                                                                                                             |
| 中文v2.2+英文v2 - task39                                                |                   |                   |                                                                                                                                       |
| *中文v2 - 13b task000*                                                | *0.6177	0.38*     | *0.5038	0.311*    | *只用中文100B token，13b略差与1.5b*                                                                                                           |
| 数据同7b task007 - **13B-task001**                                     |                   |                   |                                                                                                                                       |
| 数据同7b task007 - task 40                                             |                   |                   | 总共16w步，只跑了11w步。                                                                                                                       |
| 数据同7b task006 - task 41                                             |                   |                   | 对比task30，baichuan2抽取高质量数据体感更好了，类似7b。对比task39：**中文能力没有下降**（体感还略好），英文因为比例变大的原因，明显变好了。                                                   |
| 数据同7b task007 - task 42                                             | 0.622\|0.3917     | 0.7566\|0.5543    |                                                                                                                                       |
| 数据同7b task007，**context length为4k**，对比task40 - task043              |                   |                   | 总共16w步，只跑了11w步。通用指标有好有差（reason好像好了些），10w步时loss低0.04.                                                                                  |
| task 42的基础上新增加math、code和paper - task 45                             |                   |                   | 相对task42，gsm8k和Humaneval变好。除了hellaswag变差，其他效果类似                                                                                       |
| task 42的基础上新增加reddit、wiki和paper - task 46                           |                   |                   |                                                                                                                                       |
| 模型更加瘦高，对比task42 - task49                                            |                   |                   | 效果很差。原因：小模型可能主要还是靠记忆，需要想Gemma 7b一样往宽了做。                                                                                               |
| 7b task006的基础上新增加math、code和paper各10-15B - 7b task008                |                   |                   | ![Pasted image 20240219191623.png](/img/user/990%20Attachment/Pasted%20image%2020240219191623.png)![Pasted image 20240219191718.png](/img/user/990%20Attachment/Pasted%20image%2020240219191718.png) loss低了0.2pp。相对task45负向指标较少，gsm8k和Humaneval变好。                |
| 对Embedding和PreNorm底层Layer增加weight decay，对比task42  - task50          |                   |                   | 无法有效阻止gn上涨。                                                                                                                           |
| deepnorm+post LN - task055                                          | 0.5971\|0.3722    | 0.7317\|0.5261    | gn确实更小了，但仍然上涨。自建指标差了2pp+，通用指标崩了，loss高0.1到0.2。                                                                                         |
| 对比task42，去掉code和youtube数据 - task060                                 |                   |                   | gn更大了而且一直在上涨，毛刺反而更多了（不好解释）。loss高0.1到0.2。                                                                                              |
| LR退火实验1，数据同task42 - task62                                          | 0.6297, 0.3982    | 0.7611, 0.561     | loss是2.35，比task42低0.02（task42是2.37）                                                                                                   |
| 中文v2.3和英文v2.2（增加olmo-cc、reddit、pes2o）共2T数据 - **task64**             | 0.6202\|0.3897    | 0.7588\|0.558     |                                                                                                                                       |
| LR退火实验2（stage3继续退火），数据同task42 - task68                              | 0.6301  0.3994    | 0.7618  0.5626    | loss是2.34，比task42低0.03                                                                                                                |
| 中文v2.3和英文v2.2 - 34b task001                                         |                   |                   |                                                                                                                                       |
|                                                                     |                   |                   |                                                                                                                                       |
|                                                                     |                   |                   |                                                                                                                                       |

| 模型大小      | 高   | 宽（hidden size） | ffn size | 长（Context Len） | LR（min-lr 10%） | BS  |
| --------- | --- | -------------- | -------- | -------------- | -------------- | --- |
| 400m      | 12  | 1024           | 2304     | 2048           | 1e-3           |     |
| 1.5b      | 20  | 2048           | 5440     | 2048           | 3e-4           | 4m  |
| 2b        | 26  | 2304           | 9216     | 8k             |                |     |
| 7b        | 32  | 4096           | 10880    | 2048           | 3e-4           | 4m  |
| gemma2 9b | 42  | 3584           | 28672    | 4k/8k          |                |     |
| 9b        | 42  | 3584           | 28672    | 8k             |                |     |
| 13b       | 40  | 5120           | 13824    | 4096           | 3e-4           | 4m  |
| 34b       | 60  | 7168           | 20480    | 4096           | 1.75e-4        | 4m  |
| 72b       |     |                |          |                |                |     |
* BS = `global-batch-size` * `seq-length`

##### 1. 34b的经验教训
1. 训练问题：
	1. Tokenizer非自建
	2. 数据质量：gradnorm毛刺多，loss spike也出现多次
		1. 非cc数据专项阈值过滤：paper、book、wiki、QA等
		2. 垂类数据专项过滤：base64编码、html、非中英语料过滤
		3. 最后没有混入zw-math、orca-math等数据
		4. decay混Instruct数据混晚了
			1. 加入ph-Instruct-v1后指标又好有差
			2. 加入K12和zh-paper后，多数变好
	3. LR Scheduler初始化问题，做了多次调整，从1.75e-4（cosine lr）到1.5e-4。。。
		1. ![Pasted image 20240709154621.png](/img/user/990%20Attachment/Pasted%20image%2020240709154621.png)
	4. dataloader的bug（iter设置过大）造成重复数据的问题。init method std=0.006导致grad norm和loss不稳定？
	5. context length只有4k
	6. bs统一用的4M
	7. 其他：
		1. GPU硬件故障、各种CUDA kernel errors
		2. 部分报警没能捕捉到，导致GPU空置
2. 组织问题：
	1. 主动性和执行力
3. Pretrain迭代问题：
	1. 迭代速度强依赖**C和D的资源**
	2. 更多是数据实验（技术认知显著不多）
	3. 评估标准的问题
#### 2. MOE
1. 评价指标：同等效果的dense的激活参数是moe的几倍，越大越好。
	1. ds moe是4倍+
2. Deepseek的一些实验：
	1. moe vs deep：和一半参数量的deep水平相当，但推理和训练成本（activate 参数量）是deep一半以下
		1. moe 2b ~= dense 2b
		2. moe 6b（1.5\*8）~= 3b+?
		3. moe 16.4b ~= 7b，2.8B for infer, only about 40% of computations
		4. moe 145b ~= 67b，only 28.5% (maybe even 18.2%) of computations.
3. mistral：
	1. blog：[Mixtral of experts | Mistral AI | Open-weight models](https://mistral.ai/news/mixtral-of-experts/)

| 版本 | 自建eval |  | 通用eval |  | 备注 |
| :--- | ---- | ---- | ---- | ---- | ---- |
|  | 中文（top1/5） | 英文 |  |  |  |
| 1.5B-task 42 | 0.622\|0.3917 | 0.7566\|0.5543 |  |  |  |
| 1.5B-moe-task003 |  | 0.7816	**0.5843** |  |  |  |
| 1.5B-moe-task004 |  |  |  |  |  |
### 3. MOD
1. 由于KV cache的原因（每个token MHA的计算仅为单token的query），而且kv cache矩阵是token粒度增量扩充的，会导致MOD推理时和训练不一致（训练时gate能看到整个sequence，而且是attention mask的方式计算整体的loss）。

---

```
1. 目标：中文场景下，function call、reasoning和planning能力
2. 数据类型（4+1）：Code、高知（paper-ArXiv、wiki、book）、Q&A（reddit、S&E）、网文爬虫；综合
3. 世界知识：事实、技能、理论的总和。
4. 存储空间\/3=Token数
5. 平行语料
	1. cc数据里应该有很多平行语料
6. 数据：成立新公司
	1. 问答、出行相关
	2. 美东的机器爬虫
	3. 合成数据：基于知识图谱的数据合成
		1. 完善数据分布中【缺失】的部分

六、大模型基础平台建设方向@孔建钢(kongjiangang)
H1边建设，边生产;H2提性能，助落地;
Q1:
PO. LLab攻防两组资源到位和保障(H800, A100, L40S和A6000);
PO.预训练四项支持:数据生产、工程需求、AB实验/消融实验、训练支持;
PO.依托MH，承接支持防守组各方向LLM微调、推理部署和优化;
P1.两大子系统开发:数据清洗子系统+MH预训练，完成预训练训练、评估流程一条龙;

Q2:
PO.完成数据清洗系统4化，并与MH的集成;(完备化、自动化、在线化、可视化)
PO. IFX-LLM Ready,计划优化项和功能完成，重点业务性能达标，MH部署默认IFX-LLM;(量化、融合、FP8低精、投机采样)
P1.预训练进入到例行任务阶段，提供有限范围的自助排查、诊断能力;

Q3:
PO.预训练优化，共建追求更大模型、更少时间、更可靠的训练能力;
PO.IFX-LLM持续推进攻防两组以及其他业务的推理部署，条件允许推进开源;
P1. MH具备大模型安全合规检查评估能力;
P1.大模型大赛支持;

Q4:
PO. MH司内推广，达成覆盖支持>=95% 大模型模型生产、部署场景;
PO.预训练FP16 MFU>=45%;(当前值39.5%，估计理论值在60%);
PO. 以llama-7B为典型，推理性能在10s延迟下，实现>=50%(2070tokens/s)吞吐增加;
吉
```
---
### 查GN上涨问题

1. https://wandb.ai/ai2-llm/OLMo-7B?nw=nwuserakshitab
2. gn的计算代码
   ![Pasted image 20231222160319.png](/img/user/990%20Attachment/Pasted%20image%2020231222160319.png)

3. 毛刺数据分析：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/sheet/2201629244536?sheetId=MODOC)
	1. shuffle数据分布分析：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/sheet/2201374744992?sheetId=lTCQf)，发现shuffle没问题
	2. shuffle后的数据分布检查：
		1. 利用二分类模型（fasttext）检查毛刺batch和非毛刺batch间的数据分布是否有明细差异
4. 训练代码：
	1. gradnorm代码：[Site Unreachable](https://git.xiaojukeji.com/MachineLearning/Megatron-LM/blob/master/megatron/optimizer/clip_grads.py)
	2. [GitHub - kyegomez/AttentionIsOFFByOne: Implementation of "Attention Is Off By One" by Evan Miller](https://github.com/kyegomez/AttentionIsOFFByOne)
5. 1.5b+600B左右的数据
	1. 怀疑grad norm上涨和数据重复有关，手动复制部分数据源重复5次，和其他数据源混合后，跑了10w iter，未观察到norm上涨 链接：[http://10.207.0.177:8058/?darkMode=true#timeseries](http://10.207.0.177:8058/?darkMode=true#timeseries)
	2. pythia模型结果复现，使用pile去重后的数据，grad norm在6w iter后开始上涨，结果正在评测与对齐中 链接：[http://10.191.160.12:8040/?darkMode=true&smoothing=0.91#timeseries](http://10.191.160.12:8040/?darkMode=true&smoothing=0.91#timeseries)
	3. 内部纯英文数据训练，grad norm在12w iter后有上涨（数据在10w iter已经全部过完） 链接：[http://10.191.160.12:8056/?darkMode=true&smoothing=0.91#timeseries](http://10.191.160.12:8056/?darkMode=true&smoothing=0.91#timeseries)
	4. 数据清洗v1.1版本中英文混合实验，目前跑到9w iter，grad norm暂未上涨，loss曲线和之前未去重差不太多 链接：[http://10.207.0.177:8059/?darkMode=true#timeseries](http://10.207.0.177:8059/?darkMode=true#timeseries)
	5. lr 4w步衰减问题：[TensorBoard](http://10.207.0.177:8051/?darkMode=true#timeseries)
	6. lr衰减修复：[TensorBoard](http://10.207.0.177:8052/?darkMode=true&smoothing=0.87#timeseries)
	7. 剔除cc数据：[TensorBoard](http://10.207.0.177:8052/?darkMode=true&smoothing=0.87#timeseries)
	8. 剔除wanjuan古文book数据：doing
	9. 只有英文数据：[TensorBoard](http://10.191.160.12:8056/?darkMode=true&smoothing=0.94#timeseries)
	10. 段落去重：[TensorBoard](http://10.207.0.177:8059/?smoothing=0.84#timeseries)
	11. 验证下megatron-LM有没有大问题：复现pythia实验
	12. 跳过数据，gradnorm没变好
	13. 增加lr实验：[TensorBoard](http://10.207.0.177:8061/?smoothing=0.91#timeseries)
		1. 调大lr目前看loss优于之前的最优版本万五
	14. 中文v2数据：[TensorBoard](http://10.191.160.12:8001/?darkMode=true&smoothing=0.9#timeseries)
	15. `--reset-attention-mask`：loss和佳哥评估集效果没变化
6. 增加flan中英文0-shot数据（14b，占比2%）：logprob变化微弱，万分位波动
	1. ![Pasted image 20240105170637.png](/img/user/990%20Attachment/Pasted%20image%2020240105170637.png)
7. 9.2w步前后模型参数对比：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/sheet/2201517686170)
8. 查问题：从大到小的层次化分析gradnorm
	1. 不同层的gradnorm打印：不同sample不同层级的grad，目前来看整体都有上涨，没有找到特别的规律。
		1. 结论：有上层更新快 下层更新慢的现象，也符合预期，低阶表征很快就学习好了，高阶表征比较难学，需要一直调整。
		2. phoenix 13b 001：![Pasted image 20240221160455.png](/img/user/990%20Attachment/Pasted%20image%2020240221160455.png)
		3. baichuan2 7b base：![Pasted image 20240221160425.png](/img/user/990%20Attachment/Pasted%20image%2020240221160425.png)
		4. moe 1.5b\*8：![Pasted image 20240221160710.png](/img/user/990%20Attachment/Pasted%20image%2020240221160710.png)
		5. [TensorBoard](http://10.191.69.151:8001/?pinnedCards=%5B%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22moe+10w+parameter+lm_head.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%2C%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22moe+10w+parameter+model.embed_tokens.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%2C%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22moe+18w+parameter+lm_head.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%2C%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22moe+18w+parameter+model.embed_tokens.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%2C%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22baichuan+440B+parameter+model.embed_tokens.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%2C%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22baichuan+1100B+parameter+model.embed_tokens.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%2C%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22baichuan+440B+parameter+lm_head.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%2C%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22baichuan+1100B+parameter+lm_head.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%2C%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22baichuan+2200B+parameter+model.embed_tokens.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%2C%7B%22plugin%22%3A%22histograms%22%2C%22tag%22%3A%22baichuan+2200B+parameter+lm_head.weight%22%2C%22runId%22%3A%22defaultExperimentId%2F.%22%7D%5D#timeseries)
	2. 模型每层的参数变化：看了下9.2w步gradnorm陡增前后2.5k步checkpoint的每层的参数变化，没有发现有明显异常，基本越往后变化越小（也和lr下降有关）
	3. Pre-Norm的相当于从顶层到底层的shortcut，这样一般底层的gradnorm会比较大
9. gradnorm上升的可能原因：优化器状态包括mt、vt等
	1. ![Pasted image 20240403143550.png|200](/img/user/990%20Attachment/Pasted%20image%2020240403143550.png)
	2. 碰到脏数据或重复低质数据（小部分hard或噪声样本），g变大，模型参数在这些batch里调整较大，因为LR进一步变小+Adam的累积效应（动量），调整模型参数的能力越来越小，导致脏数据影响会比较久，为了优化Theta（模型参数），为了使loss更小，GN需要进一步变的更大，才有可能把模型纠正过来。
	3. 进入到微调阶段（为了loss下降更关注hard或噪声）：lr不降低 因为要拟合部分脏数据或hard样本 lr没有继续变小阻止 导致模型逐步变坏或模型容量学不了hard 恶性循环 gn飞了？
	4. 模型进入【微调区间】的**hard样本的信噪比**问题
		1. model训练进入 微调整 阶段后，model此时主要优化hard样本（这部分样本我们的数据里噪声更多），导致模型loss增大，此时gn一般也会同步增大，但此时**如果lr不断变小**（lr不变应该能缓解，但越到后面接近收敛阶段，越难抑制gn上涨，比如task62），导致模型调整缓慢，外加adam的累积效应（指数移动平均决定了越前面的batch影响越长久），ut被污染了（增大$\beta_{1}$、$\beta_{2}$，lr不持续变小），**gn也需要更大的调整（loss降低的最佳方向就是gn方向），才能做到loss进一步减小**。如果数据的噪声更少，gn飞的程度会变低（之前7b 006对比002的实验），质量高到一定程度（或增大model-但13b是不够的，调整moe类结构提升模型表征空间），可能可以不飞。
		2. 数据整体配比问题：cc占比过大（80%+），中英文混合，math、paper等hard数据影响。
		3. [cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/document/2201784789900)
		4. hard样本：math、paper、冷门知识等
			1. 'Min_20.0% Prob'、loss或ppl比较高：还有可能是该模型训练集里没有
		5. 遇到hard样本（包括噪声），loss先波动、gn再波动（但还跟模型参数有关）
			1. ppl的方式、loss的方式和gn的方式做样本过滤，本质是一样的。
			2. 用自己数据训练的模型做sample过滤有两点优势：sample比doc更接近model（但通用性差）、自己的模型不存在“没训练过”的问题
			3. 风险：**真正的hard（math或paper）、模型参数（训练抖动）的影响**
			4. 看loss的Badcase虽然有第3点提到「风险」误差，但更有针对性，case放出来也更有冲击力和说服力
	5. 高和宽实验：
		1. 13b：40 layer，5120 hidden
		2. 1.5b：24 layer，2048 hidden
		3. MOE 1.5b\*8： 20 layer，5440 hidden
	6. softmax loss和gradnorm的大小是正相关吗？

|      | 1.5b | 34b（不抖动） |     |
| ---- | ---- | -------- | --- |
| loss | 大    | 小        | 正常  |
|      | 大    | 大        |     |
|      | 小    | 大        |     |
|      | 小    | 小        |     |

### ParamNorm上涨问题
1. LR保持平稳，当前batch的数据分布会对梯度带来更大影响，导致ParamNorm上涨。
	1. lr不变，batch sample有分布变化，为了学习新分布，ut会较大（尤其是上层参数的梯度），如果ut norm大于$\theta_{t-1}\ norm$ ，会导致$\theta_{t}\ norm$变大。且如果ut norm经常大于$\theta_{t}\ norm$，由于ut的累积效应，$\theta_{t+1}\ norm$就会持续变大。lr调小，当前的batch sample对model的影响持续降低，$\theta\ norm$即ParamNorm会越来越稳定，甚至下降。
   ![Pasted image 20240823104526.png|300](/img/user/990%20Attachment/Pasted%20image%2020240823104526.png)
2. LR一直下降，为了loss降低，同时拟合新的分布或hard样本，梯度方向（gn）需要增大

---
1. 目前的测试集：找的中文instruct+GPT4生成
	1. 找所有模型都没有见过“数据”

---
### 评估集评估
1. 评估集汇总：
	1. base模型benchmark集合：
		1. 145308 /nfs/ofs-llab-hdd/users/zhangchaoli/data/merged_eval_datasets.jsonl
	2. 陈佳评估集：
		* 中文：/nfs/ofs-llm-ssd/user/chenjia/project/llama-efficient-tuning/data/flan_gpt4_clean.json 【数量：1411】
		* 英文：/nfs/ofs-llm-ssd/user/chenjia/project/LLaMA-Factory/data/alpaca_gpt4_data_en.json【数量：52669】
	3. Pretrain同分布评估集：
		* wiki中文：/nfs/ofs-llab-vortex/flux/dataset_eval/filtered/wiki/zh/lastest_modify_t2s.jsonl
		* wiki英文：/nfs/ofs-llab-vortex/flux/dataset_eval/filtered/wiki/en/lastest.jsonl
	4. Instruction评估集：
		* 中文：/nfs/ofs-llab-vortex/flux/dataset_eval/gen_data/regen_difficult_gpt3.5instruct_5000.json、regen_easy_gpt3.5instruct_5000.json和evaluate_zh_filter_gpt4turbo_5000.json
		* 英文：/nfs/ofs-llab-vortex/flux/dataset_eval/gen_data/regen_en_gpt3.5instruct_1w.json
		* 自建评估集：
		  ![Pasted image 20240522200357.png](/img/user/990%20Attachment/Pasted%20image%2020240522200357.png)
2. gradio体感评估：
     ```python
     source activate /nfs/ofs-llm-ssd/user/daiyajun/envs/py310/
     cd /nfs/ofs-llm-ssd/user/daiyajun/project/chatbot-assistant/web_server
     python -u phoenix_base_web.py /nfs/ofs-llab-datasets/phoenix/xxx --server_port 8061 --title xxx
     ```
3. 雅君评估：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/sheet/2201567070334)
4. 陈佳评估：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/sheet/2201373721397)
5. critiqueLLM模型 评估：[LLMBench](https://llmbench.ai/align/submit)
6. HF transformers做tokenizer的bug：
	1. 目前使用 tokenizer 的方式有误（只拷贝一个 tokenizer.model 到模型文件夹，使用 transformers AutoClass 加载，实际是**LlamaTokenizerFast class**），导致输入prompt中包含某些特定符号及组合时，encode 结果跟预训练 tokenizer encode 结果有差异，影响评估结果。
7. 关于召回率指标：tokenizer越小，召回率越容易更高，因为相对context信息更丰富（因为Top1的评估方式是将真值作为输入，而不是模型自己generate的）。数据表名会高10pp+。
8. HF的MMLU评估：
	1. ![Pasted image 20241028210236.png](/img/user/990%20Attachment/Pasted%20image%2020241028210236.png)

## 数据pipeline
数据汇总：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/sheet/2201519156654?sheetId=MODOC)
	1. 3+3+1：（wiki+book+paper）+（cc+code+QA）+ Instruct
		1. 垂类（math、法律、金融、医疗、酒旅等）分布其中
代码：[Site Unreachable](https://git.xiaojukeji.com/phoenix-vortex)
Pipeline介绍：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/document/2201426225494)
大数据带来的挑战：
1. 数据下载：
	1. ofs存储问题：下载和后面解析、去重分离，同时对ofs进行写、读和删除，但ofs删除gc时间是7天，虽然删除但是空间不会立即释放，导致需要的存储会一直增加
	2. CPU计算的问题：serverless或spark需要大量CPU资源做计算并发
	3. 网络宽带问题：系统部单独采购
2. 过滤和去重的粒度：doc粒度、**段落粒度、句子粒度**（尤其是首尾格式，如广告）
3. 纠错的粒度：**段落粒度、句子粒度、词字粒度**
4. 针对code和math的专项清洗：依赖关系、format等
### 数据抽取
1. pdf解析：[https://facebookresearch.github.io/nougat/](https://facebookresearch.github.io/nougat/)
	1. [https://github.com/VikParuchuri/marker](https://github.com/VikParuchuri/marker)

知乎格式：
```
标题：<title>\n作者：<author>\n发表时间：<pub_time>\n\n<content>\n\n评论1：<comment1>\n评论2：<comment2>…
```
```
问：<question>\n答：作者：<author>\n发表时间：<pub_time>\n\n<content>\n\n评论1：<comment1>\n评论2：<comment2>…
```
K12格式：
```
区域：<region> 学段：<period> 学科：<discipline/subjectName> 年级：<gradeName> 册次：<volumeName> 难度：<complexValue> 题目类型：<typeValue/question_type/categoryValue/bigType>\n题目：<question/title>\n题目分析：<analysis/explain>\n考察知识点：<knowledgeNames>\n材料：<material>\n参考范文：<modelEssay>\n写作指导:<guide>\n答案：<answers>
```

### 数据Norm
1. Norm
	1. 移除doc中所有的ASCII 表中所有不可打印字符
	2. 移除多余空格、中英文标点符号统一、移除异常的单词（包含异常字符或超过最大长度）
	3. 所有的数值norm为0？
2. 改写：
	1. 问答格式、代码md格式、标题-原文格式

### 数据过滤
1. bloom开源：[data\_tooling/kenlm\_training at master · bigscience-workshop/data\_tooling · GitHub](https://github.com/bigscience-workshop/data_tooling/tree/master/kenlm_training)
	1. ccnet：[跳转中...](https://link.zhihu.com/?target=https%3A//github.com/facebookresearch/cc_net)
2. 原始数据汇总：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/sheet/2201451103627)
	1. 千言：[千言（LUGE）| 全面的中文开源数据集合](https://www.luge.ai/#/)
		1. 目录：/nfs/ofs-llab-vortex/flux/dataset_raw/zh/cc/qianyan
	2. 电信：
3. 过滤漏斗
	1. 过滤文档：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/document/2201370158235)
		1. 安全标签优先级：政治＞色情＞暴恐＞未成年＞毒品＞赌博＞违禁品＞低俗＞暴力
	2. Baichuan loss分析：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/sheet/2201374744992?sheetId=wOHaz)
		1. [cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/sheet/2201510055060)
	3. 过滤阈值case分析：
		1. 过滤阈值分布：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/document/2201460565572)
	4. stop word：
		1. https://github.com/goto456/stopwords/tree/master
		2. https://github.com/Alir3z4/stop-words
	5. 黄赌毒（flag word）：
		1. https://github.com/thisandagain/washyourmouthoutwithsoap/blob/develop/data/build.json
		2. https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/tree/master
	6. code清理：math数据类似
		1. 代码数据的清洗主要包括如下规则：https://cooper.didichuxing.com/docs2/document/2202114823233
			1. 异常字符处理，只要包含异常字符，整个文档丢弃，大约占总体数据集的1%左右
			2. 非中英文字符处理，只要包含非中英文字符，整个文档丢弃，大约占总体数据集的7%左右
			3. 根据max_line_length、avg_line_length进行初筛，然后通过正则进行精确筛选出base64编码
4. 基于bert过滤
	1. fineweb-edu打分逻辑：
		1. 高分doc特点：1. textbook 2. grade school edu（小学教育相关）
	2. pipeline：
	3. math数据（和deepseek-math对比）：
		1. 效果和：base model能力、math的数量、math的上采样次数 都有关
5. 大模型过滤
	1. 大模型生成代码清洗规则：
		1. Programming Every Example: Lifting Pre-training Data Quality like Experts at Scale
	2. 大模logprob过滤
		1. DETECTING PRETRAINING DATA FROM LARGE LANGUAGE MODELS
	3. 基于doc：
		1. Data Selection for Language Models via Importance Resampling
		   ![Pasted image 20250112143511.png](/img/user/990%20Attachment/Pasted%20image%2020250112143511.png)
		2. LongWanjuan: Towards Systematic Measurement for Long Text Quality
		   ![Pasted image 20240905194554.png](/img/user/990%20Attachment/Pasted%20image%2020240905194554.png)
	4. 基于sample：
		1. 思路：先用小模型（2b+且训1T的数据）训一遍，把loss高的样本剔除掉
		2. 遇到的问题：
			1. `eod`噪声：1.5b及以下的小模型对`eod`的训练不充分，导致如果sample前半段是en，后半段是zh，loss也会很大。
			   ![Pasted image 20240830080854.png|400](/img/user/990%20Attachment/Pasted%20image%2020240830080854.png)
6. 开源kenlm：[edugp/kenlm · Hugging Face](https://huggingface.co/edugp/kenlm)
7. badcase：
	1. ppl：字典数据ppl比较低（训练数据包含？），CC.tiger-cc的数据
		{"text":"camouflage ［'kæməflɑ:ʒ ］ v. 掩饰，伪装（to disguise in order to conceal） n. 伪装记 联想记忆：cam（看作came） + ou（看作out） + flag（旗帜） + e → 扛着旗帜出来 → 伪装成革命战士 → 伪装\ncanard ［kə'nɑ:rd ］ n. 谣
		言，假新闻（a false malicious report）记 联想记忆：金丝雀（canary）在造谣（canard）...","meta":{"title":"GRE词汇精选▪ 新东方出国考试图书系列","dataType":"zh-book
		s"},"drop_reason":"success","rules_name":"[\"cond_check_number_words\", \"cond_check_short_line\", \"cond_check_character_repetition_removal\", \"cond_check_word_repetition_removal\", \"cond_check_special_characters\", \"c
		ond_check_stopwords\", \"cond_check_flagged_words\", \"cond_check_lang_id\", \"cond_check_perplexity\"]","rules_value":"[1439, 0.0, 0.03657331136738056, 0.049477351916376304, 0.26741130091984233, 0.12856150104239056, 0.0,
		1.7851083874702454, 841.8]","rules_cond":"[true, true, true, true, true, true, true, true, true]"}
	2. lang id：
		{'url': 'https://ichirino.jp/blog/4%E6%9C%881%E6%97%A5%E9%87%91%E6%B3%BD%E8%87%B3%E7%82%89%E5%BA%B5%E7%9A%84%E4%BA%A4%E9%80%9A%E5%B7%B4%E5%A3%AB%E6%AD%A3%E5%BC%8F%E8%BF%90%E8%A1%8C/', 'timestamp': 1679, 'content_language': 'jpn,zho,eng', 'content_type': 'text/plain', 'text': '从4月1日金泽至炉庵的交通巴士正式运行！\n但是来炉庵的路上还会带您至白山市人气观光景点唷！\n【观光景点例】※会依当日车程情况带您参观1〜2个景点，景点无法指定，请见谅！\n是分散于全国逾3000间的白山信仰神社的总社。\n参拜用的表参道长达250公尺两旁有巨大的杉树,榉木等。其中又有神木的三本杉,老杉及宝物馆可以参观。\n手取川的水流所切割成的峡谷。\n绵之瀑的落差达32m的非常壮观，有可供观赏瀑布用的展望台也有可小木屋的露营场。\n也可以体验泛舟或是骑着单车沿着河道的自行车专用道、手取峡道游览。\n3/18 AM7:30～生中継！ NHK『ウィークエンド中部』森のサウナ山紫水明のウィスキングが紹介されます！\nスノフェス4年ぶりに開催★白山スノーフェスティバル3月25日(土)・3月26日(日)に一里野温泉スキー場で開催！スノーラフティング・白山ろくグルメ・無料雪遊び・早食い大会など盛り沢山！', 'drop_reason': 'success', 'rules_name': '["cond_check_number_words", "cond_check_short_line", "cond_check_character_repetition_removal", "cond_check_word_repetition_removal", "cond_check_special_characters", "cond_check_stopwords", "cond_check_flagged_words", "cond_check_lang_id", "cond_check_perplexity"]', 'rules_value': '[254, 0.2, 0.04922279792746114, 0.0, 0.20253164556962025, 0.3425196850393701, 0.0, 0.7728531956672668, 1346.9]', 'rules_cond': '[true, true, true, true, true, true, true, true, true]'}]

```
可以理解为按优先级筛选，依次为：（数字越小优先级越高，命中返回对应的drop_reason） 
1、cond_check_perplexity：流畅性、可读性（小于1400）# 词典呢？
2、cond_check_lang_id：语言纯度（大于0.75）# 有些严格？平行语料会过滤？文言文不准
3、cond_check_flagged_words：敏感词（占比小于0.2）
4、cond_check_stopwords：trivial词（占比）（暂时没用）
5、cond_check_special_characters：特殊字符（emoji等）（占比小于0.3）
6、"character_repetition_length": 10, "character_repetition_max_cutoff": 0.106
	"word_repetition_length": 5, "word_repetition_max_cutoff": 0.19
7、cond_check_short_line：小于20个字的短句占比（小于0.5）# 有些严格？
8、cond_check_number_words：字或词的个数（[1,100000]）# book？

TODO：
2. 路径：Norm前后的doc输出、Filter前后的输出、去重前后的输出 @陈凯
3. 丰富stop words、flagged_words、special words @朝立 @陈凯
4. 整体去重而非单类文档去重 @晋飞
5. 去重minhash的超参调研 @刘杨
6. 去重对比文件输出 @晋飞
7. 段落去重的阈值 @晋飞 @朝立
8. ppl是否重训
9. fasttext语言识别模型（应该还好）
10. 诗等short line超参调整，书的number words调整
```

### 去重
1. 版本记录：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/document/2201483339639)
2. v2：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/document/2201516054846)
	1. doc去重
	2. 段落去重：重复段落的字数占总字数的比例超过30%（70%）？
		1. 通过段落去重去除调**网页导航栏、cookie警告、联系信息**等
	3. 语义去重（SemDeDup）：https://cooper.didichuxing.com/docs2/document/2201839247847
		1. 对数据做N个分片：可以每片10-20G（显存可加载），因为整体聚类不可行
		2. 段落向量化：段落切或合成512长度，bge-large向量化
		3. 分片间，基于faiss，C_{N}^{2}做两两相似度计算（效果类似全局去重，例外：A~=B, A~=C, B!=C时全局去重会只保留B或C）
	4. 中文book、英文book和code单独各自做去重
	5. 先基于bge-large做Embedding，基于准召的语义去重阈值，需要跑多次。

### 文档类目构建
1. 显式类目体系
	1. 细粒度类目体系构建
		1. https://cooper.didichuxing.com/docs2/document/2202010402314
	2. 基于LLM或Bert对doc做分类
2. 隐式类目体系
	1. 基于语义聚类，构建二级聚类索引，建立聚类中心和doc的倒排索引。
	2. 基于该倒排索引构建做数据探测、分析或配比实验
3. 基于语义聚类的数据探查&配套工具

![](https://cooper.didichuxing.com/uploader/f/Z5uxpB4Wj2TqJX5s.png?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MTI1NTUzODgsImZpbGVHVUlEIjoiQnF5S3BrS21wcFRHblp0MSIsImlhdCI6MTcxMjU1NDc4OCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjoxMDAwMDA3MjU0OH0.fm-gA5BDLcU9wFx9ixNVvR5zxiAnS2nsJBXXAfXOXno)
### dataloader定制
1. 如果一个数据集很小，小于10%的数据集，那么在每个global batch里 必须采样到10%，然后下一个和下下个batch就不采样他，让单次的数据出现更多一些，提升学习的效率
2. 引入group的概念，一个group可保证放入同一global batch里。但这会改变一个batch中的整体随机分布情况，所以需要其他batch配合做全局均衡。
	1. 需要再训练后期引入这类训练，不然batch和batch间的数据分布差异太大，导致训练不稳定
3. 整个book或repo放到一个或多个连续batch带来的影响
![Pasted image 20240828172307.png](/img/user/990%20Attachment/Pasted%20image%2020240828172307.png)
![Pasted image 20240828172244.png](/img/user/990%20Attachment/Pasted%20image%2020240828172244.png)
### 训练数据分析
1. sample中平均doc长度
	1. ![Pasted image 20240112131058.png](/img/user/990%20Attachment/Pasted%20image%2020240112131058.png)
2. 文档类别分类：
	1. 训练数据：[Site Unreachable](https://huggingface.co/datasets/jondurbin/airoboros-3.2?not-for-all-audiences=true&row=7)

## 模型训练
1. scaling law：$L(N,D) = \left[\left(\frac{N_c}{N}\right)^{\frac{\alpha_N}{\alpha_D}} + \frac{D_c}{D}\right]^{\alpha_D}$，alpha_N = 0.076，alpha_D = 0.103，N_c = 6.4e13，D_c = 1.8e13。
   ![Pasted image 20250221151656.png|330](/img/user/990%20Attachment/Pasted%20image%2020250221151656.png)
2. 实验汇总：[cooper.didichuxing.com](https://cooper.didichuxing.com/docs2/document/2201236137997)
3. 训练框架：[Site Unreachable](https://git.xiaojukeji.com/MachineLearning/Megatron-LM/tree/gpt-dataset-enable-epoch-shuffle)
	1. pytorch对cuda环境做了静态编译，所以conda环境pip install的pytorch就可以指定对应的cuda版本，不用管luban镜像里的cuda是什么版本。
4. 模型checkpoint目录：/nfs/ofs-llab-datasets/phoenix
5. MOE训练：
	1. [GitHub - mistralai/mistral-src: Reference implementation of Mistral AI 7B v0.1 model.](https://github.com/mistralai/mistral-src/tree/main)
	2. [GitHub - mistralai/megablocks-public](https://github.com/mistralai/megablocks-public?tab=readme-ov-file)
	3. [Mixture of Experts Explained](https://huggingface.co/blog/moe#moes-and-transformers)
		1. 共享bottoms（原始moe里的expert）、weight、adam、token粒度保证topk的跳变是很平滑的
		2. router balance和token dropping保证expert的平衡
6. 理论：
	1. Tokenizer：[Tokenizer summary — transformers 3.0.2 documentation](https://huggingface.co/transformers/v3.0.2/tokenizer_summary.html)
7. 关于stage1和stage2：
	1. stage1数据全过（知识全学到），stage2采原分布的10%-30%（保证和100%基本同分布）+ 要加强的知识，两者比例8:2左右，保证训练时不偏离stage1太远
8. 预训练蒸馏
	1. 用qwen110b先得到100b数据的`top100的logit`
	2. 实验结论：
		1. 训练效率更高：在小数据量（15b）+小model（1.5b）上loss和通用指标
9. 9b 2.8T loss spike问题排查：https://cooper.didichuxing.com/docs2/document/2202938632494

---
dd-1.5b
1. **1.9T英文数据、197G中文数据**

![Pasted image 20231219160935.png](/img/user/990%20Attachment/Pasted%20image%2020231219160935.png)

Ziya2-13b
![Pasted image 20231218164249.png](/img/user/990%20Attachment/Pasted%20image%2020231218164249.png)
* 语种分类和标准化、质量分-PPL值、敏感分级过滤、去重（bloomfilter、simhash等）
	* 分类、过滤、去重
	* 过滤：手工启发式过滤方法，比如写正则表达式
* 安全和脱敏方面：PII
* code先训，数学最后训？
![Pasted image 20231219184910.png](/img/user/990%20Attachment/Pasted%20image%2020231219184910.png)

## Baichuan2

## Qwen

## llama 2
* publicly available data. We also increased the size of the pretraining corpus by 40%（在2T令牌上进行预训练后，模型仍然没有显示出任何饱和迹象）, doubled the context length of the model, and adopted grouped-query attention (Ainslie et al., 2023)（提升推理能力）.

* META的llama代码只依赖pytorch，没用transformers

* As shown in Table 4, Llama 2 70B is close to GPT-3.5 (OpenAI, 2023) on MMLU（综合评估集） and GSM8K（数学）, but there is a **significant gap on coding benchmarks.** （所以做了个code llama，34b好于gpt3.5）

* SFT annotations in the order of tens of thousands was enough to achieve a high-quality result. **SFT和RLHF 2-5w，RM 10w+就够了**。

* new technique, Ghost Attention (GAtt), which we find helps control dialogue flow over multiple turns (Section 3.3).

* Surprisingly, we found that the outputs sampled from the resulting SFT model were often competitive（SFT模型可以和人写的一样好） with SFT data handwritten by human annotators, suggesting that we could reprioritize and devote more annotation effort to preference-based annotation for RLHF. （需要RLHF去更多的alignment。SFT都比人类回答的好了？）

### llama 1

---
1. RM中，p和q如何设计，去防止两者的差距大，和训练稳定性，p是Pretrain的Policy、q是sft的Policy
	1. RM计算的三种方式：
2. 怎么设计RM和ppo loss使训练更好

![Pasted image 20231130165122.png](/img/user/990%20Attachment/Pasted%20image%2020231130165122.png)
![Pasted image 20231130165143.png](/img/user/990%20Attachment/Pasted%20image%2020231130165143.png)
![Pasted image 20231130165159.png](/img/user/990%20Attachment/Pasted%20image%2020231130165159.png)

---
Mistral-7B-v0.1 is a transformer model, with the following architecture choices:
* Grouped-Query Attention
* Sliding-Window Attention
* Byte-fallback BPE tokenizer

---
### 数据周会

2024-11-15
todo：
1. weixin的drop数据过7b
2. code repo的去重逻辑优化
3. pdf的VL ocr效果，公式和图标转成latex
