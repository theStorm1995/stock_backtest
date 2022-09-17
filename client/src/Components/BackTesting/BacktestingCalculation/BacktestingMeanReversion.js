import * as math from './Mathhelper'

// @param
// data -> array of closing prices

//let win = 0
//let loss = 0
export const annualizedReturn = (data) => {

    let balance = 1000000
    let shares = 0
    let stdDev = math.stdev(data)
    let avg = math.avgPrice(data)
    const oneAbove = avg + stdDev
    const oneBelow = avg - stdDev 

    for(let i = 0; i < data.length; i++)
    {
      // Trigger Buy
      if(shares === 0 && data[i] < oneBelow)
      {
        shares = balance / data[i]
        balance = 0
      }

      // Trigger Sell
      else if(shares > 0 && data[i] > oneAbove)
      {
        balance = shares * data[i]
        shares = 0
      }
    }

    if(shares > 0)
        return data[data.length - 1] * shares

      return balance
}

export const annualizedVolatility = (data) => {

}

export const percentProfitablility = (data) => {

}

export const winLossRatio = (data) => {

}


  