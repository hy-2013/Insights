---
{"dg-publish":true,"permalink":"/010-outbox/1/llm-review-synthesis-data-2025-m2/","tags":["#LLM/Pretrain"]}
---


1. 什么是数据合成？为什么要做合成？
2. 哪些能力的提升适合合成来做？
	1. 评价标准：准确性、密度、广度、深度和格式
	2. knowledge适合吗？Textbook适合吗？
		1. sota模型合成的knowledge的准确性、密度、广度和格式比wiki或Textbook更好吗？
	3. math、reason、code、creative writing、IF需要单独增强。
3. 如何做数据合成？
	1. 合成类别
		1. 部分合成：：改写（风格、翻译、math数字调整）、抽取（web orangic qa）、纠错、省略不重要的内容
		2. 全部合成：
			1. Textbook
			2. Q&A
				1. 数据类型包括：
					1. math
					2. code：
						1. task_type：generate、complete、edit、debug；multi-language
						2. persona+skill+difficulty+task_type
						3. persona+需要用编程方式解决的问题。persona+skill+difficulty+task_type
							1. nv nometron 405b、wizardcoder、opencoder、migicoder、TÜLU 3
							2. instruction2skill mix
						4. 基于各类Instruct的非舒适区合成：
							1. generate或complete
							2. edit或debug：较少
						5. verify：compiler > LLM
							1. import package
							2. multi-language
					3. reason
					4. creative writing
					5. IF
					6. 类benchmark合成：skill+benchmark few shot定向刷分
				2. instruct合成：
					1. persona/skill/knowledge + difficulty（舒适区） + benchmark few shot，doc2instruct或doc2persona2instruct，evolution
				3. response生成和校验
				4. sota模型 long_cot/cot/direct生成
				5. 校验：有参考答案rule- base，没有的llm as judge
4. 合成带来的问题
	1. 多样性问题
	2. 法律风险

### TODO

## 欢迎交流与合作
目前主要兴趣是探索agent的真正落地，想进一步交流可加微信（微信号：cleezhang），一些[自我介绍](https://lee-agi.github.io/85ed64eda0/)。
