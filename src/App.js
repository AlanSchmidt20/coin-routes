import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";
import { Dropdown, OrderBook, CoinChart } from "./components";
import { pairs } from "./components/Dropdown/pairs";

function App() {
  const [coin, setCoin] = useState(pairs[0]);

  const handleChange = (event) => setCoin(event.target.value);

  return (
    <div className="App">
      <div className="App-header">
        <Dropdown handleChange={handleChange} value={coin} />
        <div
          className="wrapper"
          style={{
            /*             display: "flex",
            justifyContent: "space-between",
            width: "100%", */
            backgroundColor: "#282c34",
          }}
        >
          <div>
            <CoinChart coin={coin} />
          </div>
          <div style={{ alignItems: "flex-end" }}>
            <OrderBook coin={coin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
