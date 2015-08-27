## BEM Pattern

- [The BEM Methodology](http://bem.info/method/)
- [A New Front-End Methodology: BEM](http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/)
- [MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

BEM – meaning `block`, `element`, `modifier` is a smarter front-end naming methodology for more transparency on larger projects.

```scss
.block {} // represents the higher level of an component.
.block__element {} // represents a descendent of .block
.block--modifier {} // represents a different state or version of .block.
.block__element--modifier {} // represents a different state of .block__element
```

The reason for double rather than single hyphens and underscores is so that your block itself can be hyphen delimited `.block-name--modifier {}`

```xml
<form class="site-search  site-search--container">
    <input type="text" class="site-search__field">
    <input type="Submit" value ="Search" class="site-search__button">
</form>
```

## Media OOCSS Pattern

OOCSS - meaning `Object` `Oriented` `CSS` looks at how is the internet is mainly composed of UI layers `media blocks`

[Media Object CSS](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)

```css
.media {}
.media__img {}
.media__img--rev {}
.media__body {}
```
Bad Example!

```xml
<div class="media">
    <img src="logo.png" class="img-rev">
    <div class="body">
        <h3>Welcome to Foo Corp</h3>
        <p>Foo Corp is the best, seriously!</p>
    </div>
</div>
```
In BEM form, the media object would now read:

```xml
<div class="media">
    <img src="logo.png" class="media__img--rev">
    <div class="media__body">
        <h3>Welcome to Foo Corp</h3>
        <p>Foo Corp is the best, seriously!</p>
    </div>
</div>
```
We can now instantly see that `.media` is the block, `.media__img--rev` is an element of `.media` that has a modifier applied and `.media__body` is an unmodified element of `.media`. All through the names of their classes. That is incredibly useful.


## To BEM or not to BEM?

The trick with BEM is knowing when something falls into a relevant category. Just because something happens to live inside a block it doesn’t always mean is is actually a BEM element.

```css
.site-logo {}
```
In the case of our site logo it lives in the .header purely coincidentally; it could just as easily be in our `sidebar` or `footer`. An element’s scope can start in any context, so you need to make sure you only apply BEM as far as you need to.

```css
.header {}
.header__logo {}
```
Here we might be able to just call the second class `.headline`; it depends on if it is styled that way because it’s in `.content`, or whether it just happens to live in `.content`. If it is the latter then we do not need BEM.

```xml
<div class="content">
    <h1 class="content__headline">Lorem ipsum dolor...</h1>
</div>
```
If It's both then we do
```xml
<div class="content">
    <h1 class="headline content__headline">Lorem ipsum dolor...</h1>
</div>
```

Imagine that we want to have a festive version of the logo for our Christmassy site design. We could have:


```css
.site-logo {}
.site-logo--xmas {}
```

## BEM + Compilers

Writing BEM is much easier with compilers

[&-suffix Naming Conventions](http://teamtreehouse.com/library/advanced-sass/advanced-variables-mixins-functions-and-placeholders/suffix-naming-conventions)
```scss
.nav {
  margin-top: 20px;
  margin-bottom: 30px;
  &__item {
    @extend .nav;
    display: inline-block;
    margin: 0 12px;
    a {
      font-size: 18px;
      font-weight: 300;
      color: grey;
      display: block;
      padding: 8px, 18px;
      border-bottom: 1px solid transparent;
    }
    &--current a {
      @extend .nav__item;
      color: black;
      border-color: black;
    }
  }
}
```
It would be create if we didn't have to repeat `.nav__item` `.nav__item--current`
```xml
<nav class="navbar" role="navigation">
  <ul class="nav">
    <li class="nav__item"><a href="#">Typography</a></li>
    <li class="nav__item"><a href="#">Buttons</a></li>
    <li class="nav__item"><a href="#">Forms</a></li>
    <li class="nav__item"><a href="#">Images</a></li>
    <li class="nav__item"><a href="#">Grid</a></li>
    <li class="nav__item nav__item--current"><a href="#">Navigation</a></li>
  </ul>
</nav>
```
```scss
.nav {
  margin-top: 20px;
  margin-bottom: 30px;
  &__item {
    display: inline-block;
    margin: 0 12px;
    a {
      font-size: 18px;
      font-weight: 300;
      color: grey;
      display: block;
      padding: 8px, 18px;
      border-bottom: 1px solid transparent;
			&:hover {
				color: black;
				border-color: black;
			}
    }
    &--current{
      @extend .nav__item;
			a {;
				color: black;
				border-color: black;
			}
    }
  }
}
```
Now we can use `<li class="nav__item--current"><a href="#">Navigation</a></li>` and our styles are nicely grouped

```css
.nav {
  margin-top: 20px;
  margin-bottom: 30px;
}
.nav__item, .nav__item--current {
  display: inline-block;
  margin: 0 12px;
}
.nav__item a, .nav__item--current a {
  font-size: 18px;
  font-weight: 300;
  color: grey;
  display: block;
  padding: 8px, 18px;
  border-bottom: 1px solid transparent;
}
.nav__item a:hover, .nav__item--current a:hover {
  color: black;
  border-color: black;
}
.nav__item--current a {
  color: black;
  border-color: black;
}


```
@mixin ($element) {
	&--#{$element} {
		@content;
	}
}
