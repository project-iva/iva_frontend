import React, { FunctionComponent } from 'react'
import { DayPlanActivity } from '../../store/dayPlanSlice'

type DayPlanActivityViewProps = {
  activity: DayPlanActivity
}

export const DayPlanActivityView: FunctionComponent<DayPlanActivityViewProps> =
  (props: DayPlanActivityViewProps) => {
    return <>{props.activity.name}</>
  }
