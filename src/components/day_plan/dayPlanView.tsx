import React, { FunctionComponent, useEffect } from 'react'
import { fetchDayPlanActivities } from '../../store/dayPlanSlice'
import { DayPlanActivityView } from './dayPlanActivityView'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RefreshableComponentProps } from '../refreshableComponentProps'
const Moment = require('moment')

export const DayPlanView: FunctionComponent<RefreshableComponentProps> = (
  props,
) => {
  const activities = useAppSelector((state) => state.dayPlan.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchDayPlanActivities())
  }, [dispatch, props.refresher])

  const currentTime = new Date()
  const upcomingActivities = activities.filter((activity) => {
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

  const upcomingActivitiesViews = upcomingActivities.map((activity) => (
    <DayPlanActivityView key={activity.id} activity={activity} />
  ))

  return (
    <div className={'card card-item'}>
      <div className="card-body">
        <div className={'container-fluid'}>
          <div className={'row justify-content-center'}>
            <h2>Current activity</h2>
          </div>
          {currentActivity ? (
            <DayPlanActivityView activity={currentActivity} />
          ) : (
            <div className={'small text-center'}>No current activity</div>
          )}
          <div className={'row justify-content-center'}>
            <h3>Upcoming activities</h3>
          </div>
          {upcomingActivitiesViews.length > 0 ? (
            upcomingActivitiesViews
          ) : (
            <div className={'small text-center'}>No upcoming activities</div>
          )}
        </div>
      </div>
    </div>
  )
}
