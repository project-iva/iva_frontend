import React, { FunctionComponent } from 'react'
import { Clock } from '../components/clock'
import { DayPlanView } from '../components/day_plan/dayPlanView'

export const Dashboard: FunctionComponent = () => {
  return (
    <div className={'container-fluid'}>
      <div className={'row'}>
        <div className={'col-3'}>
          <Clock />
        </div>
        <div className={'col-4'}>
          <DayPlanView />
        </div>
      </div>
    </div>
  )
}
