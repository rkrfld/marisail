'use strict';
const fs = require('fs')
// const data = JSON.parse(fs.readFileSync('./data/captains.JSON'))
// console.log(data);
// let fixData = data.map(el => {
//   return {
//     name: el.name,
//     class: el.class
//   }
// })


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
   return queryInterface.bulkInsert('ArrivePorts', require(`../data/ports.json`), {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('ArrivePorts', null, {})
  }
};
