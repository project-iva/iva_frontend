import React, { FunctionComponent } from 'react'
import { DayPlanActivity } from '../../store/dayPlanSlice'

type DayPlanActivityViewProps = {
  activity: DayPlanActivity
}

export const DayPlanActivityView: FunctionComponent<DayPlanActivityViewProps> =
  (props: DayPlanActivityViewProps) => {
    return (
      <div className={'row day-plan-activity-container'}>
        <div className={'col-auto time-container text-center'}>
          <div>{props.activity.start_time}</div>
          <small>-</small>
          <div>{props.activity.end_time}</div>
        </div>
        <div className={'col'}>
          <h4>{props.activity.name}</h4>
          <p>{props.activity.description}</p>
        </div>
      </div>
    )
  }
