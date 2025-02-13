---
{"dg-publish":true,"permalink":"/010 outbox/【LLM Review】Pretrain的一些实践经验 - 2025-M2/","tags":["LLM/Pretrain"]}
---

## TLDR
1. xx

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

#### 1.2.1 数据去重

#### 1.2.1 数据分类

## 2. Tokenizer

## 3. 模型结构

## 4. 核心超参

## 5. Annealing
