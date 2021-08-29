import React, { FunctionComponent } from 'react'
import { Clock } from '../components/clock'
import { DayPlanOverview } from './DayPlanOverview'

export const Dashboard: FunctionComponent = () => {
  return (
    <div className={'container-fluid'}>
      <div className={'row'}>
        <div className={'col-3'}>
          <Clock />
        </div>
        <div className={'col-4'}>
          <DayPlanOverview />
        </div>
      </div>
    </div>
  )
}
