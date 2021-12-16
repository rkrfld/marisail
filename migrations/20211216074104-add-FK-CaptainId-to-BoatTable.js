'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn('Boats', 'CaptainId', { 
      type: Sequelize.INTEGER,
      references: {
        model: {
        tableName: `Captains`,
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
     * await queryInterface.dropTable('Boats');
     */
     return queryInterface.removeColumn('Boats', 'CaptainId')
  }
};
