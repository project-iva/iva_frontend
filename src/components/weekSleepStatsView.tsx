import React, { FunctionComponent, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchWeekSleepStats } from '../store/weekSleepStatsSlice'
import { ResponsiveBar } from '@nivo/bar'
import { RefreshableComponentProps } from './refreshableComponentProps'
const Moment = require('moment')

export const WeekSleepStatsView: FunctionComponent<RefreshableComponentProps> =
  (props) => {
    const stats = useAppSelector((state) => state.weekSleepStats.data)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(fetchWeekSleepStats())
    }, [dispatch, props.refresher])

    const chartData = stats.map((dayData) => {
      const durationSum = dayData.sleep_analyses.reduce(
        (sum, sleep_analyses) => sum + sleep_analyses.duration_in_secs,
        0,
      )

      return {
        day: Moment(dayData.date).format('ddd'),
        duration: Math.round(durationSum / 60), // convert from seconds to minutes
      }
    })

    const theme = {
      textColor: 'white',
      fontSize: 22,
    }
    const barProps = {
      margin: { bottom: 25 },
      data: chartData.reverse(),
      indexBy: 'day',
      keys: ['duration'],
      colors: ['white'],
      padding: 0.2,
      labelTextColor: 'black',
      labelSkipWidth: 1,
      labelSkipHeight: 1,
      isInteractive: false,
      enableGridY: false,
      theme: theme,
      axisBottom: {
        tickSize: 0,
      },
      borderRadius: 5,
      valueFormat: (value: number) =>
        `${Math.floor(value / 60)}h ${value % 60}m`,
    }

    return (
      <div className={'card card-item'}>
        <div className="card-body text-center">
          <h2>Sleep</h2>
          <div style={{ height: '150px' }}>
            <ResponsiveBar {...barProps} />
          </div>
        </div>
      </div>
    )
  }
