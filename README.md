# A draft pod generator for magic the gathering

## Goal
With eight players playing multiple drafts against each other avoid players having to sit next to the same player multiple times.

## How to use
Modify `resources/drafts.js` to label your drafts
Modify `resources/players.js` to label your players. Notice that name is used as ids.

```
git clone [this repo]
npm install
npm start
```

Will generate random seatings on page load. Refresh page to generate new pods.

## Caveats
Seating order is brute forced by generating random pods. While be inefficient and not completely reliable with large amount of drafts pods.

## Additional

Built on top of https://github.com/gaearon/react-transform-boilerplate.git
