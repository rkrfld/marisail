const { ArrivePort, DepartPort, Boat, Captain, Plan, User } = require(`../models`)

function priceCalculator(distance, boatId) {

  let basePrice
  let price

  return Boat.findByPk(boatId)

    .then(data => {
      if (!data) return 0
      else {

        basePrice = data.basePrice;
        price = distance * basePrice

        return price
      }
    })






}

module.exports = priceCalculator