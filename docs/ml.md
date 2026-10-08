---
title: "AI - How Models Learn"
type: doc
created: 2018-06-18
updated: 2026-10-07
aliases: ["Machine Learning"]
tags: [ai, ml]
---
# AI - How Models Learn

Machine learning is giving a computer examples instead of rules, and letting it work out the rules on its own. You don't write `if subject includes 'WIN A PRIZE' then spam`; you show it a million emails marked spam or safe and it learns what spam looks like. Every AI tool you use today, from your inbox filter to the chatbot that helps you code, is built on this one idea.

The classic definition: a program learns from experience E at some task T, measured by P, if its performance at T (measured by P) gets better with experience E. In plain words: more examples, better at the job.

## Models

A **model** is the thing that comes out of learning: a function that takes an input and gives back a prediction. Think of it as a recipe the computer wrote for itself after tasting a lot of dishes.

```js
predict('Congratulations, you won a free cruise!') // { spam: 0.83, safe: 0.17 }
```

A model rarely gives an exact answer. It gives a **best guess with a confidence**.

## Confidence and probability

Probability measures how likely something is, on a scale from `0` to `1`.

```
0                            1
|----------------------------|
Complete              Complete
guess                certainty
```

When a model says `{ spam: 0.83, safe: 0.17 }`, it's 83% sure. The numbers add up to `1`. Your app then decides what to do with that: move it to the spam folder above `0.8`, flag it for review between `0.5` and `0.8`, and so on. The threshold is a product decision, not a maths one.

## Training vs inference

A model has two lives.

| | Training | Inference |
|---|---|---|
| What happens | The model learns from examples | The model answers new questions |
| How often | Once, or now and then | Every time you use it |
| Cost | Huge: lots of data, lots of compute | Small per request |
| Coffee shop version | The barista's training week | Making your flat white |

When you chat with an AI, you're doing inference. It isn't learning from your conversation as you go: what it "knows" was fixed when training ended.

## Supervised vs unsupervised

Most approaches fall into two families. The difference is whether the examples come with answers.

- **Supervised learning**: every example has a label ("this email is spam"). The model learns to predict the label for new examples.
- **Unsupervised learning**: no labels. The model looks for patterns on its own.

Supervised is like a teacher marking homework. Unsupervised is like tipping out a box of Lego and sorting it into piles without being told what the piles are.

## Classification vs regression

Supervised learning answers one of two kinds of question.

**Classification** picks a category: a discrete output.

```js
classify(email) // { spam: 0.834, safe: 0.166 }
classify(photo) // { cat: 0.91, dog: 0.07, fox: 0.02 }
```

**Regression** predicts a number: a continuous output.

```js
predictPrice({ bedrooms: 2, area: 70, city: 'Lisbon' }) // 312000
predictWaitMinutes({ queue: 6, baristas: 2 }) // 7.5
```

Rule of thumb: if the answer is a word from a list, it's classification. If it's a number on a scale, it's regression.

## Clustering

The most common unsupervised task is **clustering**: grouping similar things together without being told the groups. Feed it every customer's orders and it might find "morning espresso people", "weekend brunch people" and "oat milk everything people". Nobody labelled those; the model found them, and naming them is your job.

## From here to large language models

A large language model (LLM), the kind behind ChatGPT or Claude, is the same idea scaled up enormously, trained on a huge amount of text. Three words explain most of how it behaves.

**Tokens.** The model doesn't read letters or whole words. Text is cut into small chunks called tokens, often a word or part of a word.

```
'unbelievable coffee' → ['un', 'believ', 'able', ' coffee']  // roughly; every model splits differently
```

**Next-token prediction.** At its core an LLM does one thing: given the text so far, predict the most likely next token. Then it adds that token and does it again. That's classification again (pick one token from the whole vocabulary, with a confidence), repeated very fast.

```
'The cat sat on the' → { ' mat': 0.41, ' sofa': 0.18, ' floor': 0.12, ... }
```

**Context window.** The model can only "see" a limited amount of text at once: your messages, its replies, any files you pasted. That limit is the context window, measured in tokens. Anything outside it might as well not exist. This is why long chats drift and why starting a fresh conversation for a new task helps.

Put together: an LLM doesn't look things up or reason like a person. It predicts plausible text from patterns it learned in training. Very often that text is right and useful. Sometimes it's confidently wrong.

## Common mistakes

- Treating a confidence as a fact. `0.83` spam means it will be wrong about 1 in 6 of those emails.
- Thinking the chatbot is learning from you mid-conversation. That's inference: the "memory" is just the context window.
- Mixing up classification and regression. "Will this customer cancel?" is classification; "how much will they spend?" is regression.
- Forgetting that a model only knows what it was trained on. Ask about something after its training ended and it will guess.

## Try it

1. Label each as classification, regression or clustering: predicting tomorrow's temperature, sorting photos into "beach" and "city", grouping songs by how they sound.
2. A spam model returns `{ spam: 0.55, safe: 0.45 }`. What would you do with that email, and why?
3. Paste a long paragraph into an AI chat, then ask about it 50 messages later. What happens, and which of the three LLM words explains it?

## Related
- [[docs/claude-code|AI - Claude Code]]
- [[docs/agentic-workflow|AI - Working With Agents]]
- [[docs/python|Python Basics]]
