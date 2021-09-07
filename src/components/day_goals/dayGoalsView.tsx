import React, { FunctionComponent, useEffect } from 'react'
import { fetchDayGoals } from '../../store/dayGoalsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { DayGoalView } from './dayGoalView'
import { RefreshableComponentProps } from '../refreshableComponentProps'

export const DayGoalsView: FunctionComponent<RefreshableComponentProps> = (
  props,
) => {
  const goals = useAppSelector((state) => state.dayGoals.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchDayGoals())
  }, [dispatch, props.refresher])

  const goalViews = goals.map((goal) => (
    <DayGoalView key={goal.id} goal={goal} />
  ))

  return (
    <div className={'card card-item'}>
      <div className="card-body">
        <div className={'container-fluid'}>
          <div className={'row justify-content-center'}>
            <h2>Day goals</h2>
          </div>
          {goalViews.length > 0 ? (
            goalViews
          ) : (
            <div className={'small text-center'}>No day goals</div>
          )}
        </div>
      </div>
    </div>
  )
}
