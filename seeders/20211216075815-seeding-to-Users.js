'use strict';
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data/users.JSON'))
// console.log(data);
let fixData = data.map(el => {
  return {
    username: el.username,
    fullName: el.fulllName,
    nik: el.nik,
    email: el.email,
    password: el.password,
    isAdmin: false,
    bookCode: ``
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
   return queryInterface.bulkInsert('Users', fixData, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {})
  }
};
