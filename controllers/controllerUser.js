const { ArrivePort, DepartPort, Boat, Captain, Plan, User } = require(`../models`)
const sequelize = require('sequelize');
const dateFormat = require('../helpers/dateFormat')
const bcrypt = require('bcryptjs');
const arrivalHelp = require('../helpers/arrivalHelp')
const { Op } = require(`sequelize`)
const moneyFormat = require('../helpers/moneyFormat')

class ControllerUser {

  static list(req, res) {
    let user
    let allData
    let tampung
    let order
    // console.log(req.query);
    let { sort } = req.query

    if(sort === `earlyDate`) order = [['departDate', 'DESC']]
    if(sort === `LatestDate`) order = [['departDate']]
    if(sort === `cheapestPrice`) order = [['totalPrice']]
    if(sort === `expensive`) order = [['totalPrice', 'DESC']]

    Plan.findAll({
      include: {
        model: User
      }, order


    })
      .then(data => {
        allData = data
        return User.findByPk(req.session.userId)
      })

      .then(data => {

        user = data

        return ArrivePort.findAll({ include: Plan })
      })


      .then(data => {
        tampung = arrivalHelp(data)
        // if (search) return Plan.findAll({ include: [Boat, DepartPort], where })
        return Plan.findAll({ include: [Boat, DepartPort] })

      })

      .then(data => {
        // console.log(data);
        // res.send(allData);
        res.render('userHome', { data: allData, user, dateFormat, tampung, dataBoatDepart: data, moneyFormat })

      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static register(req, res) {
    res.render('register')
  }

  static registerpost(req, res) {
    const { fullName, nik, username, email, password } = req.body;
    console.log(fullName, nik, username, email, password);
    User.create({ fullName, nik, username, email, password })
      .then(data => {
        res.redirect('/')
      })

  }

  static login(req, res) {
    res.render('login')
  }

  static loginPost(req, res) {
    const { username, password } = req.body

    User.findOne({ where: { username } })
      .then(user => {
        if (user) {
          const isValidPass = bcrypt.compareSync(password, user.password)
          if (isValidPass) {
            if (user.isAdmin == true) {
              res.redirect('/admin')
            } else {
              req.session.userId = user.id
              res.redirect('/user')
            }
          } else {
            res.redirect('/')
          }
        }
      })
      .catch(err => {
        res.send(err)
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

  static buyTicket(req, res) {
    User.update({ PlanId: req.params.planId }, {
      where: {
        id: req.session.userId
      }
    })
      .then(data => {
        res.redirect('/user')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static cancelTicket(req, res) {
    User.update({ PlanId: null }, {
      where: {
        id: req.session.userId
      }
    })
      .then(data => {
        res.redirect('/user')
      })
      .catch(err => {
        res.send(err)
      })
  }

}

module.exports = ControllerUser;