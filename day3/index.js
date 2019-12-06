const fs = require('fs')
const inputFile = 'input.txt'

const wires = fs.readFileSync(`${__dirname}/${inputFile}`, 'utf-8')
  .split(/\r?\n/).map(line => line.split(','))


// Test inputs
const wire1_1 = ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72']
const wire1_2 = ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'] //distance 159

const wire2_1 = ['R98', 'U47', 'R26', 'D63', 'R33', 'U87', 'L62', 'D20', 'R33', 'U53', 'R51']
const wire2_2 = ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'] // = distance 135

// step 1 Convert directions into points
// step 2 Find the same points
// step 3 Calculate Manhattan distance

// It doesn't matter on which point the two wires starts from
// Therefore use the 0,0

const directionMap = {
  U: (previousPoint, length) => ({ x: previousPoint.x, y: previousPoint.y + length }),
  R: (previousPoint, length) => ({ x: previousPoint.x + length, y: previousPoint.y }),
  D: (previousPoint, length) => ({ x: previousPoint.x, y: previousPoint.y - length }),
  L: (previousPoint, length) => ({ x: previousPoint.x - length, y: previousPoint.y }),
}

const calculateCoordinates = (previousPoint, direction, length) => directionMap[direction](previousPoint, length)


const initialPoint = { x: 0, y: 0 }

const directionsToIndividualPoints = directionArray => directionArray.reduce((acc, path) => {
  const direction = path[0]
  const length = Number(path.slice(1))
  const increment = 1
  // Convert each direction to individual points and store in an array
  Array(length).fill(0).forEach((_) => {
    const previousPoint = acc[acc.length - 1] || initialPoint
    const coordinates = calculateCoordinates(previousPoint, direction, increment)
    acc.push(coordinates)
  })
  return acc
}, [])

const manhattanDistance = (pointA = initialPoint, pointB = initialPoint) =>
  Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)

const wireA = directionsToIndividualPoints(wires[0])
const wireB = directionsToIndividualPoints(wires[1])

const junctionPoints = wireA.filter(pointA => wireB.find(pointB => pointA.x === pointB.x && pointA.y === pointB.y))

console.log('Cross junctions', junctionPoints)
const shortestManhattanDistance = junctionPoints.reduce((lastDistance, point) => {
  const distance = manhattanDistance(initialPoint, point)
  return lastDistance > distance ? distance : lastDistance
}, Number.MAX_SAFE_INTEGER)
console.log('Shortest distance', shortestManhattanDistance)