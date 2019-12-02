const masses = require('./masses')

const fuelCounterUpper = mass => {
  const fuelRequired = Math.floor(mass / 3) - 2
  return fuelRequired > 0
    ? fuelRequired + fuelCounterUpper(fuelRequired)
    : 0
}

const requiredFuel = masses.reduce((requiredFuel, mass) => {
    const fuelMass = fuelCounterUpper(mass)
    return requiredFuel + fuelMass
  }, 0)

console.log('Required fuel for the mission:', requiredFuel)

// Or even shorter...
let fM=m=>(f=Math.floor(m/3)-2,f>0?f+fM(f):0)
let fT=masses.reduce((acc,m)=>acc+fM(m),0)
console.log('Total fuel golfing:', fT)