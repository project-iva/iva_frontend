import React, { FunctionComponent, useEffect } from 'react'
import { fetchCaloriesGoal } from '../../store/caloriesGoalSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { CaloriesTrackingView } from './caloriesTrackingView'
import { ConsumedCaloriesNutritionView } from './consumedCaloriesNutritionView'

export type CaloriesChartData = {
  id: string
  label: string
  value: number
  color: string
}

export const CaloriesGoalView: FunctionComponent = () => {
  const caloriesGoal = useAppSelector((state) => state.caloriesGoal.data)
  const caloriesGoalStatus = useAppSelector(
    (state) => state.caloriesGoal.status,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (caloriesGoalStatus === 'idle') {
      dispatch(fetchCaloriesGoal())
    }
  }, [caloriesGoalStatus, dispatch])

  return (
    <div className={'card card-item'}>
      <div className="card-body">
        {caloriesGoal ? (
          <div className={'container-fluid text-center'}>
            <h2>Calories goal</h2>
            <CaloriesTrackingView
              caloriesGoal={caloriesGoal.calories_goal}
              consumedCalories={caloriesGoal.calories}
            />
            {caloriesGoal.calories > 0 && (
              <ConsumedCaloriesNutritionView
                protein={caloriesGoal.protein}
                fat={caloriesGoal.fat}
                carbs={caloriesGoal.carbs}
              />
            )}
          </div>
        ) : (
          <div className={'small text-center'}>No calories goal</div>
        )}
      </div>
    </div>
  )
}
