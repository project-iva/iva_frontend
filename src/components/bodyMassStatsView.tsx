import React, { FunctionComponent, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchBodyMassStats } from '../store/bodyMassStatsSlice'

export const BodyMassStatsView: FunctionComponent = () => {
  const stats = useAppSelector((state) => state.bodyMassStats.data)
  const statsStatus = useAppSelector((state) => state.bodyMassStats.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (statsStatus === 'idle') {
      dispatch(fetchBodyMassStats())
    }
  }, [statsStatus, dispatch])

  console.log(stats)
  let weekChange = null
  let monthChange = null

  if (stats && stats.week_average && stats.prev_week_average) {
    weekChange = stats.week_average - stats.prev_week_average
  }

  if (stats && stats.month_average && stats.prev_month_average) {
    monthChange = stats.month_average - stats.prev_month_average
  }

  const weightStatItem = (average: number | null, change: number | null) => {
    if (average) {
      return (
        <h5>
          {average.toFixed(1)}{' '}
          {change && (
            <span
              className={change > 0 ? 'gain-text small' : 'loss-text small'}
            >
              ({change.toFixed(2)})
            </span>
          )}{' '}
          kg
        </h5>
      )
    } else {
      return <h5 className={'text-muted'}>No data</h5>
    }
  }

  return (
    <div className={'card card-item'}>
      <div className="card-body">
        <div className={'container-fluid text-center'}>
          <h2>Weight stats</h2>
          <div className={'row pb-2'}>
            <div className={'col p-0 pr-2 mr-2 text-right border-right'}>
              <h5>Week avg</h5>
              <h5>Month avg</h5>
              <h5>Latest</h5>
            </div>
            <div className={'col p-0 text-left'}>
              {weightStatItem(stats?.week_average ?? null, weekChange)}
              {weightStatItem(stats?.month_average ?? null, monthChange)}
              {weightStatItem(stats?.latest_measurement ?? null, null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
