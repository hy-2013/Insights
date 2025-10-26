---
{"dg-publish":true,"permalink":"/030 PKV/AI/LLM/【大模型创意应用大赛】Chatsum智能秘书 - 提交贴/","tags":["#LLM"]}
---

## 一、实际组队情况
吴志国：Web App构建、消息可视化
崔学伟：DChat Chatsum Bot构建
张朝立：Chatsum大模型构建、项目负责人

## 二、作品描述
你是否经常遇到一堆群的未读消息？是否有FOMO（fear of missing out）？是否为了找到某条忘记关键词的重要信息爬楼到头昏眼花？对大量消息或文档的阅读、筛选、整理、记录等无不大量占用我们的精力。Chatsum智能秘书（简称Chatsum）的出现就是为了帮你解决这些问题。
![Pasted image 20231015155906|300](https://raw.githubusercontent.com/hy-2013/Insights/main/src/site/img/user/990%20AttachmentPasted%20image%2020231015155906.png)
![Pasted image 20231015155935|300](https://raw.githubusercontent.com/hy-2013/Insights/main/src/site/img/user/990%20AttachmentPasted%20image%2020231015155935.png)
### 2.1 Demo
1. DC Chatsum Bot
![Pasted image 20231015160626|600](https://raw.githubusercontent.com/hy-2013/Insights/main/src/site/img/user/990%20AttachmentPasted%20image%2020231015160626.png)
	说明：由于DC现在不支持批量自定义发送消息，目前想体验DC体验Chatsum Bot的用户只能通过输入<触发词，消息>的方式逐条发送，Chatsum Bot会自动归总并回传。这种方式确实体验不太好，我们也希望能和DC的同学一起共建，提升Chatsum Bot的易用性（希望效能平台部的老板能看到和联系我们）。当前欢迎体验我们的Web App，你只需要将群消息批量选中后导入到氢笔记，脱敏后直接copy到Web App即可。

2. Web App
![Pasted image 20231015160007|600](https://raw.githubusercontent.com/hy-2013/Insights/main/src/site/img/user/990%20AttachmentPasted%20image%2020231015160007.png)
体验链接：[Web App](http://10.191.74.228:8060)。demo case见附录。
> 用户名：设置为6-12位字母+数字（不能以数字开头），注意不要与他人分享
> 密码：随便填一个，不校验（但是必须要填一个）

1. 归总报告可视化
![Pasted image 20231015160121|600](https://raw.githubusercontent.com/hy-2013/Insights/main/src/site/img/user/990%20AttachmentPasted%20image%2020231015160121.png)
### 2.2 Chatsum功能
1. 已实现功能
	1. DChat群消息自动总结、归整、xmind式结构化展示和每日报告生成
		1. 支持任意条数的chat消息：虽然我们基于langchain做了优化，但受限模型Context能力，目前50条及以内的效果最佳，可做到接近Chatgpt3.5的效果（详细评测我们后续会以《Chatsum Tech Report》发出）。
	2. Chat式Web Summary应用构建
	3. 基于Modehub训练的Chatsum基座模型
2. 规划实现功能
	1. Chat中的表情符号、链接文档、图片等信息识别和抽取
	2. 业务知识问答：用户可以通过chat方式，直接获取基于RAG（way社区文章、wiki等）和Chatsum大模型生成的答案，甚至直接基于聊天记录和相关文档直接生成PRD等。
	3. Workflow提效和项目管理自动化：
		1. 代办列表生成
		2. 重要事件生成
		3. Dealine提醒
		4. 会议纪要
	4. Agent智能秘书：自主「沟通」，与其他Agent联动自主或半自主的「完成工作内容」。
### 2.3 Chatsum架构和执行流
1. 架构图
![Pasted image 20231015155535|600](https://raw.githubusercontent.com/hy-2013/Insights/main/src/site/img/user/990%20AttachmentPasted%20image%2020231015155535.png)

2. 执行流
* DC Chatsum Bot
![Pasted image 20231015155729|600](https://raw.githubusercontent.com/hy-2013/Insights/main/src/site/img/user/990%20AttachmentPasted%20image%2020231015155729.png)
* Web App Bot
![Pasted image 20231015160136|600](https://raw.githubusercontent.com/hy-2013/Insights/main/src/site/img/user/990%20AttachmentPasted%20image%2020231015160136.png)

## 三、作品创新度
以Chat为入口，将LLM的能力赋能到日常Workflow的全流程，包括交流沟通、代办和重要事件的生成和提醒、业务知识问答、过滤不相关信息等，大幅提升员工的工作效率。

## 四、作品价值度
作品的最大价值就是其极大实用性和易用性，实用性方面上面已经提到，易用性是指每个用户都可以直接在DC群设置或工作台添加Chatsum Bot，也可以直接体验我们的Web App（不需要注册直接可用）。


## 五、市场竞争力
1. 垂直大模型能力：训练了13B小LLM模型，效果和媲美gpt3.5，但推理成本大幅降低
2. DC消息定制化处理流程：包括Pre-Processing和Post-Processing
3. 归总报告的结构化和可视化展示
4. Feedback数据飞轮

## 六、作品使用ModelHub的环节
1. 使用model广场的基座模型
2. 使用modelhub的训练、评估、推理和服务发布的资源和能力


## 附录
1. demo case 建议格式：
```
用户A：大家好！有人知道这周五有什么活动吗？
用户B：我听说有个音乐会，你有兴趣吗？
用户A：大家有没有推荐的餐厅？我想吃点好吃的！
用户B：我推荐一家日式料理店，口味很不错。
用户C：我喜欢意大利菜，可以去尝试一下意面。
用户B：我最近看了一部科幻片，非常精彩！
用户C：我喜欢爱情片，有没有什么好的爱情电影？
用户A：大家有没有学习英语的好方法？
用户B：我觉得多听多说是提高口语的好方法。
用户C：我喜欢看英文电影，可以提高听力和理解能力。
```
