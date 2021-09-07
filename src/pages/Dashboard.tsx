import React, { FunctionComponent, useState } from 'react'
import { Clock } from '../components/clock'
import { DayPlanView } from '../components/day_plan/dayPlanView'
import { DayGoalsView } from '../components/day_goals/dayGoalsView'
import { CaloriesGoalView } from '../components/calories_goal/caloriesGoalView'
import { AssetsView } from '../components/assets/assetsView'
import { BodyMassStatsView } from '../components/bodyMassStatsView'
import { WeekSleepStatsView } from '../components/weekSleepStatsView'
import { WeekMindfulSessionsStatsView } from '../components/weekMindfulSessionsStatsView'

type DashboardProps = {
  caloriesRefresher: number
  bodyMassStatsRefresher: number
  dayPlanRefresher: number
  dayGoalsRefresher: number
  sleepStatsRefresher: number
  mindfulSessionsStatsRefresher: number
}

export const Dashboard: FunctionComponent<DashboardProps> = (props) => {
  return (
    <div className={'container-fluid'}>
      <div className={'row'}>
        <div className={'col-2'}>
          <Clock />
          <br />
          <CaloriesGoalView refresher={props.caloriesRefresher} />
          <br />
          <BodyMassStatsView refresher={props.bodyMassStatsRefresher} />
        </div>
        <div className={'col-5'}>
          <DayPlanView refresher={props.dayPlanRefresher} />
          <br />
          <AssetsView />
        </div>
        <div className={'col-5'}>
          <DayGoalsView refresher={props.dayGoalsRefresher} />
          <br />
          <WeekSleepStatsView refresher={props.sleepStatsRefresher} />
          <br />
          <WeekMindfulSessionsStatsView
            refresher={props.mindfulSessionsStatsRefresher}
          />
        </div>
      </div>
    </div>
  )
}
