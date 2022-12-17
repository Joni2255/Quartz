import Sequelize from 'sequelize'

export default new Sequelize('app_panel', 'postgres', '1234', {
    host: 'localhost', 
    dialect: 'postgres',
    port: '5432',
    logging: false
})