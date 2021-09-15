import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  DayPlanActivity,
  fetchDayPlanActivities,
} from '../../store/dayPlanSlice'
import { DayPlanActivityView } from './dayPlanActivityView'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RefreshableComponentProps } from '../refreshableComponentProps'

const Moment = require('moment')

export const DayPlanView: FunctionComponent<RefreshableComponentProps> = (
  props,
) => {
  const activities = useAppSelector((state) => state.dayPlan.data)
  const dispatch = useAppDispatch()
  const [currentActivity, setCurrentActivity] =
    useState<null | DayPlanActivity>(null)

  const [upcomingActivities, setUpcomingActivities] = useState<
    DayPlanActivity[]
  >([])

  useEffect(() => {
    dispatch(fetchDayPlanActivities())
  }, [dispatch, props.refresher])

  useEffect(() => {
    const currentTime = new Date()
    const upcomingActivities = activities.filter((activity) => {
      const activityEndTime = Moment(activity.end_time, 'HH:mm:ss')
      return activityEndTime > currentTime
    })

    setCurrentActivity(null)
    setUpcomingActivities(upcomingActivities)

    if (upcomingActivities.length > 0) {
      let timer: ReturnType<typeof setTimeout> | null = null
      let timerMs: number

      if (Moment(upcomingActivities[0].start_time, 'HH:mm:ss') <= currentTime) {
        const currentActivity = upcomingActivities.shift()!
        setCurrentActivity(currentActivity)
        timerMs =
          Moment(currentActivity.end_time, 'HH:mm:ss').valueOf() -
          Moment().valueOf()
      } else {
        const nextActivity = upcomingActivities[0]
        timerMs =
          Moment(nextActivity.start_time, 'HH:mm:ss').valueOf() -
          Moment().valueOf()
      }
      console.log('DayPlanView: settings timer for ' + timerMs)
      timer = setTimeout(() => {
        dispatch(fetchDayPlanActivities())
      }, timerMs + 1000)
      return () => clearTimeout(timer!)
    }
  }, [dispatch, activities])

  // show at most 2 upcoming activities
  const upcomingActivitiesViews = upcomingActivities
    .slice(0, 2)
    .map((activity) => (
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
