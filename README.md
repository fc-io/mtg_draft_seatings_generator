# Draft pod generator for Magic: The Gathering

## Goal

With eight players playing multiple drafts against each other avoid players having to sit next to the same player multiple times during drafts.

## Demo

## How to use

### In Develop Mode
Modify `resources/drafts.js` to label your drafts
Modify `resources/players.js` to label your players. Notice that name is used as ids.

```
git clone [this repo]
npm install
npm start
```

Will generate random seatings on page load. Refresh page to generate new pods.

### In Production

Make sure it works in develop mode, then use `npm build` to generate a static resource and publish to your remote (I use [gh-pages](https://pages.github.com/)).

## Caveats

Seating order is brute forced by generating random pods. Will be inefficient and not  reliable with large amount of drafts pods.

## Additional

Built on top of https://github.com/gaearon/react-transform-boilerplate.git
