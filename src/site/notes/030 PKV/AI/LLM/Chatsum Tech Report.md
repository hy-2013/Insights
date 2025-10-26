---
{"dg-publish":true,"permalink":"/030 PKV/AI/LLM/Chatsum Tech Report/"}
---

## TLDR
1. Pipeline：收集聊天记录数据 -》数据清洗和预处理 -》GPT训练数据生成 -》SFT -》评估 -》服务部署 -》Web App和Bot构建。
2. 数据：主要基于[NaturalConv](https://arxiv.org/abs/2103.02548)数据+GPT生成。
3. 技术选型：因为要基于modelhub的模型，综合评估后`Baichuan2-13b-chat`的全量SFT效果最优。
4. 效果评估：整体效果接近GPT3.5，基于GPT4自动评估100个case，34个分数高于GPT3.5，66个略差但相差不大。（但该Chatsum版本不是我们最新版本。）

## 2. 数据收集和处理
1. 开源多轮多人对话+Summary很少，高质量的更少
2. 数据Pipeline：
	1. train和val数据：NaturalConv过滤掉无信息量的chat、chat分组、GPT生成、基于各基座LLM封装（参考[设计Prompt(提示词)](https://cooper.didichuxing.com/knowledge/share/book/yOnBK5INGvQT/2200923327761)），共约5K+组。
	2. 评估数据：源为各类Wechat群收集而来，共100组，其他逻辑类似train数据。

## 3. 技术选型
1. 闭源模型评估（主要指中文Summary）
	1. GPT4 > GPT3.5 ~= 星火 > minimax
2. 开源模型评估
	1. `baichuan2-13b-chat`略好于`baichuan-13b-chat`，`baichuan-13b-chat`略好于`Llama-2-13b-chat-hf`（部分翻译成中文后），`chatglm2-6b`略差，其他基本不可用。
	2. 虽然`baichuan2-13b-chat`有些Summary能力，但幻觉、语义理解、生成重复等问题严重，无法直接使用。
3. FT方案选型
	1. 一般正常情况下，Full FT的方案相对PEFT更好（[可参考](https://arxiv.org/abs/2110.07602)），虽然成本更高，但modelhub恰好提供，就直接使用。
	2. 调优结论：
		1. 和Pretrain的lr使用相同的lr效果最好
		2. epoch增大loss变小，但也会过拟合
		3. chat比base好（和训练数据量有关）
![Pasted image 20231015183603.png](/img/user/990%20Attachment/Pasted%20image%2020231015183603.png)
## 4. 效果评估
### 4.1 SFT前后对比
* case对比（原chat见附录）
> SFT前
![Pasted image 20231017230200.png](/img/user/990%20Attachment/Pasted%20image%2020231017230200.png)
> SFT后
![Pasted image 20231017230127.png](/img/user/990%20Attachment/Pasted%20image%2020231017230127.png)
### 4.2 与闭源商用大模型对比
* 基于各类Wechat群收集而来共100组对话，以GPT-4为标准，效果如下：
	* gpt3.5~=spark(星火) > chatsum（非最新版） > minimax
	* ![Pasted image 20231017224633.png](/img/user/990%20Attachment/Pasted%20image%2020231017224633.png)
* case对比：基于原对话，我们发现相对GPT3.5，Chatsum模型（见4.1部分SFT后）对细节总结更清楚且没有信息缺失。
> GPT3.5
![Pasted image 20231017230620.png](/img/user/990%20Attachment/Pasted%20image%2020231017230620.png)

## 附录
> 原对话
```
0：一激灵
1：是的
1：我家狗都一激灵，听到闹铃嗷嗷叫
2：特斯拉  涨到120元了
0：@所有人 快来看辽宁春晚，好多人评论相亲
7：春晚都有了[惊讶]
2：吐血了
0：大盘回调了
2：赚了200块钱
2：投入与产出严重不匹配
0：你还赚钱 非常NB了
0：敬业哒竞价涨停呢
4：下午跳水，快跑
0：我绳硬了
4：贵绳贵广可以，总有一个被借壳
0：都快过年了  还不赶紧发公告借
0：我绳加油啊
0：感觉走出趋势了
0：绳绳也萎靡了
5：多好的首阴啊，不反包
0：大涨了
2：还是要打高标主流
1：今天不炒汽车吗
0：我绳
1：白酒呗
7：大盘怎么还涨这么好
8：好还不行？
0：好哪里了
7：大盘是红的
7：应该多跌点，年前低吸，年后大涨
7：现在就涨这么好，上涨动力都消耗了
3：跳水咯
6：为什么阴线下面有个小方块
6：是告诉我要买进去吗
7：大盘跌，个股反而涨了
4：大盘还有根大阴线
4：明后天到来
7：持股过年了只能
4：每天涨的都不一样。今天红的明天闷
4：一天一个板块轮动
7：完
7：反正持股过节死扛下去了
0：昨天没看盘，我绳都跌的裤衩没了
3：天天跳水
1：老刘 给我邮点特产
6：ct竟然要排队
```

> system msg
```
你是一个优秀的对话聊天助手。基于所有多轮聊天记录，你需要逐步完成如下任务，首先，将聊天记录的内容归纳出2-5个核心话题（话题名称要简洁），并简洁的概括出每个人的观点或态度；最后针对每个话题给出总结和要点。
```
