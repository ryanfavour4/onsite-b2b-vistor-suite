import React from 'react'
import { useState } from 'react'
import './toggleSwitch.css'

const ToggleSwitch = ({ handleSwitch, isChecked }) => {
  const [checked, setChecked] = useState(isChecked)

  // console.log(checked, 'checked')

  const handleChange = async (e) => {
    setChecked(e.target.checked)
    await handleSwitch(e.target.checked);
  }

  return (
    <label className="switch block">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={checked}
      />
      <span className="slider round" />
    </label>
  )
}

export default ToggleSwitch