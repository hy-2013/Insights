---
{"dg-publish":true,"permalink":"/010 outbox/【LLM Review】Pretrain的一些实践经验 - 2025-M2/","tags":["#LLM/Pretrain"]}
---

## TLDR
1. 本文介绍了From Scratch Pretrain一个LLM的所有关键环节，包括数据收集和清洗，tokenizer构建，模型结构选型，核心超参设计等。
2. 一些核心观点：
	1. 训练数据要兼顾质量和多样性，低质量数据不可能完全清洗干净，只能在选择阈值是尽可能提高信噪比。
	2. 虽然一些文章说去重可能会伤害模型效果，但个人观点是去重还是要做好，如果觉得哪些数据重要或更关注可以训多个epoch。
	3. 长期看，MoE显然是更promising的结构，因为竞争到最后还是比拼的相同的效果下谁的成本更低。

## 1. 数据
数据作为训练大模型的“粮食”，其完备性、质量和配比都对模型训练的效果至关重要。
### 1.1 数据收集
Pre-training的数据主要来源为互联网公开数据集，数据类型包括Common Crawl、Wiki、Book、Paper、QA、Code和垂类数据（math、reason等）等。
互联网开源数据是可以通过CommonCrawl分片下载以及其他各开源渠道（HuggingFace、 Github等）下载获得的，比较好的开源数据集包括AllenAI的dolma系列、苹果的DCLM、huggingface的fineweb-edu等，中文包括MNBVC、M-A-P等，小语种包括fineweb-edu-2等。
### 1.2 数据清洗
数据清洗的目的是保证数据质量。参考(Wenzek _et al._, 2020)，数据清洗Pipeline主要包括数据抽取、数据过滤、数据去重和数据分类。不同数据来源和数据类型的清洗、去重逻辑会有一定的不同。开源代码比如[RedPajama-Data](https://github.com/togethercomputer/RedPajama-Data)
#### 1.2.1 数据抽取
数据抽取指从各类raw数据中抽取出有用的字段，并将这些字段按照特定的template组织成固定的格式。raw的数据类型包括html、各类book格式（epub、mobi等）和PDF等。
#### 1.2.1 数据过滤
由于Pretrain原始数据量巨大，多数来源都是TB级甚至PB级，所以每步技术方案的选择都需要做好**性能和效果的平衡**。整体流程如下：
- 语言分类：分类的目的一是不同语言类型需要有不同的清洗逻辑，比如不同语言的行文逻辑是不同的，对应PPL模型、ngram模型等都不同。另外，做不同语言间的数据配比时也需要。
- 启发式规则：可以理解为粗筛阶段。包括stopwords占比、special characters占比、字/词重复率、短行占比、字数区间等。一些特殊的语料需要采取专门的处理逻辑，比如book、文言文等。
- PPL：可以理解为精筛阶段。基于KenLM训练的统计模型，主要是评估数据的行文流畅性或可读性。
- Bert质量分类器：类似粗排阶段。参考fineweb-edu (Penedo _et al._, 2024) 和llama3 的方案，筛选出textbook级别的高质量数据，同时不同语言、不同数据类型会训练采用不同Bert模型，最终把数据分成0-5分的质量等级，分数越大质量越高，便于后续在数据配比时做细粒度控制。
- 大模型过滤：类似精排阶段。参考(Zhou _et al._, 2024)，借助大模型的能力细粒度的过滤掉doc中的噪声段落或句子。参考(Shi _et al._, 2023)，借助大模型的logprob，进一步过滤掉行文不连贯的数据。
- 安全过滤：为保证大模型的输出符合“HHH”标准(Bai _et al._, 2022)和国内安全监管标准，需要在Pretrain阶段就对数据进行安全清洗，具体包括涉及到敏感政治、色情、暴恐、未成年、毒品、赌博、违禁品、低俗和暴力等相关内容。
#### 1.2.1 数据去重
由于数据来源于整个互联网和不同的开源方，数据中存在大量的重复数据，分析发现一些doc或段落甚至会重复上万次，如果去重做不好，会导致Pretrain的训练语料有偏，甚至只会输出固定句式的情况。从技术上，可分别使用了文本去重和语义去重。从去重粒度上，我们实现了doc粒度、段落粒度和句子粒度。其中文本去重主要方案为MinHash+LSH，语义去重通过BGE+分片聚类。
#### 1.2.1 数据分类
为了对训练数据的配比做细粒度控制和以后做定向的domain知识增强，我们对去重后的全部数据做了领域分类，比如金融、法律、医疗等约50个细分领域。

需要强调的是在训练前，还要对所有的训练数据和各类benchmark进行了严格的过滤和去重，确保不存在数据污染的问题。事实上，很多实验(DeepSeek-AI _et al._, 2024)证明仅仅是在数据中混入少量的近似问题，就可以大幅提升benchmark的效果，我们的实验也有类似的结果。
## 2. Tokenizer
Tokenizer对模型的效果、训练稳定性和模型推理性能影响很大，如果要自己训练Tokenizer，建议遵守如下两个原则：
1. 尽可能的与Pretrain的训练数据同分布。
2. 对着重关注能力的相关语料做上采样，比如Multilanguage、Math和Code。
## 3. 模型结构
#### 3.1.1 dense结构
虽然OpenAI scaling law的结果来看，模型结构本身对于最终loss的影响并不大。但另外一些研究表明(Team _et al._, 2024; T. Ye _et al._, 2024)，增大模型的层数或深度，会对模型的数学和逻辑推理能力有提升。因此建议可以优先尝试偏深的结构，比如Gemma2-9B等。
#### 3.1.2 MoE结构
随着deepseek的推动，加上GPT4以后的openai模型可能都是MoE结构，至少说明了大size模型（100B以上）用MoE结构明细优于Dense结构。小size的模型也已经基本被证明MoE也是性价比更好的结构，比如DeepseekMoE(Dai _et al._, 2024)的Table 2和OlMoE(Muennighoff _et al._, 2024)的Fig 4。
基于上面的分析，长期来看，随着Infra（megatronLM）的越来越成熟，MoE显然是性价比更优的结构。
## 4. 核心超参
最核心的超参就是Learning Rate scheduler和Batch size，其中LR最为重要。BS主要是为了训练稳定性，尤其是大size的model会将BS逐渐增大，比如llama3 405b从4M增加到了16M。下面主要介绍Learning rate scheduler.
类似WSD(warmup-stable-decay)的策略(Hu _et al._, 2024)是一种主流做法，很多实验已经证明该scheduler效果好于cos scheduler，同时decay阶段（即Annealing）直接linear decay到0，会得到最好的效果。在实际训练中该策略有两个好处：
- 训练前期维持在一个较高的学习率下有助于大模型更快更广泛的探索最优的学习空间，并且能使大模型训练的更稳定（gradnorm保持平稳）。
- Stable阶段的LR不下降或缓慢下降的策略允许我们在训练中途增加更多的数据而不破坏整体的LR scheduler策略，比如不需要做re-warmup的破坏再重建过程(Gupta _et al._, 2023)，提高了模型的复用性，减少了实验成本。
## 5. Annealing
这儿再着重介绍下WSD的decay即Annealing阶段，因为这么对提升模型最终效果至关重要。一般该阶段会训练更高质量的数据、合成数据或想着重增强的domain数据。
实验发现，退火阶段的起始学习率如果过低，会显著影响模型的退火效果；而起始学习率如果超过一阶段衰减后的最终学习率，会在退火初期造成loss的剧烈上升和performance下降。因此，需要精心设计一阶段学习率衰减的幅度和退火阶段rewarmup的幅度（如果需要rewarmup的话）。

## References
Abdin, M. _et al._ (2024) ‘Phi-4 Technical Report’. arXiv. Available at: https://doi.org/10.48550/arXiv.2412.08905.
Allen-Zhu, Z. and Li, Y. (2024) ‘Physics of language models: Part 3.3, knowledge capacity scaling laws’, _ArXiv e-prints_, abs/2404.05405.
Aryabumi, V. _et al._ (2024) ‘To Code, or Not To Code? Exploring Impact of Code in Pre-training’. arXiv. Available at: http://arxiv.org/abs/2408.10914 (Accessed: 22 August 2024).
Bai, Y. _et al._ (2022) ‘Constitutional AI: Harmlessness from AI Feedback’. Available at: http://arxiv.org/abs/2212.08073.
Dai, D. _et al._ (2024) ‘DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models’. arXiv. Available at: http://arxiv.org/abs/2401.06066 (Accessed: 20 February 2024).
DeepSeek-AI _et al._ (2024) ‘DeepSeek LLM: Scaling Open-Source Language Models with Longtermism’. arXiv. Available at: https://doi.org/10.48550/arXiv.2401.02954.
Dong, G. _et al._ (2024) ‘BaichuanSEED: Sharing the potential of ExtensivE data collection and deduplication by introducing a competitive large language model baseline’. Available at: https://arxiv.org/abs/2408.15079.
Groeneveld, D. _et al._ (2024) ‘OLMo: Accelerating the Science of Language Models’. arXiv. Available at: http://arxiv.org/abs/2402.00838 (Accessed: 4 February 2024).
Gupta, K. _et al._ (2023) ‘Continual Pre-Training of Large Language Models: How to (re)warm your model?’ arXiv. Available at: http://arxiv.org/abs/2308.04014 (Accessed: 25 April 2024).
Hu, S. _et al._ (2024) ‘MiniCPM: Unveiling the Potential of Small Language Models with Scalable Training Strategies’. arXiv. Available at: http://arxiv.org/abs/2404.06395 (Accessed: 3 September 2024).
Muennighoff, N. _et al._ (2024) _OLMoE: Open Mixture-of-Experts Language Models_, _arXiv.org_. Available at: https://arxiv.org/abs/2409.02060v1 (Accessed: 5 September 2024).
Penedo, G. _et al._ (2024) ‘The FineWeb datasets: Decanting the web for the finest text data at scale’, in _The thirty-eight conference on neural information processing systems datasets and benchmarks track_. Available at: https://openreview.net/forum?id=n6SCkn2QaG.
Shi, W. _et al._ (2023) ‘Detecting Pretraining Data from Large Language Models’. arXiv. Available at: http://arxiv.org/abs/2310.16789 (Accessed: 15 January 2024).
Team, G. _et al._ (2024) ‘Gemma 2: Improving open language models at a practical size’. Available at: https://arxiv.org/abs/2408.00118.
_The Llama 3 Herd of Models | Research - AI at Meta_ (no date). Available at: https://ai.meta.com/research/publications/the-llama-3-herd-of-models/ (Accessed: 24 July 2024).
Wenzek, G. _et al._ (2020) ‘CCNet: Extracting high quality monolingual datasets from web crawl data’, in _Proceedings of the 12th language resources and evaluation conference_, pp. 4003–4012.
Ye, T. _et al._ (2024) ‘Physics of Language Models: Part 2.1, Grade-School Math and the Hidden Reasoning Process’. arXiv. Available at: http://arxiv.org/abs/2407.20311 (Accessed: 5 December 2024).
Zhou, F. _et al._ (2024) ‘Programming every example: Lifting pre-training data quality like experts at scale’. Available at: https://arxiv.org/abs/2409.17115.
