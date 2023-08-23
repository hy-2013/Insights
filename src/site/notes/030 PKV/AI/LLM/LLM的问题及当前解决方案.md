---
{"dg-publish":true,"permalink":"/030 PKV/AI/LLM/LLM的问题及当前解决方案/"}
---

![image.png](https://s2.loli.net/2023/08/10/9Lnbx6sMjOtzH7A.png)

> 持续更新中！

资源汇总：
1. [This repository contains a hand-curated resources for Prompt Engineering with a focus on Generative Pre-trained Transformer (GPT), ChatGPT, PaLM etc](https://github.com/promptslab/Awesome-Prompt-Engineering)
2. 


### 一、问题和方案
1. Context短：
	1. FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness
	2. MQA：Fast Transformer Decoding: One Write-Head is All You Need
	3. Scaling Transformer to 1M tokens and beyond with RMT
	4. MEGABYTE: Predicting Million-byte Sequences with Multiscale Transformers
2. 专业性：领域垂类model：
	2. self-Instruct：Self-Instruct: Aligning Language Model with Self Generated Instructions
	5. 金融：BloombergGPT: A Large Language Model for Finance
	3. 医疗：Towards Expert-Level Medical Question Answering with Large Language Models
	4. 法律：Chatlaw
	5. 心理咨询：华佗、扁鹊
3. 关于训练：
	1. LIMA: Less Is More for Alignment
	2. RM均匀反馈的问题
	3. 如何构建训练数据：DoReMi: Optimizing Data Mixtures Speeds Up Language Model Pretraining
	4. SLiC-HF: Sequence Likelihood Calibration with Human Feedback
4. 关于成本
	1. 训练成本
	2. 推理成本：小模型生成，大模型（GPT4）评判。后面0-3年应用展开期会主要卷这个
5. 提高准确性：
{ #8297fc}

	1. prompt engineer：
		1. ICL 或 system prompt：设定角色/说明，给出QA示例。
		2. COT：ICL中引入任务拆解过程，让LLM step by step的做任务拆解，更像人类的方式做reasoning
			1. 结论：大模型（可能30B以上），复杂推理的任务（数学、常识、符号推理），有比较好的效果，甚至部分task能超过Full FT。
			2. Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
		3. Retrieval augumented: 本质是将LLM与传统知识图谱和检索技术相结合，让prompt的内容更准确 ，或限定范围（doc内）的知识抽取并quote。按照是否限定在「检索出的内容内」回答，分为：
			1. 不限定：即检索出的内容只做Prompt的拼接增强，如通过 外接领域知识库/知识图谱实现。
				1. Break up relevant documents into chunks
				2. Use embedding APls to index chunks into a vector store（ANN向量数据库）
				3. Given a test-time query, retrieve related information （向量检索）
				4. Organize the information into the prompt, get New prompt
				5. Call LLM using new prompt（改方式也可做限制）
			2. 限定：
				1. 基于prompt和特定doc/book的内容做知识抽取或总结，例如chatXX。
			3. 可限定也可不限定：如基于通用检索系统实现，如bing-like。
				1. 先检索bing得到相关文档或文档chunk，和query一起输入LLM分析（若限定文档内知识抽取，则可quote），评估回答，轮询多次获得最优结果。
				2. 基于通用检索系统实现，相对外接领域知识库/知识图谱的实现有两点优势：一是全文检索，二是检索不止Embedding语义检索（包括ES文本匹配、LBS和行为等）。
		4. 回答限制：guidance：强制LLM按 固定格式或候选项 生成回答
	2. Plugins: offload tasks
	3. ensemble（多试几次bagging）：
		1. 生成多个答案bagging：Self-Consistency Improves Chain of Thought Reasoning in Language Models
		2. 输入多个prompt，得到多个答案bagging
	4. reflection：
		1. ToT：Tree of Thoughts: Deliberate Problem Solving with Large Language Models
		2. ReAct: Synergizing Reasoning and Acting in Language Models
	5. SFT：有额外训练成本
		1. Full FT
		2. PEFT：
			1. Prompt Tuning：训练一个task-specify的embedding input prompt token（包括上层trainable variables）
			2. Lora
			3. Adapter
6. 时效性：
	1. Plugins
	2. Retrieval augumented prompt

### 二、其他
1. Agent阶段（完成一个复杂任务）：chain / agents: autoGPT/GPT engineer/ReAct
	1. 定义：借助大模型，能**自主理解、规划、执行复杂任务**的系统。 
	2. 利用LLM、Memory和各类Tools/Plugin做task拆分、优先级排序和执行完成复杂任务。agent都是GPT4，但按功能分为Task Creation Agent、Task Prioritization Agent、Task Execution Agent。
	3. Agent = 大模型+记忆+主动规划+工具使用
2. 认识LLM
	1. Evidence of Meaning in Language Models Trained on Program
	2. TinyStories: How Small Can Language Models Be and Still Speak Coherent English?
3. 中文LLM
	1. GLM：[GLM: General Language Model Pretraining with Autoregressive Blank Infilling](https://arxiv.org/abs/2103.10360)



