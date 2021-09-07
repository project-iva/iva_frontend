import React, { FunctionComponent, useEffect } from 'react'
import { fetchCaloriesGoal } from '../../store/caloriesGoalSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { CaloriesTrackingView } from './caloriesTrackingView'
import { ConsumedCaloriesNutritionView } from './consumedCaloriesNutritionView'
import { RefreshableComponentProps } from '../refreshableComponentProps'

export type CaloriesChartData = {
  id: string
  label: string
  value: number
  color: string
}

export const CaloriesGoalView: FunctionComponent<RefreshableComponentProps> = (
  props,
) => {
  const caloriesGoal = useAppSelector((state) => state.caloriesGoal.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCaloriesGoal())
  }, [dispatch, props.refresher])

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
