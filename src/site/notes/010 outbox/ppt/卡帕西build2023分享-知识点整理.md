---
{"dg-publish":true,"permalink":"/010 outbox/ppt/卡帕西build2023分享-知识点整理/"}
---

### Highlight

---
1. Token numbers
2. \<lendoftextl>：不需要padding
3. Each cell only "sees" cells in its row, and only cells before it
4. Base models are NOT 'Assistants'

---
1. RM和RLHF的训练数据都是SFT后的model生成的
2. RM的训练：遇到<|reward|>生成score？
3. RL只训练completion对应Token，每个Token接受相同的梯度惩罚或奖励
4. RLHF导致loss entropy或model collapse

---
1. LLM记住了很多fact-based knowledge，但受Context Window的限制
2. LLM不会reflection或inner monologue
3. LLM需要被引导step by step的reasoning或任务拆解

---
### Keep in mind
- Requires a lot more technical expertise
- Requires contractors and/or synthetic data pipelines A lot slower iteration cycle
- SFT is achievable
- RLHF is research territory

---
### TODO

• Spend quality time optimizing a pipeline/ "chain"
	- use tools/plugins to offload tasks difficult for LLMs (calculator, code execution, ...)
- Source of inspiration, suggestions
- Copilots over autonomous agents

---
### LLM Status
 
 1. 准确性

 2. 实时性

 4. 高成本

 5. 专业性

6. 安全性
 
---
- davinci：GPT3 Pretrain model
- text-davinci-002：Supervised fine-tuning on human-written demonstrations and on model samples rated 7/7 by human labelers(model生成+人评的高分样本) on an overall quality score.
- text-davinci-003：RM with PPO
![Pasted image 20230630180316.png](/img/user/990%20Attachment/Pasted%20image%2020230630180316.png)
![Pasted image 20230630174506.png](/img/user/990%20Attachment/Pasted%20image%2020230630174506.png)
![Pasted image 20230630174745.png](/img/user/990%20Attachment/Pasted%20image%2020230630174745.png)
![Pasted image 20230630174921.png](/img/user/990%20Attachment/Pasted%20image%2020230630174921.png)

---
问题：
> The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. Human: Hello, who are you? 
> AI: I am an AI created by OpenAI. How can I help you today? Human: Are bugs real? 
> AI:

![Pasted image 20230630180654.png](/img/user/990%20Attachment/Pasted%20image%2020230630180654.png)
![Pasted image 20230701232514.png](/img/user/990%20Attachment/Pasted%20image%2020230701232514.png)









