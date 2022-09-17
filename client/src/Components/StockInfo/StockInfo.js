import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import useStyles from "./styles";

const StockInfo = ({ data }) => {
  const percentChange = data.percentChange
  const prevChange = data.prevChange
  const marketPrice = data.marketPrice


  return (
    <div>
      {/* display stock prices and changes */}
      {percentChange &&
        <div style={{ display: "flex" }}>
        <Typography style={{ fontSize: "25px" }}>
          <b>{marketPrice}</b>
        </Typography>
        <div style={{ display: "flex", marginTop: "5px" }}>
          {/* conditional rendering green or red for negative changes and positive changes */}
          {prevChange > 0 ? (
            <Typography style={{ fontSize: "20px", color: "#008000" }}>
              &nbsp;+{prevChange.toFixed(2)}
            </Typography>
          ) : (
            <Typography color="secondary" style={{ fontSize: "20px" }}>
              &nbsp;{prevChange.toFixed(2)}
            </Typography>
          )}
          {percentChange > 0 ? (
            <Typography style={{ fontSize: "20px", color: "#008000" }}>
              &nbsp;(+{percentChange.toFixed(2)}%)
            </Typography>
          ) : (
            <Typography color="secondary" style={{ fontSize: "20px" }}>
              &nbsp;({percentChange.toFixed(2)}%)
            </Typography>
          )}
        </div>
      </div>}
      <br />

      {/* display info */}
      <Typography>
        <b>Symbol: </b>
        {data.symbol}
      </Typography>
      <Typography>
        <b>Open: </b>${data.open}
      </Typography>
      <Typography>
        <b>Close: </b>${data.close}
      </Typography>
      <Typography>
        <b>Ask: </b>${data.ask}
      </Typography>
      <Typography>
        <b>Bid: </b>${data.bid}
      </Typography>
      <Typography>
        <b>Volume: </b>
        {data.volume}
      </Typography>
      <Typography>
        <b>PE ratio: </b>
        {data.pe}
      </Typography>
      <Typography>
        <b>EPS: </b>
        {data.eps}
      </Typography>
    </div>
  );
};

export default StockInfo;
