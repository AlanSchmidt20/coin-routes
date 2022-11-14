import React, { useState, useEffect } from 'react'
import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody } from '@mui/material'
import Paper from '@mui/material/Paper'
import './OrderBook.css'

const OrderBook = ({ coin }) => {
  const [bids, setBids] = useState([])
  const [asks, setAsks] = useState([])

  useEffect(() => {
    const subscribe = {
      type: 'subscribe',
      product_ids: [coin],
      channels: ['level2_batch'],
    }
    const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com')

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe))
    }
    ws.onmessage = event => {
      const response = JSON.parse(event.data)

      response?.changes?.map(change => {
        change[0] === 'buy'
          ? setBids([...bids, { price: change[1], size: change[2] }])
          : setAsks([...asks, { price: change[1], size: change[2] }])
      })
    }
    ws.onclose = () => {
      ws.close()
    }

    return () => {
      ws.close()
    }
  }, [bids, asks])

  useEffect(() => {
    setBids([])
    setAsks([])
  }, [coin])

  return (
    <TableContainer component={Paper} className="table--parent">
      <Table sx={{ minWidth: 400, width: 100 }} aria-label="simple table" className="table--child">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100 }} align="right">
              Price (USD)
            </TableCell>
            <TableCell align="right">Market Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bids.map((bid, index) => {
            return (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ color: 'error.main', width: 100 }} align="right">
                  {bid.price}
                </TableCell>
                <TableCell align="right">{bid.size}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Table sx={{ minWidth: 400, width: 100 }} aria-label="simple table" className="table--child">
        <TableHead>
          <TableRow>
            <TableCell align="right">Price (USD)</TableCell>
            <TableCell align="right">Market Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asks?.map((asks, index) => {
            return (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ color: 'success.main', width: 100 }} align="right">
                  {asks.price}
                </TableCell>
                <TableCell align="right">{asks.size}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderBook
