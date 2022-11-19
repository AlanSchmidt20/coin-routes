import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const CoinChart = ({ coin }) => {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    const subscribe = {
      type: "subscribe",
      product_ids: [coin],
      channels: ["level2"],
    };
    const ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      response?.changes?.map((change) =>
        setPriceData([
          ...priceData,
          { [change[0]]: change[1], size: change[2] },
        ])
      );
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [priceData]);

  useEffect(() => {
    setPriceData([]);
  }, [coin]);

  return (
    <LineChart
      width={650}
      height={400}
      data={priceData}
      margin={{
        top: 15,
        right: 30,
        left: 80,
        bottom: 5,
      }}
    >
      <XAxis domain={["dataMin", "dataMax"]} />
      <YAxis type="number" domain={["dataMin", "dataMax"]} />
      <Tooltip />
      <Legend />
      <Line
        dot={false}
        connectNulls
        type="monotone"
        dataKey="buy"
        stroke="green"
      />
      <Line
        dot={false}
        connectNulls
        type="monotone"
        dataKey="sell"
        stroke="red"
      />
    </LineChart>
  );
};

export default CoinChart;
