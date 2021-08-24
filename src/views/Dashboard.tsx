import React, { FunctionComponent, useEffect } from 'react'
import { Clock } from '../components/clock'

export const Dashboard: FunctionComponent = () => {
  return (
    <>
      <div className={'card card-item'}>
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            <Clock />
          </p>
        </div>
      </div>
    </>
  )
}
