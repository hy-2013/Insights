---
{"dg-publish":true,"permalink":"/030 PKV/AI/LLM/LLM的问题及当前解决方案/"}
---


![image.png](https://s2.loli.net/2023/08/10/9Lnbx6sMjOtzH7A.png)

> 持续更新中！

资源汇总：

1. [This repository contains a hand-curated resources for Prompt Engineering with a focus on Generative Pre-trained Transformer (GPT), ChatGPT, PaLM etc](https://github.com/promptslab/Awesome-Prompt-Engineering)

## 一些不成熟的思考
1. 关于这波AI技术的影响力：由llm在低推理成本、高准确性上的进展决定。但即使hallucination解决到GPT4的程度止步不前，在AIGC和人机交互上的变革也已经可以提高生产力。
2. 关于大模型生态：未来会有多个「基座LLM」，分由多个公司和多个国家提供（类似芯片产业），不会赢家通吃，会有一些行业LLM，中间层也会跑出一些公司，应用层生态目前看LLM-native还比较少，多数是对现有应用的升级改造。
3. 关于开源和闭源：闭源商业LLM应该还会至少领先3年+，主要是算力优势、人才优势、先发优势。
	1. 先发优势：数据飞轮（外部：completion/plugin feedback，内部：GPT4自产数据自训练）、self-learning PPO对抗训练、标准定义权
	2. 闭源在暗处-可拿来主义
4. LLM的商业模式：
	1. LLM-native/AI+：妙鸭、PI-情感沟通、perplexity.ai
	2. +AI：现有业务是效率或产品升级，更主流
	3. 技术不能解决所有问题
5. 关于未来：
	1. 工具利用好、多模态LLM训好是当前提升LLM能力最低矮的果实
	2. Agent/Bot想象力很大，限于当前LLM的能力，从游戏场景开始较合理。多个Agent之间如何协调工作和BP训练？
	3. 具身智能：如果说Agent更多是LLM+Software，那么具身智能是LLM+Software+机器人，类似黑客帝国。
	4. 打破社会壁垒到it之外的领域去，以更低的成本更好的解决domain问题

## 一、问题和方案
1. Context Window短：
	1. 模型改进：
		1. Retentive Network: A Successor to Transformer for Large Language Models
		2. MQA：Fast Transformer Decoding: One Write-Head is All You Need
		3. Scaling Transformer to 1M tokens and beyond with RMT
		4. MEGABYTE: Predicting Million-byte Sequences with Multiscale Transformers
	2. 编译或硬件
		1. FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness
	3. 观点：MHSA是一种笛卡尔积式的暴力记忆方式，人脑会选择记忆（重要性）和归纳整合。
2. 专业性：领域垂类LLM，方案参考[[030 PKV/AI/LLM/如何训练行业大模型\|如何训练行业大模型]]
	1. 领域数据增广：
		1. self-Instruct：Self-Instruct: Aligning Language Model with Self Generated Instructions
	2. 金融：BloombergGPT: A Large Language Model for Finance
	3. 医疗：Towards Expert-Level Medical Question Answering with Large Language Models
	4. 法律：Chatlaw
	5. 心理咨询：华佗、扁鹊
3. 关于成本（GPU固定成本和电量）
	1. 训练成本
		1. 基座LLM成本成本
		2. 领域LLM训练成本
	2. 推理成本：后面0-3年应用展开期会主要卷这个，云厂商等infra很重要
		1. 算法：
			1. KD
			2. MOE
			3. sampling：比BS和top_p更高效的采样方案
			4. 小模型生成，大模型（GPT4）挑选：小模型生成更多top_k或top_p，由大模型得到top_top_k，大模型和小模型异步并发，提高推理效率、降低成本
		2. 硬件或框架
			1. FPGA、AMD Radeon series + ROCm、FlashAttention等
4. 提高准确性：
{ #8297fc}

	1. prompt engineering：
		1. ICL 或 system prompt：设定角色/说明，给出QA示例。
		2. COT：ICL中引入任务拆解过程，让LLM step by step的做任务拆解，更像人类的方式做reasoning
			1. 结论：大模型（可能30B以上），复杂推理的任务（数学、常识、符号推理），有比较好的效果，甚至部分task能超过Full FT。
			2. Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
		3. Retrieval augmented: 本质是将LLM与传统知识图谱和检索技术相结合，让prompt的内容更准确 ，或限定范围（doc内）的知识抽取并quote。按照是否限定在「检索出的内容内」回答，分为：
			1. 不限定：即检索出的内容只做Prompt的拼接增强，如通过 外接领域知识库/知识图谱实现。
				1. Break up relevant documents into chunks
				2. Use embedding APls to index chunks into a vector store（ANN向量数据库）
				3. Given a test-time query, retrieve related information （向量检索）
				4. Organize the information into the prompt, get New prompt
				5. Call LLM using new prompt（改方式也可做限制）
			2. 限定：
				1. 基于prompt和特定doc/book的内容做知识抽取或总结，例如chatXX。有非共识信息的抽取问题。（开卷作答）
			3. 可限定也可不限定：如基于通用检索系统实现，如bing-like。
				1. 先检索bing得到相关文档或文档chunk，和query一起输入LLM分析（若限定文档内知识抽取，则可quote），评估回答，轮询多次获得最优结果。
				2. 基于通用检索系统实现，相对外接领域知识库/知识图谱的实现有两点优势：一是全网检索，二是检索不止Embedding语义检索（包括ES文本匹配、LBS和行为等）。
		4. 限定回答范围：guidance：强制LLM按 固定格式或候选项 生成回答
	2. Plugins/Function call: offload tasks。LLM和user之间的assistant role，通过调用function role实现
		1. Plugins类似PGC，Function call类似UGC，Function可以是任意函数，不用调用工具
		2. Retrieval augmented也可以归为这一类
		3. 多个Function时，LLM是如何通过Function signature做选择的？（可制定调特定函数也可不调）
		4. [How\_to\_call\_functions\_with\_chat\_models.ipynb](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_call_functions_with_chat_models.ipynb)
		5. 观点：openai构建出Plugin生态，接受用户feedback，飞轮转起来，让LLM知道什么时候该去调用什么样的工具。
	3. Ensemble（多试几次bagging）：
		1. 生成多个答案bagging：Self-Consistency Improves Chain of Thought Reasoning in Language Models
		2. 输入多个prompt，得到多个答案bagging
		3. Ensemble refinement：将第一次top k的response的结果与ICL+原始Prompt结合，再请求一次LLM做ensemble。Med-Palm2提出的，感觉不优雅。
	4. reflection：
		1. ToT：Tree of Thoughts: Deliberate Problem Solving with Large Language Models
		2. ReAct: Synergizing Reasoning and Acting in Language Models
		3. [Reflexion: an autonomous agent with dynamic memory and self-reflection (2023)](https://arxiv.org/abs/2303.11366)
	5. SFT：称作Instruction FT更合适，有额外训练成本
		1. 作用：「调教」LLM，按照FT Instructions『**相似的形式或规则**』生成，包括terse（简洁）、in a given language、consistently format responses (JSON snippets)、custom tone (like business brand voice)，**shorten their prompts length by up to 90%** which speeding up each API call and cutting costs，augment context windows。结合prompt engineering, information retrieval, and function calling会更加强大。
		2. Full FT
		3. PEFT：
			1. Prompt Tuning：训练一个task-specify的embedding input prompt token（包括上层trainable variables），参考[[010 outbox/blog/【2023-W32】Decrypt Ptuning\|【2023-W32】Decrypt Ptuning]]。
			2. Lora/Qlora
			3. Adapter
	6. 评价指标： instruction following, factual accuracy, and refusal behavior.
		1. 更广泛的评价库-[the OpenAI Evals library](https://github.com/openai/evals/tree/main)：report shortcomings using models
5. 时效性：
	1. Plugins
	2. Retrieval augumented prompt
6. 安全性
	1. 创建人类水平甚至超级智能的 自动对齐ai系统

## 二、Agent

定义：自主或半自主完成一个复杂任务，如autoGPT/GPT engineer等

1. 定义：借助大模型，能**自主理解、规划、执行复杂任务**的系统。
2. 利用LLM、Memory和各类Tools/Plugin做task拆分、优先级排序和执行完成复杂任务。agent都是GPT4，但按功能分为Task Creation Agent、Task Prioritization Agent、Task Execution Agent。
3. Agent = 大模型+记忆+主动规划+工具使用
	1. 大模型：基础，也是当前主要瓶颈
	2. 记忆：基于长短、重要性的高效记忆和提取。仅向量数据库时不够的
	3. 主动规划：planning是当前最难的task之一（还有reasoning/数学）
	4. 工具使用：基于function signature的语义匹配也可以做到基本可用
![Pasted image 20230904120902.png](/img/user/990%20Attachment/Pasted%20image%2020230904120902.png)
## 三、其他
1. 关于训练：
	1. RLHF：
		1. RM均匀反馈的问题
		2. SLiC-HF: Sequence Likelihood Calibration with Human Feedback
	2. 如何构建训练数据：
		1. 数据质量
		2. 数据配比很重要：DoReMi: Optimizing Data Mixtures Speeds Up Language Model Pretraining
2. 认识LLM
	1. LIMA: Less Is More for Alignment
	2. Evidence of Meaning in Language Models Trained on Program
	3. TinyStories: How Small Can Language Models Be and Still Speak Coherent English?
3. 中文LLM
	1. GLM：[GLM: General Language Model Pretraining with Autoregressive Blank Infilling](https://arxiv.org/abs/2103.10360)
	2. XX-Chinese系列
