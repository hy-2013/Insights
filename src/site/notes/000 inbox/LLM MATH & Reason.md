---
{"dg-publish":true,"permalink":"/000 inbox/LLM MATH & Reason/"}
---

1. Qwen2-Math
	1. 提升大模型的数学推理能力，直接做实在太难了，就想着要不还是曲线救国，先做个专家模型再说。
	2. 专门针对数学准备了一大批数学相关的预训练数据（应该包括合成数据），然后在Qwen2上面做继续预训练。
	3. SFT造了很多质量不错的数学数据，这类型的instruct数据往往都是通过[rejection sampling](https://www.zhihu.com/search?q=rejection%20sampling&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3588528474%7D)构造的。(基于数学的Reward Model，基于出版的Qwen2-Math-72B训练)
	4. Deepseek GRPO还是能帮我们的模型提升差不多2个点以上
	5. 