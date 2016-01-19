import React from 'react'

// min: inclusive, max: exclusive
var getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

var getNick = (nicks) => {
  return nicks[getRandomInt(0, nicks.length)]
}

export default ({name, nicks, subheading}) => {
  return (
    <div>
      {subheading ?
        <div>{getNick(nicks)}</div> :
        <div>{name} - {nicks.join(', ')}</div>
      }
    </div>

  )
}
