import React, { FunctionComponent } from 'react'
import { Clock } from '../components/clock'

export const Dashboard: FunctionComponent = () => {
  return (
    <>
      <div className={'row'}>
        <div className={'col-3'}>
          <Clock />
        </div>
      </div>
    </>
  )
}
