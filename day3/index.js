const fs = require('fs')
const inputFile = 'input.txt'

const wires = fs.readFileSync(`${__dirname}/${inputFile}`, 'utf-8')
  .split(/\r?\n/).map(line => line.split(','))

// Test inputs
const wire1_1 = ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72']
const wire1_2 = ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'] //distance 159

const wire2_1 = ['R98', 'U47', 'R26', 'D63', 'R33', 'U87', 'L62', 'D20', 'R33', 'U53', 'R51']
const wire2_2 = ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'] // = distance 135

const directionMap = {
  U: (previousPoint, length) => ({ x: previousPoint.x, y: previousPoint.y + length }),
  R: (previousPoint, length) => ({ x: previousPoint.x + length, y: previousPoint.y }),
  D: (previousPoint, length) => ({ x: previousPoint.x, y: previousPoint.y - length }),
  L: (previousPoint, length) => ({ x: previousPoint.x - length, y: previousPoint.y }),
}

const calculateCoordinates = (previousPoint, direction, length) => directionMap[direction](previousPoint, length)

const isPointBetweenLine = (axis, point, bStart, bEnd) =>
  Math.min(bStart[axis], bEnd[axis]) <= point[axis] && point[axis] <= Math.max(bStart[axis], bEnd[axis])

const getIntersectionPoint = (aStart, aEnd, bStart, bEnd) => {
  if(isPointBetweenLine('y', aStart, bStart, bEnd) && isPointBetweenLine('x', bStart, aStart, aEnd)) {
    return { x: bStart.x, y: aStart.y }
  } else if(isPointBetweenLine('y', bStart, aStart, aEnd) && isPointBetweenLine('x', aStart, bStart, bEnd)) {
    return { x: aStart.x, y: bStart.y }
  }
  return null
}

// // It doesn't matter on which point the two wires starts from
// // Therefore use the 0,0
const initialPoint = { x: 0, y: 0 }
const directionsToPoints = directionArray => directionArray.reduce((acc, path, index) => {
  const previousPoint = acc[index - 1] || initialPoint
  const direction = path[0]
  const length = Number(path.slice(1))
  const coordinates = calculateCoordinates(previousPoint, direction, length)
  acc.push(coordinates)
  return acc
}, [])

const wireA = directionsToPoints(wires[0])
const wireB = directionsToPoints(wires[1])

// Tests
// const wireA = directionsToPoints(wire2_1)
// const wireB = directionsToPoints(wire2_2)

// const aS = { x: 13, y: 100 }
// const aE = { x: 13, y: -100 }

// const bS = { x: 100, y: 20 }
// const bE = { x: -1, y: 20 }
// console.log(getIntersectionPoint(aS, aE, bS, bE))

const intersections = wireA.reduce((intersections, pointA, index) => {
  const previousPoint = wireA[index - 1]
  previousPoint && wireB.forEach((pointB, bIndex) => { // First value is always undefined
    const previousPointB = wireB[bIndex - 1]
    if(previousPointB) {
      const intersection = getIntersectionPoint(previousPoint, pointA, previousPointB, pointB)
      intersection && intersections.push(intersection)
    }
  })
  return intersections
}, [])

const manhattanDistance = (pointA, pointB) =>
  Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)

const shortestManhattanDistance = intersections.reduce((lastDistance, point) => {
  const distance = manhattanDistance(initialPoint, point)
  return lastDistance > distance ? distance : lastDistance
}, Number.MAX_SAFE_INTEGER)
console.log('Shortest distance', shortestManhattanDistance)