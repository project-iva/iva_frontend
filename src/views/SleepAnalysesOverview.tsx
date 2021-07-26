import React, { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchSleepAnalyses } from '../store/sleepAnalysesSlice'
import { BarDatum, ResponsiveBar } from '@nivo/bar'
import { LegendAnchor } from '@nivo/legends'
type SleepAnalysisDurationAndValue = {
  duration: number
  value: number
}

export const SleepAnalysesOverview: FunctionComponent = () => {
  const sleepAnalysesData = useAppSelector(
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

  console.log(sleepAnalysesData)

  const barData = sleepAnalysesData.map((sleepData) => {
    const sleepAnalyses = sleepData.sleep_analyses.map((sleepAnalysis) => {
      return {
        duration:
          new Date(sleepAnalysis.end).getTime() -
          new Date(sleepAnalysis.start).getTime(),
        value: sleepAnalysis.value,
      }
    }) as SleepAnalysisDurationAndValue[]

    const inBedDurationInMillis = sleepAnalyses
      .filter((sleepAnalysis) => sleepAnalysis.value === 0)
      .reduce(
        (sum, sleepAnalysisDuration) => sum + sleepAnalysisDuration.duration,
        0,
      )

    const asleepDurationInMillis = sleepAnalyses
      .filter((sleepAnalysis) => sleepAnalysis.value === 1)
      .reduce(
        (sum, sleepAnalysisDuration) => sum + sleepAnalysisDuration.duration,
        0,
      )

    return {
      date: sleepData.date,
      asleep: Math.round(asleepDurationInMillis / (1000 * 60)), // convert to minutes
      inBed: Math.round(inBedDurationInMillis / (1000 * 60)), // convert to minutes
    }
  }) as BarDatum[]

  const theme = {
    textColor: 'white',
    fontSize: 14,
  }

  const legend = {
    dataFrom: 'keys' as const,
    anchor: 'bottom-right' as const,
    direction: 'column' as const,
    justify: false,
    translateX: 120,
    translateY: 0,
    itemsSpacing: 2,
    itemWidth: 100,
    itemHeight: 20,
    itemDirection: 'left-to-right' as const,
    itemOpacity: 0.85,
    symbolSize: 20,
  }

  const barProps = {
    groupMode: 'grouped' as const,
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    data: barData.slice(0, 7).reverse(),
    indexBy: 'date',
    keys: ['asleep', 'inBed'],
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
    legends: [legend],
    valueFormat: (value: number) => `${Math.floor(value / 60)}h ${value % 60}m`,
  }

  return (
    <aside>
      <div style={{ height: '500px' }}>
        <ResponsiveBar {...barProps} />
      </div>
    </aside>
  )
}
