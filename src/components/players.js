import React from 'react'
import Player from './player'

export default ({players, subheading}) => {
  return (
    <div>
      <div>{subheading ? '####' : '##'} Players</div>
      <div>{players.map((p) => {return <Player key={p.name} {...p} subheading={subheading} /> })}</div>
    </div>
  )
}
