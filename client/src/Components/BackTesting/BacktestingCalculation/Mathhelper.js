export const avgPrice = (data) => {
    let avg = 0
      data.map((n) => {
        avg += n
        return n
      })
      return avg /= data.length
  }
  
export const stdev = (data) => {
    let avg = avgPrice(data)
    let variance = 0.0
      for(let i = 0; i < data.length; i++)
      {
        variance += (data[i] - avg) ** 2
      }
      variance /= data.length - 1
      return Math.sqrt(variance)
}