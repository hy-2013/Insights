---
{"dg-publish":true,"permalink":"/030 PKV/AI/LLM/Paper/关于llama2/"}
---

### 
- publicly available data. We also increased the size of the pretraining corpus by 40%（在2T令牌上进行预训练后，模型仍然没有显示出任何饱和迹象）, doubled the context length of the model, and adopted grouped-query attention (Ainslie et al., 2023)（提升推理能力）. 

- META的llama代码没有开源

- As shown in Table 4, Llama 2 70B is close to GPT-3.5 (OpenAI, 2023) on MMLU（综合评估集） and GSM8K（数学）, but there is a **significant gap on coding benchmarks.** （所以做了个code llama，34b好于gpt3.5）

- SFT annotations in the order of tens of thousands was enough to achieve a high-quality result. **SFT和RLHF 2-5w，RM 10w+就够了**。

- new technique, Ghost Attention (GAtt), which we find helps control dialogue flow over multiple turns (Section 3.3). 

- Surprisingly, we found that the outputs sampled from the resulting SFT model were often competitive（SFT模型可以和人写的一样好） with SFT data handwritten by human annotators, suggesting that we could reprioritize and devote more annotation effort to preference-based annotation for RLHF. （需要RLHF去更多的alignment。SFT都比人类回答的好了？）

- 








---
SFT的作用：「调教」LLM，按照FT Instructions相似的『形式或规则』生成，包括terse、in a given language、consistently format responses (JSON snippets)、custom tone (like business brand voice)，**shorten their prompts length by up to 90%** which speeding up each API call and cutting costs，增加Context Windows。结合prompt engineering, information retrieval, and function calling会更加强大。



