# Moltin


## Getting Started


### JavaScript SDK
First we need to download or connect to their SDK

```xml
<script src="https://js.moltin.com/v1"></script>

```

### Authentication Key
We need to add our authentication key

```js
var moltin = new Moltin({publicId: 'jVDtbKActkZRU8QgprUHZOgE6p25HTp7UDV30eql'});
moltin.Authenticate(function() {

  // Make your calls here

});
```
Return a `Object` list of `.Categories`

```js
moltin.Authenticate(function() {
  moltin.Category.List(null, function(categories) {
    console.log(categories);
  });
});
```

Return a `Object` list of `.Products`
```js
moltin.Authenticate(function() {
  moltin.Product.List({category: "983523422493475079"}, function(products) {
    console.log(products);
  });
});
```



## Moltin Dashboard

### Slugs
Slugs are a “URL friendly” version of the product or category name. They are typically lowercase, contain no special characters and hyphens are used in place of spaces. For instance a product called 5oz Modelling Hammer might have the following slug:

- [Best Practices Using Slugs](https://shopplugin.net/workshopp/best-practices-using-slugs-instead-of-ids/)
- [Semantic URL wiki](http://en.wikipedia.org/wiki/Semantic_URL)

```
5oz-modelling-hammer
http://mysite/shop/5oz-modelling-hammer
```

### SKU
A SKU usually includes the following details such as the manufacturer, product description, material, size, color, packaging, some even include details about the warranty.

For example Levi Jeans use the [following SKU](http://www.ecommercefulfilment.com/company/blog/whats-sku-how-introduce-your-products-digital-world) code for their jeans:

    LEV-JN-SL-36-GN
