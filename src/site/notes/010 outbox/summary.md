---
{"dg-publish":true,"permalink":"/010 outbox/summary/"}
---

# Podcast Transformer 摘要报告

## 封面
- 生成时间：2025-10-25 20:51:36Z
- 有效片段数：384
- 覆盖时长：00:21:24.546
- 识别说话人：A, B, C, D, E

## 目录
- [封面](#封面)
- [模型总结](#模型总结)
- [时间轴](#时间轴)

## 模型总结
摘要：我们发布了 ChatGPT Atlas，一款以 ChatGPT 为核心的 AI 浏览器。我们把“聊天”当作新的“地址栏/搜索框”范式，重想浏览器的工作与生活流。最亮点是“Chat 随行”“Browser Memory”和能在标签页里代你操作的 Agent Mode，并在产品到模型层面内建安全与可控性，朝“vibe lifing”的方向演进。

关键要点：
- 发布：Atlas 是一款围绕 ChatGPT 设计的浏览器，Mac OS 今日全球上线，Agent Mode 暂对 Plus/Pro 开放；将尽快登陆 Windows 和移动端。
- 范式：我们把“聊天体验”当作未来上网的主入口，类似过去的 URL/搜索框。**ChatGPT 成为浏览器的“心脏”，始终在侧、随处可用。**
- 三大特性：  
  1) Chat 随行（在任意网页侧边栏对话，读懂并协助处理当前页面）  
  2) Browser Memory（个性化记忆，让浏览器随用随懂你，且完全可控）  
  3) Agent Mode（本地在你的标签页里“代你点击”，能订票、下单、改文档等）
- 搜索：**默认分屏伴侣 + 多轮搜索**，可一键切换图片/视频/新闻，同时保留聊天上下文。
- 写作：内嵌“cursor chat”在任意输入框直接润色/改写，所选即所改，减少来回拷贝。
- 安全：**Agent 仅在你的浏览器标签页内操作，不能执行本地代码或读文件**；可选择 Agent 登录/登出态；Browser Memory 可选、可查看、可管理；随时无痕模式。
- 愿景：自定义指令将“跟随你全网”，Agent 主动为你聚合信息、预先准备所需，迈向“**vibe lifing**”（把生活/工作任务交给 Agent 去协作完成）。

发布与愿景（00:00:05 - 00:01:21）
Sam：早上好。今天我们要发布 ChatGPT Atlas，我们新的网页浏览器。这是一款围绕 ChatGPT 打造的 AI 浏览器。我们对它筹备已久、非常兴奋。我们认为 AI 是一次十年一遇的机会，可以重新思考浏览器应当是什么、如何更高效愉悦地使用网络。标签页很棒，但创新停滞已久。过去的网络使用以 URL 栏/搜索框为锚；未来我们希望以“聊天体验 + 浏览器”为锚。所以我们基于这种体验重新设计浏览器。浏览器已承载大量工作与生活；让 ChatGPT 成为核心助手，你可以跟页面对话、用它找东西、在浏览器里用 agent 模式等。我们能走很远。接下来演示，请 Ben 先做自我介绍，然后我们开始。

Ben：谢谢 Sam。我是 Ben，负责 Atlas 工程。Atlas 起步于一个问题：如果我能“和浏览器聊天”会怎样？基于这个想法，我们重构了整个体验，用简单对话替代多年的冗杂与复杂。我们不想做个旧浏览器上“拧”一个聊天按钮，而是把 ChatGPT 做成 Atlas 的“心脏”，始终在侧、伴你上网。我自己用 Atlas 更好奇、会问更多问题，也更知情。我们也确保 Atlas 够快够灵活，以支持一系列全新体验。它是面向下一代网络的新型浏览器。Adam 来讲讲特性？

Atlas 是什么与三大特性（00:01:21 - 00:03:44）
Adam：我是 Atlas 的产品负责人。Atlas 用起来应当很熟悉：有你的标签页、书签、密码自动填充等。三项核心功能：  
- 第一，Chat 随行。上网时不再需要在标签间复制粘贴；只要唤起 Chat，它就带着你当前页面的上下文随时帮你。  
- 第二，Browser Memory。ChatGPT 的“记忆”让它越用越懂你、越个性化、越好用；现在这种个性化将随着你在 Atlas 中跨站使用而发生。  
- 第三，Agent。现在 ChatGPT 能代你执行操作。它会出现一个小光标，在你授权后开始点击、帮你订餐/订机票，或直接编辑你正在处理的文档。我们很期待展示。

主屏与导航/记忆（00:03:44 - 00:05:12）
Ryan：我来演示 Atlas 的核心流程。你看到的是主屏：初次打开或新建标签都会来到这里。它看起来像传统浏览器，但内置了 ChatGPT 的能力。中间是对话输入框，能调用你的工具、模型，侧边栏是你的聊天历史。作为浏览器，它还能做更多：我输入“hacker news”，Chat 直接带我到对应网址；我也能用自然语言引用书签，打开“我这个 Galaxy diff 的提交”。我也能用 Browser Memory 搜索“我看过但忘了在哪”的内容，比如“Atlas Core Design 的文档”。它会在“浏览器记忆”里查找——找到了，是我的 Google Docs，点开就行。

主页建议与个性化（00:05:12 - 00:05:55）
Ryan：主屏输入框下方是“建议”。这是个性化的 v0，会基于 Atlas 对你最近在做/可能要做的理解来生成。它可能是你感兴趣的新闻，也可能是一个 agent 任务，能代你在标签页里点击执行。你用得越多，这些建议越准。我们很期待继续深挖浏览器主页的个性化。

侧边聊天与代码审阅（00:05:56 - 00:07:20）
Ryan：到 GitHub 看个我今天早上写的 shader（银河生成器）。右上角有“Ask ChatGPT”，任何网站都有。点一下会出现一个“伴侣侧边栏”，等于把 ChatGPT 邀进你互联网的一隅。它能做 ChatGPT 会做的一切，而且现在能“看见”这个网页。听起来简单，但对我用浏览器方式是巨大解锁：从“显示信息、等你手动改”升级为“理解所显示的信息，并在一些场景直接帮你改”。它建议“总结这个 diff 内容”，我就让它总结。更重要的是：我想知道“把它 cherry pick 到今天要发的 RC 是否安全”。  
Ben：哈哈。  
Sam：我记得我们说今天不再改动了。  
Ryan：总有多一次的时间嘛。它觉得低风险。  
Sam：我不太确定。  
Ryan：我也不完全认同，不过这确实只是视觉上的改动。这就是“侧边聊天”，我用它比较产品、审 PR、或在 Slack 里总结频道，非常好用。

搜索与分屏伴侣（00:07:52 - 00:10:06）
Ryan：来搜一部我想看的电影。我们对通过 Atlas 使用的 ChatGPT 搜索做了重大升级。浏览器里的搜索往往很关键词、很短，LLM 传统上在低上下文时表现会受限。现在你会看到搜索结果顶部有多个标签，能一键切到更“传统”的搜索视图（图片/视频/新闻），同时不丢失主页的聊天体验。点开 Roger Ebert 的影评，四星。Atlas 里从搜索点开链接时，默认会把聊天滑到一侧，网页以分屏打开。你也可以 Cmd-点击避免分屏，或直接点“Ask ChatGPT”关闭。这样你就有一个“搜索伴侣”一路同行。我们再看一篇 Yahoo 影评。  
Adam：你不是已经看过了吗？你的影评是？  
Ryan：我已经看了两遍，我推荐，真的很好。让我用五个词以内总结这篇影评吧。  
Ben：这就是新型搜索的强大之处：它是多轮的。不是把你抛到网页上，而是和搜索结果来回推演，直到你“懂了”。  
Ryan：确实。这评价很高，“PTA is best”。  
Ben：我得去看看，那可是很高的门槛。  
Ryan：一定去，真的很棒。

邮件内联“cursor chat”（00:10:06 - 00:11:23）
Ryan：最后看下 Gmail 草稿。很多人会在 ChatGPT 里先打磨文本，再拷回原处。Atlas 想把这条链路“拍平”，让你在任何输入框/文本域里“就地完成”。我给同事写了一封关于 Agent 的漂亮 shader 的邮件，我框选文字，点 ChatGPT 小点，说“帮我把语言整理得更利落”。  
Ben：难怪你的邮件总是这么“精致又俏皮”。  
Ryan：好了，给出更新了。我也可以继续迭代。点“Update”后，它会用结果替换我的选择，做“范围化的小修改”。我们叫它“cursor chat”，非常期待大家的用法。发给 Omar。到这里，就是 Atlas 的核心流程。

