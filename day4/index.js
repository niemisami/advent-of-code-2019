/**
 *  Find Venus fuel depot password which matches the criterion:
 * 
 * It is a six-digit number.
 * The value is within the range given in your puzzle input.
 * Two adjacent digits are the same (like 22 in 122345).
 * Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
 * 
 * Step 2 update
 * The two adjacent matching digits are not part of a larger group of matching digits
 */


const start = 256310 
const end = 732736

const isSixDigits = value => value.toString().length === 6
const isBetweenRange = value => start <= value && value <= end
const hasTwoAdjacentDigits = value => {
  const digits = value.toString().split('')
  let index = 0
  let adjacents = []
  // Top notch double while looping action!
  // Save the count of adjacent instances to an array
  while(index < digits.length) {
    let subIndex = 1
    while(digits[index] === digits[index + subIndex]) {
      adjacents[index] = (adjacents[index] || 0) + 1
      subIndex++
    }
    index += subIndex
  }
  // Input is valid if at least one input has exactly one duplicate value
  return adjacents.some(value => value === 1)
}
const neverDecreases = value => {
  const digits = value.toString().split('')
  return digits.every(
    (digit, index) => (digits[index - 1] || 0) <= digit
  )
}

const criterion = [
  isSixDigits,
  isBetweenRange,
  neverDecreases,
  hasTwoAdjacentDigits
]

const matchesCriterion = value =>
  criterion.every(matchCriteria => matchCriteria(value))

// Tests step 1
// NOTE: remember to lower the range start
// const input1 = 111111 // match
// const input2 = 223450
// const input3 = 123789

// Tests step 2
// const input1 = 112233 // match
// const input2 = 123444
// const input3 = 111122 // match

// const testResult = matchesCriterion(input3)
// console.log(testResult)


const matches = []
let input = start
while(input <= end) {
  if(matchesCriterion(input)) {
    matches.push(input)
  }
  input++
}

console.log('Password matches', matches.length)