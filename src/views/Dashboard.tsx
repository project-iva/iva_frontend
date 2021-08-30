import React, { FunctionComponent } from 'react'
import { Clock } from '../components/clock'
import { DayPlanView } from '../components/day_plan/dayPlanView'
import { DayGoalsView } from '../components/day_goals/dayGoalsView'
import { CaloriesGoalView } from '../components/calories_goal/caloriesGoalView'

export const Dashboard: FunctionComponent = () => {
  return (
    <div className={'container-fluid'}>
      <div className={'row'}>
        <div className={'col-2'}>
          <Clock />
          <br />
          <CaloriesGoalView />
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
