class ControllerAdmin {

    static addPlan(req, res) {
        res.render(`addPlan`)

    }

    static postAddPlan(req, res) {
        res.send(req.body)
    }
}

module.exports = ControllerAdmin