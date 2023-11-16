import React from 'react'

const Error = ({ message }) => {
  return (
    <div style={{ color: "red" }}>Error! {message}</div>
  )
}

export default Error