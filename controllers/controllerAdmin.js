const {ArrivePort, DepartPort, Boat, Captain, Plan, User} = require(`../models`)
const distanceCalculator = require(`../helpers/distanceCalculator`)
const priceCalculator = require(`../helpers/priceCalculator`)
const boatValidation = require(`../helpers/boatValidation`)
const dateFormat = require('../helpers/dateFormat')
const boatLooper = require('../helpers/boatLooper')
const arrivalHelp = require('../helpers/arrivalHelp')

class ControllerAdmin {

    static delete(req, res) {
        let {id} = req.params 

        Plan.findByPk(id,{include: Boat})

        .then (data => {
            return Boat.update({
                PlanId: null
            }, {
                where: {
                    id: data.Boat.id
                }
            })

        })

        .then (data => {
            // console.log(id);
            return Plan.destroy({ where: {
                id
            }})
        })


        .then(data => {
            res.redirect(`/admin`)
        })

        .catch(err => res.send(err))
    }

    static edit(req, res) {
        let {id} = req.params

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

            return Boat.findAll({where: {PlanId : id}, include: [Plan,Captain]})
        })


        .then(data => {
            // console.log(data);

            res.render(`editPlan`, {data: data[0], portData, captainData, boatData, obj: boatLooper(boatData), dateFormat})
        })

    }

    static postEdit(req, res) {
        let {id} = req.params
        let {departDate, departPort, arrivePort, captain, boat} = req.body

        let duration
        let price
        let PlanId
        // console.log(departDate);
        

        distanceCalculator(departPort, arrivePort)
        .then (data => {
            duration = data

            return priceCalculator(duration, boat)
            // console.log(price);
        })

        
        .then (data => {
            // console.log(duration);
            price = data
            return boatValidation(boat, true, id)
        })
        
        .then (data => {
            
            if(data) throw [`Kapal telah memiliki jadwal pelayaran lain`]
            
        })

        .then(data => {
            // console.log(new Date(departDate));
            Plan.update({
                departDate, DepartPortId: departPort, ArrivePortId: arrivePort, duration, totalPrice: price,
                arriveDate : new Date(departDate).setDate(new Date(departDate).getDate() + duration)
            }, {
                where: {
                    id
                }
            })

            return Plan.findAll()

        })
        
        .then (data => {
            Boat.update({ PlanId: null }, {
                where: {
                    PlanId: id
                }
            })

        })
        .then(data => {
            // console.log(data, `UUUUUUUUUUUUUU`);
            Boat.update({CaptainId: captain, PlanId: id }, {
                where: {
                    id: boat
                }
            })
        })


        .then(data => {
            res.redirect('/admin')
        })

        .catch(err => {
            let errors
            if(err.errors) errors = err.errors.map(el => el.message)
            else errors = err
            if(!captain) errors.push(`Captain tidak boleh kosong`)
            if(!boat) errors.push(`Boat tidak boleh kosong`)
            console.log(err);
            res.send(err)
        })

    }

    static list(req, res) {

        let tampung

        ArrivePort.findAll({include: Plan})

        .then (data => {
            tampung = arrivalHelp(data)
            return Plan.findAll({include: [Boat, DepartPort]})

        })
        .then(data => {
            console.log(tampung);
          res.render('adminHome', {data, tampung, dateFormat})
        })
        .catch(err => {
          res.send(err)
        })
      }

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
            
            res.render(`addPlan`, {portData, captainData, boatData, obj: boatLooper(boatData)})
        })
        // res.render(`addPlan`)

    }

    static postAddPlan(req, res) {
        // res.send(req.body)
        let {departDate, departPort, arrivePort, captain, boat} = req.body
        let duration
        let PlanId
        let price
        distanceCalculator(departPort, arrivePort)
        .then (data => {
            duration = data

            return priceCalculator(duration, boat)
        })

        .then (data => {
            price = data
            
            return boatValidation(boat)
        })

        .then (data => {

            if(data) throw [`Kapal telah memiliki jadwal pelayaran lain`]

            return Plan.findAll()
        })
        .then (data => {
            PlanId = data[data.length-1].id
            
            return Plan.create({departDate, DepartPortId: departPort, ArrivePortId: arrivePort, duration, totalPrice: price })
        })

        .then(data => {
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
            if(err.errors) errors = err.errors.map(el => el.message)
            else errors = err
            if(!captain) errors.push(`Captain tidak boleh kosong`)
            if(!boat) errors.push(`Boat tidak boleh kosong`)
            res.send(errors)
        })
    }


}

module.exports = ControllerAdmin