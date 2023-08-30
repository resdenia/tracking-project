const axios = require('axios');

exports.postData = async (req, res, next) => {
    try {
        if (!req.body.meta) {
            req.body['meta'] = { description: 'no meta' };
        }
        req.body.meta = JSON.stringify(req.body.meta);

        await axios.post(
            `${process.env.API}/events`,
            {
                ...req.body,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                },
            },
        );
        res.send(200);
        next();
    } catch (e) {
        // console.log(e);
        next(e);
    }
};
