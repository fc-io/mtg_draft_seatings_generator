import React from 'react'
import getDraftPods from '../services/get_draft_pods'
import drafts from '../resources/drafts'
import Draft from './draft'

export default ({players}) => {
  var draftPods =  getDraftPods(drafts, players)

  return (
    <div>
      <div>## Draft Pods</div>
      <div>{draftPods.map((d) => {
        return <Draft key={d.name} {...d} />
      })}</div>
    </div>
  )
}
