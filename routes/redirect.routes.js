const {Router} = require('express'),
    router = Router(),
    Link = require('../models/Link');

router.get('/:code', async (req,res) => {
    try {
        const link = await Link.findOne({ code : req.params.code });

        if (link) {
            link.clicks++;
            await link.save();
            return res.redirect(link.from);
        }

        res.status(404).json('LINK NOT FOUND');

    } catch (e) {
        console.log(e.message);
        res.status(500).json({message: 'SOMETHING WRONG, TRY AGAIN'});
    }
});

module.exports = router;