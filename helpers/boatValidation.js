const {ArrivePort, DepartPort, Boat, Captain, Plan, User} = require(`../models`)

function boatValidation(boatId) {

    let error


   

    return Boat.findByPk(boatId)

    .then (data => {
        console.log(`=================================================`);
        // console.log(data);
       
        if(data.PlanId) error = `validasi boat gagal`

        return error

    })



    

    


    
}

module.exports = boatValidation