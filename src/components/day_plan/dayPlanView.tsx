import React, { FunctionComponent } from 'react'
import { DayPlan } from '../../store/dayPlanSlice'
import { DayPlanActivityView } from './dayPlanActivityView'
const Moment = require('moment')

type DayPlanViewProps = {
  dayPlan: DayPlan
}

export const DayPlanView: FunctionComponent<DayPlanViewProps> = (
  props: DayPlanViewProps,
) => {
  const currentTime = new Date()
  const upcomingActivities = props.dayPlan.activities.filter((activity) => {
    const activityEndTime = Moment(activity.end_time, 'HH:mm:ss')
    return activityEndTime > currentTime
  })

  let currentActivity = null
  if (
    upcomingActivities.length > 0 &&
    Moment(upcomingActivities[0].start_time, 'HH:mm:ss') <= currentTime
  ) {
    currentActivity = upcomingActivities.shift()
  }
  console.log(upcomingActivities)

  const upcomingActivitiesViews = upcomingActivities.map((activity) => (
    <DayPlanActivityView key={activity.id} activity={activity} />
  ))
  return (
    <div className={'container-fluid day-plan-container'}>
      <div className={'row'}>
        <h2>Current activity: </h2>
      </div>
      {currentActivity ? (
        <DayPlanActivityView activity={currentActivity} />
      ) : (
        <div className={'small text-center'}>No current activity</div>
      )}
      <div className={'row'}>
        <h3>Upcoming activities: </h3>
      </div>
      {upcomingActivitiesViews.length > 0 ? (
        upcomingActivitiesViews
      ) : (
        <div className={'small text-center'}>No upcoming activities</div>
      )}
    </div>
  )
}
