/**
 *  Find Venus fuel depot password which matches the criterion:
 * 
 * It is a six-digit number.
 * The value is within the range given in your puzzle input.
 * Two adjacent digits are the same (like 22 in 122345).
 * Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
 */


const start = 256310
const end = 732736

const isSixDigits = value => value.toString().length === 6
const isBetweenRange = value => start <= value && value <= end
const hasSomeAdjacentDigits = value => {
  const digits = value.toString().split('')
  return digits.some(
    (digit, index) => digit === digits[index + 1]
  )
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
  hasSomeAdjacentDigits,
  neverDecreases
]

const matchesCriterion = value =>
  criterion.every(matchCriteria => matchCriteria(value))

// Tests
// NOTE: remember to lower the range start
// const input1 = 111111 
// const input2 = 223450
// const input3 = 123789

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