const router = require('express').Router();
const { User, Post } = require('../models')
const withAuth = require('../utils/auth');

//Render the homepage with posts
router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }]
    });
    const posts = postData.map((listing) => listing.get({ plain: true }));

    res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
    });
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Render page for the post you choose 
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }]
        });
        const post = postData.get({ plain: true })

        res.render('singlePost', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

//Render edit page
router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }]
        });
        const post = postData.get({ plain: true })

        res.render('editPost', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

//redirect login from withAuth if theyre not logged in 
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

//Signup route
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Add listing route
router.get('/new', (req, res) => {
    res.render('newPost');
});

module.exports = router;
