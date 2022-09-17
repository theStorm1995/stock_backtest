import React from "react";
import { useState, useEffect } from "react";
import * as trendFollowing from "./BacktestingCalculation/BackTestingTrendFollowing";
import { fetchChart } from "../../actions/object";
import { Typography } from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import * as mean from "./BacktestingCalculation/BacktestingMeanReversion";


const BackTestingInfo = ({ symbol }) => {
  const [data, setData] = useState(null);
  const [data1y, setData1y] = useState(null)
  const [option, setOption] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const Bdata1mo = await fetchChart(symbol, "1mo", "1d");
      setData(Bdata1mo);
      const Bdata1y = await fetchChart(symbol, '1y', '1d')
      setData1y(Bdata1y)
    }
    fetchData();
  }, [symbol]);

  if (!data) return null;
  if (!data1y) return null


  const RenderStrategies = () => {
    if(option === 1)
    {
      const annualizedReturn1y = trendFollowing
      .annualizedReturn(data1y.close)
      .toLocaleString('en-US', {maximumFractionDigits:0})
      const annualizedVolatility = trendFollowing
      .calculateAnnualizedVolatility(data.close)
      .toLocaleString('en-US', {maximumFractionDigits:0})
      const winLossRatio = trendFollowing
      .winLossRatio(data1y.close) 
      const percentProfitablility = trendFollowing
      .percentProfitablility(data1y.close)
        return (
        <div>
          <Typography>
            <b>Annualized Balance 1 year:</b> ${annualizedReturn1y}
          </Typography>
          <Typography>
            <b>Annualized Volatility 1 year:</b> {annualizedVolatility}%
          </Typography>
          <Typography>
            <b>Percent Profitablility</b>: {(percentProfitablility * 100).toFixed(2)}%
          </Typography>
          <Typography>
            <b>Win/Loss Ratio</b>: {winLossRatio.toFixed(2)}
          </Typography>
          <Typography>
            <b>Max Drawdown</b>: NaN
          </Typography>
          <Typography>
            <b>Sharpe Ratio</b>: NaN
          </Typography>
        </div>
      )
    }
    else
    {
      const a1y = mean.annualizedReturn(data1y.close).toLocaleString('en-US', {maximumFractionDigits:0})
      return (
        <div>
          <Typography>
            <b>Annualized Return 1 year:</b> ${a1y}
          </Typography>
        </div>
        )}
  }
  
  return (
    <div style={{ marginTop: "55px" }}>
      <FormControl style={{minWidth: '180px'}}>
        <InputLabel id="demo-simple-select-label">Backtesting Strategies</InputLabel>
          <Select
              value={option}
              label="Time"
              onChange={(e) => {setOption(e.target.value)}}>
          <MenuItem value={1}>Trend Following</MenuItem>
          <MenuItem value={2}>Mean Reversion</MenuItem>
        </Select>
      </FormControl><br/><br/>
      <RenderStrategies/>
    </div>
  );
};

export default BackTestingInfo;
