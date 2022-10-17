
const { User } = require('../models');

const userData = [
    {
        username: 'JimJones221',
        email: 'jimjones@gmail.com',
        password: 'jimjones',
    },
    {
        username: 'SteveMiller5566',
        email: 'stevemiller@gmail.com',
        password: 'stevemiller',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;