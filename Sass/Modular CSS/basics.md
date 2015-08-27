# Modular CSS with Sass

Resources
- [Color Name Generator](http://chir.ag/projects/name-that-color/#6195ED "chir.ag ")
- [The BEM Methodology](http://bem.info/method/)
- [A New Front-End Methodology: BEM](http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/)
- [MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- [Media Object CSS](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)
- [&-suffix Naming Conventions](http://teamtreehouse.com/library/advanced-sass/advanced-variables-mixins-functions-and-placeholders/suffix-naming-conventions)
- [SMACSS](https://smacss.com)
- [Nesting Components](http://simurai.com/blog/2015/05/11/nesting-components/)

## Modular CSS

The goal with modular css is to write code that does not depend on it's nesting

e.g. Bad Example

```css

header nav ul {
  margin-top: 125em;
  margin-bottom: 1.875em;
}

/* if we move .content out of header context it will lose it's margin top*/
.content nav {
  margin-top: .8em;
  margin-bottom: 1.8em;
}

.content nav li:first-child {
  margin-left: 0;
}
```

## SMACSS

SMACSS meaning - Scalable and Modular Architecture for CSS

[SMACSS](https://smacss.com)


### Rules
1. `Base` define what elements look like by default
2. `Layout` define layout styles for major section of a page
3. `Module` where styles are written for each module as stand-alone reusable components
4. `State`
5. `Theme` define different colors and images to give project a different theme
