function moneyFormat(params) {

    
    params = params.toString().split('')

    for (let i = ((params.length % 3) - 1); i < params.length; i+=3) {
        if(i !== params.length - 1)params[i] += `.`
        
    }

    return `Rp. ${params.join('')},00`
    
}

module.exports = moneyFormat