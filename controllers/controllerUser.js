const User = require('../models/index').User
const Plan = require('../models/index').Plan
const sequelize = require('sequelize');
const dateFormat = require('../helpers/dateFormat')
const bcrypt = require('bcryptjs');

class ControllerUser {

  static list(req, res) {
    let user
    let allData
    Plan.findAll({
      include: {
        model: User
      }
    })
    .then(data => {
      allData = data
      return User.findByPk(req.session.userId)
    })
    .then(data => {
      res.render('userHome', {data: allData, user: data, dateFormat})
    
    })
    .catch(err => {
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
    
    User.findOne ({where: {username}})
    .then(user => {
      if(user) {
        const isValidPass = bcrypt.compareSync(password, user.password)
        if (isValidPass) {
          if(user.isAdmin == true) {
            res.redirect('/admin')
          } else {
            req.session.userId = user.id
            res.redirect('/user')
          }
        } else {
          res.redirect('/user/login')
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