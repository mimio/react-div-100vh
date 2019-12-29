# `Div100vh` React component

[![CircleCI](https://circleci.com/gh/mvasin/react-div-100vh.svg?style=svg&circle-token=cd3f9e7031e393880d945af301841db926000ec4)](https://circleci.com/gh/mvasin/react-div-100vh)
[![npm version](https://badge.fury.io/js/react-div-100vh.svg)](https://badge.fury.io/js/react-div-100vh)

This is a `100vh` workaround for iOS Safari and other mobile browsers.

## The problem

When web page scroll position is at the very top, some mobile browsers enlarge the upper URL panel and may also cover content with a bottom navigation panel. Then viewport height is reduced, but `100vh` CSS value does not reflect that, it will only become relevant once a user scrolls down. The browser vendors decided it's a good compromise to avoid reflow glitches as user scrolls. More on this issue [here](https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html).

But what if accurate `100vh` value is critical for you? For instance, you may try to mimic a native app in a browser and don't even plan to make the page scrollable, or you have a splash screen with call to action at the bottom.

## The solution

Wrap with `<Div100vh>` component:

```jsx
import Div100vh from "react-div-100vh";

const MyApp = () => <Div100vh>hello</Div100vh>;
```

## The demo

Browse https://react-div-100vh.netlify.com on your phone.

## Compatibility

Requires React and React.DOM versions 16.8.0 and above.

## TypeScript

It's written in TypeScript, the definitions are bundled.

## Additional considerations

Please note that most likely you will want to set `body {margin: 0}` CSS, unless you use some CSS reset that does it for you.

## Testing

Tested on <a href="https://www.browserstack.com"><img title="BrowserStack Logo" alt="BrowserStack Logo" height="40" src="readme/browserstack.svg"></a>
