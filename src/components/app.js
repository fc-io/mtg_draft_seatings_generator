import React, {Component} from 'react'
import players from '../resources/players'
import Players from './Players'
import Drafts from './Drafts'

export class App extends Component {
  render() {
    return (
      <div>
        <div># Draft pod generator for Magic: The Gathering</div>
        <a href="https://github.com/fc-io/mtg_draft_seatings_generator">For instructions</a>
        <div><br/></div>
        <Players players={players} />
        <div><br/></div>
        <Drafts players={players} />
      </div>
    )
  }
}
