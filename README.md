## SF Movies Map

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) to quickly create a simple react app. It is well documented regarding usage with other popular libraries such as react-router and flow. Extending the app later with router, or changing the type-checking system to flow will be easier. Test runner is also included and pre-configured so testing works out of the box.

This project uses [prop-types](https://github.com/facebook/prop-types) for type checking, [antd](http://ant.design/) for UI components, and [react-google-maps](https://github.com/tomchentw/react-google-maps) for React components wrapper for Google Map Javascript API. Having previously used prop-types and antd for some months, using them in this project helps jump starting the design and development. Choosing to use React component library for google map also helps speed up development. On the other hand, being unfamiliar with the library itself and some libraries used in its demo, it cost some time to look into them.

For testing, this project uses [enzyme](https://github.com/airbnb/enzyme) for component testing, and [enzyme-matchers](https://github.com/FormidableLabs/enzyme-matchers) for improved assertion readability.

This project does not use any state management libraries, as the state is quite simple. When the state will be more complex, redux can be integrated and much of the code can be rewritten easily since the functions are written as pure functions. Api usage

#### Further improvements

- Improved discoverability of clickable map UI elements
- React router integration to enable deep linking
- Filtering movies by title, directors, actors
- Setting boundary when showing locations
- Search area for movie locations
- Locations near me
