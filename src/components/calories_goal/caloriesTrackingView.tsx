import React, { FunctionComponent } from 'react'
import { PieCustomLayerProps, ResponsivePie } from '@nivo/pie'
import { CaloriesChartData } from './caloriesGoalView'

type CaloriesTrackingViewProps = {
  consumedCalories: number
  caloriesGoal: number
}

export const CaloriesTrackingView: FunctionComponent<CaloriesTrackingViewProps> =
  (props: CaloriesTrackingViewProps) => {
    const caloriesLeft = Math.max(
      props.caloriesGoal - props.consumedCalories,
      0,
    )

    const caloriesData = [
      {
        id: 'consumed_calories',
        label: 'Consumed Calories',
        value: props.consumedCalories,
        color: 'white',
      },
      {
        id: 'calories_left',
        label: 'Calories Left',
        value: caloriesLeft,
        color: '#505050',
      },
    ] as CaloriesChartData[]

    console.log(caloriesData)

    const centeredMetric = ({
      centerX,
      centerY,
    }: PieCustomLayerProps<CaloriesChartData>) => {
      return (
        <text
          x={centerX}
          y={centerY + 25}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '30px',
            fontWeight: 600,
            fill: 'white',
          }}
        >
          {props.consumedCalories} / {props.caloriesGoal}
        </text>
      )
    }

    const theme = {
      textColor: 'white',
      fontSize: 14,
    }

    const chartProps = {
      data: caloriesData,
      margin: { bottom: 20 },
      startAngle: -90,
      endAngle: 90,
      innerRadius: 0.5,
      // padAngle: 0.1,
      cornerRadius: 4,
      activeOuterRadiusOffset: 8,
      theme: theme,
      layers: ['arcs' as const, 'legends' as const, centeredMetric],
      isInteractive: false,
      colors: { datum: 'data.color' },
    }

    return (
      <div style={{ height: '200px' }}>
        <ResponsivePie {...chartProps} />
      </div>
    )
  }
