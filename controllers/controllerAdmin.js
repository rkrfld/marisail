const { ArrivePort, DepartPort, Boat, Captain, Plan, User } = require(`../models`)
const distanceCalculator = require(`../helpers/distanceCalculator`)
const priceCalculator = require(`../helpers/priceCalculator`)
const boatValidation = require(`../helpers/boatValidation`)
const dateFormat = require('../helpers/dateFormat')
const boatLooper = require('../helpers/boatLooper')
const bcrypt = require('bcryptjs');
const arrivalHelp = require('../helpers/arrivalHelp')


class ControllerAdmin {

  static delete(req, res) {
    let { id } = req.params
Plan.findByPk(id, { include: Boat })
    
        .then (data => {
            return Boat.update({
                PlanId: null,
                CaptainId: null
            }, {
                where: {
                    id: data.Boat.id
                }
            })

      .then(data => {
        return Plan.destroy({
          where: {
            id
          }
        })
      })


      .then(data => {
        res.redirect(`/admin`)
      })

      .catch(err => res.send(err))
  }

  static edit(req, res) {
    let { id } = req.params

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

        return Boat.findAll({ where: { PlanId: id }, include: [Plan, Captain] })
      })


      .then(data => {

        res.render(`editPlan`, { data: data[0], portData, captainData, boatData, obj: boatLooper(boatData), dateFormat })
      })

  }

  static postEdit(req, res) {
    let { id } = req.params
    let { departDate, departPort, arrivePort, captain, boat } = req.body

    let duration
    let price


    distanceCalculator(departPort, arrivePort)
      .then(data => {
        duration = data

        return priceCalculator(duration, boat)
      })


      .then(data => {
        price = data
        return boatValidation(boat, true, id)
      })

      .then(data => {

        if (data) throw [`Kapal telah memiliki jadwal pelayaran lain`]


      })

    static list(req, res) {

        let tampung

        ArrivePort.findAll({include: Plan})

        .then (data => {
            tampung = arrivalHelp(data)
            return Plan.findAll({include: [Boat, DepartPort]})

        })
        .then(data => {
            // res.send(data)
          res.render('adminHome', {data, tampung, dateFormat})
        })
        .catch(err => {
          res.send(err)
        })
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

            return Plan.findAll()
            
        })

            
        .then (data => {
            
            
            return Plan.create({departDate, DepartPortId: departPort, ArrivePortId: arrivePort, duration, totalPrice: price })
        })

        .then (data => {return Plan.findAll()})

        .then(data => {
            PlanId = data[data.length-1].id
            console.log(captain, PlanId, boat);
            Boat.update({CaptainId: captain, PlanId }, {
                where: {
                    id: boat
                }
            })
        })
        .then(data => {
            res.redirect(`/admin`)
        })
      })


      .then(data => {
        res.redirect('/admin')
      })

      .catch(err => {
        let errors
        if (err.errors) errors = err.errors.map(el => el.message)
        else errors = err
        if (!captain) errors.push(`Captain tidak boleh kosong`)
        if (!boat) errors.push(`Boat tidak boleh kosong`)
        res.send(err)
      })

  }

  static list(req, res) {
    Plan.findAll()
      .then(data => {
        res.render('adminHome', { data, dateFormat })
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

        res.render(`addPlan`, { portData, captainData, boatData, obj: boatLooper(boatData) })
      })
    // res.render(`addPlan`)

  }

  static postAddPlan(req, res) {
    // res.send(req.body)
    let { departDate, departPort, arrivePort, captain, boat } = req.body
    let duration
    let PlanId
    let price
    distanceCalculator(departPort, arrivePort)
      .then(data => {
        duration = data

        return priceCalculator(duration, boat)
      })

      .then(data => {
        price = data

        return boatValidation(boat)
      })

      .then(data => {

        if (data) throw [`Kapal telah memiliki jadwal pelayaran lain`]

        return Plan.findAll()
      })
      .then(data => {
        PlanId = data[data.length - 1].id

        return Plan.create({ departDate, DepartPortId: departPort, ArrivePortId: arrivePort, duration, totalPrice: price })
      })

      .then(data => {
        Boat.update({ CaptainId: captain, PlanId }, {
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
        if (err.errors) errors = err.errors.map(el => el.message)
        else errors = err
        if (!captain) errors.push(`Captain tidak boleh kosong`)
        if (!boat) errors.push(`Boat tidak boleh kosong`)
        res.send(errors)
      })
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else {
        res.redirect('/')
      }
    })
  }


}

module.exports = ControllerAdmin