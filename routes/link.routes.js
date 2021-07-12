const {Router} = require('express'),
    config = require('config'),
    shortid = require('shortid'),
    auth = require('../middleware/auth.middleware'),
    router = Router(),
    Link = require('../models/Link');

router.post('/generate', auth, async (req, res) => {
    try {
        const baseURL = config.get('baseURL'),
            {from} = req.body,
            code = shortid.generate(),
            existing = await Link.findOne({ from });

        if (existing) {
            return res.json({ link : existing });
        }
        const to = baseURL + '/t/' + code,
            link = new Link({
                code, to, from, owner : req.user.userID
            });
        await link.save();
        res.status(201).json({ link });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({message: 'SOMETHING WRONG, TRY AGAIN'});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner : req.user.userID });
        res.json(links);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({message: 'SOMETHING WRONG, TRY AGAIN'});
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({message: 'SOMETHING WRONG, TRY AGAIN'});
    }
});

module.exports = router;