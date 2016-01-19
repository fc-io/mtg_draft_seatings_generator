import React, {Component} from 'react'
import players from '../resources/players'
import Players from './Players'
import Drafts from './Drafts'

// class Counter extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {counter: 0}
//     this.interval = setInterval(() => this.tick(), 1000)
//   }
//
//   tick() {
//     this.setState({
//       counter: this.state.counter + this.props.increment
//     })
//   }
//
//   componentWillUnmount() {
//     clearInterval(this.interval)
//   }
//
//   render() {
//     return (
//       <h1 style={{color: this.props.color}}>
//         Counter ({this.props.increment}): {this.state.counter}
//       </h1>
//     )
//   }
// }

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
