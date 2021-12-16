const {ArrivePort, DepartPort, Boat, Captain, Plan, User} = require(`../models`)
const distanceCalculator = require(`../helpers/distanceCalculator`)
const priceCalculator = require(`../helpers/priceCalculator`)

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
        let {departDate, departPort, arrivePort, captain, boat} = req.body
        let duration
        distanceCalculator(departPort, arrivePort)
        .then (data => {
            duration = data
            return Plan.create({departDate, DepartPortId: departPort, ArrivePortId: arrivePort, duration })
        })
        .then(data => {
            Boat.update({CaptainId: captain}, {
                where: {
                    id: boat
                }
            })
        })
    }
}

module.exports = ControllerAdmin