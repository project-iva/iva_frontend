import React, { FunctionComponent } from 'react'
import { DayGoal } from '../../store/dayGoalsSlice'
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type DayGaolViewProps = {
  goal: DayGoal
}

export const DayGoalView: FunctionComponent<DayGaolViewProps> = (
  props: DayGaolViewProps,
) => {
  return (
    <div className={'row day-goal-container'}>
      <div className={'col'}>
        <h4>{props.goal.name}</h4>
        <p>{props.goal.description}</p>
      </div>
      <div className={'col-auto checkbox-container'}>
        <FontAwesomeIcon
          size="3x"
          icon={props.goal.finished ? faCheckSquare : faSquare}
        />
      </div>
    </div>
  )
}
