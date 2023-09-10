---
{"dg-publish":true,"permalink":"/030 PKV/AI/LLM/【LLM Review】如何训练行业大模型 - 2023M8/"}
---

> 持续更新中！

## TLDR

目前大多数中小公司都在用chatglm 6b（开源先发优势）+ 官方的ptuning v2，做领域知识注入，有一定效果（领域内问答提升明显，但要比chatgpt好还是很难，需要精调超参、外接知识库和大量prompt工作），但SFT的样本要足够多和质量好（至少10w+），可以和通用数据混合在一起训练。带来的负面影响是领域外通用数据集上问答能力变弱（[1] Figure 4），推理能力更弱，所以知识注入最好利用大量领域数据在Pretrain做，SFT的instruction数据更适合做alignment。

主要领域：金融、医疗、教育、法律、心理咨询、政府、煤矿等传统行业

## Pretrain
1. From Scratch
	1. BloombergGPT：基于363B tokens金融数据和345B开源数据，从头训练一个50B模型，在通用数据集上效果不降的前提下，金融类评估集上表现略优，尤其是在Bloomberg内部数据集上（table10）。在金融问答或金融信息summary等方面有一定应用价值。
2. 增量Pretrain
	1. 结论：可能是平衡训练成本和知识注入的最佳方案。
	2. 目标：不遗忘Pretrain知识的前提下，教会LLM行业内部知识，MOE增加experts是个直接方案

## SFT
1. Instruction领域数据集构建：
	1. 爬领域相关数据和公司内部数据，可通过业务规则构造Instruct对（至少10w+），比如将Paper标题做Prompt、摘要做response，内部材料的标题做Prompt、总结做response等。还包括利用Self-Instruct领域数据增广。
	2. Instruction的prompt和response尽可能多样且质量高、response不要太冗长
	3. 借助chatgpt
{ #52ca47}

		1. chatgpt的response做数据扩充（self-Instruct？），务必保证response的准确性，否则效果甚至不如Pretrain，参考[1]Figure 1.
		2. 把单轮对话（长Prompt和长response）拆分成多轮对话，提升多轮对话质量和使每轮对话尽量简洁。
		3. 缺陷：刻意模仿chatgpt回答形式，错上加错。
	4. 3. 如果Pretrain model做了SFT，instruct数据集构建和原始LLM SFT用的Instruct数据集特点或分布尽可能 一致，比如prompt和response的长度、回答格式（总分总）、衔接语句设计等
2. 训练经验：
	1. 目的：让训练使用的Instruction分布和推理时的Prompt同分布，同时告诉LLM该如何回答行业内问题。
	2. 方案：
		1. 直接Instruction FT
		2. 蒸馏：
			1. 蒸馏更大LLM的response：即1.2内容。有邯郸学步的风险
			2. 蒸馏更大LLM的probs和Embedding：效果应该更好
			3. 问题：用RLHF的方式做蒸馏？
		3. MOE：不断增加新的domain expert
	3. 样本少用lora、样本多Full FT（不然容易过拟合），LAMA如何做的？
	4. Full FT如果调不好，很容易catastrophic forgotten

## Prompt
1. 引入专家或规则系统：比如心理咨询或情感类LLM，用户可能只会描述情绪，需要基于知识谱图，定制一套规则，给出明确的Instruction或动作，引导LLM先理解情绪、在分析情绪，比如“我今天被老师骂了”，基于实体关系，提取动作“被老师骂了该怎么办？”
2. 引入外接知识库：利用text2vec、bert等小模型做emb化，query emb后搜索外接知识向量数据库，得到topk chunk，根据多级知识库反解出文本，用文本拼接原始prompt，去请求LLM。
3. 重要内容写前面或后面、中英文混用prompt 效果更佳
4. Function call：基于langchain等实现Function call/plugin的功能，调用专家规则、领域小模型、plugin等。
5. 其他：[[030 PKV/AI/LLM/【LLM Review】LLM的问题及当前解决方案 - 2023M6#^8297fc\|【LLM Review】LLM的问题及当前解决方案 - 2023M6#^8297fc]]


## Metrics
1. 正确性、遵从性、稳定性、多样性、多轮对话能力、安全性、流畅性等
2. 分类：通用评估集（尝试、内容理解、数学、coding）、领域评估集（一般需要人工）



## Reference

[1] [The False Promise of Imitating Proprietary LLMs](https://arxiv.org/pdf/2305.15717.pdf)