Agent Mode 过渡（00:11:23 - 00:12:06）
Sam：太棒了。除了让 ChatGPT 成为你日常工作的“更顺手的浏览器”，Atlas 本身也很快、很顺滑、手感很好。现在看个进阶能力：ChatGPT 的 Agent Mode。Pranav、Justin、Will 会来演示。

Agent Mode 场景与启动（00:12:06 - 00:14:05）
Will：大家好，我是 Will，Atlas 里 Agent 的研究负责人。  
Justin：我是 Justin，Atlas 的工程师。  
Pranav：我是 Pranav，Atlas 的产品负责人之一。  
Justin：我们要展示 Atlas 如何在 Agent Mode 下为你浏览网页并代办任务。用法很多：你可以把不想干的事交给它，或让它在你不熟的软件里边教边做。虽然还是预览，但我们亲眼见到当 Agent 获得对你“浏览器与个人互联网”的完整访问时有多强大，这也让安全变得格外重要。我们从模型到产品把安全做到位，稍后由 Pranav 详细说。先上手吧。  
Will：我们在筹备一个鬼屋活动，我被抓去当 PM，有个 Google Doc 非正式记录任务。问题一：有人没填“本周任务”，我想留下礼貌提醒。问题二：我们还有正式的任务系统 Linear，我想把“本周任务”转成 Linear 的 Issues。难点是我没啥 PM 经验，也不太会用 Linear。所以我想把这些都交给 Agent Mode。点这里启动 Agent Mode（加号里可选）。启动后，它会在 Atlas 里“代我行动”，你会看到它自己的光标在点击，它能用我的本地登录态与历史，应该像是我的“自然延伸”。我把操作交给 Justin。

可见可控的代理行为（00:14:05 - 00:15:02）
Justin：我们非常重视产品体验，希望你“看得见”Agent 在做什么，从而逐步建立信任。再强调一次：这就是 ChatGPT 在 Agent Mode 下，正在你本机的浏览器里为你操作。它会点击，你可以看也可以不看，但归根结底是“替你用互联网”。  
Ben：它就在你的标签页里，这是在 Atlas 里用 Agent 的妙处。  
Justin：它已经开始执行了。好处是我不用守着，看它后台做事的同时我还能用浏览器干别的。

食谱到购物清单与下单（00:15:02 - 00:16:24）
Justin：比如我们要带菜去聚餐。做菜最难的是确定“买什么、买多少”，分量信息还藏在页面某处。我直接问：给 8 个人做这道菜，我要买哪些食材？ChatGPT 会读页面、算分量、告诉我清单。过去我还告诉它“按超市货架区域来组织清单”，更好逛。看起来我大多都有了，只差肉类和蔬果。我说：那你帮我下单这两类吧。你可以手动点按钮启动 Agent，但很多时候 ChatGPT 会自己判断“需要接管浏览器”才能完成任务——你始终有决定权，可以同意或拒绝。我点继续，把任务交给 Agent。

协作与偏好记忆（00:16:24 - 00:17:12）
Ben：我喜欢 Agent 在 Atlas 里的“协作性”：你把标签页交给它、随时接管，它也变得更擅长协作任务、又快又稳。此刻它已经知道 Justin 喜欢在 Instacart 上选 Safeway，于是自己去了 Instacart。你看它打字比我快多了。  
Justin：我自诩打字快，它把我远远甩开。  
Ben：而且已经开始往购物车里加货了。

安全与隐私控制（00:17:12 - 00:18:59）
Ben：当然，分享浏览器能力也带来全新风险。除了诸多内建护栏，最重要的一点是：**ChatGPT Agent 只会在你的标签页内操作，不能在你电脑上执行代码，也不能访问其他本地文件。**你也能精确控制授权范围。比如开个新标签就能看到：你可以选择让 Agent 处于“已登录”或“未登录”状态。我们建议你每次任务都想清楚：Agent 是否真的需要访问你的登录站点与数据，还是“未登录、最小权限”也能完成？同样的“可控”原则适用于整个浏览器体验：Ryan 展示过的 Browser Memories 完全是可选的，你在初次设置时可决定开关，随时在设置里查看与管理记忆；任何时候你不想让 ChatGPT 记住当下行为，都可以开“无痕窗口”。（比如我想问“直播手心冒汗怎么办”，我意识到不该让大家看到答案，那我们就先不演示这个了，回到任务结果吧。）

结果回顾与“vibe lifing”（00:18:59 - 00:20:42）
Justin：这是我们的 Instacart 订单。两分钟左右 Agent 就把购物车填好了。它也不必替我直接下单——**更好的方式是让我先复核，再决定购买或加点别的**。再看 Linear：任务已创建，并给每个任务正确 @ 了负责人。底部还能看到“相关标签页”，回去看 Google Doc，它给所有有待办的人都留了礼貌提醒。  
Will：这能帮我省下太多时间，也挽救我这个不熟 PM 的人。我们看到 ChatGPT 能控制 Atlas 浏览器、代你完成有用动作。就像 GPT-5 和 Codex 是“vibe coding”的好工具，我们相信从长远看，会出现一个极好的“**vibe lifing**”工具，把你个人与职场的各类任务交给 Agent 去协作完成。我们每次发布新技术，社区总能玩出更多我们想不到的创意用法，真的很期待看到 Atlas 里 Agent 的各种意外新玩法。交还给 Sam。

上线信息与愿景（00:20:44 - 00:21:29）
Sam：我们非常兴奋今天能发布它。Mac OS 今日起全球开放给所有用户（Agent Mode 暂对 Plus/Pro 开放）。我们会尽快把它带到 Windows 与移动端。还有很多要打磨，这个项目仍很早期。**我们特别期待“自定义指令”能在你上网的每个地方伴你同行**；当你让 Agent 替你做事，它会越来越了解你，并主动整合、提前准备对你有用的内容，我们今天已经略作展示——我们相信还能走得更远。欢迎体验并反馈，谢谢。

