const {Router} = require('express'),
    config = require('config'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    {check, validationResult} = require('express-validator'),
    User = require('../models/User'),
    router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'WRONG EMAIL').isEmail(),
        check('password', 'WRONG NUMBER OF CHARACTERS')
            .isLength({ min : 6 })
    ],
    async (req, res) => {
        try {
            console.log('Body: ', req.body);
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'WRONG DATA'
                });

            const {email, password} = req.body;

            const candidate = await User.findOne({email}),
                hashedPassword = await bcrypt.hash(password, 12);

            if (candidate)
                return res.status(400).json({message: 'USER IS ALREADY CONSIST'});

            const user = new User({email, password: hashedPassword});

            await user.save();
            res.status(201).json({message: 'USER CREATED'});
        } catch (e) {
            res.status(500).json({message: 'SOMETHING WRONG, TRY AGAIN'});
        }
    });

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'INPUT CORRECT EMAIL').normalizeEmail().isEmail(),
        check('password', 'INPUT PASSWORD').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'WRONG DATA'
                });

            const {email, password} = req.body,
                user = await User.findOne({ email });

            if (!User)
                return res.status(400).json({ message : 'USER NOT FOUND' });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(400).json({ message : 'WRONG PASSWORD' });

            const token = jwt.sign(
                { userID : user.id },
                config.get('jwtSecret'),
                { expiresIn : '1h' }
            );

            res.json({ token, userID : user.id });

        } catch (e) {
            console.log(e.message);
            res.status(500).json({message: 'SOMETHING WRONG, TRY AGAIN'});
        }
    });

module.exports = router;
