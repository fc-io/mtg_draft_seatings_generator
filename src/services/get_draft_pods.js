import _ from 'lodash'

const getShuffledPlayers = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const getRandomSeatings = (players) => {
  return getShuffledPlayers(_.cloneDeep(players))
}

const getLeftPlayerIndex = (playerIndex, seatings) => {
  return playerIndex === 0 ? seatings.length - 1 : playerIndex - 1
}

const getRightPlayerIndex = (playerIndex, seatings) => {
  return playerIndex + 1 === seatings.length ? 0 : playerIndex + 1
}

const getPlayer = (seatings, index) => {
  return seatings[index].name
}

const addRelationCount = (p, name, position) => {
  if (!p.relations[name]) {
    p.relations[name] = {'left': 0, 'right': 0}
  }

  p.relations[name][position] += 1
}

const setSeatingRelations = (players, seatings) => {
  players.forEach((p) => {
    var playerIndex = seatings.findIndex((seating) => {
      return seating.name === p.name
    })

    var leftPlayerIndex = getLeftPlayerIndex(playerIndex, seatings)

    var leftPlayer = getPlayer(seatings, leftPlayerIndex)

    var rightPlayerIndex = getRightPlayerIndex(playerIndex, seatings)
    var rightPlayer = getPlayer(seatings, rightPlayerIndex)

    addRelationCount(p, leftPlayer, 'left')
    addRelationCount(p, rightPlayer, 'right')
  })
}

const getHighestRelationshipMargin = (players) => {
  let leftLowest
  let leftHighest
  let rightLowest
  let rightHighest

  _.each(players, (p) => {
    _.each(p.relations, (relation) => {
      if (!leftLowest || relation.left < leftLowest) {
        leftLowest = relation.left
      }

      if (!leftHighest || relation.left > leftHighest) {
        leftHighest = relation.left
      }

      if (!rightLowest || relation.right < rightLowest) {
        rightLowest = relation.right
      }

      if (!rightHighest || relation.right > rightHighest) {
        rightHighest = relation.right
      }
    })
  })

  let leftMargin = leftHighest - leftLowest
  let rightMargin = rightHighest - rightLowest

  return leftMargin > rightMargin ? leftMargin : rightMargin
}

const getSeatings = (players) => {
  let tries = 0
  let seatings
  let playersCopy
  let highestRelationshipMargin

  while ((!highestRelationshipMargin || highestRelationshipMargin > 1) && tries < 100) {
      playersCopy = _.cloneDeep(players)
      seatings = getRandomSeatings(players)
      setSeatingRelations(playersCopy, seatings)
      highestRelationshipMargin = getHighestRelationshipMargin(playersCopy)
      console.log('highestRelationshipMargin', highestRelationshipMargin)
      tries += 1
  }

  return seatings
}

export default (drafts, players) => {
  return drafts.map((d) => {
    const seatings = getSeatings(players)
    console.log('seatings genrated for ', d.name)
    setSeatingRelations(players, seatings)

    return {
      name: d.name,
      seatings
    }
  })
}
