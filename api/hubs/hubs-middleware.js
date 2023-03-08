const Hubs = require('./hubs-model.js');

async function checkHubId(req, res, next) {
    try {
        const { id } = req.params
        const hub = await Hubs.findById(id)
        if (hub) {
            req.hub = hub;
            next()
        } else {
            next({status: 404, message: `Hub ${id} not found`})
        }

    } catch (err) {
        next(err)
    }


}

function checkNewHub(req, res, next) {
    const name = req.body.name;
    if (
        name !== undefined &&
        typeof name === 'string' &&
        name.trim.length) next();
    else {next({status: 400, message: 'Please provide a name for your new hub'})}
}

module.exports = {
    checkHubId,
    checkNewHub,
}