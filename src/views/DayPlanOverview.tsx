import React, { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchDayPlan } from '../store/dayPlanSlice'
import { DayPlanView } from '../components/day_plan/dayPlanView'

export const DayPlanOverview: FunctionComponent = () => {
  const dayPlan = useAppSelector((state) => state.dayPlan.data)
  const dayPlanStatus = useAppSelector((state) => state.dayPlan.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (dayPlanStatus === 'idle') {
      dispatch(fetchDayPlan())
    }
  }, [dayPlanStatus, dispatch])
  console.log(dayPlan)

  return <>{dayPlan && <DayPlanView dayPlan={dayPlan} />}</>
}
