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
  return getShuffledPlayers(players)
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
  let highestMarginAmongstPLayers = 0

  _.each(players, (p) => {
    let leftLowest
    let leftHighest
    let rightLowest
    let rightHighest

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

    let leftMargin = leftHighest - leftLowest
    let rightMargin = rightHighest - rightLowest
    let highestMargin = leftMargin > rightMargin ? leftMargin : rightMargin

    if (highestMargin > highestMarginAmongstPLayers) {
      highestMarginAmongstPLayers = highestMargin
    }
  })

  return highestMarginAmongstPLayers
}

const getLowestAmongstSortedSeatings = (sortedSeatings) => {
  var lowestRelationshipMargin = _.first(_.sortBy(_.keys(sortedSeatings)))
  return sortedSeatings[lowestRelationshipMargin]
}

const hasReachedTryLimit = (tries) => {
  return tries > 99
}

const getSeatings = (players) => {
  let tries = 0
  let sortedSeatings = {}
  let seatings
  let playersCopy
  let highestRelationshipMargin

  while ((!highestRelationshipMargin || highestRelationshipMargin > 1) && !hasReachedTryLimit(tries)) {
      playersCopy = _.cloneDeep(players)
      seatings = getRandomSeatings(playersCopy)
      setSeatingRelations(playersCopy, seatings)
      highestRelationshipMargin = getHighestRelationshipMargin(playersCopy)
      // console.log('highestRelationshipMargin', highestRelationshipMargin)
      sortedSeatings[highestRelationshipMargin] = _.cloneDeep(seatings)
      tries += 1
  }

  return {
    seatings: getLowestAmongstSortedSeatings(sortedSeatings),
    success: !hasReachedTryLimit(tries)
  }
}

const hasReachedPodTryLimit = (tries) => {
  return tries > 9
}

export default (drafts, players) => {
  let tries = 0
  let success = false
  let pods

  while (!success && !hasReachedPodTryLimit(tries)) {
    const playersCopy = _.cloneDeep(players)

    pods = drafts.map((d) => {
      const seatings = getSeatings(playersCopy)
      setSeatingRelations(playersCopy, seatings.seatings)

      return {
        name: d.name,
        seatings: seatings.seatings,
        success: seatings.success
      }
    })

    if (_.every(pods, (p) => {return p.success})) {
      success = true

      _.each(pods, (p) => {
        setSeatingRelations(players, p.seatings)
      })
    }

    tries += 1
  }

  return {
    pods,
    success
  }
}
