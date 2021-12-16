class ControllerMain {

  static landing(req, res) {
    res.render(`landingPage`)
  }
  static loginAdmin(req, res) {
    res.send(req.body)
  }
  static loginUser(req, res) {
    res.send(req.body)
  }

}

module.exports = ControllerMain