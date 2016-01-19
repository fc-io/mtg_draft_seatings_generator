import React from 'react'

// min: inclusive, max: exclusive
var getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

var getNick = (nicks) => {
  return nicks[getRandomInt(0, nicks.length)]
}
export default ({nicks}) => {
  return (
    <div>{getNick(nicks)}</div>
  )
}
