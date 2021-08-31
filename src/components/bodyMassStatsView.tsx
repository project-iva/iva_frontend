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
  return (
    <div className={'card card-item'}>
      <div className="card-body">
        <div className={'container-fluid text-center'}>
          <h2>Weight stats</h2>
        </div>
      </div>
    </div>
  )
}
