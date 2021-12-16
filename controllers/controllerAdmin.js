const {ArrivePort, DepartPort, Boat, Captain, Plan, User} = require(`../models`)
const distanceCalculator = require(`../helpers/distanceCalculator`)
const priceCalculator = require(`../helpers/priceCalculator`)
const boatValidation = require(`../helpers/boatValidation`)

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
        // res.send(req.body)
        let {departDate, departPort, arrivePort, captain, boat} = req.body
        let duration
        let PlanId
        distanceCalculator(departPort, arrivePort)
        .then (data => {
            duration = data

            return priceCalculator(duration, boat)
        })
        .then (data => {
            
            return Plan.create({departDate, DepartPortId: departPort, ArrivePortId: arrivePort, duration, totalPrice: data })
        })

        .then (data => {
            return boatValidation(boat)
        })

        .then (data => {
            console.log(data);

            if(data) throw [`Kapal telah memiliki jadwal pelayaran lain`]

            return Plan.findAll()
        })
        .then(data => {
            PlanId = data[data.length-1].id;
            Boat.update({CaptainId: captain, PlanId }, {
                where: {
                    id: boat
                }
            })
        })
        .then(data => {
            res.redirect(`/admin`)
        })
        .catch(err => {
            let errors
            // console.log(`======================`);
            // console.log(err.length);
            // console.log(err, '====>');
            if(err.errors) errors = err.errors.map(el => el.message)
            else errors = err
            if(!captain) errors.push(`Captain tidak boleh kosong`)
            if(!boat) errors.push(`Boat tidak boleh kosong`)
            res.send(errors)
        })
    }
}

module.exports = ControllerAdmin