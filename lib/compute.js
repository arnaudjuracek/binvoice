const int = require('@utils/number-is-int')
const moment = require('moment')
const round = require('@utils/number-round')
const writtenNumber = require('written-number')

moment.locale('fr')

const n2w = number => writtenNumber(number, { lang: 'fr' })

module.exports = data => {
  // Resolve !calc against sum of previous lines
  let sum = 0
  data.items.forEach(item => {
    if (typeof item.price === 'function') item.price = item.price(sum)
    if (!isNaN(item.price)) sum += item.price
  })

  // Compute total of all items
  const total = round(sum)
  data.total = {
    raw: total,
    human: int(total) && total > 0
      ? `${n2w(total)} euros`
      : (function () {
        let intPart = n2w(Math.abs(Math.floor(total))) + ' euro'
        if (Math.abs(Math.floor(total)) > 1) intPart += 's'
        if (Math.floor(total) < 0) intPart = 'moins ' + intPart

        const flo = round((Math.abs(total) - Math.floor(Math.abs(total))) * 100)
        let floPart = n2w(flo) + ' centime'
        if (flo > 1) floPart += 's'

        return `${intPart} et ${floPart}`
      })()
  }

  // Make sure that every item price is correctly rounded
  data.items.forEach(item => { item.price = round(item.price) })

  // Format date
  data.date = {
    raw: data.date,
    human: moment(data.date).format('D MMMM YYYY')
  }

  return data
}
