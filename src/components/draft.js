import React from 'react'
import Players from './Players'

export default ({name, seatings}) => {
  return (
    <div>
      <div><br/></div>
      <div>### {name}</div>
      <Players players={seatings} subheading={true} />
    </div>
  )
}
