import React, { FunctionComponent } from 'react'
import { DayPlan } from '../../store/dayPlanSlice'
import { DayPlanActivityView } from './dayPlanActivityView'

type DayPlanViewProps = {
  dayPlan: DayPlan
}

export const DayPlanView: FunctionComponent<DayPlanViewProps> = (
  props: DayPlanViewProps,
) => {
  const activities = props.dayPlan.activities.map((activity) => (
    <DayPlanActivityView key={activity.id} activity={activity} />
  ))
  return <>{activities}</>
}
