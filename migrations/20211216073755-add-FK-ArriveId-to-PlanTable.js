'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn('Plans', 'ArrivePortId', { 
      type: Sequelize.INTEGER,
      references: {
        model: {
        tableName: `ArrivePorts`,
        key: `id`
        }
          
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Plans');
     */
     return queryInterface.removeColumn('Plans', 'ArrivePortId')
  }
};
