const Sequelize = require('sequelize')

// Create a new instance of Sequelize with a connection string
// postgres://user:password@domain:port/dbname
const con = new Sequelize(`
  postgres://@localhost:5433/students
  `)

// Establish a connection to the server
con.authenticate().then(() => {
  console.log('Connected!')
}).catch(err => {
  console.error('Connection failed: ', err)
})

// Define schema for storing a User model
const User = con.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING}
})

// Sync schema to db (like rails db:migrate)
User.sync( {force: true }).then(() => {
  console.log('Schema created!')
  // Create a new User
  return User.create({
    firstName: 'John',
    lastName: 'Smith'
  })
}).then(() => {
  User.findAll().then(users => {
    console.log(users)
  })
})
