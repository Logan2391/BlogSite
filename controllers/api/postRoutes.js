const router = require('express').Router();
const xss = require("xss");
const { Listing, User, Post } = require('../../models');

module.exports = router;

// Create a new post
router.post('/', async (req, res) => {
    try {
        const titleS = req.body.title;
        const contentS = req.body.content;

        const titleX = xss(titleS, {
            whiteList: {},
            stripIgnoreTag: true,
            stripIgnoreTagBody: ["script"],
        });

        const contentX = xss(contentS, {
            whiteList: {},
            stripIgnoreTag: true,
            stripIgnoreTagBody: ["script"],
        });

        const newPost = await Post.create({
            title: titleX,
            content: contentX,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE a post
router.put('/:id', async (req, res) => {
    try {
        const listingData = await Listing.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!listingData[0]) {
            res.status(404).json({ message: "No listing with that ID found!" });
            return;
        }
        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// DELETE a post
router.delete('/:id', async (req, res) => {
    try {
        const userData = await Listing.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!userData) {
            res.status(404).json({ message: 'No listing with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});