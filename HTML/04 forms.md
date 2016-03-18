# HTML - Forms

Resources:
 - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)


## Forms
Accepts input from the user means creating a web form, which is typically composed of form controls

- text fields
- radio buttons
- checkboxes
- select menus
- and more.

## Form
Wraps a section of the document that contains form controls. *Forms cannot be nested inside one another*.

```html
<form></form>
```

#### method
The HTTP method that the browser should use to submit the form, such as `POST` or `GET`.
-->
<form method="post"></form>


#### action
The web address of a program that processes the information submitted via the form.
```html
<form action="index.html" method="post"></form>
```

## Input
Accepts text input different inputs render differently.

```html
<input>
```

#### id attribute
Useful to target elements with css or javascript
```html
<input id="name">
```

#### name attribute
Submitted with form data so that server-side code can parse the information.
```html
<input name="user_name">
```
```json
{
  "user_name": "furiosa"
}
```

#### type attribute
Specifies the type of form control such as `text`, `email`, `passwords`, and more.
```html
<input type="text" id="name" name="user_name">
<input type="email" id="email" name="user_email">
<input type="password" id="password" name="user_password">
```



## Text Area
Accepts multiple text lines. Most browsers will render the `textarea` element with a widget to allow for resizing

```html
<textarea id="bio" name="user_bio"></textarea>
```

## Button
Renders a clickable button.

```html
<button>Click me</button>
```

#### type attribute
Specifies whether the button should `submit` the form data, `reset` the form, or have no `default` behavior for use with JavaScript.

```html
<button type="submit">Sign Up</button>
```

#### Label
Helps the user by assigning helpful text to a form control, to understand what kind of data they should add to each form field.
! When we click on it, it focus on the id="name"!
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
-->
<label for="name">Name:</label>


#### for attribute
Redirects the *click* or *focus* on the `input` with the same name `id`
```html
<label for="checkbox">Name:</label>
<input type="text" id="name">
```

Useful for styling `checkboxes`, by hiding the checkbox it self and using a `label` to toggle it.
```html
<label for="checkbox">Name:</label>
<input type="checkbox" id="checkbox">
```


#### Field Set
Wraps multiple form elements into common groups. This can help organize a form and make it easier to understand for users.

```html
<fieldset></fieldset>
```

#### Legend
Adds a legend to a `fieldset` can provide some helpful context for users that are filling out a form.
```html
<legend>Your basic info</legend>
```

#### Select
Renders a drop-down menu that contains selectable options

```html
<select id="job" name="user_job"></select>
```

#### Option
Represents one of the choices that a user can choose in a select menu.
```html
<select id="job" name="user_job">
  <option value="frontend_developer">Front-End Developer</option>
</select>
```

#### Option Group
Wraps option elements, The `label` attribute specifies the text that the optgroup should display above the nested options.

```html
<select id="job" name="user_job">
  <optgroup label="web">
    <option value="frontend_developer">Front-End Developer</option>
    <option value="nodejs_developer">Node.js Developer</option>
  </optgroup>
  <option value="business_consultant">Business Consultat</option>
</select>
```


## Checkboxes
Renders a checkbox input

```html
<h3>Interests:</h3>

<input type="checkbox" id="development" value="interest_development" name="user_interest">
<label for="development">Development</label>

<input type="checkbox" id="design" value="interest_design" name="user_design">
<label for="design">Design</label>

<input type="checkbox" id="business" value="interest_business" name="user_business">
<label for="business">Business</label>
```

## Radio Button
Renders a radio input they must share the same `name` attribute.

```html
<h3>Age:</h3>

<input type="radio" id="under_13" value="under_13" name="user_age">
<label for="under_13">Under 13</label>

<input type="radio" id="over_13" value="over_13" name="user_age">
<label for="over_13">Over 13</label>
```
