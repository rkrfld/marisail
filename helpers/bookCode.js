function bookCode(user) {
  let bookingCode = [];

  let firstTwo = user.fullName.slice(2)
  bookingCode.push(firstTwo)
  let secondtwoTwo = user.nik.slice(-2)
  bookingCode.push(secondtwoTwo)
  bookingCode.push(user.PlanId)

  return bookingCode.join('')
}

module.exports = bookCode