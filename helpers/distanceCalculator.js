const { ArrivePort, DepartPort, Boat, Captain, Plan, User } = require(`../models`)

function distanceCalculator(departId, arriveId) {

  let depart
  let arrive
  let distance

  return DepartPort.findByPk(departId)

    .then(data => {

      if (!data) return 0
      else {

        depart = data.distance;

        return ArrivePort.findByPk(arriveId)
      }
    })

    .then(data => {
      if (!data) return 0
      else {

        arrive = data.distance
        distance = Math.abs(arrive - depart)

        return distance
      }
    })





}

module.exports = distanceCalculator