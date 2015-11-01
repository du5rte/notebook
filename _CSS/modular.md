# CSS - Modular CSS

Resources:
- [The BEM Methodology](http://bem.info/method/)
- [SMACSS](https://smacss.com)
- [Media Object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)
- [Nesting Components](http://simurai.com/blog/2015/05/11/nesting-components/)
- [Color Name Generator](http://chir.ag/projects/name-that-color/#6195ED "chir.ag ")
- [A New Front-End Methodology: BEM](http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/)
- [MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- [&-suffix Naming Conventions](http://teamtreehouse.com/library/advanced-sass/advanced-variables-mixins-functions-and-placeholders/suffix-naming-conventions)

## Modular CSS
The goal with modular css is to write code that does not depend on it's nesting

Bad Example
```css
/* if `nav` is moved out of header context it loses it's margins */
header nav {
  margin-top: 125em;
  margin-bottom: 1.875em;
}
```

## SMACSS
Scalable and Modular Architecture for CSS

### Rules
1. `Base` define what elements look like by default
2. `Layout` define layout styles for major section of a page
3. `Module` where styles are written for each module as stand-alone reusable components
4. `State`
5. `Theme` define different colors and images to give project a different theme

## BEM
Block/Base Element Modifier is a clearer naming methodology for bigger on projects.

The base of an component
```css
.block {}
```

A descent of the Component
```css
.block__element {}
```

A different state or version of the component or it's child
```scss
.block--modifier {}
.block__element--modifier {}
```

Example
```html
<form class="site-search  site-search--container">
    <input type="text" class="site-search__field">
    <input type="Submit" value ="Search" class="site-search__button">
</form>
```

## MOOCSS Pattern
Media Object Oriented CSS methodology is that in web design composed are media layers `media blocks`

```html
<div class="media">
    <img src="logo.png" class="img-rev">
    <div class="body">
        <h3>Welcome to my website</h3>
        <p>My website is the best, seriously!</p>
    </div>
</div>
```

The media object would now read:
```html
<div class="media">
    <img src="logo.png" class="media__img--rev">
    <div class="media__body">
        <h3>Welcome to Foo Corp</h3>
        <p>Foo Corp is the best, seriously!</p>
    </div>
</div>
```

## To BEM or not to BEM?
The trick with BEM is knowing when something falls into a relevant category. Just because something happens to live inside a block it doesn’t always mean is is actually a BEM element.

In the case of our site logo it lives in the .header purely coincidentally; it could just as easily be in our `sidebar` or `footer`. An element’s scope can start in any context, so you need to make sure you only apply BEM as far as you need to.
```css
.header {}
.header__logo {}
```

Here we might be able to just call the second class `.headline`; it depends on if it is styled that way because it’s in `.content`, or whether it just happens to live in `.content`. If it is the latter then we do not need BEM.
```html
<div class="content">
    <h1 class="content__headline">Lorem ipsum dolor...</h1>
</div>
```

If It's both then we do
```html
<div class="content">
    <h1 class="headline content__headline">Lorem ipsum dolor...</h1>
</div>
```

Imagine that we want to have a festive version of the logo for our Christmassy site design. We could have:
```css
.site-logo {}
.site-logo--xmas {}
```
