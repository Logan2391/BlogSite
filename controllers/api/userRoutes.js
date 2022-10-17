const router = require('express').Router();
const xss = require("xss");
const { User, Post } = require('../../models');

//Create new user
router.post('/', async (req, res) => {
  try {
    const nameS = req.body.username;
    const passwordS = req.body.password;
    const emailS = req.body.email;

    const nameX = xss(nameS, {
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ["script"],
  });

    const passwordX = xss(passwordS, {
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ["script"],
  });

    const emailX = xss(emailS, {
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ["script"],
  });

  
    const userData = await User.create({
      username: nameX,
      password: passwordX,
      email: emailX,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Existing user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;