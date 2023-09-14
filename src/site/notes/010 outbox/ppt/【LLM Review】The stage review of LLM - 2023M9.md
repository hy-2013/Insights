---
{"dg-publish":true,"permalink":"/010 outbox/ppt/【LLM Review】The stage review of LLM - 2023M9/"}
---


## TLDR

在我看来，当前LLM面临的主要问题包括：1. 准确性，2. 高成本，3. 专业性，4. 时效性，5. 安全性。本文试图从这5个方面逐一介绍针对这些问题的主流解法，尤其是准确性和高成本这两个最核心问题。

## 1. 准确性 提升

可概括为 无训练成本 和 有训练成本 两个方面。

1. 无训练成本
	1. prompt engineering：更好的从LLM中取出知识
		1. **System prompt + ICL + COT**
			1. ![Pasted image 20230903163648.png](/img/user/990%20Attachment/Pasted%20image%2020230903163648.png)
		2. **限定回答范围：[guidance](https://github.com/guidance-ai/guidance)**
			1. ![Pasted image 20230903162854.png](/img/user/990%20Attachment/Pasted%20image%2020230903162854.png)
			2. ![Pasted image 20230903163124.png](/img/user/990%20Attachment/Pasted%20image%2020230903163124.png)

		3. **Retrieval augumented（RAG）**
			1. 基于检索返回的内容做回答：ChatXX，如ChatDoc、chatpdf等
				1. 该方案在非共识问题的回答方面有时不太好
			2. 基于检索返回的内容做Prompt增强
				1. Break up relevant documents into chunks
				2. Use embedding APls to index chunks into a vector store
				3. Given a test-time query, retrieve related information
				4. Organize the information into the prompt, get New prompt
				5. Call LLM using new prompt
			3. bing-like：通用全网搜索+大搜系统检索能力+轮询多次+Quote
				1. [perplexity.ai](www.perplexity.ai/)
				2. [Google Search Labs](https://labs.google.com/search)
	2. [**Function Call](https://platform.openai.com/docs/guides/gpt/function-calling) + Plugins**：主动或被动的借助外部tools
		1. ![Pasted image 20230904021655.png](/img/user/990%20Attachment/Pasted%20image%2020230904021655.png)
	3. **Ensemble/Bagging**
		1. 多个答案bagging(CoT-SC)、输入多个prompt bagging、Ensemble refinement（Med-Palm2）
	4. **Reflection/System2**：像人类一样非线性思考问题、reasoning、planning
		1. ReAct、ToT
			1. ![Pasted image 20230905224819.png](/img/user/990%20Attachment/Pasted%20image%2020230905224819.png)
2. **有训练成本：**
	1. SFT：alignment调教
		1. 作用：terse（shorten token）、set a given language、consistently format responses、custom tone，augment context windows
		2. 方式：Full FT、PEFT
	2. 增量Pretrain：一般用于注入domain knowledge
		1. MOE
	3. Pretrain：提高信息压缩比
		1. 核心要素：更好的数据配比、数据质量、训练技巧、训练资源

## 2. 高成本 下降
1. 训练成本：参照Chinchilla scaling laws
	1. 基座LLM训练成本
	2. 领域LLM训练成本
2. 推理成本：未来更重要
	1. 算法
		1. KD、MOE、RetNet
		2. Paged attention
		3. Speculative decoding：较小模型生成，较大模型挑选，异步并发
	2. 框架或硬件：
		1. FlashAttention、[Continuous batching](https://www.usenix.org/system/files/osdi22-yu.pdf)
		2. AMD Radeon series + ROCm、FPGA

## 3. 专业性 优化

目前主要通过构建垂域LLM来解决，当然也包含数据安全的问题。

1. Pretrain：BloombergGPT
2. SFT：主流方案
	1. Instruction领域数据集构建：由具体业务场景而定、尽可能多样且质量高
	2. 训练目标：不发生forgotten的前提下，告诉LLM该如何回答行业内问题
3. 热门行业：未来可能会千行百业都有自己的小LLM，甚至私人定制
	1. 金融：BloombergGPT、FinGPT
	2. 医疗：Med-Palm2
	3. 教育：MathGPT
	4. 法律：Chatlaw（推荐读paper）
	5. 心理咨询：扁鹊
![Pasted image 20230906145153.png](/img/user/990%20Attachment/Pasted%20image%2020230906145153.png)


## 4. 时效性 拥有

背景：Pretrain的数据是xx年以前的。

1. Plugins：天气、证券股票
2. Retrieval augumented prompt

## 5. 安全性 保障
1. SuperAlignment
2. Llama2 Safety：关乎大公司产品能否发布

### 欢迎讨论
1. 大模型未来生态是怎样的？AI+还是+AI
2. 闭源大模型能力会持续领先开源界吗？
3. 大模型的未来研究方向有哪些？

说明：本文源自前段时间的一次部门内分享，因为是PPT形式，所以多数内容点到为止，没有展开。
