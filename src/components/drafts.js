// import _ from 'lodash'
import React from 'react'
import getDraftPods from '../services/get_draft_pods'
import drafts from '../resources/drafts'
import Draft from './draft'

export default ({players}) => {
  var {pods, success} =  getDraftPods(drafts, players)

  return (
    <div>
      <div>## Draft Pods</div>
      <div>seatings generation {success ? 'successful' : 'unsuccessful'}</div>
      <div>{pods.map((d) => {
        return <Draft key={d.name} {...d} />
      })}</div>
    </div>
  )
}
