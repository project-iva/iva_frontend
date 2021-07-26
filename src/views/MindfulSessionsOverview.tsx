import { BarDatum, ResponsiveBar } from '@nivo/bar'
import React, { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchMindfulSessions } from '../store/mindfulSessionsSlice'

type MindfulSessionDuration = {
  duration: number
}

export const MindfulSessionsOverview: FunctionComponent = () => {
  const mindfulSessionsData = useAppSelector(
    (state) => state.mindfulSessions.mindfulSessions,
  )
  const mindfulSessionsStatus = useAppSelector(
    (state) => state.mindfulSessions.status,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (mindfulSessionsStatus === 'idle') {
      dispatch(fetchMindfulSessions())
    }
  }, [mindfulSessionsStatus, dispatch])

  const barData = mindfulSessionsData.map((sessionData) => {
    const mindfulSessions = sessionData.mindful_sessions.map((session) => {
      return {
        duration:
          new Date(session.end).getTime() - new Date(session.start).getTime(),
      }
    }) as MindfulSessionDuration[]
    const durationInMillis = mindfulSessions.reduce(
      (sum, mindfulSessionDuration) => sum + mindfulSessionDuration.duration,
      0,
    )
    return {
      date: sessionData.date,
      duration: Math.round((durationInMillis / 1000) * 60), // convert to minutes
    }
  }) as BarDatum[]

  const theme = {
    textColor: 'white',
    fontSize: 14,
  }
  const barProps = {
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    data: barData.slice(0, 7).reverse(),
    indexBy: 'date',
    keys: ['duration'],
    colors: ['white'],
    padding: 0.2,
    labelTextColor: 'inherit:darker(1.4)',
    labelSkipWidth: 10,
    labelSkipHeight: 10,
    isInteractive: false,
    // enableGridY: false,
    // axisLeft: null,
    theme: theme,
    axisBottom: {
      tickSize: 0,
    },
    axisLeft: {
      tickSize: 0,
    },
    borderRadius: 5,
  }

  return (
    <aside>
      <div style={{ height: '500px' }}>
        <ResponsiveBar {...barProps} />
      </div>
    </aside>
  )
}
