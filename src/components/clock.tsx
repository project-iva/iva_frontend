import React, { FunctionComponent, useEffect, useState } from 'react'

export const Clock: FunctionComponent = () => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour12: false })
  }

  const [time, setTime] = useState(getCurrentTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className={'card card-item'}>
      <div className="card-body text-center">
        <span className={'display-4 font-weight-bold'}>{time}</span>
      </div>
    </div>
  )
}
