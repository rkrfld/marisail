function arrivalHelp(data) {
    let obj = {}
    
    data.forEach(el => {
        if(el.Plan) {
            if(!obj[el.Plan.ArrivePortId]) obj[el.Plan.ArrivePortId] = el.city
        }
    })
    return obj
  }
  
  module.exports = arrivalHelp;