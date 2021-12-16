const { ArrivePort, DepartPort, Boat, Captain, Plan, User } = require(`../models`)

function boatValidation(boatId, check = false, id) {

    let error

    // console.log(check);

    if (check) {
        return Plan.findOne({ where: { id: id }, include: Boat })

            .then(data => {

                if (data.Boat.id !== Number(boatId)) {
                    return Boat.findByPk(boatId)

                        

                }
            })

            .then(data => {
                console.log(`=================================================`);
                console.log(data);

                if (data) {
                    if (data.PlanId)error = `validasi boat gagal`
                }


                return error

            })

    } else {

        return Boat.findByPk(boatId)

            .then(data => {
                console.log(`=========================sss========================`);
                // console.log(data);

                if (data.PlanId) error = `validasi boat gagal`

                return error

            })
    }


}

module.exports = boatValidation