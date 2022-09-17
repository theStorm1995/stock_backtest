import React, {useEffect, useState} from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { fetchChart } from '../../actions/object'
import CreateChart from './CreateChart'

const Graph = ({symbol}) => {

    const [option, setOption] = useState('')
    const[data, setData] = useState(null)
    const[data6m, setData6m] = useState(null)
    const[data1y, setData1y] = useState(null)

    useEffect(() => {
      async function getData()
      {
        //@param
        // (ticker, range, interval)
        // '1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'
        const data1m = await fetchChart(symbol, "1mo", "1d")
        const data6m = await fetchChart(symbol, "6mo", "1d")
        const data1y = await fetchChart(symbol, "1y", '5d')
        setData(data1m)
        setData6m(data6m)
        setData1y(data1y)

      }
      getData()
    }, [])
    
    const RenderGraph = () => {
      if(option === 6)
        return (<CreateChart data={data6m} symbol={symbol}/>)
      else if(option === 12)
        return (<CreateChart data={data1y} symbol={symbol}/>)
      else  
        return (<CreateChart data={data} symbol={symbol}/>)
    }

  return (
    <div>
        <div>
          <FormControl style={{minWidth: '80px'}}>
            <InputLabel id="demo-simple-select-label">Interval</InputLabel>
              <Select
                value={option}
                label="Time"
                onChange={(e) => {setOption(e.target.value)}}>
              <MenuItem value={1}>1 mo</MenuItem>
              <MenuItem value={6}>6 mo</MenuItem>
              <MenuItem value={12}>1 year</MenuItem>
            </Select>
          </FormControl>
        </div>
        <RenderGraph/>
    </div>
  )
}

export default Graph