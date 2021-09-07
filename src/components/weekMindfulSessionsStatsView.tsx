import React, { FunctionComponent, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchWeekMindfulSessionsStats } from '../store/weekMindfulSessionsStatsStatsSlice'
import { ResponsiveBar } from '@nivo/bar'
import { RefreshableComponentProps } from './refreshableComponentProps'
const Moment = require('moment')

export const WeekMindfulSessionsStatsView: FunctionComponent<RefreshableComponentProps> =
  (props) => {
    const stats = useAppSelector((state) => state.weekMindfulSessionsStats.data)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(fetchWeekMindfulSessionsStats())
    }, [dispatch, props.refresher])

    console.log(stats)

    const chartData = stats.map((dayData) => {
      const durationSum = dayData.mindful_sessions.reduce(
        (sum, mindfulSession) => sum + mindfulSession.duration_in_secs,
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
      valueFormat: (value: number) => `${value}m`,
    }

    return (
      <div className={'card card-item'}>
        <div className="card-body text-center">
          <h2>Mindfulness</h2>
          <div style={{ height: '150px' }}>
            <ResponsiveBar {...barProps} />
          </div>
        </div>
      </div>
    )
  }
