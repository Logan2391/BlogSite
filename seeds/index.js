// paths linking to the specific seed files
const seedPosts = require('./post-seeds.js');
const seedUsers = require('./user-seeds');

// require sequelize
const sequelize = require('../config/connection');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');
};

seedAll();