## 时间轴
| 序号 | 起始 | 结束 | 时长 | 说话人 | 文本 |
| --- | --- | --- | --- | --- | --- |
| 1 | 00:00:05.076 | 00:00:05.526 | 00:00:00.450 | A | Good morning. |
| 2 | 00:00:05.826 | 00:00:06.376 | 00:00:00.550 | A | Today, |
| 3 | 00:00:06.426 | 00:00:07.826 | 00:00:01.400 | A | we're going to launch ChatGPT Atlas, |
| 4 | 00:00:08.176 | 00:00:08.976 | 00:00:00.800 | A | our new web browser. |
| 5 | 00:00:09.126 | 00:00:11.776 | 00:00:02.650 | A | This is an AI-powered web browser built around ChatGPT. |
| 6 | 00:00:11.976 | 00:00:16.826 | 00:00:04.850 | A | It's something we've been super excited about and working hard on for a long time and really excited to share with you today. |
| 7 | 00:00:17.492 | 00:00:26.942 | 00:00:09.450 | A | We think that AI represents like a rare once a decade opportunity to rethink what a browser can be about and how to use one and how to sort of most productively and pleasantly use the web. |
| 8 | 00:00:27.242 | 00:00:34.892 | 00:00:07.650 | A | Tabs were great, but we haven't seen a lot of browser innovation since then. So we got very excited about the opportunity to really rethink what this could be. |
| 9 | 00:00:35.492 | 00:00:38.892 | 00:00:03.400 | A | And in the same way that for the previous way people use the internet, |
| 10 | 00:00:38.992 | 00:00:42.192 | 00:00:03.200 | A | the URL bar of a browser and the search box were a great analog. |
| 11 | 00:00:42.964 | 00:00:50.464 | 00:00:07.500 | A | The way that we hope people will use the internet in the future and that we're starting to see is that the chat experience and a web browser can be a great analog. |
| 12 | 00:00:50.996 | 00:00:55.046 | 00:00:04.050 | A | So we got to work designing a browser based around this kind of experience. |
| 13 | 00:00:55.246 | 00:00:59.446 | 00:00:04.200 | A | The browser is already where a ton of work and sort of life happens. |
| 14 | 00:00:59.796 | 00:01:04.496 | 00:00:04.700 | A | And we think that by having ChatGPT be sort of a core way to help you use that, |
| 15 | 00:01:04.546 | 00:01:05.996 | 00:00:01.450 | A | that you can chat with a page, |
| 16 | 00:01:06.146 | 00:01:10.896 | 00:00:04.750 | A | you can use ChatGPT to find stuff, you can use an agent mode with ChatGPT in a browser, |
| 17 | 00:01:10.996 | 00:01:13.396 | 00:00:02.400 | A | way more stuff that will show you and you can try out later. |
| 18 | 00:01:13.896 | 00:01:15.246 | 00:00:01.350 | A | We can take this pretty far. |
| 19 | 00:01:15.346 | 00:01:17.896 | 00:00:02.550 | A | So we are excited to jump into a demo, |
| 20 | 00:01:17.996 | 00:01:20.896 | 00:00:02.900 | A | have some colleagues here. We'll start with Ben for introductions and then we'll... |
| 21 | 00:01:20.628 | 00:01:21.578 | 00:00:00.950 | A | And we'll show you what we got. |
| 22 | 00:01:21.578 | 00:01:22.578 | 00:00:01.000 | B | Great. Thanks, Sam. |
| 23 | 00:01:23.028 | 00:01:23.828 | 00:00:00.800 | B | I'm Ben. |
| 24 | 00:01:23.878 | 00:01:25.078 | 00:00:01.200 | B | I lead engineering for Atlas. |
| 25 | 00:01:25.378 | 00:01:27.578 | 00:00:02.200 | B | So Atlas started with a question. |
| 26 | 00:01:27.728 | 00:01:29.778 | 00:00:02.050 | B | What if you could chat with your browser? |
| 27 | 00:01:30.278 | 00:01:33.678 | 00:00:03.400 | B | And from that idea, we reimagined the entire experience, |
| 28 | 00:01:33.878 | 00:01:37.728 | 00:00:03.850 | B | replacing years of clutter and complexity with simple conversation. |
| 29 | 00:01:38.900 | 00:01:44.800 | 00:00:05.900 | B | We wanted to make sure that Atlas didn't feel like your old browser just with a chat button that was bolted on. |
| 30 | 00:01:45.350 | 00:01:46.200 | 00:00:00.850 | B | But instead, |
| 31 | 00:01:46.300 | 00:01:48.450 | 00:00:02.150 | B | we made ChatGPT the beating heart of Atlas. |
| 32 | 00:01:48.650 | 00:01:52.050 | 00:00:03.400 | B | It's always by your side and ready to help as you move across the web. |
| 33 | 00:01:52.650 | 00:01:54.650 | 00:00:02.000 | B | I find that when I use Atlas myself, |
| 34 | 00:01:54.900 | 00:01:56.200 | 00:00:01.300 | B | I'm more curious. |
| 35 | 00:01:56.250 | 00:01:57.250 | 00:00:01.000 | B | I ask more questions. |
| 36 | 00:01:57.350 | 00:02:01.000 | 00:00:03.650 | B | I think it's made me just like I said, a more curious, better informed person. |
| 37 | 00:02:01.876 | 00:02:09.726 | 00:00:07.850 | B | We also made sure that Atlas is fast and flexible enough to support some amazing new experiences that we'll show you shortly. |
| 38 | 00:02:10.476 | 00:02:13.276 | 00:00:02.800 | B | It's a new kind of browser for the next era of the web, |
| 39 | 00:02:13.326 | 00:02:15.126 | 00:00:01.800 | B | and we can't wait to show you what it can do. |
| 40 | 00:02:15.226 | 00:02:15.826 | 00:00:00.600 | B | So Adam, |
| 41 | 00:02:15.876 | 00:02:17.026 | 00:00:01.150 | B | do you want to take us through some of the features? |
| 42 | 00:02:17.076 | 00:02:18.476 | 00:00:01.400 | A | Yes, my name is Adam, |
| 43 | 00:02:18.526 | 00:02:19.626 | 00:00:01.100 | A | product lead for Atlas, |
| 44 | 00:02:19.776 | 00:02:23.176 | 00:00:03.400 | A | and as Sam and Ben mentioned, a little bit about why we built Atlas, |
| 45 | 00:02:23.376 | 00:02:25.226 | 00:00:01.850 | A | I'm going to share a little bit about what Atlas is. |
| 46 | 00:02:25.576 | 00:02:26.326 | 00:00:00.750 | A | So first, |
| 47 | 00:02:26.426 | 00:02:27.976 | 00:00:01.550 | A | Atlas should feel very familiar. |
| 48 | 00:02:28.026 | 00:02:29.476 | 00:00:01.450 | A | So it has all of your tabs. |
| 49 | 00:02:29.716 | 00:02:31.716 | 00:00:02.000 | A | bookmarks, autofill for password, |
| 50 | 00:02:31.916 | 00:02:33.166 | 00:00:01.250 | A | all the things you're used to. |
| 51 | 00:02:33.416 | 00:02:41.316 | 00:00:07.900 | A | And then there's three special core features of Atlas that Ryan's going to walk you through in a bit. The first is chat comes with you anywhere as you go on the web. |
| 52 | 00:02:41.466 | 00:02:46.666 | 00:00:05.200 | A | So no longer do you have to copy and paste between tabs when you're working on writing an email or document. |
| 53 | 00:02:46.966 | 00:02:48.516 | 00:00:01.550 | A | As you have that website up, |
| 54 | 00:02:48.666 | 00:02:53.666 | 00:00:05.000 | A | it'll just be right there for you if you invoke it and it'll have context of what you're working on so it can be more helpful. |
| 55 | 00:02:53.916 | 00:02:55.766 | 00:00:01.850 | A | That's chat anywhere across the web. |
| 56 | 00:02:56.016 | 00:02:58.166 | 00:00:02.150 | A | The second big feature is browser memory. |
| 57 | 00:02:58.708 | 00:03:05.508 | 00:00:06.800 | A | And we talked a lot about this when we were building it, but memory is such a critical feature in ChatGPT that people and users love today. |
| 58 | 00:03:05.658 | 00:03:07.708 | 00:00:02.050 | A | And that's because as you use ChatGPT more, |
| 59 | 00:03:07.808 | 00:03:11.558 | 00:00:03.750 | A | it just gets more personalized and helps you better and understands you much better. |
| 60 | 00:03:11.808 | 00:03:15.708 | 00:00:03.900 | A | Now that's going to happen as you go on your browser across the web in Atlas, |
| 61 | 00:03:15.908 | 00:03:18.758 | 00:00:02.850 | A | and it just should be more personalized and more helpful to you. |
| 62 | 00:03:19.188 | 00:03:19.988 | 00:00:00.800 | A | And then the third, |
| 63 | 00:03:20.038 | 00:03:23.388 | 00:00:03.350 | A | which we're really excited about, and Justin's going to show this later, |
| 64 | 00:03:23.438 | 00:03:24.088 | 00:00:00.650 | A | is Agent, |
| 65 | 00:03:24.338 | 00:03:25.588 | 00:00:01.250 | A | which is in Atlas, |
| 66 | 00:03:25.738 | 00:03:28.388 | 00:00:02.650 | A | ChatGPT now can take actions for you. It can do things. |
| 67 | 00:03:28.538 | 00:03:30.388 | 00:00:01.850 | A | So it'll actually bring up a little cursor, |
| 68 | 00:03:30.438 | 00:03:32.288 | 00:00:01.850 | A | start clicking around when you ask it to. |
| 69 | 00:03:32.338 | 00:03:37.288 | 00:00:04.950 | A | It can help you book reservations or flights or even just edit a document that you're working on. |
| 70 | 00:03:37.338 | 00:03:39.338 | 00:00:02.000 | A | And we're really excited to share this with you. |
| 71 | 00:03:39.388 | 00:03:40.438 | 00:00:01.050 | A | So Ryan, |
| 72 | 00:03:40.588 | 00:03:44.138 | 00:00:03.550 | A | our lead designer on the project, is going to show you a tour of Atlas. |
| 73 | 00:03:44.980 | 00:03:45.580 | 00:00:00.600 | A | Thanks, Adam. |
| 74 | 00:03:46.130 | 00:03:46.730 | 00:00:00.600 | A | All right, |
| 75 | 00:03:46.780 | 00:03:49.730 | 00:00:02.950 | A | so I get to do the demo of the core flows in Atlas. |
| 76 | 00:03:50.630 | 00:03:52.180 | 00:00:01.550 | A | What you should see here is your home screen. |
| 77 | 00:03:52.630 | 00:03:57.130 | 00:00:04.500 | A | This is what you'll be presented with when you first download and open the app or any time you create a new tab. |
| 78 | 00:03:57.830 | 00:04:04.530 | 00:00:06.700 | A | We tried to create an experience here that will feel totally familiar coming from a traditional browser but with all the power of ChatGPT baked in. |
| 79 | 00:04:04.730 | 00:04:09.230 | 00:00:04.500 | A | To that end, you'll see there's a composer in the center of the screen where you could ask Chat a question like normal. |
| 80 | 00:04:09.972 | 00:04:11.322 | 00:00:01.350 | A | It can get to all of your tools, |
| 81 | 00:04:11.472 | 00:04:13.422 | 00:00:01.950 | A | your models, |
| 82 | 00:04:13.522 | 00:04:14.522 | 00:00:01.000 | A | and |
| 83 | 00:04:16.572 | 00:04:18.672 | 00:00:02.100 | A | your sidebar with all of your chat history. |
| 84 | 00:04:19.822 | 00:04:20.072 | 00:00:00.250 | A | So, |
| 85 | 00:04:20.122 | 00:04:21.522 | 00:00:01.400 | A | but because it's a browser, |
| 86 | 00:04:21.672 | 00:04:22.272 | 00:00:00.600 | A | you can do more. |
| 87 | 00:04:25.022 | 00:04:26.022 | 00:00:01.000 | A | Type hacker news, |
| 88 | 00:04:26.272 | 00:04:27.772 | 00:00:01.500 | A | chat's going to take me to the URL. |
| 89 | 00:04:28.622 | 00:04:32.772 | 00:00:04.150 | A | I could say, I could reference a bookmark in human language, |
| 90 | 00:04:34.572 | 00:04:37.322 | 00:00:02.750 | A | and it's going to open my commits for this Galaxy diff. |
| 91 | 00:04:38.676 | 00:04:44.276 | 00:00:05.600 | A | You can use browser memory to search your web history for something that you know you've seen before, but you don't know exactly where it is. |
| 92 | 00:04:44.376 | 00:04:53.776 | 00:00:09.400 | A | So let me say search web history for a doc about Atlas Core Design. |
| 93 | 00:04:54.626 | 00:04:55.776 | 00:00:01.150 | A | No, I made this somewhere. |
| 94 | 00:04:59.076 | 00:05:00.376 | 00:00:01.300 | A | Searching your browser memories. |
| 95 | 00:05:04.626 | 00:05:06.276 | 00:00:01.650 | A | And there you go. It looks like it found the document. |
| 96 | 00:05:07.028 | 00:05:10.828 | 00:00:03.800 | C | Talking about it's in my Google Docs, if I tap it you'll see it all open there. |
| 97 | 00:05:12.028 | 00:05:14.278 | 00:00:02.250 | C | Let's jump back to the home page for one final feature. |
| 98 | 00:05:15.220 | 00:05:17.870 | 00:00:02.650 | C | So below the composer on Atlas you'll see suggestions. |
| 99 | 00:05:18.170 | 00:05:22.170 | 00:00:04.000 | C | These suggestions are kind of the first version of personalization in Atlas. |
| 100 | 00:05:23.120 | 00:05:28.020 | 00:00:04.900 | C | It will be generated for you based on what Atlas understands about what you've been up to or might be trying to do next. |
| 101 | 00:05:28.170 | 00:05:36.120 | 00:00:07.950 | C | It can be as simple as a news story it thinks you might be interested in or as advanced as an agent task that's going to delegate for you and kind of click through your tabs. |
| 102 | 00:05:37.588 | 00:05:39.088 | 00:00:01.500 | C | The more you use Atlas, |
| 103 | 00:05:39.238 | 00:05:40.688 | 00:00:01.450 | C | the better these suggestions get. |
| 104 | 00:05:40.838 | 00:05:41.238 | 00:00:00.400 | C | And again, |
| 105 | 00:05:41.288 | 00:05:48.488 | 00:00:07.200 | C | it's very much a v0 of personalization, but we're really excited to see where the homepage of the browser goes as we delve deeper onto this. |
| 106 | 00:05:49.288 | 00:05:49.688 | 00:00:00.400 | C | Okay, |
| 107 | 00:05:49.738 | 00:05:50.738 | 00:00:01.000 | C | so that's the home screen. |
| 108 | 00:05:50.888 | 00:05:55.988 | 00:00:05.100 | C | Now I'm going to hop over to that GitHub example and show you my personal favorite feature. |
| 109 | 00:05:56.338 | 00:05:58.588 | 00:00:02.250 | C | So here I have some code I was working on this morning. |
| 110 | 00:05:59.238 | 00:06:04.138 | 00:00:04.900 | C | It's a shader for a little Galaxy generator. And in the top right. |
| 111 | 00:06:04.948 | 00:06:06.698 | 00:00:01.750 | C | There's this Ask ChatGPT button. |
| 112 | 00:06:06.898 | 00:06:11.348 | 00:00:04.450 | C | You'll see this on any website you visit and when you click it, it creates a companion sidebar. |
| 113 | 00:06:11.398 | 00:06:15.398 | 00:00:04.000 | C | It's basically you inviting ChatGPT into your corner of the internet. |
| 114 | 00:06:15.598 | 00:06:21.798 | 00:00:06.200 | C | It can do all of the things you'd expect to be able to do with ChatGPT, but now it can see whatever that specific web page is. |
| 115 | 00:06:22.048 | 00:06:23.148 | 00:00:01.100 | C | It might sound simple, |
| 116 | 00:06:23.248 | 00:06:26.898 | 00:00:03.650 | C | but it's actually been a major unlock for how I use the browser. |
| 117 | 00:06:26.998 | 00:06:31.648 | 00:00:04.650 | C | It's kind of gone from this tool that's very much about displaying information for you to edit. |
| 118 | 00:06:31.988 | 00:06:37.488 | 00:00:05.500 | C | This tool that understands the information it's displaying and in some cases can even edit it for you. |
| 119 | 00:06:38.188 | 00:06:41.788 | 00:00:03.600 | C | It has a suggestion here to just summarize the contents of this diff. |
| 120 | 00:06:41.838 | 00:06:43.838 | 00:00:02.000 | C | Let's ask for that and see what it says. |
| 121 | 00:06:45.488 | 00:06:47.738 | 00:00:02.250 | C | It commits an even more galaxy. |
| 122 | 00:06:48.388 | 00:06:52.088 | 00:00:03.700 | C | It's updating a few of the visuals and how this particle generator works. |
| 123 | 00:06:52.838 | 00:06:57.488 | 00:00:04.650 | C | This is cool, but what I really want to know is, is this safe to change? |
| 124 | 00:06:57.748 | 00:07:02.148 | 00:00:04.400 | C | cherry pick into the RC launching today. |
| 125 | 00:07:03.248 | 00:07:03.748 | 00:00:00.500 | B | Ha ha. |
| 126 | 00:07:05.972 | 00:07:07.322 | 00:00:01.350 | A | I thought we said no more changes today. |
| 127 | 00:07:07.872 | 00:07:09.372 | 00:00:01.500 | C | There's always time for one more. |
| 128 | 00:07:10.222 | 00:07:10.722 | 00:00:00.500 | C | Okay, |
| 129 | 00:07:10.822 | 00:07:11.972 | 00:00:01.150 | C | thinks this is pretty low risk. |
| 130 | 00:07:12.072 | 00:07:12.972 | 00:00:00.900 | A | I don't know about that. |
| 131 | 00:07:12.972 | 00:07:14.922 | 00:00:01.950 | C | Yeah, I'm sure I totally agree with that one, |
| 132 | 00:07:14.972 | 00:07:16.472 | 00:00:01.500 | C | but it is just a visual change. |
| 133 | 00:07:17.422 | 00:07:18.472 | 00:00:01.050 | C | And that's side chat. |
| 134 | 00:07:18.572 | 00:07:20.422 | 00:00:01.850 | C | You can use this in a wide variety of cases. |
| 135 | 00:07:20.772 | 00:07:21.822 | 00:00:01.050 | C | Comparing products, |
| 136 | 00:07:22.172 | 00:07:23.872 | 00:00:01.700 | C | bringing it into your own corner of the internet. |
| 137 | 00:07:24.022 | 00:07:28.472 | 00:00:04.450 | C | I use it a lot for pull requests or Slack when I want to summarize a channel I've been reading. |
| 138 | 00:07:29.072 | 00:07:31.072 | 00:00:02.000 | C | It's really useful and we're excited for you all to try it. |
| 139 | 00:07:31.700 | 00:07:33.800 | 00:00:02.100 | A | I think also Ben mentioned how it makes you more curious. |
| 140 | 00:07:33.850 | 00:07:37.250 | 00:00:03.400 | A | Now that you have this by your side, you just ask a lot more questions, |
| 141 | 00:07:37.300 | 00:07:38.200 | 00:00:00.900 | A | which I really love about it. |
| 142 | 00:07:38.200 | 00:07:42.100 | 00:00:03.900 | C | Totally. It's a little bit of a paradigm shift where you go from just having this sort of one call, |
| 143 | 00:07:42.150 | 00:07:46.400 | 00:00:04.250 | C | one response to you can kind of keep workshopping until you get what you're looking for, |
| 144 | 00:07:46.450 | 00:07:48.100 | 00:00:01.650 | C | which is very in keeping with chat. |
| 145 | 00:07:48.400 | 00:07:52.700 | 00:00:04.300 | B | Yeah, I often find I'm browsing, I just keep this thing open and I just like flow questions into it as I go. |
| 146 | 00:07:52.700 | 00:07:57.900 | 00:00:05.200 | C | Totally. Speaking of keeping it open, let's take a look at search, which has some more of this side chat to show. |
| 147 | 00:07:58.000 | 00:07:58.150 | 00:00:00.150 | C | So. |
| 148 | 00:08:02.868 | 00:08:06.768 | 00:00:03.900 | C | I'm going to search for this movie I want to see. |
| 149 | 00:08:07.718 | 00:08:12.968 | 00:00:05.250 | C | And we've made some major upgrades to search on chat GPT when accessed via Atlas. |
| 150 | 00:08:13.168 | 00:08:14.668 | 00:00:01.500 | C | So we know that... |
| 151 | 00:08:15.924 | 00:08:27.474 | 00:00:11.550 | C | Search is kind of one of the core flows in a browser for navigating the internet and a lot of these searches can be very keyword based or short and LLMs traditionally struggle with that where they don't have enough context to provide a great answer. |
| 152 | 00:08:27.674 | 00:08:41.674 | 00:00:14.000 | C | So one of the first things you'll notice is anytime you search within Atlas you get these tabs across the top. You can quickly pivot your experience into something more like a traditional search engine with images, videos. |
| 153 | 00:08:43.220 | 00:08:47.770 | 00:00:04.550 | C | or news stories all without losing that core chat experience on the home tab. |
| 154 | 00:08:48.170 | 00:08:48.870 | 00:00:00.700 | C | So here, |
| 155 | 00:08:48.970 | 00:08:49.920 | 00:00:00.950 | C | scroll down, |
| 156 | 00:08:50.020 | 00:08:50.870 | 00:00:00.850 | C | some nice images, |
| 157 | 00:08:50.920 | 00:08:52.820 | 00:00:01.900 | C | a few updates on what this is. |
| 158 | 00:08:52.870 | 00:08:57.520 | 00:00:04.650 | C | Let's see if we can find a link. I'll click this Roger Ebert review. |
| 159 | 00:08:58.620 | 00:08:59.920 | 00:00:01.300 | C | It's given it four stars. |
| 160 | 00:08:59.970 | 00:09:05.070 | 00:00:05.100 | C | One really interesting thing here is that whenever you click a link from a search result in Atlas, |
| 161 | 00:09:05.270 | 00:09:09.270 | 00:00:04.000 | C | by default it's going to slide chat over and open the web in a split view. |
| 162 | 00:09:09.370 | 00:09:11.870 | 00:00:02.500 | C | Now if you don't want that, you can always command click the link. |
| 163 | 00:09:12.500 | 00:09:15.400 | 00:00:02.900 | C | or just click the Ask ChatGPT button and close it, |
| 164 | 00:09:15.450 | 00:09:20.500 | 00:00:05.050 | C | but it has this kind of nice property of you have a companion with you as you search the internet. |
| 165 | 00:09:20.700 | 00:09:23.300 | 00:00:02.600 | C | So maybe I want to go to a different review here. |
| 166 | 00:09:23.350 | 00:09:24.400 | 00:00:01.050 | C | I'll try this Yahoo one. |
| 167 | 00:09:24.850 | 00:09:26.100 | 00:00:01.250 | A | Haven't you already seen this movie? |
| 168 | 00:09:26.150 | 00:09:26.950 | 00:00:00.800 | A | What's your review? |
| 169 | 00:09:27.600 | 00:09:28.900 | 00:00:01.300 | C | I've seen it twice actually. |
| 170 | 00:09:30.000 | 00:09:31.200 | 00:00:01.200 | C | I recommend it. |
| 171 | 00:09:31.350 | 00:09:32.700 | 00:00:01.350 | C | Really, really good actually. |
| 172 | 00:09:33.050 | 00:09:35.600 | 00:00:02.550 | C | Let's just ask for a quick summary of this review. |
| 173 | 00:09:36.148 | 00:09:41.848 | 00:00:05.700 | C | Can you summarize this review in five words or less? |
| 174 | 00:09:43.380 | 00:09:44.680 | 00:00:01.300 | C | Maybe we can get to the meat of it. |
| 175 | 00:09:44.880 | 00:09:50.730 | 00:00:05.850 | B | This is where I think this new model of search is actually really powerful because it makes it, it's like a multi-turn experience. |
| 176 | 00:09:50.830 | 00:09:55.330 | 00:00:04.500 | B | Like you can just have this back and forth with your search results rather than just being sent off to a web page. |
| 177 | 00:09:55.380 | 00:09:56.930 | 00:00:01.550 | B | You can use this to really understand. |
| 178 | 00:09:57.230 | 00:09:57.680 | 00:00:00.450 | C | Totally. |
| 179 | 00:09:57.780 | 00:09:58.080 | 00:00:00.300 | C | Yeah, |
| 180 | 00:09:58.080 | 00:09:58.180 | 00:00:00.100 | B | Wow, |
| 181 | 00:09:58.180 | 00:09:58.930 | 00:00:00.750 | C | that's a great review. |
| 182 | 00:09:59.530 | 00:10:00.280 | 00:00:00.750 | C | PTA is best. |
| 183 | 00:10:00.280 | 00:10:01.130 | 00:00:00.850 | B | I'll have to check it out. |
| 184 | 00:10:01.130 | 00:10:01.680 | 00:00:00.550 | C | That's a high bar. |
| 185 | 00:10:02.580 | 00:10:04.180 | 00:00:01.600 | C | Definitely go. It honestly is great. |
| 186 | 00:10:05.730 | 00:10:06.080 | 00:00:00.350 | C | Okay. |
| 187 | 00:10:06.480 | 00:10:08.930 | 00:00:02.450 | C | For the last demo I'm going to show you in these core flows, |
| 188 | 00:10:08.980 | 00:10:10.680 | 00:00:01.700 | C | I'm going to hop over to my Gmail draft. |
| 189 | 00:10:10.484 | 00:10:16.834 | 00:00:06.350 | C | drafts. So we know a really popular flow in ChatGPT is to draft some writing in a note or a doc or an email, |
| 190 | 00:10:17.034 | 00:10:18.134 | 00:00:01.100 | C | copy that writing, |
| 191 | 00:10:18.234 | 00:10:19.384 | 00:00:01.150 | C | bring it to ChatGPT, |
| 192 | 00:10:19.484 | 00:10:20.534 | 00:00:01.050 | C | workshop it a bit there, |
| 193 | 00:10:20.634 | 00:10:23.184 | 00:00:02.550 | C | maybe change the tone or tenor, language, |
| 194 | 00:10:23.584 | 00:10:24.284 | 00:00:00.700 | C | spell check, |
| 195 | 00:10:24.384 | 00:10:24.684 | 00:00:00.300 | C | grammar, |
| 196 | 00:10:24.834 | 00:10:26.884 | 00:00:02.050 | C | whatever it may be, get to something you're happy with, |
| 197 | 00:10:26.934 | 00:10:28.034 | 00:00:01.100 | C | copy the output of that, |
| 198 | 00:10:28.134 | 00:10:30.084 | 00:00:01.950 | C | bring it back to wherever you're working, |
| 199 | 00:10:30.184 | 00:10:30.984 | 00:00:00.800 | C | paste it there. |
| 200 | 00:10:31.184 | 00:10:31.884 | 00:00:00.700 | C | With Atlas, |
| 201 | 00:10:31.934 | 00:10:38.934 | 00:00:07.000 | C | we wanted to try to flatten that flow to something that feels like you can just do it in line on any form field or text box on the internet. |
| 202 | 00:10:38.804 | 00:10:39.004 | 00:00:00.200 | C | internet. |
| 203 | 00:10:39.104 | 00:10:44.804 | 00:00:05.700 | C | So here I have an email. I was writing to one of the other designers on the team about this beautiful shader he worked on for Agent. |
| 204 | 00:10:45.004 | 00:10:48.054 | 00:00:03.050 | C | I can just select the text and hit the chat GPT nub. |
| 205 | 00:10:48.204 | 00:10:50.954 | 00:00:02.750 | C | Maybe I'll just say tidy my language. |
| 206 | 00:10:51.104 | 00:10:54.554 | 00:00:03.450 | C | It doesn't look like it was my best to begin with back there. |
| 207 | 00:10:55.732 | 00:10:59.532 | 00:00:03.800 | B | Now I know why your emails are so polished and |
| 208 | 00:10:59.532 | 00:10:59.732 | 00:00:00.200 | C | Yes, |
| 209 | 00:10:59.732 | 00:11:00.032 | 00:00:00.300 | B | playful. |
| 210 | 00:11:00.032 | 00:11:00.282 | 00:00:00.250 | C | well, |
| 211 | 00:11:00.332 | 00:11:01.782 | 00:00:01.450 | C | all right, there you go. |
| 212 | 00:11:01.882 | 00:11:02.782 | 00:00:00.900 | C | So you get your update. |
| 213 | 00:11:02.882 | 00:11:05.832 | 00:00:02.950 | C | I could ask for another edit if I wanted. It lets you do all of this in line. |
| 214 | 00:11:05.882 | 00:11:06.682 | 00:00:00.800 | C | Then when I hit update, |
| 215 | 00:11:06.832 | 00:11:08.782 | 00:00:01.950 | C | it's going to take whatever your text selection was, |
| 216 | 00:11:08.932 | 00:11:10.282 | 00:00:01.350 | C | replace it just in that. |
| 217 | 00:11:10.332 | 00:11:13.182 | 00:00:02.850 | C | It allows you to perform really scoped edits in a super useful way. |
| 218 | 00:11:13.332 | 00:11:14.532 | 00:00:01.200 | C | We call it cursor chat. |
| 219 | 00:11:15.182 | 00:11:16.832 | 00:00:01.650 | C | Really excited to see what people do with it. |
| 220 | 00:11:16.932 | 00:11:17.782 | 00:00:00.850 | C | Let's hit send, |
| 221 | 00:11:17.882 | 00:11:18.732 | 00:00:00.850 | C | fire that off to Omar. |
| 222 | 00:11:18.982 | 00:11:19.382 | 00:00:00.400 | B | Awesome. |
| 223 | 00:11:20.132 | 00:11:20.882 | 00:00:00.750 | C | There we are. |
| 224 | 00:11:20.932 | 00:11:23.032 | 00:00:02.100 | C | Those are the core flows for ChatGPT Atlas. |
| 225 | 00:11:23.796 | 00:11:28.696 | 00:00:04.900 | A | That's awesome. Great work, you guys. Thanks very much. So that's a little bit about what makes |
| 226 | 00:11:28.696 | 00:11:28.846 | 00:00:00.150 | C | Uh |
| 227 | 00:11:28.846 | 00:11:32.396 | 00:00:03.550 | A | ChatGPT in your browser just an easier part of your daily work. |
| 228 | 00:11:32.896 | 00:11:45.896 | 00:00:13.000 | A | One thing that you can see a little bit of there, but really comes through when you use it, is this is just a great browser all around. It's smooth, it's quick, it's very nice to use. But now we want to show you a more advanced feature, which is Agent Mode in ChatGPT. |
| 229 | 00:11:46.246 | 00:11:47.596 | 00:00:01.350 | A | And so Pranav, |
| 230 | 00:11:47.696 | 00:11:48.146 | 00:00:00.450 | A | Justin, |
| 231 | 00:11:48.296 | 00:11:49.546 | 00:00:01.250 | A | and Will are here to show you that. |
| 232 | 00:11:50.292 | 00:11:55.042 | 00:00:04.750 | D | Hey everybody, my name is Will Ellsworth and I'm the Research Lead for the agent in Atlas. |
| 233 | 00:11:55.392 | 00:11:56.092 | 00:00:00.700 | A | My name is Justin. |
| 234 | 00:11:56.142 | 00:11:57.342 | 00:00:01.200 | A | I'm an engineer on the Atlas team. |
| 235 | 00:11:57.592 | 00:11:58.592 | 00:00:01.000 | B | And I'm Pranav, |
| 236 | 00:11:58.692 | 00:11:59.892 | 00:00:01.200 | B | one of the product leads on Atlas. |
| 237 | 00:12:00.092 | 00:12:06.142 | 00:00:06.050 | A | And we get to show you how Atlas is able to browse the web and do things for you in agent mode. |
| 238 | 00:12:06.292 | 00:12:08.892 | 00:00:02.600 | A | There's honestly so many different ways you can use this, right? |
| 239 | 00:12:09.092 | 00:12:12.642 | 00:00:03.550 | A | Maybe you want to hand off a task that you're just not interested in doing, |
| 240 | 00:12:12.692 | 00:12:17.092 | 00:00:04.400 | A | or you want it to teach you how to do something in software you've never seen before. |
| 241 | 00:12:17.532 | 00:12:25.782 | 00:00:08.250 | B | This is a preview but honestly we've just been blown away by how powerful this agent can be with a full access to your browser and your personal internet. |
| 242 | 00:12:26.932 | 00:12:28.332 | 00:00:01.400 | B | That makes safety really important, |
| 243 | 00:12:28.532 | 00:12:28.832 | 00:00:00.300 | A | right? Absolutely. |
| 244 | 00:12:28.832 | 00:12:35.332 | 00:00:06.500 | B | And so we've built safety into every part of our stack from the model all the way to the product experience which Pranav will tell us a bit more about. |
| 245 | 00:12:35.582 | 00:12:36.982 | 00:00:01.400 | B | But why don't we see it in action? |
| 246 | 00:12:37.132 | 00:12:37.782 | 00:00:00.650 | D | Let's rock and roll. |
| 247 | 00:12:37.782 | 00:12:38.232 | 00:00:00.450 | A | Let's do it. |
| 248 | 00:12:38.232 | 00:12:42.332 | 00:00:04.100 | D | All right, so we have been planning a haunted house. |
| 249 | 00:12:42.332 | 00:12:43.232 | 00:00:00.900 | A | Really excited for |
| 250 | 00:12:43.232 | 00:12:43.332 | 00:00:00.100 | D | Yeah, |
| 251 | 00:12:43.332 | 00:12:43.482 | 00:00:00.150 | A | this. |
| 252 | 00:12:43.482 | 00:12:44.282 | 00:00:00.800 | D | I'm punk. |
| 253 | 00:12:44.180 | 00:13:08.280 | 00:00:24.100 | D | pumped. And uh for whatever reason I got uh roped into being the project manager for this and uh we have a Google Doc that we've been using to kind of informally plan out our tasks. And so you can see um you know some people have filled in their current week's tasks and uh unfortunately there are a couple of issues here. So the first problem is as you can see by the to-dos uh some people have not |
| 254 | 00:13:09.780 | 00:13:11.980 | 00:00:02.200 | D | uh filled in their current week's task, |
| 255 | 00:13:12.052 | 00:13:15.852 | 00:00:03.800 | D | And so I would love to leave a comment politely reminding them to do so. |
| 256 | 00:13:16.202 | 00:13:19.102 | 00:00:02.900 | D | And then second is while Google Docs is this amazing tool, |
| 257 | 00:13:19.252 | 00:13:32.352 | 00:00:13.100 | D | we also have some more formal task management software called Linear. And I would love to take all the current week tasks that have been filled out and convert them into linear tasks or in the linear verbiage issues. |
| 258 | 00:13:33.588 | 00:13:36.938 | 00:00:03.350 | D | So the tough part here is I have very little project management experience, |
| 259 | 00:13:37.088 | 00:13:38.288 | 00:00:01.200 | D | don't really know how to use Linear. |
| 260 | 00:13:38.288 | 00:13:40.238 | 00:00:01.950 | B | I don't know why we put you in charge of this. |
| 261 | 00:13:40.638 | 00:13:41.838 | 00:00:01.200 | D | Yeah, beats me. |
| 262 | 00:13:41.988 | 00:13:49.038 | 00:00:07.050 | D | But I therefore would love to just delegate this to agent mode in Atlas and have it take care of this for me. |
| 263 | 00:13:49.188 | 00:13:55.788 | 00:00:06.600 | D | And so what I can do is I can click this agent mode here and you can just find this with the plus button selecting agent mode. |
| 264 | 00:13:56.500 | 00:14:03.800 | 00:00:07.300 | D | Now I'm going to kick this off and this agent mode tells ChatGBT that I want it to actually take actions on my behalf inside of Atlas. |
| 265 | 00:14:04.100 | 00:14:05.800 | 00:00:01.700 | D | And so you see it has its own cursor. |
| 266 | 00:14:05.850 | 00:14:08.000 | 00:00:02.150 | D | It's going to be clicking around as if it were me, |
| 267 | 00:14:08.050 | 00:14:10.650 | 00:00:02.600 | D | has access to all my local authentication, |
| 268 | 00:14:10.900 | 00:14:11.750 | 00:00:00.850 | D | all of my history. |
| 269 | 00:14:12.050 | 00:14:14.400 | 00:00:02.350 | D | It should really feel like a natural extension of myself. |
| 270 | 00:14:14.850 | 00:14:16.450 | 00:00:01.600 | D | And I'm going to hand off over to Justin. |
| 271 | 00:14:16.450 | 00:14:19.700 | 00:00:03.250 | A | Yeah. Yeah, the team paid a lot of attention to the product experience here, |
| 272 | 00:14:19.750 | 00:14:19.850 | 00:00:00.100 | A | right? |
| 273 | 00:14:19.900 | 00:14:23.650 | 00:00:03.750 | A | We really wanted to make it feel like it was coming alive and you could see exactly what the agent was doing. |
| 274 | 00:14:23.348 | 00:14:24.998 | 00:00:01.650 | C | the agent was doing so you can start to build trust |
| 275 | 00:14:24.998 | 00:14:25.198 | 00:00:00.200 | A | totally exactly |
| 276 | 00:14:25.198 | 00:14:27.448 | 00:00:02.250 | C | that it was you know doing what you wanted it to yeah |
| 277 | 00:14:27.448 | 00:14:38.898 | 00:00:11.450 | A | but yeah just just to emphasize this point this is chat gpt in agent mode using your web browser for you locally it's got all your stuff it's clicking around for you you can watch it or you can't you don't have to but it's just like really it's using the internet for you |
| 278 | 00:14:38.898 | 00:14:39.898 | 00:00:01.000 | C | exactly exactly |
| 279 | 00:14:40.548 | 00:14:40.998 | 00:00:00.450 | B | Yeah, |
| 280 | 00:14:41.048 | 00:14:42.648 | 00:00:01.600 | B | it's like right in your tab. |
| 281 | 00:14:42.748 | 00:14:47.198 | 00:00:04.450 | B | And that's one of the cool things about the experience of using agent and Atlas. |
| 282 | 00:14:48.404 | 00:14:51.904 | 00:00:03.500 | A | So it looks like it is kicking off. So one thing that's really nice |
| 283 | 00:14:51.904 | 00:14:52.004 | 00:00:00.100 | B | Yeah, |
| 284 | 00:14:52.004 | 00:14:53.554 | 00:00:01.550 | A | is that I don't need to sit and watch it, right? |
| 285 | 00:14:53.554 | 00:14:53.604 | 00:00:00.050 | B | exactly. |
| 286 | 00:14:53.604 | 00:14:58.104 | 00:00:04.500 | A | I can let it just do its thing in the background and use my browser for other things. |
| 287 | 00:14:58.704 | 00:15:02.354 | 00:00:03.650 | A | So here we have a recipe where we're planning a potluck, right? |
| 288 | 00:15:02.354 | 00:15:04.004 | 00:00:01.650 | B | Yeah, really excited about this recipe. |
| 289 | 00:15:04.004 | 00:15:09.254 | 00:00:05.250 | A | Yeah, and so I'd like to show you how we can use agent for things in your personal life. |
| 290 | 00:15:09.404 | 00:15:14.354 | 00:00:04.950 | A | So one thing that I always struggle with with recipes is figuring out what ingredients I need to buy, |
| 291 | 00:15:14.454 | 00:15:14.804 | 00:00:00.350 | A | right? |
| 292 | 00:15:15.354 | 00:15:16.654 | 00:00:01.300 | A | It's somewhere in the recipe page. |
| 293 | 00:15:16.654 | 00:15:16.704 | 00:00:00.050 | B | Yeah. |
| 294 | 00:15:16.704 | 00:15:17.854 | 00:00:01.150 | A | It's some serving size. |
| 295 | 00:15:17.972 | 00:15:32.772 | 00:00:14.800 | A | is I need to figure it all out. So I I like to use Atlas to ask ChatGPT uh what ingredients do I need to buy to cook do I need to cook this for eight people? |
| 296 | 00:15:18.004 | 00:15:18.254 | 00:00:00.250 | A | I need to buy |
| 297 | 00:15:33.908 | 00:15:38.958 | 00:00:05.050 | A | and ChatGPT is going to go ahead and read the web page, figure out the ingredients, |
| 298 | 00:15:39.208 | 00:15:42.408 | 00:00:03.200 | A | kind of do some math for me and tell me exactly what I need. |
| 299 | 00:15:42.758 | 00:15:43.658 | 00:00:00.900 | B | So useful. |
| 300 | 00:15:43.758 | 00:15:44.058 | 00:00:00.300 | A | Yeah, |
| 301 | 00:15:44.058 | 00:15:44.108 | 00:00:00.050 | B | Yeah. |
| 302 | 00:15:44.108 | 00:16:00.508 | 00:00:16.400 | A | in the past I've told it that I like my I like my shopping list organized by grocery aisle to make it a little easier to shop for and looking at this you know I have most of this honestly I just need the meat and the produce so I'm gonna say can you order the meat |
| 303 | 00:16:01.460 | 00:16:24.560 | 00:00:23.100 | A | produce for me and we'll shut off how you can start agent mode by clicking a button right which is really useful if you know to reach for it but in those moments that you don't chat GPT can figure out that the way to accomplish this is to take over your browser right you're always in control you always have the option to approve or reject it so I'm just going to click continue to hand the task off to agent |
| 304 | 00:16:24.760 | 00:16:28.910 | 00:00:04.150 | B | Yeah, and I love how collaborative Agent is in Atlas, |
| 305 | 00:16:29.060 | 00:16:30.560 | 00:00:01.500 | B | so you can just hand off your tabs. |
| 306 | 00:16:30.740 | 00:16:58.340 | 00:00:27.600 | B | you can go back and forth and we've really improved agent a bunch to make sure that it's a lot better and faster at these collaborative tasks and as you can notice like at any moment in time you could take control and so one thing that's really great about this is like agent already knows that Justin likes to shop at Safeway on Instacart and so it knows exactly where to go when all he said was can you order this for me and so it's found its way over to Instacart. |
| 307 | 00:16:58.228 | 00:17:02.778 | 00:00:04.550 | B | part and it's starting to search you can see how it like types way faster |
| 308 | 00:17:02.778 | 00:17:02.978 | 00:00:00.200 | A | Yeah. |
| 309 | 00:17:02.978 | 00:17:03.428 | 00:00:00.450 | B | than I do. |
| 310 | 00:17:04.578 | 00:17:05.178 | 00:00:00.600 | B | And |
| 311 | 00:17:05.178 | 00:17:06.878 | 00:00:01.700 | D | I pride myself in my typing speed, |
| 312 | 00:17:06.878 | 00:17:06.928 | 00:00:00.050 | A | It |
| 313 | 00:17:06.928 | 00:17:07.278 | 00:00:00.350 | D | and this is just |
| 314 | 00:17:07.278 | 00:17:07.428 | 00:00:00.150 | A | types |
| 315 | 00:17:07.428 | 00:17:07.528 | 00:00:00.100 | D | blowing |
| 316 | 00:17:07.528 | 00:17:07.678 | 00:00:00.150 | A | very fast. |
| 317 | 00:17:07.678 | 00:17:08.428 | 00:00:00.750 | D | me out of the water, |
| 318 | 00:17:08.428 | 00:17:08.478 | 00:00:00.050 | B | Exactly. |
| 319 | 00:17:08.478 | 00:17:08.628 | 00:00:00.150 | D | so. |
| 320 | 00:17:09.678 | 00:17:12.428 | 00:00:02.750 | B | Exactly. And it started adding items to the cart already. |
| 321 | 00:17:12.628 | 00:17:27.628 | 00:00:15.000 | B | And so I want to take this moment actually to talk about, you know, despite all of the power and awesome capabilities that you get with sharing your browser with ChatGPT, that also poses an entirely new set of risks. And so |
| 322 | 00:17:27.668 | 00:17:29.168 | 00:00:01.500 | B | So it's really important to us, |
| 323 | 00:17:29.218 | 00:17:34.518 | 00:00:05.300 | B | in addition to a bunch of built-in safeguards, like ChatGPT agent is only ever operating on your tabs. |
| 324 | 00:17:34.668 | 00:17:40.018 | 00:00:05.350 | B | It can't execute code on your computer or access other files. It's just in your tabs. |
| 325 | 00:17:40.118 | 00:17:43.318 | 00:00:03.200 | B | But you're also in control of exactly what you're handing over access to. |
| 326 | 00:17:43.418 | 00:17:46.018 | 00:00:02.600 | B | And so if I open a new tab just to show this off, |
| 327 | 00:17:46.118 | 00:17:50.168 | 00:00:04.050 | B | you always get to decide whether ChatGPT agent is logged in or logged out. |
| 328 | 00:17:50.218 | 00:17:54.118 | 00:00:03.900 | B | And so we really recommend thinking carefully about for any given task, |
| 329 | 00:17:54.268 | 00:17:55.468 | 00:00:01.200 | B | does ChatGPT agent. |
| 330 | 00:17:55.380 | 00:18:23.230 | 00:00:27.850 | E | need access to your logged in sites and data or can it actually work just fine while being logged out with minimal access and that same principle of control carries through to our entire browser experience Ryan showed off these awesome browser memories that power these suggestions earlier it's it's also worth noting that those are completely optional you can decide whether you turn them on and onboarding or not you can always see the memories themselves and manage them in settings and for any time you don't |
| 331 | 00:18:23.060 | 00:18:38.810 | 00:00:15.750 | E | don't want um uh you don't want this to be remembered by chat gpt uh you always can make a new incognito window and so you'll be able to do this to ask questions like what to do when |
| 332 | 00:18:40.084 | 00:18:45.434 | 00:00:05.350 | E | Your palms are sweaty on a live stream |
| 333 | 00:18:45.534 | 00:18:46.484 | 00:00:00.950 | D | Asking her friend, |
| 334 | 00:18:46.484 | 00:18:46.584 | 00:00:00.100 | E | Which, |
| 335 | 00:18:46.584 | 00:18:46.784 | 00:00:00.200 | D | right? |
| 336 | 00:18:46.784 | 00:18:53.584 | 00:00:06.800 | E | yeah, of course and I'm realizing I don't think I want everyone to see the answer to that So why don't we go back and check I the page? |
| 337 | 00:18:53.584 | 00:18:55.184 | 00:00:01.600 | C | don't know if I need you using my computer either. |
| 338 | 00:18:55.184 | 00:18:55.484 | 00:00:00.300 | E | Yeah, Okay, let's |
| 339 | 00:18:55.484 | 00:18:55.984 | 00:00:00.500 | C | great. |
| 340 | 00:18:56.384 | 00:18:58.484 | 00:00:02.100 | C | Should we go back and check how the test went? |
| 341 | 00:18:58.834 | 00:18:59.084 | 00:00:00.250 | D | do it. |
| 342 | 00:18:59.084 | 00:19:00.834 | 00:00:01.750 | C | So here's our Instacart order. |
| 343 | 00:19:00.984 | 00:19:01.334 | 00:00:00.350 | C | Awesome. |
| 344 | 00:19:01.434 | 00:19:04.184 | 00:00:02.750 | C | You can see that in just about two minutes, the agent was able to go through, |
| 345 | 00:19:04.234 | 00:19:05.084 | 00:00:00.850 | C | fill out the cart, |
| 346 | 00:19:05.484 | 00:19:07.884 | 00:00:02.400 | C | and it's just so useful having... |
| 347 | 00:19:08.404 | 00:19:10.304 | 00:00:01.900 | A | the cart fell down and delivered to you like this, right? |
| 348 | 00:19:10.654 | 00:19:19.854 | 00:00:09.200 | A | It doesn't need to go all the way to making the purchase order. In fact it's better for me if I can review what it did and decide to buy or add more things to my cart or whatever else I need to do. |
| 349 | 00:19:20.054 | 00:19:25.354 | 00:00:05.300 | D | Yeah, 100%. Cool. And then let's take a quick look at the linear task. |
| 350 | 00:19:26.004 | 00:19:26.154 | 00:00:00.150 | C | Nice. |
| 351 | 00:19:26.154 | 00:19:35.304 | 00:00:09.150 | D | Um and so yeah looks like it successfully added these tasks to linear and it's a little hard to see on the screen but it's also tagged the right people for each task. |
| 352 | 00:19:35.304 | 00:19:35.504 | 00:00:00.200 | C | Yes. |
| 353 | 00:19:36.084 | 00:19:44.084 | 00:00:08.000 | D | One cool feature is it shows you relevant tabs at the bottom so you can see what tabs it's worked on. So I can go back and check the Google Doc and see, great, |
| 354 | 00:19:44.134 | 00:19:49.334 | 00:00:05.200 | D | it looks like it's tagged all the people who had the to-dos and it's given them a polite reminder to fill this |
| 355 | 00:19:49.334 | 00:19:49.384 | 00:00:00.050 | E | It's |
| 356 | 00:19:49.384 | 00:19:49.534 | 00:00:00.150 | D | out. |
| 357 | 00:19:49.534 | 00:19:50.684 | 00:00:01.150 | E | going to save me so much time. |
| 358 | 00:19:51.184 | 00:19:51.534 | 00:00:00.350 | D | Yeah. |
| 359 | 00:19:52.634 | 00:19:56.984 | 00:00:04.350 | D | And save my job because I was not familiar with this whole project management thing. |
| 360 | 00:19:57.284 | 00:20:02.934 | 00:00:05.650 | D | So we've seen a couple of awesome examples of how ChatGPT can actually control the Atlas. |
| 361 | 00:20:02.868 | 00:20:05.318 | 00:00:02.450 | D | Atlas Browser and perform useful actions on your behalf. |
| 362 | 00:20:06.100 | 00:20:10.950 | 00:00:04.850 | D | And so in the same way that GPT-5 and codecs are these great tools for vibe coding, |
| 363 | 00:20:11.150 | 00:20:15.900 | 00:00:04.750 | D | we believe that we can start in the long run to have an amazing tool for vibe lifing. |
| 364 | 00:20:15.950 | 00:20:20.950 | 00:00:05.000 | D | So delegating all kinds of tasks, both in your personal and professional life, |
| 365 | 00:20:21.050 | 00:20:22.300 | 00:00:01.250 | D | to the agent and Atlas. |
| 366 | 00:20:22.700 | 00:20:26.950 | 00:00:04.250 | D | You know, one of the great joys of working at OpenAI is when we release technology, |
| 367 | 00:20:27.200 | 00:20:31.900 | 00:00:04.700 | D | people outside the company always come up with way more creative ideas for how to use it than we can. |
| 368 | 00:20:32.100 | 00:20:33.350 | 00:00:01.250 | D | Maybe we're just not. |
| 369 | 00:20:33.268 | 00:20:34.768 | 00:00:01.500 | D | Not super creative folks, |
| 370 | 00:20:34.918 | 00:20:39.868 | 00:00:04.950 | D | but I'm really excited to see all the unexpected and cool ways that you can use the agent in Atlas and |
| 371 | 00:20:39.868 | 00:20:40.268 | 00:00:00.400 | A | Yeah, we |
| 372 | 00:20:40.268 | 00:20:41.568 | 00:00:01.300 | D | we're really excited to ship this. |
| 373 | 00:20:41.618 | 00:20:42.868 | 00:00:01.250 | D | So with that back to Sam. |
| 374 | 00:20:44.418 | 00:20:51.268 | 00:00:06.850 | A | are indeed really excited to ship this. We hope you'll love it. So this is going live today for Mac OS worldwide for all of our users, |
| 375 | 00:20:51.318 | 00:20:54.568 | 00:00:03.250 | A | although agent mode is only available to plus and pro users for now. |
| 376 | 00:20:54.618 | 00:20:58.418 | 00:00:03.800 | A | We want to bring this to Windows and to mobile devices as quickly as we can. |
| 377 | 00:20:58.468 | 00:21:02.018 | 00:00:03.550 | A | We think people will hopefully you'll love this as much as we do. |
| 378 | 00:21:02.772 | 00:21:04.072 | 00:00:01.300 | A | There's a lot more to add. |
| 379 | 00:21:04.122 | 00:21:06.422 | 00:00:02.300 | A | This is still early days for this project. |
| 380 | 00:21:06.572 | 00:21:17.172 | 00:00:10.600 | A | We think the kind of idea that we're excited about is what it means to have custom instructions follow you everywhere on the web and as you have this agent that you're having do things for you, getting to know you more and more, |
| 381 | 00:21:17.222 | 00:21:23.972 | 00:00:06.750 | A | pulling stuff together for you proactively, finding things that you might want on the internet and bringing them together, which we showed a little bit of. We think we can push that quite far. |
| 382 | 00:21:24.372 | 00:21:25.822 | 00:00:01.450 | A | So we hope you'll check this out. |
| 383 | 00:21:25.872 | 00:21:28.722 | 00:00:02.850 | A | We hope you will enjoy it and please send us feedback. |
| 384 | 00:21:28.822 | 00:21:29.622 | 00:00:00.800 | A | Thank you very much. |