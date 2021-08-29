import React, { FunctionComponent } from 'react'
import { Clock } from '../components/clock'
import { DayPlanView } from '../components/day_plan/dayPlanView'
import { DayGoalsView } from '../components/day_goals/dayGoalsView'

export const Dashboard: FunctionComponent = () => {
  return (
    <div className={'container-fluid'}>
      <div className={'row'}>
        <div className={'col-2'}>
          <Clock />
        </div>
        <div className={'col-5'}>
          <DayPlanView />
        </div>
        <div className={'col-5'}>
          <DayGoalsView />
        </div>
      </div>
    </div>
  )
}
