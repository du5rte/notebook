# JavaScript - Geolocation

Resouces:
- [Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript/tutorial)
http://welllin.net/introduction-to-google-map-api/
https://developers.google.com/maps/web/
https://github.com/tomchentw/react-google-maps
https://github.com/fullstackreact/react-yelp-clone

## Geolocation

coordinates
- latitude
- longitude
- altitude


## Position
Two methods of getting a position
```js
// runs onces
navigator.geolocation.getCurrentPosition(/*callback*/)
// runs continuously
navigator.geolocation.watchPosition(/*callback*/)
```

```js
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position)
  /*
  position.timestamp
  position.coords.altitude
  position.coords.longitude
  */
})
```
