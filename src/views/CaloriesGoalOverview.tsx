import { PieCustomLayerProps, ResponsivePie } from '@nivo/pie'
import React, { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchCaloriesGoal } from '../store/caloriesGoalSlice'

type CaloriesChartData = {
  id: string
  label: string
  value: number
}

export const CaloriesGoalOverview: FunctionComponent = () => {
  const caloriesGoal = useAppSelector((state) => state.caloriesGoal.data)
  const caloriesGoalStatus = useAppSelector(
    (state) => state.caloriesGoal.status,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (caloriesGoalStatus === 'idle') {
      dispatch(fetchCaloriesGoal())
    }
  }, [caloriesGoalStatus, dispatch])

  const caloriesLeft =
    (caloriesGoal?.calories_goal ?? 0) - (caloriesGoal?.calories ?? 0)

  const caloriesData = [
    {
      id: 'consumed_calories',
      label: 'Consumed Calories',
      value: caloriesGoal?.calories ?? 0,
    },
    {
      id: 'calories_left',
      label: 'Calories Left',
      value: Math.min(caloriesLeft, 0),
    },
  ] as CaloriesChartData[]

  const centeredMetric = ({
    centerX,
    centerY,
  }: PieCustomLayerProps<CaloriesChartData>) => {
    return (
      <text
        x={centerX}
        y={centerY - 30}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '60px',
          fontWeight: 600,
          fill: 'white',
        }}
      >
        {caloriesGoal?.calories} / {caloriesGoal?.calories_goal}
      </text>
    )
  }

  const legend = {
    anchor: 'bottom' as const,
    direction: 'column' as const,
    justify: false,
    translateY: 60,
    itemsSpacing: 8,
    itemWidth: 100,
    itemHeight: 20,
    itemDirection: 'left-to-right' as const,
    itemOpacity: 0.85,
    symbolSize: 20,
  }

  const theme = {
    textColor: 'white',
    fontSize: 14,
  }

  const chartProps = {
    data: caloriesData,
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    startAngle: -90,
    endAngle: 90,
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    activeOuterRadiusOffset: 8,
    theme: theme,
    legends: [legend],
    layers: ['arcs' as const, 'legends' as const, centeredMetric],
    isInteractive: false,
  }

  return (
    <aside>
      <div style={{ height: '500px' }}>
        <ResponsivePie {...chartProps} />
      </div>
    </aside>
  )
}
