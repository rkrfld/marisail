const User = require('../models/index').User
const Plan = require('../models/index').Plan
const sequelize = require('sequelize');
const dateFormat = require('../helpers/dateFormat')
const bcrypt = require('bcryptjs');

class ControllerUser {

  static list(req, res) {
    Plan.findAll()
    .then(data => {
      res.render('userHome', {data, dateFormat})
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
    User.create({ fullName, nik, username, email, password })
    .then(data => {
      res.redirect('/user/login')
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
        res.redirect('/user/login')
      }
    })
  }

  

}

module.exports = ControllerUser;