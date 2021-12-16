const {ArrivePort, DepartPort, Boat, Captain, Plan, User} = require(`../models`)

class ControllerAdmin {

    static addPlan(req, res) {
        let portData
        let captainData
        let boatData
        ArrivePort.findAll()
        .then(data => {
            portData = data
            return Captain.findAll()
        })
        .then(data => {
            captainData = data
            return Boat.findAll() 
        })
        .then(data => {
            boatData = data
            res.render(`addPlan`, {portData, captainData, boatData})
        })
        // res.render(`addPlan`)

    }

    static postAddPlan(req, res) {
        res.send(req.body)
    }
}

module.exports = ControllerAdmin