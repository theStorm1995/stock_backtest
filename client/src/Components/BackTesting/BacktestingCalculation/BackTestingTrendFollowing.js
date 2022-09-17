import * as math from './Mathhelper';

// @param
// data -> type: [], array of 1 month closing prices daily
export const calculateAnnualizedVolatility = (data) => {
  const standard = math.stdev(data)
  return (standard * Math.sqrt(252)).toFixed(2);
};

//@param
// day -> for the moving average of 100 days, day >= 100
// data -> 252 closing price type (arr)
// return -> 100 days from idx moving avg
export const average100daysMoving = (day, data) => {
  if(day < 100)
    return 0

  let i = day - 100
  let r = 0.0
  for(;i < day; i++)
  {
    r += data[i]
  }
  return (r /= 100)
}

export const buyStockWithOnemil = (price) => {
  return (1000000 / price)
}

export const sellShares =  (numberOfshares, price) => {
  return price * numberOfshares
}

// @param
// data -> array
// return balance

let win = 0;
let loss = 0;

export const annualizedReturn = (data) => {
  let numberOfShares = 0
  let balance = 1000000
  let prevBalance = balance

  for(let i = 100; i < data.length; i++)
  {
    const avg100 = average100daysMoving(i, data)

    // Trigger buy
    if(numberOfShares === 0 && avg100 <= data[i]) 
    {
      numberOfShares = buyStockWithOnemil(data[i])
      prevBalance = balance
      balance = 0
    }
    // Trigger sell
    else if(numberOfShares > 0 && avg100 > data[i])
    {
      balance = sellShares(numberOfShares, data[i])

      if(balance <= prevBalance)
        loss++  
      
      else
        win++
        
      numberOfShares = 0
    }  
  }

  if(numberOfShares > 0)
    return data[data.length - 1] * numberOfShares

  return balance
  }

export const winLossRatio = (data) => {
  annualizedReturn(data)
  return (win / loss)
}

export const percentProfitablility = (data) => {
  annualizedReturn(data)
  return win / (win + loss)
}

