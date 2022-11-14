import React from 'react'
import Select from '@mui/material/Select'
import { pairs } from './pairs'
import { FormControl, InputLabel, MenuItem } from '@mui/material'

const Dropdown = ({ handleChange, value }) => {
  return (
    <FormControl className="dropdow--parent">
      <InputLabel id="pair-select">{value}</InputLabel>
      <Select
        labelId="pair-select"
        id="pair-select"
        value={value}
        label="Pair"
        onChange={handleChange}>
        {pairs.map(pair => (
          <MenuItem value={pair}>{pair}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Dropdown
