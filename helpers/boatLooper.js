function boatLooper(boat) {
    let obj = {}
    boat.forEach(el => {
        if(!obj[el.CaptainId]) obj[el.CaptainId] = el.CaptainId
        
    });

    return obj
  }
  
  module.exports = boatLooper;