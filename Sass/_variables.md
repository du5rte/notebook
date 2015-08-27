# Sass Variables

- Defining Variables
- Reusing Variables
- Maths
- Color Palettes

## Defining Variables
Variables are placeholders for a value, start with a `$`
Example:

```scss
$primary-color: light_blue;
$primary-color: #d35050;
$margin: 5px;
```

## Reusing Variables
We can set variables to be other variables values

```scss
$padding: $margin;
```

## Maths
We can do inline math using variables

```scss
padding: $margin * 1.5; // multiplication
padding: $margin / 1.5; // division
padding: $margin + 1.5; // addition
padding: $margin - 1.5; // subtration
```

Sass automaticly converts different units

```scss
$padding: $margin + 2pt;
```

## Color Palettes
We can use color functions to create dynamic color palettes

```scss
desaturate($color, 10%) // desaturates color by 10%
complement($color) // picks opposite color on the wheel
mix($color1, $color2) // mixes different colors
lighten($color, 20%) // ligthens the color by 20%
darken($color, 30%) // darkens the color by 30%
transparentize($color, 0.5) // transparizes the color by half
```
