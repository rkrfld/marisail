'use strict';
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data/boats.JSON'))
// console.log(data);
let fixData = data.map(el => {
  return {
    name: el.name,
    type: el.type,
    maxPassenger: el.maxPassenger,
    basePrice: el.basePrice,
    status: el.status,
    PlanId: 2,
    CaptainId: 1
  }
})


module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Boats', fixData, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Boats', null, {})
  }
};
