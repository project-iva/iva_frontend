import React, { FunctionComponent, useEffect } from 'react'
import { fetchDayGoals } from '../../store/dayGoalsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { DayGoalView } from './dayGoalView'

export const DayGoalsView: FunctionComponent = () => {
  const goals = useAppSelector((state) => state.dayGoals.data)
  const goalsStatus = useAppSelector((state) => state.dayGoals.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (goalsStatus === 'idle') {
      dispatch(fetchDayGoals())
    }
  }, [goalsStatus, dispatch])

  console.log(goals)

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
