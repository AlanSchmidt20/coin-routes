import { useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import './App.css'
import { Dropdown, OrderBook } from './components'
import { pairs } from './components/Dropdown/pairs'

function App() {
  const [coin, setCoin] = useState(pairs[0])

  const handleChange = event => setCoin(event.target.value)

  return (
    <div className="App">
      <header className="App-header">
        <Dropdown handleChange={handleChange} value={coin}/>
        <OrderBook coin={coin} />
      </header>
    </div>
  )
}

export default App



