const int = require('@utils/number-is-int')
const moment = require('moment')
const round = require('@utils/number-round')
const writtenNumber = require('written-number')

moment.locale('fr')

const n2w = number => writtenNumber(number, { lang: 'fr' })

module.exports = data => {
  // Compute total of all items
  let total = round(data.items.reduce((total, item) => total + item.price, 0))
  data.total = {
    raw: total,
    human: int(total)
      ? `${n2w(total)} euros`
      : (function () {
        let intPart = n2w(total) + ' euro'
        if (total > 1) intPart += 's'

        const flo = Math.floor((total - Math.floor(total)) * 100)
        let floPart = n2w(flo) + ' centime'
        if (flo > 1) floPart += 's'

        return `${intPart} et ${floPart}`
      })()
  }

  // Make sure that every item price is correctly rounded
  data.items.forEach(item => {
    item.price = round(item.price)
    return item
  })

  // Format date
  data.date = {
    raw: data.date,
    human: moment(data.date).format('D MMMM YYYY')
  }

  return data
}
