# Machine Learning
Giving a computer the ability to write its own rules and learn about new things, on its own.

## Resources
- [Machine Learning & Artificial Intelligence: Crash Course Computer Science #34](https://www.youtube.com/watch?v=z-EtmaFJieY)

## Vocabulary and Definitions
There are many different approaches or models in machine learning, but generally, they can be broken down into two major categories called supervised learning and unsupervised learning.

### Model
An algorithm or an approach to a problem. Usually does not produce a exact result but rather prediction with a percentage of confidence.


### Probability
How likely it is that an event will occur, or a way of measuring how close a value might be to the actual correct value. It's usually measure from `0` to `1`.

```
0                            1
|----------------------------|
Complete              Complete
Guess                Certainty
```

### Supervised learning
A case where is tasked with predicting a category or a quantity.

#### Classification
A supervised machine learning model that makes a prediction about how a piece of data should be categorized.

e.g. categorizes email as spam or not spam. Feed millions of `spam` and `safe` emails. The machine will analyse different aspects of the mail (sender, subject, body). New emails can be run through the model and be labelled with a certain confidence.

```json
{ "spam": 0.834, "safe": 0.166 }
```

#### Regression
A supervised machine learning model that attempts to predict a quantity or a number

e.g. instead of trying to categorize data it tries to predict quantity

### Unsupervised learning
Analyzes unlabeled data and has no previous examples, and tries to identify patterns in the data.

##### Clustering
An unsupervised machine learning model that attempts to group similar examples together.



## Definitions

- Machine Learning
- Data mining
- Natural Language Processing (NLP)
- Computer Vision
- regression
- supervised vs unsupervised


## Machine Learning
Giving computers the ability to learn without being explicitly programmed.

  A computer program is said to learn from experience E with respect to some task T and some performance measure P, if its performance on T, as measured by P, improves with experience E.

## Supervised learning
Supervised learning problems are categorized into `regression` and `classification` problems.

### Regression
In a regression problem, we are trying to predict results within a continuous output

### Classification
In a classification problem, we are instead trying to predict results in a discrete output.
