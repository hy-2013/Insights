---
{"dg-publish":true,"permalink":"/030 PKV/AI/LLM/【LLM Review】如何训练行业大模型 - 2023M8/"}
---

> 持续更新中！

## TLDR

1. 本质是LLM压缩了所有知识，进而带来了「建模范式」的改变（至少在nlp和cv领域）：
	1. 一个模型不需要训练就能完成所有task：不需要针对各类task，分别构造建模Pipeline（样本、特征、model、loss），只需要设计好prompt engineering（包括RAG），即可完成好各类task。
	2. 一些简单的FT或RLHF：调教LLM以特定的形式或方式完成task，一些场景，一旦调教好会比prompt engineering更高效。
	3. 增量Pretrain：针对极少公开的特殊领域，LLM对这类知识了解甚少的场景。
2. 目前大多数中小公司都在用chatglm 6b（开源先发优势）+ 官方的ptuning v2，做领域知识注入，有一定效果（领域内问答提升明显，但要比chatgpt好还是很难，需要精调SFT超参、基于外接知识库和大量prompt工作），SFT的样本要足够多和质量好（至少10w+），可以和通用数据混合在一起训练。
3. 带来的负面影响是领域外通用数据集上问答能力变弱（[1] Figure 4），推理能力更弱，所以知识注入最好利用大量领域数据在Pretrain做，SFT的instruction数据更适合做alignment。

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
	2. Instruction的prompt和response尽可能**多样且质量高**、response不要太冗长（改成多轮对话）、COT样式
	3. 借助chatgpt
{ #52ca47}

		1. chatgpt的response做数据扩充（self-Instruct？），务必保证response的准确性，否则效果甚至不如Pretrain，参考[1]Figure 1.
		2. 把单轮对话（长Prompt和长response）拆分成多轮对话，提升多轮对话质量和使每轮对话尽量简洁。
		3. 缺陷：刻意模仿chatgpt回答形式，错上加错。
	4. 3. 如果Pretrain model做了SFT，instruct数据集构建和原始LLM SFT用的Instruct数据集特点或分布尽可能 一致，比如prompt和response的长度、回答格式（总分总）、衔接语句设计等
2. 训练经验：
	1. 目的：让训练使用的Instruction分布和推理时的Prompt同分布，同时告诉LLM该如何回答行业内问题。
	2. 作用：[[030 PKV/AI/LLM/【LLM Review】LLM的问题及当前解决方案 - 2023M6#^e19919\|【LLM Review】LLM的问题及当前解决方案 - 2023M6#^e19919]]
	3. 方案：
		1. 直接Instruction FT或Supervise Instruct FT
		2. 蒸馏：
			1. 蒸馏更大LLM的response：即1.2内容。有邯郸学步的风险
			2. 蒸馏更大LLM的probs和Embedding：效果应该更好
			3. 问题：用RLHF的方式做蒸馏？
		3. MOE：不断增加新的domain expert
	4. 样本少用lora、样本多Full FT（不然容易过拟合）
	5. Full FT如果调不好，很容易catastrophic forgotten
3. 一些暴论：
	1. 30B以上，对做好领域LLM基本够了
	2. Instruct数量：
		1. 13B-30B，SFT 1万条足够。
		2. 30-50B，10万不能再多。主要是质量要跟得上
	3. 很多人把SFT当成PT了，以为PT能搞定一切，殊不知一切都搞不定
	4. 应用层落地有很多方法很多途径，应用层做好了，基础模型等有条件再搞也许，可以借机培育下团队。看到很多靠微调（不是全参数，LORA一类的）想弄出点啥的，基本感觉也弄不出啥东西。 还是在模型上面，用应用层逻辑想法子绕吧。
	5. 微调格式化输出、微调分类、微调语言风格、微调CoT，这些肯定有用的。但是话说回来，真的有意义吗？分类为什么不用BERT、格式化输出除了LLaMa2 70其他哪个开源项目能打，语言风格只需要固定调风格层，CoT也依赖于全部重新做SFT。（同时具有chat或语义理解能力和reason能力）
		1. 任务或者拆解出来的子任务适不适合微调，期望微调来解决大、难、泛的问题就难度很大。但是如果把一个任务拆成100个步骤，通过微调来解决其中部分能力/提高准确率可行性是比较高的。
	6. 13B一张4090放不下，8bit呀，对13B这种级别的模型来说，量化不量化没啥区别

## Prompt
1. 引入专家或规则系统：比如心理咨询或情感类LLM，用户可能只会描述情绪，需要基于知识谱图，定制一套规则，给出明确的Instruction或动作，引导LLM先理解情绪、在分析情绪，比如“我今天被老师骂了”，基于实体关系，提取动作“被老师骂了该怎么办？”
2. 引入外接知识库：利用text2vec、bert等小模型做emb化，query emb后搜索外接知识向量数据库，得到topk chunk，根据多级知识库反解出文本，用文本拼接原始prompt，去请求LLM。
3. 重要内容写前面或后面、中英文混用prompt 效果更佳
4. Function call：基于langchain等实现Function call/plugin的功能，调用专家规则、领域小模型、plugin等。
5. 其他：[[030 PKV/AI/LLM/【LLM Review】LLM的问题及当前解决方案 - 2023M6#^8297fc\|【LLM Review】LLM的问题及当前解决方案 - 2023M6#^8297fc]]


## Metrics
1. 正确性、遵从性、稳定性、多样性、多轮对话能力、安全性、流畅性等
2. 分类：通用评估集（尝试、内容理解、数学、coding）、领域评估集（一般需要人工）


chatglm金融大赛经验
1. PDF处理、表格识别（资产负债表、利润表和现金流量表等），入库变成结构化数据，把所有表都提出来，分了两个类，基本信息类和财务信息。
2. 向量检索效果不好，用关键词匹配
3. 问题方案：正则把问题分类，提取题目的年份和公司、实体词
	1. 基本信息类：直接查表
	2. 计算题：提取数据直接计算结果出来放到提示词（调用function call，各种金融指标计算公式）
	3. 开放题：则模型直接回答
	4. 其他：不能给大模型太多信息，不然他找不到（小模型的原因？）。“硕士以上要判断是否和博士冲突”。
4. 没做微调，只做prompt效果就能到70分+


## Reference

[1] [The False Promise of Imitating Proprietary LLMs](https://arxiv.org/pdf/2305.15717.pdf)
