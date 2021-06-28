import React, { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchSleepAnalyses } from '../store/sleepAnalysesSlice'

export const SleepAnalysesOverview: FunctionComponent = () => {
  const sleepAnalyses = useAppSelector(
    (state) => state.sleepAnalyses.sleepAnalyses,
  )
  const sleepAnalysesStatus = useAppSelector(
    (state) => state.sleepAnalyses.status,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (sleepAnalysesStatus === 'idle') {
      dispatch(fetchSleepAnalyses())
    }
  }, [sleepAnalysesStatus, dispatch])

  console.log(sleepAnalyses)

  return (
    <aside>
      <h2>b</h2>
    </aside>
  )
}
