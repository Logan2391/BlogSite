const router = require('express').Router();

const postroutes = require('./postRoutes')
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);
router.use('/post', postroutes);



module.exports = router;