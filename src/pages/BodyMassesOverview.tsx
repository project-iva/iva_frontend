import { ResponsiveLine } from '@nivo/line'
import React, { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchBodyMasses } from '../store/bodyMassesSlice'

export const BodyMassesOverview: FunctionComponent = () => {
  const bodyMasses = useAppSelector((state) => state.bodyMasses.bodyMasses)
  const bodyMassesStatus = useAppSelector((state) => state.bodyMasses.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (bodyMassesStatus === 'idle') {
      dispatch(fetchBodyMasses())
    }
  }, [bodyMassesStatus, dispatch])

  const chartData = [
    {
      id: 'Weight',
      data: bodyMasses
        .map((mass) => {
          return {
            x: new Date(mass.start).toISOString().split('T')[0],
            y: mass.value,
          }
        })
        .reverse(),
    },
  ]

  const theme = {
    textColor: 'white',
    fontSize: 14,
  }
  const chartProps = {
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    data: chartData,
    enablePointLabel: true,
    pointSize: 16,
    pointBorderWidth: 1,
    theme: theme,
    axisBottom: {
      tickSize: 0,
    },
    axisLeft: {
      tickSize: 0,
    },
  }

  return (
    <aside>
      <div style={{ height: '500px' }}>
        <ResponsiveLine {...chartProps} />
      </div>
    </aside>
  )
}
